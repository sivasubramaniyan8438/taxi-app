# 🚖 RideGo - Taxi Booking App

Full-stack taxi booking app with React frontend + Node.js/Express backend + MongoDB.

---

## 📁 Project Structure

```
taxi-app/
├── backend/          # Node.js + Express API
│   ├── src/
│   │   ├── index.js
│   │   ├── models/   (User, Ride)
│   │   ├── routes/   (auth, rides)
│   │   └── middleware/ (auth)
│   ├── .env          ← your secrets here
│   └── package.json
│
└── frontend/         # React App
    ├── src/
    │   ├── App.js
    │   ├── api.js
    │   ├── context/  (AuthContext)
    │   └── pages/    (Login, Register, Dashboard)
    ├── .env          ← API URL here
    └── package.json
```

---

## ⚙️ Setup

### 1. Backend

```bash
cd backend
npm install
```

Edit `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taxiapp
JWT_SECRET=change_this_to_something_secret
NODE_ENV=development
```

```bash
npm run dev    # development
npm start      # production
```

### 2. Frontend

```bash
cd frontend
npm install
```

Edit `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

```bash
npm start      # development (http://localhost:3000)
npm run build  # production build
```

---

## 🔑 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/auth/register | ❌ | Register user |
| POST | /api/auth/login | ❌ | Login user |
| GET | /api/auth/me | ✅ | Get current user |
| POST | /api/rides | ✅ | Book a ride |
| GET | /api/rides | ✅ | My ride history |
| PATCH | /api/rides/:id/cancel | ✅ | Cancel a ride |

---

## 🚀 Features

- ✅ User Register / Login with JWT
- ✅ Protected routes (frontend + backend)
- ✅ Book a taxi ride (pickup → destination)
- ✅ View active ride with driver info
- ✅ Cancel a ride
- ✅ Ride history
- ✅ Environment variables (.env) support
