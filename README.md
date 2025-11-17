**Cognito - AI Chat Platform**
---
## Overview

Cognito is a full-stack AI chat platform that enables users to have intelligent conversations with Google Gemini AI. The application features secure authentication, persistent chat history, and a clean, responsive interface optimized for all devices.

<div align="center">
  
**A modern AI chat application powered by Google Gemini**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://cognito-01.vercel.app)

![Cognito Banner](https://i.postimg.cc/mg3F7FpL/Screenshot_2025_11_16_160705.png)
![Cognito Banner](https://i.postimg.cc/W4B3KNHx/Screenshot_2025_11_16_161152.png)

</div>

**Live Application**: [https://cognito-01.vercel.app/](https://cognito-01.vercel.app/)

---

## Key Features

-   **AI-Powered Conversations**: Integration with Google Gemini 2.5 Flash.
-   **Voice Input**: Hands-free messaging using the browser's built-in Speech Recognition API.
-   **Secure Authentication**: JWT-based auth with encrypted passwords using Bcrypt.
-   **Thread Management**: Create, view, delete, and organize multiple conversations.
-   **Persistent Storage**: All conversations are saved to a MongoDB cloud database.
-   **Dynamic Animated UI**: Features a beautiful, animated aurora background powered by WebGL (ogl).
-   **Markdown Support**: Renders AI responses with rich text formatting and syntax-highlighted code blocks.
-   **Real-time Responses**: Fast API integration with loading indicators from `react-spinners`.
-   **Responsive Design**: Works seamlessly on desktop, tablet, and mobile.

---

## Tech Stack

### Frontend
-   React 19 with Vite
-   React Router for navigation
-   React Markdown for message rendering
-   **ogl**: WebGL library for the animated `DarkVeil` background.
-   **react-spinners**: For loading animations.
-   **uuid**: For client-side generation of new thread IDs.
-   Modern CSS with responsive design

### Backend
- Node.js & Express
- MongoDB with Mongoose ODM
- JWT for authentication
- Bcrypt for password security

### Services
- Google Gemini API for AI responses
- MongoDB Atlas for cloud database
- Vercel (Frontend hosting)
- Render (Backend hosting)

---

## Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────────┐
│                 │         │                  │         │                 │
│  React Frontend │ ◄─────► │  Express Backend │ ◄─────► │  MongoDB Atlas  │
│  (Vercel)       │  REST   │  (Render)        │  CRUD   │  (Database)     │
│                 │   API   │                  │         │                 │
└─────────────────┘         └──────────────────┘         └─────────────────┘
                                     │
                                     │ API Call
                                     ▼
                            ┌──────────────────┐
                            │                  │
                            │  Google Gemini   │
                            │  AI Service      │
                            │                  │
                            └──────────────────┘
```

The application follows a modern three-tier architecture with a React frontend, RESTful API backend, and cloud-hosted database. AI responses are generated through Google's Gemini API.

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- Google Gemini API key

### Installation

1. **Clone and install dependencies**
```bash
# Backend
cd Backend
npm install

# Frontend
cd frontend
npm install
```

2. **Configure environment variables**

Backend `.env`:
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Frontend `.env`:
```env
VITE_BACKEND_URL=http://localhost:8080
```

3. **Run the application**
```bash
# Backend (from Backend directory)
npm start

# Frontend (from frontend directory)
npm run dev
```

Access the app at `http://localhost:5173`

---

## 📡 API Overview

### Authentication
- `POST /auth/signup` - Create new account
- `POST /auth/login` - Login and receive JWT token
- `GET /auth/logout` - Logout user

### Chat Operations
- `GET /api/thread` - Get all user threads
- `GET /api/thread/:threadId` - Get specific thread messages
- `POST /api/chat` - Send message and get AI response
- `DELETE /api/thread/:threadId` - Delete a thread

All protected routes require JWT token in Authorization header.

---

## Project Structure

```
Cognito/
├── Backend/
│   ├── middleware/
│   │   └── auth.js                   # JWT authentication middleware
│   ├── models/
│   │   ├── User.js                   # User schema
│   │   └── Thread.js                 # Thread & Message schemas
│   ├── routes/
│   │   ├── auth.js                   # Authentication routes
│   │   └── chat.js                   # Chat & thread routes
│   ├── utils/
│   │   └── gemini.js                 # Gemini API integration
│   ├── server.js                     # Express server setup
│   ├── package.json                  # Backend dependencies
│   └── .env                          # (Example, not uploaded)
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── cognito.png           # Static assets
│   │   ├── components/
│   │   │   ├── AuthLayout/
│   │   │   │   └── AuthLayout.jsx    # Wrapper for auth pages
│   │   │   ├── AuthNavbar/
│   │   │   │   ├── AuthNavbar.jsx    # Navbar for auth pages
│   │   │   │   └── AuthNavbar.css    # Styles for AuthNavbar
│   │   │   ├── Chat/
│   │   │   │   ├── Chat.jsx          # Message display component
│   │   │   │   └── Chat.css          # Chat component styles
│   │   │   ├── ChatWindow/
│   │   │   │   ├── ChatWindow.jsx    # Main chat interface
│   │   │   │   └── ChatWindow.css    # ChatWindow styles
│   │   │   ├── DarkVeil/
│   │   │   │   ├── DarkVeil.jsx      # Aurora background animation
│   │   │   │   └── DarkVeil.css      # Styles for DarkVeil
│   │   │   └── Sidebar/
│   │   │       ├── Sidebar.jsx       # Thread history sidebar
│   │   │       └── Sidebar.css       # Sidebar styles
│   │   ├── context/
│   │   │   └── MyContext.jsx         # React Context API
│   │   ├── pages/
│   │   │   ├── Login.jsx             # Login page
│   │   │   └── Signup.jsx            # Signup page
│   │   ├── routes/
│   │   │   └── Router.jsx            # Route configuration
│   │   ├── styles/
│   │   │   ├── App.css               # Global app styles
│   │   │   └── Auth.css              # Shared authentication styles
│   │   ├── App.jsx                   # Main app component
│   │   ├── main.jsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── public/
│   │   └── cognito.png               # Favicon
│   ├── .gitignore                    # Frontend gitignore
│   ├── eslint.config.js              # ESLint configuration
│   ├── index.html                    # HTML entry point
│   ├── vite.config.js                # Vite configuration
│   ├── vercel.json                   # Vercel routing config
│   └── package.json                  # Frontend dependencies
│
├── .gitignore                        # Root gitignore
└── README.md                         # Project documentation

```
---

## Deployment

- **Frontend**: Deployed on Vercel with automatic GitHub integration
- **Backend** : Hosted on Render with Node.js environment
- **Database**: MongoDB Atlas cloud database

---

## License

This project is developed for educational and portfolio purposes.

---

## Developer

**Made with ❤️ by Darsh**

---

<div align="center">

*Cognito - Your intelligent chat companion*

</div>
