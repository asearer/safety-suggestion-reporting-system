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

## QR Code Feature
The system supports location tagging via QR codes.

1.  **Generate QR Codes**:
    Run the generation script to create QR codes for your locations:
    ```bash
    npx ts-node tooling/scripts/generate_qr_codes.ts
    ```
    This will generate PNG files in `tooling/qr_codes`.

2.  **Scan in Mobile App**:
    - Open the mobile app.
    - Go to **Submit New Report**.
    - Tap **Scan** next to the Location field.
    - Scan a generated QR code to auto-fill the location.

### Mobile App Web Support
The mobile app can now be run in the browser using Expo Web:
```bash
cd mobile && npm run web
```
*Note: QR scanning is simulated or limited in the browser environment.*

### Next Steps
- [ ] Flesh out backend routes, models, and services
- [x] Implement basic UI for mobile (Report Form, QR Scanner)
- [ ] Implement UI for web dashboard
- [ ] Add authentication and role-based access
- [ ] Configure CI/CD pipelines

---
🚀 Built with TypeScript everywhere for type safety and maintainability.
