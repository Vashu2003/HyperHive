# HyperHive Tutorial

## Project Setup

1.  **Create a new Vite + React project:**

    ```bash
    npm create vite@latest hyperhive --template react-ts
    cd hyperhive
    ```
2.  **Install dependencies:**

    ```bash
    npm install
    ```
3.  **Install TailwindCSS:**

    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    ```

    Configure `tailwind.config.js`:

    ```javascript
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    }
    ```

    Add Tailwind directives to `src/index.css`:

    ```css
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    ```

    Import the CSS file in `src/main.jsx`:

    ```javascript
    import './index.css';
    ```

    Now TailwindCSS v4.1 is fully functional!

4.  **User Authentication**

    **Backend:**

    *   Create User model.
    *   Routes for register/login.
    *   Hash passwords with bcrypt.
    *   Return JWT tokens on login.

    **Frontend:**

    *   Forms for signup/login.
    *   Save JWT in localStorage.
    *   Protect dashboard routes.

5.  **Group System**

    **Backend:**

    *   Group model (name, members, createdBy).
    *   Routes to create/join group.

    **Frontend:**

    *   Group dashboard.
    *   Invite links to join groups.
    *   List of members per group.

6.  **Task Management**

    **Backend:**

    *   Task model (title, description, assignedTo, dueDate, status, groupId).
    *   CRUD API for tasks.

    **Frontend:**

    *   Create/update/delete tasks.
    *   Assign tasks to users.
    *   Task status management (To Do, In Progress, Done).

7.  **Notes Upload & Display**

    **Backend:**

    *   Use Multer + Cloudinary for file uploads.
    *   Note model to save URLs and metadata.

    **Frontend:**

    *   File upload forms.
    *   Notes list with preview/download options.

8.  **UI/UX Improvements**

    *   Responsive design using TailwindCSS 4.1.
    *   Animated modals for creating groups, tasks.
    *   Toast notifications for actions (success, error).
    *   Mobile friendly layouts.

9.  **Real-Time Features**

    *   Integrate Socket.IO.
    *   Real-time chat in group.
    *   Real-time notifications for task updates and group activity.

10. **Admin Tools**

    *   Admin dashboard for group creators.
    *   Remove members, assign admin roles.
    *   Group deletion options.

11. **Deployment**

    *   Host backend on Render or Railway (free).
    *   Host frontend on Vercel or Netlify.
    *   Use environment variables securely.

12. **Optional Features**

    *   Dark mode toggle (Tailwind makes it easy).
    *   Calendar view for deadlines.
    *   GitHub OAuth login integration.
    *   Share public notes (outside group).