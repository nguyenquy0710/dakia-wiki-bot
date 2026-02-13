:: =============================================================================
:: Script: git-fetch-all.bat
:: Description: Fetch all updates from remote repositories and clean up
::              obsolete references (branches, tags, submodules).
:: Author: Nguyen Quy
:: Date: 2026-02-04
:: Version: 1.0
:: Dependencies: Git
::
:: Usage:
::   Run this script inside a Git repository.
:: =============================================================================

@echo off
setlocal EnableDelayedExpansion
chcp 65001 > nul
cls

echo === Current Directory: %cd%
echo .

:: Check Git repository
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo ❌ This directory is NOT a Git repository.
    pause
    exit /b 1
)

echo === Fetching all remotes ===
echo .

git fetch ^
    --prune ^
    --prune-tags ^
    --force ^
    --verbose ^
    --tags ^
    --recurse-submodules

echo .
echo ✅ Fetch completed.
echo .

pause
endlocal
