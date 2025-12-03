# Team Collaboration Dashboard (Next.js + Node.js + PostgreSQL + MongoDB)

A full-stack MERN + MySQL + MongoDB application designed for managing projects, tasks, comments, attachments, and team collaboration in a Kanban-style workflow.

This app is similar to **Trello, Asana, and Jira (simplified)** and is built using a professional multi-layer architecture used in real production environments.

## Tech Stack

- Frontend: Next.js, React, TypeScript, TailwindCSS, Zustand
- Backend: Node.js, Express, TypeScript
- Databases:
  - PostgreSQL (users, projects, tasks, comments, attachments)
  - MongoDB (activity logs, notifications)
- Storage: AWS S3 for file uploads
- Auth: JWT (access + refresh tokens)
- Other: react-beautiful-dnd for drag-and-drop

## Features

- User registration and login
- Project management (create, update, delete projects)
- Kanban-style task board (To Do, In Progress, Done)
- Drag-and-drop tasks between columns
- Task details: assignee, due date, description
- Comments on tasks
- File attachments stored in AWS S3
- Activity logs and notifications stored in MongoDB
- Responsive UI

## Project Structure

- `/frontend` – Next.js app
- `/backend` – Express API server

## Running Locally

### 1. Backend

```bash
cd backend
cp .env.example .env    # fill DB, MONGO, S3, JWT configs
npm install
npm run dev

```


### 🔐 Authentication & User Management
- Register / Login with JWT Authentication  
- Access Token + Refresh Token system  
- Secure password hashing (bcrypt)  
- Get logged-in user's profile  

---

### 📁 Project Management
- Create, update, delete projects  
- Add members with roles (OWNER, ADMIN, MEMBER)  
- View all projects for logged-in user  

---

### 📝 Task Management (Kanban)
- Create tasks inside projects  
- Update task details (title, description, due date, assignee)  
- Move tasks between columns (drag and drop logic)  
- Reorder tasks inside columns  
- Delete tasks  
- Handles large number of tasks efficiently  

---

### 💬 Comments
- Add comments to tasks  
- Fetch all comments in a task  
- Automatic timestamping  

---

### 📎 Attachments
- Upload and delete file attachments  
- Uses multer for temp storage  
- AWS S3 mode fully supported  
- **AWS disabled mode** (safe fallback when no S3 credentials)  

---

### 🔔 Notifications (MongoDB)
- Task assignment notifications  
- Project member notifications  
- Comment notifications  
- Read/unread state  

---

### 📜 Activity Log (MongoDB)
- History of actions (task created, updated, moved, commented, etc.)  
- Stores timeline per project & task  

---

## 🧱 Architecture

Next.js / React (Frontend)
|
Node.js + Express + TypeScript (Backend)
|

| | |
MySQL (Prisma ORM) MongoDB (Mongoose)
AWS S3 (optional)


---

## 📦 Tech Stack

### **Frontend**
- React or Next.js  
- TailwindCSS  
- Zustand / Redux (optional)

### **Backend**
- Node.js  
- Express  
- TypeScript  
- Prisma ORM  
- Zod Validation  
- JWT Authentication  

### **Databases**
- **MySQL** → Structured project data  
- **MongoDB** → Logs & notifications  

### **Storage**
- AWS S3 (optional — currently disabled mode implemented)  
- Multer for local temp handling  

---

# 📁 Folder Structure (Backend)

src/
├── config/
│ ├── db.ts
│ ├── mongo.ts
│ └── aws.ts (S3 optional)
│
├── routes/
│ ├── authRoutes.ts
│ ├── projectRoutes.ts
│ ├── taskRoutes.ts
│ ├── commentRoutes.ts
│ ├── attachmentRoutes.ts
│ ├── notificationRoutes.ts
│ └── index.ts
│
├── controllers/
├── services/
├── middleware/
├── validation/
├── utils/
├── mongo/
└── prisma/


This follows a **service-controller-route** layered architecture.

---

# 🗃️ Database Schema (MySQL via Prisma)

### Main tables:

- `users`  
- `projects`  
- `project_members`  
- `task_columns`  
- `tasks`  
- `task_comments`  
- `attachments`  
- `refresh_tokens`  

### MongoDB collections:
- `activity_logs`
- `notifications`

This hybrid SQL + NoSQL design matches modern enterprise apps (Notion, Jira, Slack).

---

# 🔧 Environment Variables

Create a `.env` file:

```env
DATABASE_URL=mysql://root:password@localhost:3306/team_dashboard
JWT_SECRET=your-secret-key
REFRESH_SECRET=your-refresh-secret

# AWS optional — leave empty to disable
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
AWS_REGION=
AWS_S3_BUCKET=

