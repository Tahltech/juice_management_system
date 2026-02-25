<?php

namespace App\Notifications;

use App\Services\EmailService;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;

class ResetPasswordNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public string $token
    ) {}

    public function via($notifiable): array
    {
        return ['mail'];
    }

    public function toMail($notifiable): \Illuminate\Notifications\Messages\MailMessage
    {
        // Use our custom EmailService instead of the default Laravel mail
        try {
            $emailService = new EmailService();
            $success = $emailService->sendPasswordResetEmail(
                $notifiable->getEmailForPasswordReset(),
                $notifiable->name,
                $this->token
            );

            if (!$success) {
                \Log::error('Failed to send password reset email to: ' . $notifiable->getEmailForPasswordReset());
            }
        } catch (\Exception $e) {
            \Log::error('Password reset email error: ' . $e->getMessage());
        }

        // Return a basic mail message as fallback
        return (new \Illuminate\Notifications\Messages\MailMessage)
            ->subject('Reset Your Password - Juice Store')
            ->line('You are receiving this email because we received a password reset request for your account.')
            ->action('Reset Password', route('password.reset', $this->token))
            ->line('This password reset link will expire in ' . config('auth.passwords.'.config('auth.defaults.passwords').'.expire') . ' minutes.')
            ->line('If you did not request a password reset, no further action is required.');
    }

    public function toArray($notifiable): array
    {
        return [
            'token' => $this->token,
        ];
    }
}
