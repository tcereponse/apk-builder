@echo off
echo 🧹 Nettoyage du cache...
if exist node_modules/.vite rmdir /s /q node_modules/.vite
if exist dist rmdir /s /q dist
echo 📦 Reinstallation des dependances...
call npm install --legacy-peer-deps
if %errorlevel% neq 0 (
echo ❌ Erreur lors de l'installation
pause
exit /b %errorlevel%
)
echo 🏗️ Build de production...
call npm run build
if %errorlevel% neq 0 (
echo ❌ Erreur lors du build
pause
exit /b %errorlevel%
)
echo ✅ Build termine avec succes !
pause
{
"compilerOptions": {
"composite": true,
"skipLibCheck": true,
"module": "ESNext",
"moduleResolution": "bundler",
"allowSyntheticDefaultImports": true,
"strict": true
},
"include": ["vite.config.ts"]
}