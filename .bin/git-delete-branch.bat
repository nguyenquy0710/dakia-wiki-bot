:: =============================================================================
:: Script: git-delete-branch.bat
:: Description: List or delete Git branches based on parameters.
:: Author: Nguyen Quy
:: Date: 2026-02-04
:: Version: 1.1
:: Dependencies: Git
::
:: Usage:
::   git-delete-branch.bat
::   git-delete-branch.bat --list
::   git-delete-branch.bat --del branch_name
:: =============================================================================

@echo off
setlocal EnableDelayedExpansion
chcp 65001 > nul

:: Check Git repository
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
    echo ❌ This directory is NOT a Git repository.
    exit /b 1
)

:: ========================
:: PARAM HANDLING
:: ========================

if "%~1"=="" goto LIST
if "%~1"=="--list" goto LIST
if "%~1"=="--del" goto DELETE

echo ❌ Unknown parameter: %~1
goto HELP

:: ========================
:: LIST BRANCHES (ALL)
:: ========================
:LIST
echo === Local Branches ===
git branch
echo .
echo === Remote Branches ===
git branch -r
goto END

:: ========================
:: DELETE BRANCH
:: ========================
:DELETE
if "%~2"=="" (
    echo ❌ Branch name is required.
    echo Example: git-delete-branch.bat --del feature/login
    goto END
)

set BRANCH=%~2

:: Prevent deleting main branches
if /I "%BRANCH%"=="main" (
    echo ❌ Cannot delete branch: main
    goto END
)
if /I "%BRANCH%"=="master" (
    echo ❌ Cannot delete branch: master
    goto END
)

echo .
echo Deleting local branch: %BRANCH%
echo [Safe delete: only if merged]
git branch -d %BRANCH%
if errorlevel 1 (
    echo .
    echo ⚠️ Safe delete failed. Branch may NOT be merged.
    echo Use force delete? (y/n)
    set /p CONFIRM=
    if /I "!CONFIRM!"=="y" (
        git branch -D %BRANCH%
    ) else (
        echo ❌ Delete cancelled.
    )
)

goto END

:: ========================
:: HELP
:: ========================
:HELP
echo Usage:
echo   git-delete-branch.bat
echo   git-delete-branch.bat --list
echo   git-delete-branch.bat --del branch_name

:: ========================
:END
echo .
pause
endlocal
