# Expense Tracker

![Build](https://github.com/AttilaTap/expense-tracker/actions/workflows/ci.yml/badge.svg)

A full-stack Expense Tracker application with **React + .NET 8 + MySQL**, built for modern web experience with complete **CI/CD automation**, **testing**, and **Docker** support.

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

| Frontend | Backend | Database | DevOps |
|:--|:--|:--|:--|
| React 18 (Vite) | .NET 8 Web API | MySQL 8 | GitHub Actions |
| Tailwind CSS | Entity Framework Core |  | Docker |

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
