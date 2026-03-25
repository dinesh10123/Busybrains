# E-commerce Portfolio Application

A full-stack application built with React, Spring Boot, and MySQL. Features include JWT authentication, OAuth2 SSO, Role-Based Access Control (RBAC), and product management.

## Features
- **Authentication**: JWT-based login/registration and Google SSO (OAuth2).
- **RBAC**: 
  - `Admin`: Can view, add, and delete products.
  - `User`: Can only view products.
- **Product Management**: Dashboard with a premium glassmorphic UI.
- **Profile Management**: View account details and change password.

## Tech Stack
- **Frontend**: React, Axios, React Router, Vanilla CSS.
- **Backend**: Spring Boot 3, Spring Security, Spring Data JPA, Hibernate.
- **Database**: MySQL.

## Setup Instructions

### Backend (Spring Boot)
1. **Database Setup**:
   - Create a MySQL database named `ecommerce_db`.
   - Update `src/main/resources/application.properties` with your MySQL username and password.
2. **OAuth2 Setup (Optional)**:
   - To enable Google SSO, add your `client-id` and `client-secret` in `application.properties`.
3. **Run**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   The server will start at `http://localhost:8080`.

### Frontend (React)
1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```
2. **Run**:
   ```bash
   npm start
   ```
   The application will be accessible at `http://localhost:3000`.

## Predefined Users
- **Admin**:
  - Username: `admin`
  - Password: `admin123`
- **User**:
  - Username: `user`
  - Password: `user123`

## API Endpoints
- `POST /api/auth/signin`: Login and receive JWT.
- `POST /api/auth/signup`: Register new user.
- `GET /api/products`: View all products (Public/Authorized).
- `POST /api/products`: Add product (Admin Only).
- `DELETE /api/products/{id}`: Delete product (Admin Only).
- `GET /api/user/profile`: View profile.
- `POST /api/user/change-password`: Change password.

## Project Structure
- `backend/`: Spring Boot source code.
- `frontend/`: React source code.
- `task.md`: Development task list.
- `implementation_plan.md`: Technical design document.
