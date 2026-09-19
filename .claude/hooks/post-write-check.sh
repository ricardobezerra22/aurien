#!/usr/bin/env bash
set -e

echo "Running lint (biome)..."
yarn lint

echo "Running tests with coverage..."
yarn test:coverage

echo "OK: lint and coverage passing."
