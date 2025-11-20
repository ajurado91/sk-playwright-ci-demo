@echo off
echo Installing dependencies...
call npm install
echo.
echo Installing Playwright browsers...
call npx playwright install
echo.
echo Setup complete! You can now run tests in any folder.
echo Example:
echo   cd 01-local-playwright
echo   npm test
pause
