#!/bin/bash
# Database backup script
# Creates timestamped backups of local.db

BACKUP_DIR="backups"
DB_FILE="local.db"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="${BACKUP_DIR}/local_${TIMESTAMP}.db"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Check if database exists
if [ ! -f "$DB_FILE" ]; then
  echo "❌ Error: $DB_FILE not found!"
  exit 1
fi

# Create backup
cp "$DB_FILE" "$BACKUP_FILE"

if [ $? -eq 0 ]; then
  echo "✅ Backup created: $BACKUP_FILE"
  
  # Keep only the last 10 backups
  cd "$BACKUP_DIR"
  ls -t local_*.db | tail -n +11 | xargs -I {} rm {}
  BACKUP_COUNT=$(ls -1 local_*.db 2>/dev/null | wc -l)
  echo "📦 Total backups: $BACKUP_COUNT"
else
  echo "❌ Backup failed!"
  exit 1
fi
