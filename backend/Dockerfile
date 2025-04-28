# Build stage for backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy backend project
COPY backend/*.csproj ./backend/
RUN dotnet restore backend/*.csproj

# Copy backend source code
COPY backend/ ./backend/
RUN dotnet publish backend/*.csproj -c Release -o /publish

# Build stage for frontend
FROM node:20 AS frontend-build
WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Copy wait-for-it script
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copy backend build
COPY --from=build /publish .

# Copy frontend build into backend's wwwroot
COPY --from=frontend-build /frontend/dist ./wwwroot

# Expose port
EXPOSE 8080

# DO NOT set ENTRYPOINT here.
# It will be set in docker-compose.yml
