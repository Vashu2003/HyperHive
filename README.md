# HyperHive - Collaborative Project Management Platform

HyperHive is a futuristic collaborative project management platform designed for students and project groups. Built with the modern MERN stack, it provides a seamless experience for managing project groups, tasks, notes, and virtual meetings in one place.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express)](https://expressjs.com/)

## Live Demo

### Backend
```
https://hyperhive-backend.onrender.com
```
### Frontend
```
https://hyperhive-frontend.onrender.com
```

## 🛠 Tech Stack

### Frontend

- React.js (Vite)
- TailwindCSS v3.4
- React Router v6
- Axios for API calls
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for Authentication
- Socket.io for real-time features

### Deployment

- Render (Backend)
- Vercel/Netlify (Frontend)
- MongoDB Atlas (Database)
- Cloudinary (File Storage)

## 🌟 Features

### 📚 Project Group Management

- Create and manage project groups
- Add/remove group members
- Group discussions and announcements
- Member role management (Admin/Regular)

### 📝 Task Management

- Create, assign, and track tasks
- Set due dates and priorities
- Task status updates (Pending/In Progress/Completed)
- Filter and sort tasks

### 📝 Notes & Attachments

- Create and share rich text notes
- Upload and manage project materials
- Organize notes by subjects/topics
- Version history for notes

### 🎤 Virtual Meetings

- Schedule and join virtual project sessions
- Real-time video/audio conferencing
- Screen sharing capabilities
- Meeting recordings and notes

### 📅 Timeline & Calendar

- Visual timeline of group activities
- Calendar view for tasks and meetings
- Important deadlines and events
- Progress tracking

### 🔐 Security & Access Control

- JWT Authentication
- Role-based access control
- Secure file storage
- Guest access with limited permissions



## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/vashu2003/HyperHive.git
   cd hyperhive
   ```

2. **Backend Setup**

   ```bash
   cd server
   npm install
   cp .env.example .env
   # Update .env with your configuration
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd ../client
   npm install
   cp .env.example .env
   # Update VITE_API_BASE_URL with your backend URL
   npm run dev
   ```

4. **Environment Variables**
   Create a `.env` file in both `server` and `client` directories with the following variables:

   **Server (.env)**

   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

   **Client (.env)**

   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

## 🐳 Docker Setup

HyperHive is containerized using Docker for consistent development and deployment. The application consists of two main services: frontend and backend, orchestrated with Docker Compose.

### Prerequisites

- Docker Desktop installed on your machine
- Docker Compose (included with Docker Desktop)

### Running with Docker Compose

1. **Clone the repository**

   ```bash
   git clone https://github.com/vashu2003/HyperHive.git
   cd hyperhive
   ```

2. **Set up environment variables**

   - Create `.env` files in both `client` and `server` directories
   - Use the examples provided in `.env.example` files

3. **Build and start containers**

   ```bash
   docker-compose up --build
   ```

   This will:

   - Build the frontend React app
   - Set up the backend Node.js server
   - Start both services in development mode with hot-reloading

4. **Access the application**
   - Frontend: http://localhost
   - Backend API: http://localhost:5000

### Production Build

For production, you can build the optimized version using:

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

## 🚀 Deployment on Render

HyperHive is configured for easy deployment on Render's cloud platform. The application uses:

- **Web Service** for the frontend
- **Web Service** for the backend API
- **MongoDB Atlas** for the database

### Prerequisites

- Render account
- MongoDB Atlas cluster
- Cloudinary account (for file storage)

### Deployment Steps

1. **Backend Deployment**

   - Create a new Web Service on Render
   - Connect your GitHub repository
   - Configure build command: `npm install`
   - Configure start command: `node server.js`
   - Add environment variables:
     - `PORT=10000`
     - `MONGODB_URI=your_mongodb_atlas_uri`
     - `JWT_SECRET=your_jwt_secret`
     - `CLOUDINARY_*` credentials

2. **Frontend Deployment**

   - Create a new Static Site on Render
   - Connect your GitHub repository
   - Set build command: `npm install && npm run build`
   - Set publish directory: `dist`
   - Add environment variable:
     - `VITE_API_BASE_URL=your_backend_url`

3. **Environment Setup**
   Ensure your environment variables are properly set in both services:

   **Backend (.env)**

   ```
   PORT=10000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

   **Frontend (.env)**

   ```
   VITE_API_BASE_URL=your_backend_url
   ```

## 📦 Container Details

### Backend Service

- **Base Image**: Node.js 18 Alpine
- **Port**: 5000
- **Environment**: Development/Production
- **Volumes**: Local development files mounted for hot-reloading

### Frontend Service

- **Base Image**: Node.js 18 Alpine (build) + Nginx (production)
- **Port**: 80
- **Build Process**:
  - Installs dependencies
  - Builds production-optimized React app
  - Serves static files via Nginx

## 🔄 CI/CD

The project includes GitHub Actions workflows for automated testing and deployment:

- Linting and testing on pull requests
- Automated deployment to Render on push to main branch

## 🛠 Development

### Without Docker

#### Backend

```bash
cd server
npm install
npm run dev
```

#### Frontend

```bash
cd client
npm install
npm run dev
```

### With Docker (Development)

```bash
# Start all services
docker-compose up

# Rebuild containers
docker-compose up --build

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

## 📂 Project Structure

```
hyperhive/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # Source code
│       ├── components/      # Reusable UI components
│       ├── context/         # React context providers
│       ├── pages/           # Page components
│       ├── services/        # API services
│       └── App.jsx         # Main App component
│
└── server/                # Backend server
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── controllers/    # Route controllers
    │   ├── middleware/     # Custom middleware
    │   ├── models/         # Database models
    │   ├── routes/         # API routes
    │   └── utils/          # Utility functions
    └── server.js          # Server entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons for React
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database service

## 📧 Contact

Vashu Singh - [@Vashu](https://www.linkedin.com/in/vashu-singh-5b198020b/) - rajputvashusingh@gmail.com

Project Link: [https://github.com/vashu2003/HyperHive](https://github.com/vashu2003/HyperHive)
