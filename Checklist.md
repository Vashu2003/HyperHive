# HyperHive - Full Project Checklist (With Git & Version Control)

## Setup
- [ ] Initialize Vite + React project
- [ ] Setup TailwindCSS 4.1
- [ ] Initialize Express backend
- [ ] Connect to MongoDB Atlas
- [ ] Setup environment variables (.env)
- [ ] Setup environment variables for production
- [ ] Connect frontend to production backend

## Git & Version Control
- [ ] Initialize Git repository (git init)
- [ ] Create .gitignore (node_modules, .env, dist/)
- [ ] Make first commit (Initial Setup)
- [ ] Setup GitHub repository and push code
- [ ] Use feature branches for major features (git checkout -b feature/feature-name)
- [ ] Use PRs (Pull Requests) if working with team
- [ ] Commit regularly with clear messages

## Authentication
- [ ] Create User model (mongoose)
- [ ] API routes for register/login
- [ ] Password hashing with bcryptjs
- [ ] JWT token generation and validation
- [ ] React pages for Signup and Login
- [ ] Save JWT token in localStorage
- [ ] Protect private frontend routes

## Group Management
- [ ] Create Group model
- [ ] Create API to create/join group
- [ ] Dashboard to list user's groups
- [ ] Group invitation system (optional)

## Task Management
- [ ] Create Task model (title, description, status, assignedTo, groupId)
- [ ] APIs for creating, updating, deleting tasks
- [ ] Task list UI with status filters (To Do / In Progress / Done)
- [ ] Assign tasks to group members

## Notes Sharing
- [ ] Setup Multer for file uploads
- [ ] Connect uploads to Cloudinary
- [ ] Store file URL and metadata in MongoDB
- [ ] Create Notes upload form on frontend
- [ ] Display list of uploaded notes

## Real-Time Features
- [ ] Install and configure Socket.IO on server
- [ ] Setup Socket.IO client in React
- [ ] Real-time chat in group
- [ ] Real-time notifications for task updates

## UI/UX Improvements
- [ ] Responsive design with TailwindCSS 4.1
- [ ] Use Toast notifications (e.g., react-hot-toast)
- [ ] Dark mode toggle
- [ ] Animate transitions (Framer Motion)
- [ ] Clean and minimalistic UI

## Admin Features
- [ ] Assign admin role to group creator
- [ ] Kick members from group
- [ ] Delete entire group if needed

## Deployment
- [ ] Deploy backend to Render or Railway
- [ ] Deploy frontend to Vercel or Netlify
- [ ] Setup proper CORS on backend
- [ ] Setup environment variables for production
- [ ] Connect frontend to production backend

## Optional Enhancements
- [ ] GitHub OAuth login system
- [ ] Calendar view for task deadlines (FullCalendar.io)
- [ ] Public Notes Sharing outside groups
- [ ] Invite by Email
- [ ] Personalized user profiles with avatars