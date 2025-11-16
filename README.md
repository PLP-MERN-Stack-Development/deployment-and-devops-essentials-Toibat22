# 🌐 MERN Blog Application

A full-stack MERN Blog Platform with authentication, blog post creation, categories, comments, image uploads, and a responsive modern UI.
Built as part of the PLP Full-Stack MERN & DevOps Module.

### Live Deployment: https://mern-blog-frontend-8lx3.onrender.com

## 🚀 Features
🔐 User Authentication

Register, Login, Logout

JWT-based authentication

Protected API routes

📝 Blog Posts

Create, edit, delete posts

Upload images using Cloudinary

Fetch all posts & single post details

📂 Categories

Create categories

Assign category to posts

Filter posts by category

💬 Comments

Add comments under a blog post

💨 Responsive Frontend

Styled with TailwindCSS

Mobile-friendly layout

## 🛠️ Tech Stack
#### Frontend

React (Vite)

React Router

Axios

TailwindCSS

#### Backend

Node.js

Express

MongoDB + Mongoose

Multer + Cloudinary for image uploads

JWT Authentication

Deployment

Render (Frontend + Backend)

GitHub

Environment Variables

## 📁 Project Structure

deployment-and-devops-essentials-Toibat22/
│
├── .github/               /
├── deployment/            /
├── monitoring/            /
├── .env.example
├── README.md
│
├── Backend/
│   ├── server.js
│   ├── package.json
│   │
│   ├── uploads/
│   │   ├── cloudinary.js
│   │   └── multer.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── categoryController.js
│   │   ├── postController.js
│   │   └── commentControllers.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── upload.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Category.js
│   │
│   └── routes/
│       ├── auth.js
│       ├── category.js
│       └── post.js
│
└── Frontend/
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vite.config.js
    ├── .env
    ├── public/
    │   ├── vite.svg
    │   └── _redirects
    │
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── App.css
        ├── index.css
        ├── Pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Home.jsx
        │   ├── CreatePost.jsx
        │   ├── EditPost.jsx
        │   ├── DeletePost.jsx
        |   ├── SinglePost.jsx
        │   └── PostDetails.jsx
        │
        ├── components/
        │   ├── Navbar.jsx
        │
        ├── context/
        │   └── UserContext.jsx|
        │
        └── services/
            └── api.js

## ⚙️ Environment Variables
Backend .env
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

Frontend .env
VITE_API_URL=https://your-backend-url.onrender.com/api

### 🧪 Running the Project Locally
Backend
cd Backend
pnpm install
pnpm start

Frontend
cd Frontend
pnpm install
pnpm run dev

## 🌍 Deployment

Both Frontend and Backend are deployed on Render.

Frontend Live URL:
👉 https://mern-blog-frontend-8lx3.onrender.com

## 👩🏽‍💻 About Me

Toibat Abdulhammed
Aspiring Full-Stack Developer | PLP Scholar
Passionate about design, software development, and continuous learning.

“I'm learning. I'm not stuck. I'm becoming a developer.” 💙✨