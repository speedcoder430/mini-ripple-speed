#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Create the output directory if it doesn't exist
mkdir -p public

# Read the .env file and export the variables
if [ -f .env ]; then
  export $(cat .env | sed 's/#.*//g' | xargs)
fi

# Replace the placeholder in the source file and output to the public directory
sed "s|window.MINIRIPPLE_API_HOST|'${API_HOST}'|g" src/tracker.js > public/tracker.min.js