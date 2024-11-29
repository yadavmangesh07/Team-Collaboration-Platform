# Team Collaboration Platform

This is a **Node.js** backend project that implements **Role-Based Access Control (RBAC)**, **Authentication**, and **Authorization** for a **Team Collaboration Platform**. It uses **Express.js** to handle HTTP requests, **MongoDB** (via MongoDB Atlas) for data storage, and **JSON Web Tokens (JWT)** for secure authentication.

## **Table of Contents**
1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installing](#installing)
   - [Running the Application](#running-the-application)
5. [API Documentation](#api-documentation)
6. [Project Structure](#project-structure)
7. [Environment Variables](#environment-variables)
8. [Security Considerations](#security-considerations)
9. [License](#license)
10. [Contributing](#contributing)

---

## **Overview**

The **Team Collaboration Platform** project implements a secure backend system where users can:
- Register with their roles (Admin, User, Moderator).
- Log in to obtain a JWT token.
- Access resources based on their assigned roles using **Role-Based Access Control (RBAC)**.

### **Core Features:**
1. **User Registration & Authentication**: Users can create accounts, authenticate using a username and password, and receive a token for access.
2. **Role-Based Access Control (RBAC)**: Different roles (Admin, User, Moderator) are created, and access to routes is granted based on the user’s role.
3. **Protected Routes**: Routes are secured using JWT, ensuring that only authenticated users can access them. Additionally, each role is restricted to certain routes.

---

## **Features**

- **User Registration**: A user can register with a **username**, **password**, and a **role** (Admin, User, Moderator).
- **User Login**: A user can log in using their **username** and **password**, receiving a **JWT token** for authenticated requests.
- **Role-Based Access Control (RBAC)**: Routes are protected based on the user’s role. For example:
  - **Admins** have access to all routes.
  - **Users** have limited access to personal data.
  - **Moderators** have access to manage content.
- **JWT Authentication**: Uses **JWT** to generate a token upon login. The token is then used to authenticate the user in subsequent requests.
- **Password Hashing**: User passwords are hashed using **bcryptjs** for security.

---

## **Technologies Used**

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (hosted on MongoDB Atlas)
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcryptjs
- **Environment Management**: dotenv for managing environment variables
- **API Documentation**: OpenAPI specifications

---

## **Getting Started**

### **Prerequisites**

- **Node.js** (version >= 16)
- **npm** (version >= 8)
- MongoDB account (MongoDB Atlas) for cloud database management
- A **JWT Secret Key** for securing authentication tokens

### **Installing**

Follow these steps to get the application up and running locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/team-collaboration-platform.git
   cd team-collaboration-platform

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   PORT=5001
   MONGODB_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret_key_here>
   ```
   Replace your_mongodb_uri_here with your MongoDB URI from MongoDB Atlas, and your_jwt_secret_key_here with a secret key of your choice (ensure it is complex and secure).

4. **Start server**:

   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5001`.

---

## **API Documentation**

The API is built around user registration, login, and protected routes based on role-based access control. Here's a summary of the endpoints:

1.**Register User**:

- **URL :** `/api/auth/register`
- **Method :** `POST`
- **Description :** Register a new user with a username, password, and role.
- **Request Body :**
  ```json
  {
    "username": "user1",
    "password": "password123",
    "role": "User"
  }
  ```
- **Response :**
  ```json
  {
    "message": "User registered successfully!"
  }
  ```
- **Error Response(e.g., username already taken) :**
  ```json
  {
    "error": "Username already exists!"
  }
  ```
2. **Login User**:

- **URL :** `/api/auth/login`
- **Method :** `POST`
- **Description :** Login a user with a username and password.
- **Request Body :**
  ```json
  {
    "username": "user1",
    "password": "password123"
  }
  ```
- **Response :**
  ```json
  {
    "message": "Login successful"

    }
    ```
- **Error Response(Invalid Credentials) :**
    ```json
    {
      "error": "Invalid credentials!"
    }
    ```
3.**Access Admin Route (Protected)**:

- **URL :** `/api/admin/admin-dashboard`
- **Method :** `GET`
- **Description :** Access a protected route for Admins only.
- **Headers :**
  ```json
  {
    "Authorization : Bearer <your_jwt_token_here>"

    }
    ```

- **Response :**
  ```json
  {
    "message": "Welcome, Admin!"
  }
  ```
- **Error Response(Not Authorized) :**
  ```json
  {
    "error": "Access denied. Insufficient permissions."
  }
  ```
4. **Access User Route (Protected)**:

- **URL :** `/api/user/user-dashboard`
- **Method :** `GET`
- **Description :** Access a protected route for Users only.

- **Headers :**
  ```json
  {
    "
    Authorization
    : Bearer
    <your_jwt_token_here>"
    }
    ```
- **Response :**

    ```json
    {
        "message": "Welcome, User!"
    }
    ```
- **Error Response(Not Authorized) :**
    ```json
    {
      "error": "Access denied. Insufficient permissions."
    }
    ```
5. **Access Moderator Route (Protected)**:

- **URL :** `/api/moderator/moderator-dashboard`

- **Method :** `GET`
- **Description :** Access a protected route for Moderators only.
- **Headers :**
  ```json
  {
    "
    Authorization
    : Bearer
    <your_jwt_token_here>"
    }
    ```
- **Response :**

    ```json
    {
        "message": "Welcome, Moderator!"
    }
    ```
- **Error Response(Not Authorized) :**
    ```json
    {
      "error": "Access denied. Insufficient permissions."
    }
    ```
---
## **Project Structure**

The project structure is organized into different directories for better code management:

```plaintext
team-collaboration-platform/
│
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection setup
│   ├── controllers/           # Request handler functions
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/            # Middleware functions
│   │   ├── authMiddleware.js  # Verify JWT token
│   │   └── roleMiddleware.js  # Check user role
│   ├── models/                # MongoDB models
│   │   ├── User.js
│   ├── routes/                # API routes
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   ├── server.js              # Express app setup
├── .env                       # Environment variables
├── package.json
├── README.md
```
---
## **Environment Variables**

The following environment variables are used in this project:

- **PORT**: Port on which the server will run (default is 5001).
- **MONGO_URI**: MongoDB connection string (get it from MongoDB Atlas).
- **JWT_SECRET**: A secret key for signing JWT tokens. (Keep this safe and private).

---
## **Security Considerations**

  - **Password Hashing**: The password is hashed using bcryptjs before being saved to the database to ensure password security.
  - **JWT Authentication**: JWT is used for authentication, and tokens are sent in the Authorization header in protected routes.
  - **Environment Variables**: Sensitive data, such as the MongoDB URI and JWT secret key, is stored in the .env file and kept secure.
---
## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
## **Contributing**

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find a bug or want to suggest a new feature.


