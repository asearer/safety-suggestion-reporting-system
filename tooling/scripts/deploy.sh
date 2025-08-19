#!/bin/bash

# deploy.sh
# This script automates the deployment process for the Safety Suggestions Reporting System.

# Exit immediately if a command exits with a non-zero status
set -e

# Variables
APP_NAME="SafetySuggestions"
DOCKER_COMPOSE_FILE="docker/docker-compose.yml"
DEPLOY_ENV=${1:-"production"} # Default to production if no argument is provided

# Functions
function log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

function build_containers() {
    log "Building Docker containers..."
    docker-compose -f $DOCKER_COMPOSE_FILE build
}

function start_containers() {
    log "Starting Docker containers in $DEPLOY_ENV mode..."
    docker-compose -f $DOCKER_COMPOSE_FILE up -d
}

function run_migrations() {
    log "Running database migrations..."
    docker exec backend npm run migrate
}

function cleanup_old_images() {
    log "Cleaning up old Docker images..."
    docker image prune -f
}

# Main Script Execution
log "Starting deployment for $APP_NAME in $DEPLOY_ENV environment..."
build_containers
start_containers
run_migrations
cleanup_old_images
log "Deployment completed successfully!"
