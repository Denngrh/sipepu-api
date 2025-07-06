#!/bin/bash

# Update Database SIPEPU - Change prioritas and validasi to NULL
echo "🔧 Updating SIPEPU Database schema..."

# Load environment variables dari .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Default MySQL credentials dari environment atau default values
MYSQL_USER=${DB_USER:-root}
MYSQL_PASSWORD=${DB_PASSWORD:-}
MYSQL_HOST=${DB_HOST:-localhost}
MYSQL_PORT=${DB_PORT:-3306}
MYSQL_DB=${DB_NAME:-sipepu}

echo "📊 Updating table structure..."

# Create update SQL
UPDATE_SQL="
USE ${MYSQL_DB};

-- Update table structure to allow NULL for prioritas and validasi
ALTER TABLE laporan 
MODIFY COLUMN prioritas INT NULL COMMENT 'Skor prioritas 1-5 (NULL jika belum dinilai)',
MODIFY COLUMN validasi INT NULL COMMENT 'Skor validasi 0-5 (NULL jika belum divalidasi)';

-- Update existing data to NULL
UPDATE laporan SET prioritas = NULL, validasi = NULL;

-- Show updated table structure
DESCRIBE laporan;
"

# Execute update SQL
echo "$UPDATE_SQL" | mysql -h${MYSQL_HOST} -P${MYSQL_PORT} -u${MYSQL_USER} ${MYSQL_PASSWORD:+-p${MYSQL_PASSWORD}}

if [ $? -eq 0 ]; then
    echo "✅ Database update completed successfully!"
    echo "📊 prioritas and validasi columns are now NULL by default"
    echo "🔄 All existing records updated to have NULL values"
else
    echo "❌ Database update failed!"
    echo "Please check your MySQL credentials and connection."
    exit 1
fi
