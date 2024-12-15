@echo off
setlocal enabledelayedexpansion

REM Remplacer le chemin par le chemin complet vers votre dossier de projet
set "project_dir=C:\projet\project-02"

REM Fichier de sortie
set "output_file=structure_UIbest.txt"

REM Initialiser le fichier de sortie
echo Structure de projet pour %project_dir% : > "%output_file%"

REM Boucle à travers les fichiers et dossiers
for /f "delims=" %%d in ('dir /b /s "%project_dir%"') do (
    set "file=%%d"
    REM Retirer le chemin du projet pour garder la structure relative
    set "file=!file:%project_dir%\=!"

    REM Vérifier si le fichier ou dossier doit être exclu
    echo !file! | findstr /i /c:"\.nuxt" /c:"\.output" /c:"node_modules" /c:"package-lock.json" >nul
    if errorlevel 1 (
        REM Ajouter le fichier ou dossier au fichier de sortie
        echo !file! >> "%output_file%"
    )
)

echo La structure a été enregistrée dans %output_file%.
pause
