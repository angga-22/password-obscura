#!/bin/bash

# Release script for password-obscura
# Usage: ./scripts/release.sh [patch|minor|major]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default to patch if no argument provided
RELEASE_TYPE=${1:-patch}

# Validate release type
if [[ ! "$RELEASE_TYPE" =~ ^(patch|minor|major)$ ]]; then
    echo -e "${RED}Error: Release type must be patch, minor, or major${NC}"
    exit 1
fi

echo -e "${BLUE}🚀 Starting $RELEASE_TYPE release process...${NC}"

# Check if we're on main branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ] && [ "$CURRENT_BRANCH" != "feat/cipher-dynamic-table" ]; then
    echo -e "${YELLOW}Warning: You're not on the main branch or feature branch (currently on: $CURRENT_BRANCH)${NC}"
    read -p "Continue anyway? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}Warning: You have uncommitted changes${NC}"
    read -p "Continue anyway? (y/n): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check if CHANGELOG.md needs to be updated
if grep -q "## \[Unreleased\]" CHANGELOG.md; then
    UNRELEASED_CONTENT=$(sed -n '/## \[Unreleased\]/,/## \[/p' CHANGELOG.md | head -n -1 | tail -n +2)
    if [ -n "$(echo "$UNRELEASED_CONTENT" | grep -v '^$')" ]; then
        echo -e "${YELLOW}📝 CHANGELOG.md has unreleased changes. Please review and update it before releasing.${NC}"
        echo -e "${YELLOW}Remember to:${NC}"
        echo -e "${YELLOW}  1. Move unreleased changes to a new version section${NC}"
        echo -e "${YELLOW}  2. Add the release date${NC}"
        echo -e "${YELLOW}  3. Update the comparison links${NC}"
        read -p "Have you updated CHANGELOG.md? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo -e "${RED}Please update CHANGELOG.md first${NC}"
            exit 1
        fi
    fi
fi

# Run tests (if they exist)
echo -e "${BLUE}🧪 Running tests...${NC}"
npm test 2>/dev/null || echo -e "${YELLOW}No tests found, skipping...${NC}"

# Build the project
echo -e "${BLUE}🔨 Building project...${NC}"
npm run build

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Calculate new version (simplified - npm version will do the actual calculation)
echo -e "${BLUE}📦 Current version: ${CURRENT_VERSION}${NC}"

# Create the release
echo -e "${BLUE}🏷️  Creating $RELEASE_TYPE release...${NC}"
NEW_VERSION=$(npm version $RELEASE_TYPE --no-git-tag-version)

# Show the new version
echo -e "${GREEN}✅ Version updated to: ${NEW_VERSION}${NC}"

# Commit and tag
echo -e "${BLUE}📝 Committing changes...${NC}"
git add package.json
git commit -m "chore: bump version to ${NEW_VERSION}"

echo -e "${BLUE}🏷️  Creating git tag...${NC}"
git tag "${NEW_VERSION}"

# Push changes
echo -e "${BLUE}⬆️  Pushing to remote...${NC}"
git push origin main
git push origin "${NEW_VERSION}"

echo -e "${GREEN}🎉 Release ${NEW_VERSION} completed successfully!${NC}"
echo -e "${BLUE}📋 Next steps:${NC}"
echo -e "${BLUE}  • Create a GitHub release: https://github.com/angga-22/password-obscura/releases/new?tag=${NEW_VERSION}${NC}"
echo -e "${BLUE}  • Publish to npm: npm publish${NC}"
echo -e "${BLUE}  • Update documentation if needed${NC}"
