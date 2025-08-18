#!/bin/bash

# db_migrate.sh
# This script is used to run database migrations for the Safety Suggestions Reporting System.
# It ensures that the database schema is up-to-date with the latest changes.

# Exit immediately if a command exits with a non-zero status
set -e

# Load environment variables from .env file if it exists
if [ -f .env ]; then
    export $(cat .env | xargs)
fi

# Check if the DATABASE_URL environment variable is set
if [ -z "$DATABASE_URL" ]; then
    echo "Error: DATABASE_URL is not set. Please configure it in your environment or .env file."
    exit 1
fi

# Navigate to the backend directory where Prisma is configured
cd "$(dirname "$0")/../backend"

# Run Prisma migrations
echo "Running database migrations..."
npx prisma migrate deploy

echo "Database migrations completed successfully."
