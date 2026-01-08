# MediConnect — Frontend + Backend

This repository contains a React frontend and a minimal Express + MySQL backend used by the MediConnect demo app.

Summary
- Frontend: React app in the project root (`src/`, `public/`).
- Backend: Node/Express server in `Backend/` with API routes and DB helpers.

Quick start (Backend)
1. Open `.env` in the `Backend` folder and confirm DB settings (host/user/password/name/port).
2. Start MySQL so the `mediconnect` database is available.
3. From the `Backend` folder run:
```powershell
npm install
node server.js
```
4. Seed admin (doctor) accounts (plaintext passwords `1`,`2`,`3`,`4`):
```powershell
node scripts/insertAdminsPlain.js
```

API endpoints
- `GET /api/patients` — list patients
- `GET /api/doctors` — list doctors
- `POST /api/auth/login` — login for `doctor` (body: `{ role: 'doctor', password: '1' }`). Patients do not need a password.

Quick start (Frontend)
1. From the project root run:
```powershell
npm install
npm start
```
2. Open http://localhost:3000 and use the Login screen.

Notes about authentication
- For convenience this project includes a simple admin table and plaintext passwords by default. The insert script is `Backend/scripts/insertAdminsPlain.js` and inserts four admin users (`admin1`..`admin4`) with passwords `1`,`2`,`3`,`4`.
- The backend accepts plaintext passwords to match these values. For production use, replace this with hashed passwords and secure auth.

Files of interest
- Backend server: [Backend/server.js](Backend/server.js)
- Auth route: [Backend/routes/auth.js](Backend/routes/auth.js)
- Seed/insert scripts: [Backend/scripts/seedAdmins.js](Backend/scripts/seedAdmins.js) and [Backend/scripts/insertAdminsPlain.js](Backend/scripts/insertAdminsPlain.js)
- SQL file: [Backend/sql/insert_admins_plain.sql](Backend/sql/insert_admins_plain.sql)
- Frontend pages: [src/pages/Doctors.js](src/pages/Doctors.js) and [src/pages/Patients.js](src/pages/Patients.js)

Testing endpoints
- Example (from Backend folder):
```powershell
curl http://localhost:5000/api/patients
curl http://localhost:5000/api/doctors
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"role\":\"doctor\",\"password\":\"1\"}"
```

If you want README changes (formatting or extra instructions), tell me what to add.
