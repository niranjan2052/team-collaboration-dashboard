# Team Collaboration Dashboard (Next.js + Node.js + PostgreSQL + MongoDB + S3)

A Trello-like collaboration platform built as a showcase project for a mid-level MERN/Next.js full-stack role.

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
