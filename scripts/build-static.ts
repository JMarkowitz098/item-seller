import { createClient } from "@libsql/client";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import {
  items as itemsTable,
  settings as settingsTable,
} from "../app/server/db/schema.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize database client (local or Turso)
const client = createClient({
  url: process.env.TURSO_CONNECTION_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client);

async function buildStatic() {
  console.log("Fetching items from database...");

  // Fetch all unsold items
  const allItems = await db
    .select()
    .from(itemsTable)
    .where(eq(itemsTable.sold, false));

  console.log(`Found ${allItems.length} unsold items`);

  // Fetch contact settings
  const settingsData = await db.select().from(settingsTable).limit(1);
  const settings = settingsData[0] || null;

  // Create docs directory for GitHub Pages
  const docsDir = path.join(__dirname, "..", "docs");
  const docsImagesDir = path.join(docsDir, "images");

  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  if (!fs.existsSync(docsImagesDir)) {
    fs.mkdirSync(docsImagesDir, { recursive: true });
  }

  // Copy images from /public/images to docs/images
  const projectRoot = path.join(__dirname, "..");
  const publicImagesDir = path.join(projectRoot, "public", "images");

  if (fs.existsSync(publicImagesDir)) {
    const imageFiles = fs.readdirSync(publicImagesDir);
    imageFiles.forEach((file) => {
      const srcPath = path.join(publicImagesDir, file);
      const destPath = path.join(docsImagesDir, file);
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied: ${file}`);
    });
  }

  // Generate static HTML
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Inventory</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
    }
    /* Mobile optimizations */
    @media (max-width: 768px) {
      .container {
        padding-left: 1rem;
        padding-right: 1rem;
      }
      h1 {
        font-size: 2rem !important;
        line-height: 1.2;
      }
      .card-title {
        font-size: 1.125rem !important;
      }
      .card-price {
        font-size: 1.5rem !important;
      }
    }
  </style>
</head>
<body class="bg-gray-50 min-h-screen">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
    ${
      settings &&
      (settings.contactName || settings.contactPhone || settings.contactEmail)
        ? `
    <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6 mb-8 text-center">
      <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Contact Information</h2>
      <div class="space-y-2 text-sm sm:text-base text-gray-700">
        ${settings.contactName ? `<p><strong>Name:</strong> ${settings.contactName}</p>` : ""}
        ${settings.contactPhone ? `<p><strong>Phone:</strong> <a href="tel:${settings.contactPhone.replace(/[^0-9]/g, "")}" class="text-blue-600 hover:underline" data-obf="${settings.contactPhone.split("").reverse().join("")}">${settings.contactPhone}</a></p>` : ""}
        ${settings.contactEmail ? `<p><strong>Email:</strong> <a href="mailto:${settings.contactEmail}" class="text-blue-600 hover:underline" data-obf="${settings.contactEmail.split("").reverse().join("")}">${settings.contactEmail}</a></p>` : ""}
      </div>
    </div>
    `
        : ""
    }
    <header class="text-center mb-8 sm:mb-12">
      <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Welcome to My Inventory</h1>
      <p class="text-base sm:text-lg text-gray-600">Browse our available items</p>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      ${allItems
        .map((item) => {
          // Extract filename from image_path
          const imageName = item.image_path
            ? path.basename(item.image_path)
            : "";
          const imageUrl = imageName ? `images/${imageName}` : "";

          return `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          ${imageUrl ? `<img src="${imageUrl}" alt="${item.description}" class="w-full h-40 sm:h-48 object-contain bg-gray-100">` : ""}
          <div class="p-4 sm:p-6">
            <h3 class="card-title text-lg sm:text-xl font-semibold text-gray-900 mb-2">${item.description}</h3>
            <p class="card-price text-xl sm:text-2xl font-bold text-blue-600">$${item.price.toFixed(2)}</p>
          </div>
        </div>
      `;
        })
        .join("")}
    </div>

    ${
      allItems.length === 0
        ? `
    <div class="text-center py-12">
      <p class="text-xl text-gray-500">No items available at the moment.</p>
    </div>
    `
        : ""
    }

    <footer class="text-center mt-12 text-gray-500 text-sm">
      <p>Last updated: ${new Date().toLocaleString()}</p>
    </footer>
  </div>
</body>
</html>`;

  // Write HTML file
  const outputPath = path.join(docsDir, "index.html");
  fs.writeFileSync(outputPath, html, "utf-8");

  console.log(`✅ Static site generated at: ${outputPath}`);
  console.log("Ready to push to GitHub Pages!");
}

buildStatic().catch((error) => {
  console.error("Error building static site:", error);
  process.exit(1);
});
