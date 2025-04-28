# Expense Tracker

A modern, full-stack expense tracking application built with React and ASP.NET Core. This application helps users manage their personal finances by tracking expenses across different categories.

## Features

- 🔐 Secure user authentication using JWT
- 💰 Track expenses with amount, description, and date
- 📊 Categorize expenses for better organization
- 📱 Responsive design that works on desktop and mobile
- 🔄 Real-time updates using modern web technologies
- 🎨 Clean and intuitive user interface

## Tech Stack

### Frontend

- React with TypeScript
- Vite for build tooling
- Modern CSS with responsive design
- Secure JWT token handling

### Backend

- ASP.NET Core 8.0
- Entity Framework Core
- MySQL Database
- JWT Authentication
- Swagger/OpenAPI documentation

### Infrastructure

- Docker containerization
- Docker Compose for orchestration
- GitHub Actions for CI/CD
- MySQL 8.0 for data persistence

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- .NET SDK 8.0 (for local development)
- Git

## Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/expense-tracker.git
   cd expense-tracker
   ```

2. Start the application using Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Access the application:
   - Web Interface: http://localhost:8080
   - API Documentation: http://localhost:8080/swagger
   - Database Port: 3307 (mapped from container's 3306)

## Development Setup

### Frontend (React + TypeScript)

```bash
cd frontend
npm install
npm run dev
```

### Backend (ASP.NET Core)

```bash
cd backend
dotnet restore
dotnet watch run
```

### Database

The MySQL database is automatically configured through Docker Compose with:

- Database Name: expense_tracker_db
- Port: 3307 (host) -> 3306 (container)
- Default Root Password: See docker-compose.yml

## Environment Variables

### Backend

- `DB_CONNECTION_STRING`: MySQL connection string
- `ASPNETCORE_ENVIRONMENT`: Application environment
- `Jwt__Key`: JWT signing key for authentication

### Database

- `MYSQL_ROOT_PASSWORD`: Root password for MySQL
- `MYSQL_DATABASE`: Database name

## API Documentation

The API documentation is available through Swagger UI at `/swagger` when the application is running. Key endpoints include:

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate and receive JWT token
- `GET /api/expenses`: List all expenses
- `POST /api/expenses`: Create a new expense
- `GET /api/categories`: List all categories
- `POST /api/categories`: Create a new category

## Security

- JWT authentication for API security
- Password hashing for user credentials
- CORS policy configuration
- Environment-based secrets management
- Database connection retry mechanism

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- ASP.NET Core team for the excellent web framework
- React team for the frontend framework
- All contributors who have helped with the project

---

## 🚀 Features

- 🔐 User authentication (username/password + Google login)
- 📁 Category management (create/delete categories)
- 💵 Create and filter transactions by category
- 📈 Visualize expenses with dynamic pie charts
- 🌗 Light/Dark mode switch
- 🛡️ Backend and frontend unit testing
- 🧹 Frontend linting with ESLint
- 🐳 Dockerized backend + built-in frontend hosting
- 🔄 Full CI/CD pipeline with GitHub Actions (build, test, lint, docker)

---

## 🛠️ Tech Stack

| Frontend        | Backend               | Database | DevOps         |
| :-------------- | :-------------------- | :------- | :------------- |
| React 18 (Vite) | .NET 8 Web API        | MySQL 8  | GitHub Actions |
| Tailwind CSS    | Entity Framework Core |          | Docker         |

---

## ⚙️ Running Locally

1. **Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

2. **Start MySQL Database**

```bash
docker run --name expense-tracker-db -e MYSQL_ROOT_PASSWORD=root1234 -e MYSQL_DATABASE=expense_tracker_db -p 3306:3306 -d mysql:8.0
```

3. **Run Backend**

```bash
cd backend
dotnet run
```

_(Backend will serve API and also host the frontend from wwwroot)_

4. **Run Frontend Development Server (optional)**

```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Running Tests

### Backend Tests

```bash
cd backend.Tests
dotnet test
```

### Frontend Tests

```bash
cd frontend
npm run test
```

---

## 🛡 Linting Frontend

```bash
cd frontend
npm run lint
```

---

## 📦 Building Docker Image

```bash
docker build -t expense-tracker-app -f backend/Dockerfile .
```

---

## ✅ CI/CD Pipeline

- Triggered on **push** or **pull request** to `main` branch
- Automatically:
  - Builds backend
  - Tests backend
  - Builds frontend
  - Tests frontend
  - Lints frontend
  - Builds Docker image

---

## 📒 Project Structure

```
backend/            # .NET 8 Web API
backend.Tests/      # NUnit backend unit tests
frontend/           # React 18 frontend with Vite
.github/workflows/  # GitHub Actions CI/CD pipeline
docker-compose.yml  # (Optional for DB + App orchestration)
Dockerfile          # Backend + frontend Docker build
expense-tracker.sln # Solution file for .NET
```

---
