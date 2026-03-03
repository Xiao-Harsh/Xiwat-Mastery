# XIWAT — Premium Watch Store

A high-performance, minimalist watch store built with professional-grade security and a focus on speed.

## Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **API Client**: Axios (Consolidated Instance)
- **Animations**: Framer Motion

### Backend
- **Core**: Spring Boot 3 (Java 17)
- **Security**: Spring Security + JWT
- **Database**: MySQL / H2
- **Persistence**: Spring Data JPA

## Key Features

- **JWT Authentication**: Secure, stateless user sessions.
- **Persistent Account Lockout**: Bruteforce protection (5 attempts, 15-minute lockout).
- **Custom WAF Filter**: Real-time inspection of headers, query parameters, and JSON bodies for SQLi and XSS.
- **Optimized Performance**: WebP asset optimization and consolidated API handling.
- **Global Error Handling**: Production-safe error responses without stack trace leaks.

## Project Structure

```text
├── src/                # React Frontend code
├── xiwat-backend/      # Spring Boot Backend source
├── vercel.json         # Deployment configuration for Vercel
└── README.md           # Project documentation
```

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd xiwat-backend
   ```
2. Run the application (defaults to H2 database for local development):
   ```bash
   mvn spring-boot:run
   ```

### 2. Frontend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables (refer to `.env.example`).
3. Start the development server:
   ```bash
   npm run dev
   ```

## Production Deployment

### Backend (Render/Heroku)
- Set `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and `SPRING_DATASOURCE_PASSWORD` environment variables.
- Set `JWT_SECRET_KEY` (a secure Base64 string).

### Frontend (Vercel)
- Set `VITE_API_BASE_URL` to your production backend URL.
