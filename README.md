# Re-Self Wellness Website

Modern professional services website for Sonya, a wellness consultant, keynote speaker, and corporate wellness facilitator.

## Setup

```bash
npm install
npm run dev
```

## Booking Email and Database

Create `.env.local` with:

```bash
BOOKING_TO_EMAIL=bookings@example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_password
SMTP_FROM="Re-Self Bookings <bookings@example.com>"
DATABASE_URL=postgres://user:password@host:5432/database
```

The booking API validates submissions, rate limits requests, blocks honeypot spam, stores submissions in PostgreSQL when `DATABASE_URL` is configured, and sends both admin and confirmation emails when SMTP settings are present. If database or SMTP settings are missing during local development, the API still returns success and stores a local `bookings.jsonl` backup.
