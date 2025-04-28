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

## 🔐 Authentication Setup

### Google Authentication

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials > Create Credentials > OAuth Client ID
5. Configure the OAuth consent screen:
   - Add authorized domains
   - Set application type to "Web application"
   - Add authorized redirect URIs:
     - For development: `http://localhost:8080/api/auth/google-callback`
     - For production: `https://your-domain.com/api/auth/google-callback`
6. Note your Client ID and Client Secret

### Environment Configuration

Create a `.env` file in the root directory:

```env
# Google OAuth
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here

# JWT (generate a strong key for production!)
JWT__KEY=your_jwt_key_here

# Database (change these in production!)
MYSQL_ROOT_PASSWORD=your_secure_password
DB_CONNECTION_STRING=server=expense-tracker-db;port=3306;database=expense_tracker_db;user=root;password=your_secure_password
```

⚠️ **IMPORTANT: Never commit your `.env` file to version control!**

## ⚠️ Security Considerations

### This is a Hobby/Demo Project

This project is intended for learning and demonstration purposes. While it implements basic security measures, it may not meet all requirements for a production environment.

### Known Security Considerations:

1. **Database Security:**

   - Current setup uses MySQL root user (not recommended for production)
   - Database password is exposed in docker-compose.yml
   - Consider using:
     - Dedicated database users with limited permissions
     - Secure password management solutions
     - Database encryption at rest

2. **JWT Configuration:**

   - JWT key is stored in environment variables
   - In production, use:
     - Secure key management services (e.g., Azure Key Vault, AWS KMS)
     - Regular key rotation
     - Longer, cryptographically secure keys

3. **Google OAuth:**

   - Restrict Google OAuth credentials to specific domains
   - Regularly review OAuth consent screen settings
   - Monitor OAuth usage for suspicious activities

4. **Docker Security:**
   - Current setup exposes database port (3307)
   - In production:
     - Limit exposed ports
     - Use Docker secrets
     - Implement container security scanning
     - Regular security updates

### Recommendations for Production Use:

1. **Environment:**

   - Use proper CI/CD secrets management
   - Implement proper logging and monitoring
   - Set up SSL/TLS certificates
   - Use reverse proxy (e.g., Nginx)

2. **Authentication:**

   - Implement rate limiting
   - Add MFA support
   - Session management
   - Password complexity requirements

3. **Data Protection:**

   - Implement data backup strategy
   - Add audit logging
   - Consider data encryption
   - Implement proper data retention policies

4. **Network:**
   - Use private Docker networks
   - Implement proper firewalls
   - Regular security audits
   - DDoS protection

## 🔄 Updates and Maintenance

This project is maintained on a best-effort basis. While we strive to:

- Keep dependencies updated
- Fix security vulnerabilities
- Address major bugs

We cannot guarantee:

- Immediate security patches
- Production-level support
- Regular feature updates

Please fork and enhance security measures as needed for your use case.

---
