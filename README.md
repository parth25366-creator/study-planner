# Study Planner 📚

A full-stack web app for college students to track assignments, exams and deadlines.

## Tech Stack
- **Frontend:** React, React Router
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (hosted on Neon)
- **Auth:** JWT + bcrypt

## Project Structure
```
study-planner/
├── client/               → React frontend
│   └── src/
│       ├── App.js        → routing
│       ├── pages/
│       │   ├── Login.js      → login & signup
│       │   ├── Dashboard.js  → stats overview
│       │   └── Tasks.js      → add/complete/delete tasks
│       └── components/
│           └── Navbar.js     → navigation
└── server/               → Node.js backend
    ├── index.js          → Express server entry point
    ├── db.js             → Neon PostgreSQL connection
    ├── setup-db.js       → creates users & tasks tables
    └── .env              → environment variables (not committed)
```

## Database Schema
```sql
users  → id, name, email, password, created_at
tasks  → id, user_id, title, course, due_date, priority, done, created_at
```

## Getting Started

### Backend
```bash
cd server
npm install
node setup-db.js     # run once to create tables
npm run dev          # starts server on port 5000
```

### Frontend
```bash
cd client
npm install
npm start            # starts React app on localhost:3000
```

### Environment Variables
Create a `.env` file in `/server` with:
```
PORT=5000
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret_key
```

## Status
🚧 Work in Progress — database setup complete, auth routes coming next

