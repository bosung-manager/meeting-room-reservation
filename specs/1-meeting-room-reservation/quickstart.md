# Quickstart: Meeting Room Reservation

## Prerequisites
- Node.js 18+
- npm

## Running Locally (Visual Dev Mode)

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Dev Server (Mock Mode)**:
   The project is configured to use local JSON file storage by default in development.
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

3. **Admin Access**:
   - Go to [http://localhost:3000/admin](http://localhost:3000/admin)
   - Password: `00001`

## Switching to Production (Neon)

1. Set `DATABASE_URL` in `.env`.
2. Run `npx prisma migrate deploy`.
3. Set `NEXT_PUBLIC_USE_MOCK_DB=false`.
