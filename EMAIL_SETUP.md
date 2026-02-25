# Email Setup Guide for Juice Store

This guide will help you configure PHP Mailer to send emails for user registration and password reset.

## Prerequisites

1. Gmail account (or other SMTP provider)
2. App password for Gmail (recommended) or regular password

## Step 1: Configure Gmail App Password

If using Gmail:

1. Go to your Google Account: https://myaccount.google.com/
2. Enable 2-Step Authentication (if not already enabled)
3. Go to Security → 2-Step Verification → App passwords
4. Generate a new app password with:
   - App: Mail
   - Device: Custom name (e.g., "Juice Store")
5. Copy the generated password (16 characters)

## Step 2: Update .env File

Copy the email configuration from `.env.example` to your `.env` file and update:

```env
MAIL_MAILER=smtp
MAIL_SCHEME=tls
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-16-character-app-password
MAIL_FROM_ADDRESS=your-email@gmail.com
MAIL_FROM_NAME="Juice Store"
```

**Important:**
- Replace `your-email@gmail.com` with your actual Gmail address
- Replace `your-16-character-app-password` with the app password you generated
- Do NOT use your regular Gmail password if you have 2FA enabled

## Step 3: Alternative SMTP Providers

### Outlook/Hotmail:
```env
MAIL_HOST=smtp-mail.outlook.com
MAIL_PORT=587
```

### Yahoo Mail:
```env
MAIL_HOST=smtp.mail.yahoo.com
MAIL_PORT=587
```

### SendGrid:
```env
MAIL_HOST=smtp.sendgrid.net
MAIL_PORT=587
MAIL_USERNAME=apikey
MAIL_PASSWORD=your-sendgrid-api-key
```

## Step 4: Test Email Configuration

After updating your `.env` file, restart your Docker container:

```bash
docker-compose restart
```

Then test by:
1. Creating a new user account (should send welcome email)
2. Requesting password reset (should send reset email)

## Step 5: Troubleshooting

### Common Issues:

1. **"Authentication failed" error**
   - Check if you're using an app password (not regular password)
   - Verify email and password are correct
   - Ensure 2FA is enabled on Gmail account

2. **"Connection refused" error**
   - Check SMTP host and port settings
   - Verify firewall isn't blocking SMTP connections

3. **Email not sending but no error**
   - Check spam/junk folder
   - Verify email address is correct
   - Check Laravel logs: `docker exec juice_app php artisan log:clear`

### Debug Mode:

To enable email debugging, temporarily add this to your `.env`:

```env
MAIL_DRIVER=log
```

This will log emails instead of sending them. Check the logs at:
`storage/logs/laravel.log`

## Step 6: Email Templates

The system includes two email templates:

### Welcome Email:
- Sent when a new user registers
- Includes welcome message and call-to-action to start shopping
- Professional HTML design with fallback text version

### Password Reset Email:
- Sent when user requests password reset
- Includes secure reset link
- Security notice about unauthorized requests
- Link expires in 60 minutes

## Step 7: Customization

### Email Service Class:
Location: `app/Services/EmailService.php`

You can customize:
- Email templates (HTML and text versions)
- SMTP settings
- Email styling and branding

### Notification Class:
Location: `app/Notifications/ResetPasswordNotification.php`

You can customize:
- Password reset notification behavior
- Fallback email content

## Security Notes:

1. **Never commit email credentials to version control**
2. **Use app passwords instead of regular passwords**
3. **Enable 2FA on your email account**
4. **Consider using transactional email services for production**

## Production Recommendations:

For production environments, consider using:
- SendGrid
- Mailgun
- Amazon SES
- Postmark

These services provide better deliverability, analytics, and scalability than regular SMTP.

## Testing Email Functionality:

You can test emails by:

1. **Registration Test:**
   - Go to `/register`
   - Create a new account
   - Check email for welcome message

2. **Password Reset Test:**
   - Go to `/forgot-password`
   - Enter your email
   - Check email for reset link
   - Test the reset link

## Logs and Debugging:

Check Laravel logs for email errors:
```bash
docker exec juice_app tail -f storage/logs/laravel.log
```

Clear logs if needed:
```bash
docker exec juice_app php artisan log:clear
```
