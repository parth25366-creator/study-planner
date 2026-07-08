# Study Planner 📚

A full-stack web app for college students to track assignments, exams and deadlines.

## Live Demo
- 🌐 Frontend: https://study-planner-amw4rbz35-parth-singh.vercel.app
- 🔧 Backend: https://study-planner-api-ne6x.onrender.com

## Tech Stack
- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express
- **Database:** PostgreSQL (hosted on Neon)
- **Auth:** JWT + bcrypt

## Project Structure
```
study-planner/
├── client/               → React frontend
│   └── src/
│       ├── App.js            → routing + protected routes
│       ├── pages/
│       │   ├── Login.js      → login & signup
│       │   ├── Dashboard.js  → stats overview
│       │   └── Tasks.js      → add/complete/delete tasks
│       ├── components/
│       │   ├── Navbar.js     → navigation + logout
│       │   ├── Spinner.js    → loading indicator
│       │   └── ErrorBanner.js → error display
│       └── services/
│           ├── api.js        → axios instance with JWT interceptor
│           └── requests.js   → all API call functions
└── server/               → Node.js backend
    ├── index.js          → Express server entry point
    ├── db.js             → Neon PostgreSQL connection
    ├── setup-db.js       → creates users & tasks tables
    ├── routes/
    │   ├── auth.js       → register + login endpoints
    │   └── tasks.js      → CRUD task endpoints
    └── middleware/
        └── auth.js       → JWT verification middleware
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
Create a `.env` file in `/server`:
```
PORT=5000
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_secret_key
```

Create a `.env` file in `/client`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Deployment
- Backend → [Render](https://render.com) (uses render.yaml config)
- Frontend → [Vercel](https://vercel.com)

## Status
✅ Fully deployed and live!
