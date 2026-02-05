# Productr – Full Stack Product Management App

Productr is a full-stack web application built with **React, Node.js, Express, and MongoDB**.  
It allows users to manage products, publish/unpublish them, and authenticate using OTP-based login.

---

## Tech Stack

**Frontend**
- React
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- OTP based Authentication (Email)

## Project Structure
productr/
cliend/#Frontend(react)
server/#Backend(express)

## How to Run the Frontend

```bash
# Navigate to frontend folder
cd client

# Install dependencies
npm install

# Start the frontend server
npm run dev

## How to Run the Backend

# Navigate to backend folder
cd server

# Install dependencies
npm install

# Start the backend server
npm start


###Environment Variables -

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV = "development"

# Email / OTP Configuration - 
SENDER_EMAIL=your_email_address
SMTP_PASS=your_smtp_password
CLIENT_URL=http://localhost:5173
