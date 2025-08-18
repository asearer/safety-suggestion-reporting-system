# Safety Suggestions Reporting System

> **🚧 This project is an active work in progress. Features, structure, and documentation are evolving rapidly. Contributions and feedback are welcome! 🚧**

This project is a **scalable, modern platform** for reporting and tracking safety suggestions. It includes:

- A **backend** (TypeScript + Node.js + Prisma + PostgreSQL)
- A **web dashboard** (React + TypeScript)
- A **mobile app** (React Native + TypeScript)
- **Shared types** and utilities across apps

## Getting Started

### Prerequisites
- Node.js (v18+)
- Yarn or npm
- Docker (for local database)

### Setup
1. Clone the repository and unzip the project.
2. Install dependencies in each subproject (backend, web, mobile):

   ```bash
   cd backend && npm install
   cd ../web && npm install
   cd ../mobile && npm install
   ```

3. Start the database and services with Docker Compose:

   ```bash
   docker-compose up -d
   ```

4. Run database migrations:

   ```bash
   cd backend
   npm run migrate
   ```

### Running Apps
- **Backend API**: `cd backend && npm run dev`
- **Web Dashboard**: `cd web && npm start`
- **Mobile App**: `cd mobile && npm start`

### Scripts
- `scripts/db_migrate.sh` – Run database migrations
- `scripts/deploy.sh` – Deployment pipeline script
- `scripts/generate_qr_codes.ts` – Generate QR codes for location tagging

### Next Steps
- Flesh out backend routes, models, and services
- Implement UI for web & mobile
- Add authentication and role-based access
- Configure CI/CD pipelines

---
🚀 Built with TypeScript everywhere for type safety and maintainability.
