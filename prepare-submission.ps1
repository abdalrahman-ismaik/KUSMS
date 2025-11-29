# KUSMS Phase 8 - Code Submission Preparation Script
# This script helps prepare your code for submission by creating a clean ZIP file

Write-Host "`n=== KUSMS Phase 8 Code Submission Preparation ===" -ForegroundColor Cyan
Write-Host "This script will create a clean ZIP file of your code for submission.`n" -ForegroundColor Cyan

$projectRoot = "d:\Education\University\Fall 2025\COSC 336 - Intro to Software Engineering\Project\KUSMS\KUSMS"
$outputPath = "d:\Education\University\Fall 2025\COSC 336 - Intro to Software Engineering\Project\KUSMS"
$zipFileName = "KUSMS-Code-Phase8.zip"

Write-Host "Project Root: $projectRoot" -ForegroundColor Yellow
Write-Host "Output Path: $outputPath\$zipFileName`n" -ForegroundColor Yellow

# Check if project root exists
if (-not (Test-Path $projectRoot)) {
    Write-Host "Error: Project root not found!" -ForegroundColor Red
    exit 1
}

# Create temporary directory for clean copy
$tempDir = Join-Path $env:TEMP "KUSMS-Submission"
Write-Host "Creating temporary directory..." -ForegroundColor Yellow

if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy project files excluding patterns
Write-Host "Copying project files (excluding node_modules)..." -ForegroundColor Yellow

# Function to copy directory excluding patterns
function Copy-FolderExcluding {
    param($Source, $Destination, $Exclude)
    
    if (-not (Test-Path $Destination)) {
        New-Item -ItemType Directory -Path $Destination -Force | Out-Null
    }
    
    Get-ChildItem -Path $Source -Force | ForEach-Object {
        $shouldExclude = $false
        foreach ($pattern in $Exclude) {
            if ($_.Name -like $pattern) {
                $shouldExclude = $true
                break
            }
        }
        
        if (-not $shouldExclude) {
            $destPath = Join-Path $Destination $_.Name
            if ($_.PSIsContainer) {
                Copy-FolderExcluding -Source $_.FullName -Destination $destPath -Exclude $Exclude
            } else {
                Copy-Item -Path $_.FullName -Destination $destPath -Force
            }
        }
    }
}

# Backend - copy only source code and config
Write-Host "  Copying backend (source code only)..." -ForegroundColor Gray
$backendSource = Join-Path $projectRoot "backend"
$backendDest = Join-Path $tempDir "backend"

if (Test-Path $backendSource) {
    # Copy backend files excluding node_modules and other build artifacts
    Copy-FolderExcluding -Source $backendSource -Destination $backendDest -Exclude @("node_modules", "*.db", "*.db-journal", ".env", "dist", "build", "coverage", "*.log")
}

# Frontend - copy only source code and config
Write-Host "  Copying frontend (source code only)..." -ForegroundColor Gray
$frontendSource = Join-Path $projectRoot "frontend"
$frontendDest = Join-Path $tempDir "frontend"

if (Test-Path $frontendSource) {
    # Copy frontend files excluding node_modules and other build artifacts
    Copy-FolderExcluding -Source $frontendSource -Destination $frontendDest -Exclude @("node_modules", ".env", "dist", "build", "coverage", "*.log")
}

# Copy documentation folders (these are small)
Write-Host "  Copying documentation..." -ForegroundColor Gray
$docsSource = Join-Path $projectRoot "docs"
$docsDest = Join-Path $tempDir "docs"
if (Test-Path $docsSource) {
    Copy-Item -Path $docsSource -Destination $docsDest -Recurse -Force
}

$specsSource = Join-Path $projectRoot "specs"
$specsDest = Join-Path $tempDir "specs"
if (Test-Path $specsSource) {
    Copy-Item -Path $specsSource -Destination $specsDest -Recurse -Force
}

# Copy root files
Write-Host "  Copying root configuration files..." -ForegroundColor Gray
$rootFiles = @(
    "README.md",
    "docker-compose.yml",
    "docker-compose.prod.yml",
    ".gitignore"
)

foreach ($file in $rootFiles) {
    $sourceFile = Join-Path $projectRoot $file
    if (Test-Path $sourceFile) {
        Copy-Item -Path $sourceFile -Destination $tempDir -Force
    }
}

# Copy testing guide files
$testingFiles = @(
    "TESTING_GUIDE.md",
    "PHASE_8_SCREENSHOT_GUIDE.md"
)

foreach ($file in $testingFiles) {
    $sourceFile = Join-Path $projectRoot $file
    if (Test-Path $sourceFile) {
        Copy-Item -Path $sourceFile -Destination $tempDir -Force
    }
}

# Remove any remaining excluded items (double check)
Write-Host "Final cleanup..." -ForegroundColor Yellow
Get-ChildItem -Path $tempDir -Recurse -Force -Directory | Where-Object {
    $_.Name -in @("node_modules", "dist", "build", "coverage", ".git")
} | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue

# Remove .env files but keep .env.example
Get-ChildItem -Path $tempDir -Recurse -Filter ".env" -File | Where-Object {
    $_.Name -eq ".env"
} | Remove-Item -Force -ErrorAction SilentlyContinue

# Remove database files
Get-ChildItem -Path $tempDir -Recurse -Filter "*.db*" -File | Remove-Item -Force -ErrorAction SilentlyContinue

# Create SUBMISSION_README.md
$submissionReadme = @"
# KUSMS - KU Smart Management System
## Phase 8 Submission

### Project Overview
KUSMS (KU Smart Management System) is a comprehensive campus facility and event management system designed for Khalifa University.

### Team Information
- **Course**: COSC 336 - Introduction to Software Engineering
- **Semester**: Fall 2025
- **Submission Date**: November 29, 2025

### System Requirements
- **Backend**: Node.js 18+ 
- **Frontend**: Node.js 18+
- **Database**: SQLite (included via Prisma)

### Installation Instructions

**Important**: This submission includes source code only. You need to install dependencies before running.

#### Backend Setup
``````powershell
cd backend
npm install                  # Install all backend dependencies
npx prisma migrate deploy    # Set up database
npx prisma db seed          # Populate with test data
npm start                   # Start backend server
``````
Backend runs on: http://localhost:3000

#### Frontend Setup
``````powershell
cd frontend
npm install                 # Install all frontend dependencies
npm run dev                # Start development server
``````
Frontend runs on: http://localhost:5173

### Package Management
- Dependencies are listed in `package.json` files (backend and frontend)
- Run `npm install` in each directory to install all required packages
- No `node_modules` folders are included in this submission (excluded for size)

### Test Accounts
- **Student**: student@ku.ac.ae / password123
- **Faculty**: faculty@ku.ac.ae / password123
- **Admin**: admin@ku.ac.ae / password123
- **Maintenance**: maintenance@ku.ac.ae / password123

### Key Features
1. **Authentication & Authorization**: Role-based access control (RBAC)
2. **Facility Booking**: Request and manage facility bookings with conflict detection
3. **Event Management**: Create and view campus events
4. **Maintenance Requests**: Submit and track maintenance issues
5. **Admin Dashboard**: Comprehensive system management

### Technology Stack
- **Frontend**: React 19.2.0, TypeScript, Material-UI, Vite
- **Backend**: Node.js, Express.js, Prisma ORM
- **Database**: SQLite
- **Authentication**: JWT (JSON Web Tokens)

### Project Structure
``````
KUSMS/
├── backend/          # Node.js + Express API
├── frontend/         # React + TypeScript SPA
├── docs/             # Documentation including Phase 7 Testing
├── specs/            # Feature specifications
└── README.md         # This file
``````

### Documentation
- **Testing Document**: See `docs/PHASE_7_TESTING.md`
- **API Documentation**: See `docs/API.md`
- **Deployment Guide**: See `docs/DEPLOYMENT.md`
- **Testing Guide**: See `TESTING_GUIDE.md`

### Phase 7 Testing Results
All 12 test cases passed successfully (100% pass rate):
- ✅ Authentication (4/4)
- ✅ Facility Booking (4/4)
- ✅ Event Management (2/2)
- ✅ Maintenance Requests (2/2)

### Running Tests
Refer to `TESTING_GUIDE.md` for detailed manual testing procedures.

### Contact
For questions about this submission, please contact your course instructor.

---
**Note**: This is an academic project for COSC 336 - Introduction to Software Engineering
"@

Set-Content -Path (Join-Path $tempDir "SUBMISSION_README.md") -Value $submissionReadme

Write-Host "Creating ZIP file..." -ForegroundColor Yellow

# Remove existing ZIP if it exists
$zipPath = Join-Path $outputPath $zipFileName
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

# Create ZIP file
try {
    Compress-Archive -Path "$tempDir\*" -DestinationPath $zipPath -CompressionLevel Optimal
    Write-Host "`n✓ ZIP file created successfully!" -ForegroundColor Green
    Write-Host "  Location: $zipPath" -ForegroundColor Green
    
    # Get file size
    $fileSize = (Get-Item $zipPath).Length / 1MB
    Write-Host "  Size: $([math]::Round($fileSize, 2)) MB`n" -ForegroundColor Green
    
} catch {
    Write-Host "`n✗ Error creating ZIP file: $_" -ForegroundColor Red
    exit 1
}

# Cleanup temp directory
Write-Host "Cleaning up temporary files..." -ForegroundColor Yellow
Remove-Item $tempDir -Recurse -Force

Write-Host "`n=== Submission Preparation Complete ===" -ForegroundColor Cyan
Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Verify the ZIP file opens correctly" -ForegroundColor White
Write-Host "2. Take screenshots as per PHASE_8_SCREENSHOT_GUIDE.md" -ForegroundColor White
Write-Host "3. Create your screenshot document with descriptions" -ForegroundColor White
Write-Host "4. Submit both the ZIP file and screenshot document`n" -ForegroundColor White

# Open output folder
Write-Host "Opening output folder..." -ForegroundColor Yellow
Start-Process $outputPath
