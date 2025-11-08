# Cognito – AI Chat Platform

Cognito is a full-stack AI chat platform that allows users to sign up, log in, and interact with an AI assistant powered by Google Gemini. It includes secure authentication, a modern responsive frontend, and a Node.js backend integrated with MongoDB. The application is deployed with the backend hosted on Render and the frontend on Vercel.

**Live Demo**: [https://wanderlust-ljm7.onrender.com](https://cognito-01.vercel.app/)

![Portfolio Preview](https://i.postimg.cc/Y2mn7kgS/Screenshot-2025-11-08-142744.png)
---

## Overview

- Secure user authentication with JWT and bcrypt
- Real-time chat interface powered by Gemini API
- Full-stack integration using React (Vite) and Node.js (Express)
- Cloud-hosted MongoDB database
- Environment-based configuration for flexible deployment
- Deployed architecture:
  - Frontend: [Vercel Deployment](https://cognito-01.vercel.app/)
  - Backend: [Render API](https://cognito-backend-igvt.onrender.com/health)

---

## Tech Stack

| Layer | Technology |
| ------ | ----------- |
| Frontend | React (Vite), Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| AI Service | Google Gemini API |
| Authentication | JWT, bcrypt |
| Deployment | Render (backend), Vercel (frontend) |

---

## Project Structure

```
Cognito/
│
├── Backend/
│ ├── routes/
│ │ ├── auth.js
│ │ └── chat.js
│ ├── models/
│ │ └── User.js
│ ├── server.js
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Signup.jsx
│ │ ├── ChatWindow.jsx
│ │ └── main.jsx
│ ├── public/
│ ├── vite.config.js
│ └── .env
│
└── README.md
```
