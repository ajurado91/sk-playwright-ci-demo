# Integrating Playwright Testing into GitHub Actions Workflows

This repository demonstrates how to progressively integrate Playwright end-to-end testing into GitHub Actions workflows, from basic local setup to advanced CI/CD pipelines.

## 📁 Project Structure

Each folder represents a progressive step in building a complete CI/CD pipeline:

### 01-local-playwright
- Basic Playwright setup for local development
- Simple test configuration
- Artifact generation on demand

### 02-basic-ci
- First GitHub Actions workflow
- Basic CI pipeline setup
- Simple test execution

### 03-with-cache
- Optimized CI with dependency caching
- Faster build times
- Browser installation caching

### 04-matrix-browsers
- Multi-browser testing strategy
- Parallel execution across different browsers
- Matrix build configuration

### 05-parallel-workers
- Parallel test execution
- Worker optimization
- Performance improvements

### 06-final-pipeline
- Complete production-ready pipeline
- Test reports and artifacts
- Deployment integration

## 🚀 Quick Start

1. **Setup all dependencies:**
   ```bash
   setup.bat
   ```

2. **Run tests in any folder:**
   ```bash
   cd 01-local-playwright
   npm test
   ```

## 📋 Available Scripts

Each folder contains these npm scripts:

- `npm test` - Run all tests
- `npm run test:ui` - Run tests in UI mode
- `npm run test:report` - Show test reports

**Additional scripts by folder:**
- **01-local-playwright**: `test:artifacts` - Force artifact generation
- **04-matrix-browsers**: Browser-specific tests (`test:chromium`, `test:firefox`, `test:webkit`)
- **05-parallel-workers**: Worker control (`test:sequential`, `test:parallel`)

## 🧪 Test Application

All tests run against [SauceDemo](https://www.saucedemo.com/) - a sample e-commerce application designed for testing.

**Test Scenarios:**
- User login and authentication
- Product browsing and selection
- Shopping cart functionality
- Complete checkout flow
- Error handling and edge cases

## 🔧 Configuration Highlights

- **Base URL**: Configured for SauceDemo application
- **Browsers**: Chromium, Firefox, WebKit support
- **Artifacts**: Screenshots, videos, and traces
- **Retries**: Configured for CI environments
- **Parallel Execution**: Optimized worker configuration
