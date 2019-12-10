start "wiggle" npm start
rem "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" http://localhost:3000 &
start "C:\Program Files\Mozilla Firefox\firefox.exe" http://localhost:3000
pause
taskkill /im node.exe /t /f
taskkill /im cmd.exe /t /f /fi "WINDOWTITLE eq n*"
taskkill /im cmd.exe /t /f /fi "WINDOWTITLE eq wig*"