#!/bin/bash

# Check if a directory is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

# Directory to process
TARGET_DIR=$1

# Verify if the provided path is a directory
if [ ! -d "$TARGET_DIR" ]; then
    echo "Error: $TARGET_DIR is not a directory."
    exit 1
fi

# Process files in the base level
find "$TARGET_DIR" -maxdepth 1 -type f -print0 | while IFS= read -r -d '' file; do
    sed -i 's|@src/|./|g' "$file"
    echo "Processed (base level): $file"
done

# Process files in subdirectories
find "$TARGET_DIR" -mindepth 2 -type f -print0 | while IFS= read -r -d '' file; do
    sed -i 's|@src/|../|g' "$file"
    echo "Processed (subdirectory): $file"
done

echo "Replacement completed."

# Provide executable permission to index.js
INDEX_FILE="$TARGET_DIR/index.js"
if [ -f "$INDEX_FILE" ]; then
    chmod +x "$INDEX_FILE"
    echo "Executable permission granted for: $INDEX_FILE"
else
    echo "Warning: $INDEX_FILE not found. Skipping chmod."
fi

echo "DONE!!"