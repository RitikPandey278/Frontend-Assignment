# Frontend Developer Assignment

## Tech Stack

Frontend:
- React.js
- TailwindCSS

Backend:
- Node.js
- Express.js
- MongoDB Atlas

## Features

.User Signup & Login (JWT Authentication)

.Protected Dashboard

.User Profile

.CRUD Tasks

.Search Tasks

.Logout

.Responsive UI


## Backend Setup

cd backend

npm install

npm start


## Frontend Setup

cd frontend/client

npm install

npm run dev


## API Routes

POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile

GET /api/tasks

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id


## Scaling Strategy

For production:

- Frontend deployed on Netfily
- Backend deployed on Render
- MongoDB Atlas Database
- Load Balancer
- Docker containers
- Redis caching