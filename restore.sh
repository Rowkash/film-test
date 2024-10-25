#!/bin/bash
set -e

echo "Check if postgres ready"
until pg_isready -U "$POSTGRES_USER"; do
  sleep 2
done

echo "Backup is in processing"
pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" -v /backup/backup.tar
echo "Database restored"