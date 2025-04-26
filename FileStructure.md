# 📁 Project Structure — HyperHive

This is the complete folder and file structure for the **HyperHive** full-stack MERN project.

---

## Root Directory

hyperhive/
├── backend/
├── frontend/
├── README.md
├── .gitignore
├── package.json (optional at root if monorepo)

---

## 📦 Frontend — (React + Tailwind CSS + Vite)

**Path: `/frontend`**

frontend/
├── public/
│   └── index.html
│
├── src/
│   ├── assets/                # Images, logos, svgs
│   │
│   ├── components/            # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── GroupCard.jsx
│   │   ├── TaskItem.jsx
│   │   └── NoteItem.jsx
│   │
│   ├── pages/                 # Full pages
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Groups.jsx
│   │   ├── Tasks.jsx
│   │   ├── Notes.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Profile.jsx
│   │
│   ├── context/               # React Context API (global state)
│   │   ├── AuthContext.jsx
│   │   └── GroupContext.jsx
│   │
│   ├── services/              # API calls (Axios setup)
│   │   ├── authService.js
│   │   ├── groupService.js
│   │   ├── taskService.js
│   │   └── noteService.js
│   │
│   ├── routes/                # App routes
│   │   └── AppRoutes.jsx
│   │
│   ├── styles/                # Tailwind CSS or custom styles
│   │   └── main.css
│   │
│   ├── utils/                 # Helper functions
│   │   └── validators.js
│   │
│   ├── App.jsx
│   ├── main.jsx               # Entry point for React
│   └── tailwind.config.js
│
├── .env
├── package.json
├── postcss.config.js
├── vite.config.js
└── README.md


---

## 📦 Backend — (Node.js + Express + MongoDB)

**Path: `/backend`**


backend/
├── src/
│   ├── config/
│   │   └── db.js             # MongoDB connection setup
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── groupController.js
│   │   ├── noteController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js # protect routes (JWT)
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Group.js
│   │   ├── Task.js
│   │   └── Note.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── groupRoutes.js
│   │   ├── noteRoutes.js
│   │   └── taskRoutes.js
│   │
│   ├── utils/
│   │   └── generateToken.js  # JWT token generation helper
│   │
│   └── app.js                # Main express app
│
├── .env
├── server.js                 # Server startup file
├── package.json
├── .gitignore
└── README.md


---

## 🧠 Additional Notes:

- `.env` files contain sensitive data and should be listed in `.gitignore`.
- Separate components, services, and routes ensure clean architecture.
- MongoDB Atlas used as cloud database (Flex Plan).
- Frontend styled using TailwindCSS (v4.1) and built with Vite for fast development.
- Version control managed via Git and GitHub.

---

## 📢 Best Practices:
- Use modular imports for maintainability.
- Protect sensitive routes using middleware.
- Clean separation of concerns (Models ➔ Controllers ➔ Routes).
- Follow RESTful API design principles.

---
