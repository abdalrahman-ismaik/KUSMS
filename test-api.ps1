# KUSMS Phase 7 Testing Script
Write-Host "`n=== KUSMS Phase 7 Testing ===" -ForegroundColor Cyan
Write-Host "Starting API tests...`n" -ForegroundColor Cyan

# Test TC-01: Login with valid Student credentials
Write-Host "TC-01: Login with valid Student credentials" -ForegroundColor Yellow
try {
    $body = @{email="student@ku.ac.ae"; password="password123"} | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✓ Status: PASS" -ForegroundColor Green
    Write-Host "  Token received: $($response.token.Substring(0,20))..."
    Write-Host "  User: $($response.user.name)"
    Write-Host "  Role: $($response.user.role)`n"
} catch {
    Write-Host "✗ Status: FAIL - $($_.Exception.Message)" -ForegroundColor Red
}

# Test TC-02: Login with valid Admin credentials
Write-Host "TC-02: Login with valid Admin credentials" -ForegroundColor Yellow
try {
    $body = @{email="admin@ku.ac.ae"; password="password123"} | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✓ Status: PASS" -ForegroundColor Green
    Write-Host "  Token received: $($response.token.Substring(0,20))..."
    Write-Host "  User: $($response.user.name)"
    Write-Host "  Role: $($response.user.role)`n"
    $script:adminToken = $response.token
} catch {
    Write-Host "✗ Status: FAIL - $($_.Exception.Message)" -ForegroundColor Red
}

# Test TC-03: Login with invalid password
Write-Host "TC-03: Login with invalid password" -ForegroundColor Yellow
try {
    $body = @{email="student@ku.ac.ae"; password="wrongpass"} | ConvertTo-Json
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✗ Status: FAIL - Should have rejected login" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "✓ Status: PASS" -ForegroundColor Green
        Write-Host "  Error message: Invalid credentials (as expected)`n"
    } else {
        Write-Host "✗ Status: FAIL - Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Test TC-04: Access protected route without login
Write-Host "TC-04: Access protected route without login" -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/dashboard/stats" -Method GET
    Write-Host "✗ Status: FAIL - Should have required authentication" -ForegroundColor Red
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "✓ Status: PASS" -ForegroundColor Green
        Write-Host "  Access denied (as expected)`n"
    } else {
        Write-Host "✗ Status: FAIL - Unexpected error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "`n=== Authentication Tests Complete ===" -ForegroundColor Cyan
