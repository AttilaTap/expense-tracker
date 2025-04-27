# Use the official .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set working directory
WORKDIR /app

# Copy backend project
COPY backend/*.csproj ./backend/
RUN dotnet restore backend/*.csproj

# Copy the backend source code
COPY backend/ ./backend/

# Build the backend
RUN dotnet publish backend/*.csproj -c Release -o /publish

# Now build the frontend separately
FROM node:20 AS frontend-build

WORKDIR /frontend

# Copy frontend project
COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# Final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

WORKDIR /app

# Copy backend build from previous stage
COPY --from=build /publish .

# Copy frontend build into backend's wwwroot
COPY --from=frontend-build /frontend/dist ./wwwroot

# Expose port
EXPOSE 5000

# Run the backend
ENTRYPOINT ["dotnet", "backend.dll"]
