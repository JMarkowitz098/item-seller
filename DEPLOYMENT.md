# Deployment to GitHub Pages

This repository deploys a static version of the inventory welcome page to GitHub Pages.

## How It Works

1. **Admin locally**: Run the full app on your computer to manage inventory
2. **Generate static page**: Build a static HTML page with current inventory
3. **Push to GitHub**: Commit and push the static page to deploy

## Setup GitHub Pages

### One-Time Setup

1. Go to your GitHub repository settings
2. Navigate to **Pages** (in the sidebar)
3. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** (or your default branch)
   - Folder: **/docs**
4. Save

## Deployment Workflow

### Every time you want to update the public site:

```bash
# 1. Make sure your .env file has Turso credentials
# 2. Generate the static HTML page
npm run build:static

# 3. Commit the changes
git add docs/
git commit -m "Update inventory"

# 4. Push to GitHub
git push origin main
```

That's it! GitHub Pages will automatically deploy the updated page within 1-2 minutes.

## What Gets Deployed

- **Public page**: Read-only inventory catalog at `https://yourusername.github.io/my-react-router-app/`
- **Shows**: All unsold items with descriptions and prices
- **Updates**: When you run `npm run build:static` and push

## What Stays Local

- Admin dashboard
- Login/authentication
- Item management (create, edit, delete, mark as sold)
- PDF generation
- Contact info management
- Database (Turso cloud, but accessed only from local admin)

## Updating Inventory

```bash
# Start local admin
npm run dev

# Go to http://localhost:5173/admin
# Add/edit/delete items

# When ready to publish:
npm run build:static
git add docs/ && git commit -m "Update inventory" && git push
```

## Quick Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start local admin dashboard |
| `npm run build:static` | Generate static page from current database |
| `git push` | Deploy to GitHub Pages |

## Repository URL

After setup, your public inventory will be at:
```
https://yourusername.github.io/repository-name/
```

Replace `yourusername` and `repository-name` with your actual GitHub username and repo name.
