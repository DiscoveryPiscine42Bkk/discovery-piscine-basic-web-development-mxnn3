#!/bin/sh

# Check if at least one argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 folder1 folder2 folder3 ..."
    exit 1
fi

# Create each folder specified in the arguments
for folder in "$@"; do
    mkdir -p "$folder"
    echo "Created folder: $folder"
done

echo "Folders created successfully."