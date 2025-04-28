# --- Build frontend ---
    FROM node:20 AS frontend-build
    WORKDIR /frontend
    
    # Use frozen lockfile so installs are repeatable
    COPY frontend/package*.json ./
    RUN npm ci
    
    COPY frontend/ ./
    RUN npm run build
    
    # --- Build backend ---
    FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
    WORKDIR /src
    
    # Restore & publish
    COPY backend/*.csproj ./backend/
    RUN dotnet restore backend/backend.csproj
    
    COPY backend/. ./backend/
    WORKDIR /src/backend
    RUN dotnet publish -c Release -o /app
    
    # --- Final image ---
    FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
    WORKDIR /app
    
    # Expose ASP.NET Core port
    ENV ASPNETCORE_URLS=http://+:8080
    EXPOSE 8080
    
    # Install only curl for simple health checks (if you need them)
    RUN apt-get update \
     && apt-get install -y --no-install-recommends curl \
     && rm -rf /var/lib/apt/lists/*
    
    # Copy published backend
    COPY --from=backend-build /app ./
    
    # Copy static frontend build into wwwroot
    COPY --from=frontend-build /frontend/dist ./wwwroot
    
    ENTRYPOINT ["dotnet", "backend.dll"]
    