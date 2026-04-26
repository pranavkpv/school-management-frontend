# School Management Frontend

Frontend for the School Management System built with Next.js.

## Repository

```bash
git clone https://github.com/pranavkpv/school-management-frontend.git
cd school-management-frontend
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

This connects the frontend to the backend API.

---

## Run Development Server

```bash
npm run dev
```

Open:

http://localhost:3000

---

## Backend Requirement

Make sure the backend server is running at:

```bash
http://localhost:5000
```

If your backend runs on a different port, update:

```env
NEXT_PUBLIC_API_BASE_URL=your-backend-url
```

---

## Features

- Student Login
- Admin Dashboard
- Student Management
- Class Management
- Fee Collection
- Pending Fee Payments
- Role-Based Access Control
- Cookie-based Authentication

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- ShadCN UI

---

## Project Structure

```bash
app/
components/
api/
public/
```

---

## Start Project (Quick Setup)

```bash
git clone https://github.com/pranavkpv/school-management-frontend.git

cd school-management-frontend

npm install

# create .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

npm run dev
```

---

## Important

Do not commit:

```bash
.env.local
node_modules
.next
```

Make sure `.gitignore` includes them.

---

## Author

Pranav Raj K P V