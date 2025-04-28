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

# Copy backend build
COPY --from=build /publish .

# Copy frontend build into backend's wwwroot
COPY --from=frontend-build /frontend/dist ./wwwroot

# Expose port
EXPOSE 8080

ENTRYPOINT ["dotnet", "backend.dll"]
