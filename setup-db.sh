#!/bin/bash

# Setup Database SIPEPU
echo "🔧 Setting up SIPEPU Database..."

# Load environment variables from .env file
if [ -f .env ]; then
    echo "📋 Loading environment variables from .env file..."
    export $(grep -v '^#' .env | grep -v '^$' | xargs)
else
    echo "⚠️  .env file not found. Using default values..."
fi

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL first."
    echo "   Ubuntu/Debian: sudo apt install mysql-server"
    echo "   CentOS/RHEL: sudo yum install mysql-server"
    echo "   macOS: brew install mysql"
    exit 1
fi

# Check if MySQL service is running
if ! systemctl is-active --quiet mysql 2>/dev/null && ! pgrep -x "mysqld" > /dev/null; then
    echo "⚠️  MySQL service is not running. Starting MySQL..."
    sudo systemctl start mysql 2>/dev/null || {
        echo "❌ Failed to start MySQL service. Please start it manually."
        exit 1
    }
fi

# MySQL credentials from environment or defaults
MYSQL_USER=${DB_USER:-root}
MYSQL_PASSWORD=${DB_PASSWORD}
MYSQL_HOST=${DB_HOST:-localhost}
MYSQL_PORT=${DB_PORT:-3306}
MYSQL_DATABASE=${DB_NAME:-sipepu}

echo "🔗 Connecting to MySQL..."
echo "   Host: ${MYSQL_HOST}:${MYSQL_PORT}"
echo "   User: ${MYSQL_USER}"
echo "   Database: ${MYSQL_DATABASE}"

echo "📊 Creating database and tables..."

# Execute SQL schema with proper password handling
if [ -n "$MYSQL_PASSWORD" ]; then
    mysql -h"${MYSQL_HOST}" -P"${MYSQL_PORT}" -u"${MYSQL_USER}" -p"${MYSQL_PASSWORD}" < database/schema.sql
else
    mysql -h"${MYSQL_HOST}" -P"${MYSQL_PORT}" -u"${MYSQL_USER}" < database/schema.sql
fi

if [ $? -eq 0 ]; then
    echo "✅ Database setup completed successfully!"
    echo "📋 Database: ${MYSQL_DATABASE}"
    echo "📊 Table: laporan"
    echo "🔗 Connection: ${MYSQL_HOST}:${MYSQL_PORT}"
    echo ""
    echo "🚀 You can now start the server with:"
    echo "   npm install"
    echo "   npm start"
else
    echo "❌ Database setup failed!"
    echo "Please check your MySQL credentials and connection."
    echo "💡 Tip: You can also run the SQL manually:"
    echo "   mysql -u${MYSQL_USER} -p${MYSQL_PASSWORD} < database/schema.sql"
    exit 1
fi