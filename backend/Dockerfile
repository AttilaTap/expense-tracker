# Build stage for backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy backend project file and restore dependencies
COPY backend/*.csproj ./backend/
RUN dotnet restore backend/*.csproj

# Copy backend source code and publish
COPY backend/ ./backend/
RUN dotnet publish backend/*.csproj -c Release -o /publish

# Build stage for frontend
FROM node:20 AS frontend-build
WORKDIR /frontend

# Install frontend dependencies and build
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Install curl (if not already present)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy wait-for-it-curl.sh script
COPY wait-for-it-curl.sh /wait-for-it-curl.sh
RUN chmod +x /wait-for-it-curl.sh

# Copy backend published output
COPY --from=build /publish .

# Copy frontend built static files into backend wwwroot
COPY --from=frontend-build /frontend/dist ./wwwroot

# Expose backend port
EXPOSE 8080

# Start backend after the database is available
ENTRYPOINT ["/wait-for-it-curl.sh", "expense-tracker-db", "3306", "--", "dotnet", "backend.dll"]
