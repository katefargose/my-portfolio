#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to show help
show_help() {
    echo ""
    echo "Personal Portfolio Website - Setup Script"
    echo ""
    echo "Usage: ./setup.sh [command]"
    echo ""
    echo "Commands:"
    echo "  serve       - Start a local web server (default)"
    echo "  open        - Open website in default browser"
    echo "  validate    - Validate HTML files"
    echo "  help        - Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./setup.sh          # Start local server"
    echo "  ./setup.sh serve    # Start local server"
    echo "  ./setup.sh open     # Open in browser"
    echo ""
}

# Function to start local server
start_server() {
    print_info "Starting local web server..."
    
    # Check for Python
    if command_exists python3; then
        print_success "Python 3 found"
        print_info "Server starting at http://localhost:8000"
        print_info "Press Ctrl+C to stop the server"
        echo ""
        python3 -m http.server 8000
    elif command_exists python; then
        print_success "Python found"
        print_info "Server starting at http://localhost:8000"
        print_info "Press Ctrl+C to stop the server"
        echo ""
        python -m SimpleHTTPServer 8000
    elif command_exists php; then
        print_success "PHP found"
        print_info "Server starting at http://localhost:8000"
        print_info "Press Ctrl+C to stop the server"
        echo ""
        php -S localhost:8000
    elif command_exists node; then
        print_success "Node.js found"
        print_info "Installing http-server..."
        npm install -g http-server 2>/dev/null || print_warning "Could not install http-server globally"
        print_info "Server starting at http://localhost:8000"
        print_info "Press Ctrl+C to stop the server"
        echo ""
        npx http-server -p 8000
    else
        print_error "No web server found. Please install Python, PHP, or Node.js"
        print_info "Alternatively, you can open index.html directly in your browser"
        exit 1
    fi
}

# Function to open in browser
open_browser() {
    print_info "Opening website in default browser..."
    
    if command_exists open; then
        # macOS
        open http://localhost:8000
        print_success "Browser opened. Make sure the server is running!"
    elif command_exists xdg-open; then
        # Linux
        xdg-open http://localhost:8000
        print_success "Browser opened. Make sure the server is running!"
    elif command_exists start; then
        # Windows
        start http://localhost:8000
        print_success "Browser opened. Make sure the server is running!"
    else
        print_error "Could not open browser automatically"
        print_info "Please open http://localhost:8000 in your browser manually"
    fi
}

# Function to validate HTML
validate_html() {
    print_info "Validating HTML files..."
    
    if command_exists html5validator; then
        html5validator --root . --match "*.html"
    elif command_exists tidy; then
        for file in *.html; do
            if [ -f "$file" ]; then
                print_info "Validating $file..."
                tidy -e -q "$file" 2>&1 | head -20
            fi
        done
    else
        print_warning "HTML validator not found. Install html5validator or tidy for validation"
        print_info "Files to check: index.html, about.html, gallery.html, contact.html"
    fi
}

# Main script logic
main() {
    # Get command from arguments or default to 'serve'
    COMMAND=${1:-serve}

    case $COMMAND in
        serve)
            start_server
            ;;
            
        open)
            open_browser
            ;;
            
        validate)
            validate_html
            ;;
            
        help|--help|-h)
            show_help
            ;;
            
        *)
            print_error "Unknown command: $COMMAND"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
