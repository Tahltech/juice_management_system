<?php

namespace App\Services;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class EmailService
{
    private PHPMailer $mailer;

    public function __construct()
    {
        $this->mailer = new PHPMailer(true);
        $this->setupMailer();
    }

    private function setupMailer(): void
    {
        // Server settings
        $this->mailer->isSMTP();
        $this->mailer->Host = config('mail.host', 'smtp.gmail.com');
        $this->mailer->SMTPAuth = true;
        $this->mailer->Username = config('mail.username');
        $this->mailer->Password = config('mail.password');
        $this->mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $this->mailer->Port = config('mail.port', 587);

        // Recipients
        $this->mailer->setFrom(config('mail.from.address'), config('mail.from.name', 'FreshSip'));
        $this->mailer->addReplyTo(config('mail.from.address'), config('mail.from.name', 'FreshSip'));
    }

    public function sendWelcomeEmail(string $email, string $name): bool
    {
        try {
            $this->mailer->clearAddresses();
            $this->mailer->addAddress($email, $name);
            
            $this->mailer->isHTML(true);
            $this->mailer->Subject = 'Welcome to FreshSip! 🧃';
            
            $this->mailer->Body = $this->getWelcomeEmailTemplate($name);
            $this->mailer->AltBody = $this->getWelcomeEmailTextTemplate($name);
            
            return $this->mailer->send();
        } catch (Exception $e) {
            \Log::error('Welcome email failed: ' . $e->getMessage());
            return false;
        }
    }

    public function sendPasswordResetEmail(string $email, string $name, string $token): bool
    {
        try {
            $this->mailer->clearAddresses();
            $this->mailer->addAddress($email, $name);
            
            $this->mailer->isHTML(true);
            $this->mailer->Subject = 'Reset Your Password - FreshSip 🔐';
            
            $resetUrl = route('password.reset', $token);
            $this->mailer->Body = $this->getPasswordResetEmailTemplate($name, $resetUrl);
            $this->mailer->AltBody = $this->getPasswordResetEmailTextTemplate($name, $resetUrl);
            
            return $this->mailer->send();
        } catch (Exception $e) {
            \Log::error('Password reset email failed: ' . $e->getMessage());
            return false;
        }
    }

    private function getWelcomeEmailTemplate(string $name): string
    {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>Welcome to FreshSip</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #FF6B35, #dc2626); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; background: #FF6B35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                .logo { max-width: 200px; height: auto; margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <img src='http://localhost:8000/logo.png' alt='FreshSip Logo' class='logo' />
                    <h1>Welcome to FreshSip!</h1>
                    <p>Your fresh juice journey begins now</p>
                </div>
                <div class='content'>
                    <h2>Hi {$name},</h2>
                    <p>Thank you for joining FreshSip! We're excited to have you as part of our community.</p>
                    
                    <h3>What's Next?</h3>
                    <ul>
                        <li>🛒 Browse our delicious juice collection</li>
                        <li>🛍️ Add your favorite juices to cart</li>
                        <li>🚀 Enjoy fast delivery to your doorstep</li>
                    </ul>
                    
                    <p>Ready to start shopping? Click the button below to explore our products:</p>
                    
                    <div style='text-align: center;'>
                        <a href='" . route('customer.juices.index') . "' class='button'>Start Shopping</a>
                    </div>
                    
                    <p>If you have any questions, feel free to contact our support team. We're here to help!</p>
                    
                    <p>Best regards,<br>The FreshSip Team</p>
                </div>
                <div class='footer'>
                    <p>&copy; " . date('Y') . " FreshSip. All rights reserved.</p>
                    <p>You received this email because you signed up for an account on our website.</p>
                </div>
            </div>
        </body>
        </html>";
    }

    private function getWelcomeEmailTextTemplate(string $name): string
    {
        return "
Welcome to FreshSip!

Hi {$name},

Thank you for joining FreshSip! We're excited to have you as part of our community.

What's Next?
- Browse our delicious juice collection
- Add your favorite juices to cart
- Enjoy fast delivery to your doorstep

Ready to start shopping? Visit our website: " . route('customer.juices.index') . "

If you have any questions, feel free to contact our support team. We're here to help!

Best regards,
The FreshSip Team

© " . date('Y') . " FreshSip. All rights reserved.
You received this email because you signed up for an account on our website.";
    }

    private function getPasswordResetEmailTemplate(string $name, string $resetUrl): string
    {
        return "
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset='UTF-8'>
            <title>Password Reset - FreshSip</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #FF6B35, #dc2626); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; background: #FF6B35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                .warning { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 15px; border-radius: 5px; margin: 20px 0; }
                .logo { max-width: 200px; height: auto; margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <img src='http://localhost:8000/logo.png' alt='FreshSip Logo' class='logo' />
                    <h1>🔐 Password Reset Request</h1>
                    <p>Secure your FreshSip account</p>
                </div>
                <div class='content'>
                    <h2>Hi {$name},</h2>
                    <p>We received a request to reset the password for your FreshSip account.</p>
                    
                    <div class='warning'>
                        <strong>Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
                    </div>
                    
                    <p>To reset your password, click the button below:</p>
                    
                    <div style='text-align: center;'>
                        <a href='{$resetUrl}' class='button'>Reset Password</a>
                    </div>
                    
                    <p>Or copy and paste this link into your browser:</p>
                    <p style='word-break: break-all; background: #f3f4f6; padding: 10px; border-radius: 5px;'>{$resetUrl}</p>
                    
                    <p><strong>This link will expire in 60 minutes.</strong></p>
                    
                    <p>If you have any trouble resetting your password, please contact our support team.</p>
                    
                    <p>Best regards,<br>The FreshSip Team</p>
                </div>
                <div class='footer'>
                    <p>&copy; " . date('Y') . " FreshSip. All rights reserved.</p>
                    <p>You received this email because a password reset was requested for your account.</p>
                </div>
            </div>
        </body>
        </html>";
    }

    private function getPasswordResetEmailTextTemplate(string $name, string $resetUrl): string
    {
        return "
Password Reset Request - FreshSip

Hi {$name},

We received a request to reset the password for your FreshSip account.

SECURITY NOTICE: If you didn't request this password reset, please ignore this email. Your password will remain unchanged.

To reset your password, visit this link:
{$resetUrl}

Or copy and paste this link into your browser:
{$resetUrl}

This link will expire in 60 minutes.

If you have any trouble resetting your password, please contact our support team.

Best regards,
The FreshSip Team

© " . date('Y') . " FreshSip. All rights reserved.
You received this email because a password reset was requested for your account.";
    }
}
