#!/bin/bash

# SauceDemo Test Execution Script
# This script helps run tests with different configurations

echo "╔═══════════════════════════════════════════════╗"
echo "║   SauceDemo Automation Test Framework        ║"
echo "║   Playwright + TypeScript                    ║"
echo "╚═══════════════════════════════════════════════╝"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update with your credentials if needed."
    echo ""
fi

# Function to display menu
show_menu() {
    echo "Select test execution mode:"
    echo ""
    echo "1) Run all tests (headless)"
    echo "2) Run all tests (headed - see browser)"
    echo "3) Run in UI mode (interactive)"
    echo "4) Run Test 1: Checkout Flow"
    echo "5) Run Test 2: Cart Management"
    echo "6) Run Test 3: Product Sorting"
    echo "7) Run Legacy Test (test1)"
    echo "8) Run on Chromium only"
    echo "9) Run on Firefox only"
    echo "10) Run on Safari/WebKit only"
    echo "11) View test report"
    echo "12) Debug mode"
    echo "0) Exit"
    echo ""
}

# Main menu loop
while true; do
    show_menu
    read -p "Enter your choice [0-12]: " choice
    echo ""

    case $choice in
        1)
            echo "🚀 Running all tests (headless)..."
            npx playwright test
            ;;
        2)
            echo "🚀 Running all tests (headed mode)..."
            npx playwright test --headed
            ;;
        3)
            echo "🚀 Opening UI mode..."
            npx playwright test --ui
            ;;
        4)
            echo "🚀 Running Test 1: Checkout Flow..."
            npx playwright test tests/01-checkout.spec.ts
            ;;
        5)
            echo "🚀 Running Test 2: Cart Management..."
            npx playwright test tests/02-cart-management.spec.ts
            ;;
        6)
            echo "🚀 Running Test 3: Product Sorting..."
            npx playwright test tests/03-product-sorting.spec.ts
            ;;
        7)
            echo "🚀 Running Legacy Test (test1)..."
            npm run test1
            ;;
        8)
            echo "🚀 Running tests on Chromium headless..."
            npm run test:all:chromium
            ;;
        9)
            echo "🚀 Running tests on Firefox headless..."
            npm run test:all:firefox
            ;;
        10)
            echo "🚀 Running tests on Safari/WebKit headless..."
            npm run test:all:webkit
            ;;
        11)
            echo "📊 Opening test report..."
            npx playwright show-report
            ;;
        12)
            echo "🐛 Starting debug mode..."
            npx playwright test --debug
            ;;
        0)
            echo "👋 Goodbye!"
            exit 0
            ;;
        *)
            echo "❌ Invalid option. Please try again."
            ;;
    esac
    
    echo ""
    echo "Press Enter to continue..."
    read
    clear
done
