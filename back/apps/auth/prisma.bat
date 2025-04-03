@echo off
SETLOCAL

:: Проверка наличия .env файла
if not exist ".env" (
    echo .env file not found, creating from .env-example...
    if exist ".env-example" (
        copy ".env-example" ".env"
        echo .env file created successfully from .env-example
    ) else (
        echo Error: .env-example file not found. Cannot create .env
        exit /b 1
    )
) else (
    echo .env file already exists
)

:: Проверка установки Prisma CLI
echo Checking Prisma CLI installation...
prisma -v >nul 2>&1
if %errorlevel% neq 0 (
    echo Prisma CLI not found, installing globally...
    npm install -g prisma
    if %errorlevel% neq 0 (
        echo Failed to install Prisma CLI
        exit /b 1
    )
    echo Prisma CLI installed successfully
) else (
    echo Prisma CLI is already installed
)

:: Выполнение prisma db push
echo Running prisma db push...
prisma db push
if %errorlevel% neq 0 (
    echo prisma db push failed
    exit /b 1
)

:: Генерация клиента Prisma
echo Running prisma generate...
prisma generate
if %errorlevel% neq 0 (
    echo prisma generate failed
    exit /b 1
)

:: Генерация SQL
echo Running prisma generate --sql...
prisma generate --sql
if %errorlevel% neq 0 (
    echo prisma generate --sql failed
    exit /b 1
)

echo All commands executed successfully!
ENDLOCAL