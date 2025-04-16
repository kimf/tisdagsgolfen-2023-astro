#!/bin/sh

# echo "Migrating database..."
# npm run db:migrate & PID=$!
# # Wait for migration to finish
# wait $PID

echo "Starting production server..."
HOST=0.0.0.0 node dist/server/entry.mjs & PID=$!

wait $PID
