#!/bin/bash

# Django Deployment Script for reang.jp
# This script handles the deployment process

set -e  # Exit on any error

echo "🚀 Starting deployment process..."

# Configuration
PROJECT_DIR="/var/www/reang.jp"
VENV_DIR="$PROJECT_DIR/venv"
SERVICE_NAME="gunicorn-reang"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if running as root
check_root() {
    if [[ $EUID -eq 0 ]]; then
        print_error "This script should not be run as root"
        exit 1
    fi
}

# Function to activate virtual environment
activate_venv() {
    if [ -d "$VENV_DIR" ]; then
        print_status "Activating virtual environment..."
        source "$VENV_DIR/bin/activate"
    else
        print_error "Virtual environment not found at $VENV_DIR"
        exit 1
    fi
}

# Function to update code from Git
update_code() {
    print_status "Pulling latest code from Git..."
    cd "$PROJECT_DIR"
    git pull origin main
}

# Function to install/update dependencies
install_dependencies() {
    print_status "Installing/updating Python dependencies..."
    pip install -r requirements.txt
}

# Function to run Django migrations
run_migrations() {
    print_status "Running database migrations..."
    python manage.py migrate --noinput
}

# Function to collect static files
collect_static() {
    print_status "Collecting static files..."
    python manage.py collectstatic --noinput
}

# Function to restart services
restart_services() {
    print_status "Restarting Gunicorn service..."
    sudo systemctl restart "$SERVICE_NAME"
    
    print_status "Reloading Nginx configuration..."
    sudo nginx -t && sudo systemctl reload nginx
}

# Function to check service status
check_services() {
    print_status "Checking service status..."
    
    if sudo systemctl is-active --quiet "$SERVICE_NAME"; then
        print_status "Gunicorn is running ✓"
    else
        print_error "Gunicorn is not running ✗"
        return 1
    fi
    
    if sudo systemctl is-active --quiet nginx; then
        print_status "Nginx is running ✓"
    else
        print_error "Nginx is not running ✗"
        return 1
    fi
}

# Main deployment function
deploy() {
    print_status "Starting deployment to reang.jp..."
    
    check_root
    activate_venv
    update_code
    install_dependencies
    run_migrations
    collect_static
    restart_services
    check_services
    
    print_status "Deployment completed successfully! 🎉"
    print_status "Site should be available at https://reang.jp"
}

# Health check function
health_check() {
    print_status "Running health check..."
    
    # Check if site responds
    if curl -f -s -o /dev/null "https://reang.jp"; then
        print_status "Site is responding ✓"
    else
        print_error "Site is not responding ✗"
        return 1
    fi
}

# Rollback function (basic)
rollback() {
    print_warning "Rolling back to previous version..."
    cd "$PROJECT_DIR"
    git reset --hard HEAD~1
    activate_venv
    install_dependencies
    run_migrations
    collect_static
    restart_services
    print_status "Rollback completed"
}

# Script usage
usage() {
    echo "Usage: $0 {deploy|health-check|rollback}"
    echo "  deploy      - Full deployment process"
    echo "  health-check - Check if services are running"
    echo "  rollback    - Rollback to previous version"
}

# Main script logic
case "$1" in
    deploy)
        deploy
        ;;
    health-check)
        health_check
        ;;
    rollback)
        rollback
        ;;
    *)
        usage
        exit 1
        ;;
esac