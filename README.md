# TrackDeck

**TrackDeck** is a full-stack MERN application designed to streamline
the management of your online purchases across multiple e-commerce
platforms. It centralizes order tracking, refund monitoring, and review
management into a single, secure dashboard.

------------------------------------------------------------------------

## 🚀 Overview

Managing orders across platforms like Amazon, Flipkart, and Meesho can
quickly become chaotic. TrackDeck eliminates the need for spreadsheets
and manual tracking by providing:

-   Unified order tracking
-   Refund and deadline monitoring
-   Review management
-   Actionable insights and summaries

------------------------------------------------------------------------

## ✨ Features

### 📦 Order Tracking

-   Track orders from multiple e-commerce platforms in one place
-   Store product links, delivery status, and order details

### 📊 Smart Insights

-   View summaries of orders, refunds, and pending actions
-   Identify trends and track performance over time

### 🔒 Secure Dashboard

-   User authentication and protected routes
-   Data privacy ensured with secure backend practices

### ⏰ Deadline Management

-   Never miss refund windows or review deadlines
-   Visualize important dates efficiently

### 🧾 Reviews & Ratings

-   Track submitted and pending product reviews
-   Maintain consistency in feedback workflows

------------------------------------------------------------------------

## 🏗️ Tech Stack

### Frontend (React + Vite)

-   React 19
-   Redux Toolkit + Redux Persist
-   Material UI (MUI)
-   React Router v7
-   Axios
-   React Hook Form
-   Framer Motion
-   Date-fns

### Backend (Node.js + Express)

-   Express.js
-   MongoDB + Mongoose
-   JWT Authentication
-   Bcrypt (password hashing)
-   Cloudinary (media storage)
-   Nodemailer (email services)
-   Express Validator
-   Rate Limiting

------------------------------------------------------------------------

## 📁 Project Structure

### Frontend

    src/
      components/
      constants/
      features/
      hooks/
      pages/
      routes/
      utils/
      App.jsx
      main.jsx
      store.jsx

### Backend

    config/
    controllers/
    middlewares/
    models/
    routes/
    utils/
    app.js
    server.js

------------------------------------------------------------------------

## ⚙️ Environment Variables

### Backend (.env)

    PORT=
    CORS_ORIGIN=
    DB_USERNAME=
    MONGODB_COMPASS_CONECTION_STRING=
    MONGO_URI=
    MONGO_URI_PROD=
    DB_NAME=
    ACCESS_TOKEN_SECRET=
    ACCESS_TOKEN_EXPIRY=
    REFRESH_TOKEN_SECRET=
    REFRESH_TOKEN_EXPIRY=
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY=
    CLOUDINARY_API_SECRET=
    BASE_URL=
    BREVO_SMTP_USER=
    BREVO_SMTP_PASS=
    BREVO_SENDER_EMAIL=

------------------------------------------------------------------------

## 🛠️ Installation & Setup

### 1. Clone the Repository

    git clone <repository-url>
    cd trackdeck

### 2. Setup Backend

    cd backend
    npm install
    npm run dev

### 3. Setup Frontend

    cd frontend
    npm install
    npm run dev

------------------------------------------------------------------------

## 🔐 Security Considerations

-   Passwords are hashed using bcrypt
-   JWT-based authentication for protected routes
-   Rate limiting to prevent abuse
-   Input validation using express-validator
-   Secure cookie handling

------------------------------------------------------------------------

## 📈 Future Enhancements

-   Multi-platform API integrations (Amazon, Flipkart, etc.)
-   Notification system (email/SMS reminders)
-   Advanced analytics dashboard
-   Mobile application support

------------------------------------------------------------------------

## 🤝 Contribution

Contributions are welcome. Please follow standard Git workflow:

1.  Fork the repository
2.  Create a feature branch
3.  Commit changes
4.  Open a pull request

------------------------------------------------------------------------

## 👨‍💻 Author

Developed by Akshay Anand

------------------------------------------------------------------------

## 💡 Final Note

TrackDeck is built to bring structure, reliability, and clarity to your
e-commerce tracking workflow. Whether for personal use or client
management, it ensures you stay organized and never miss critical
actions.
