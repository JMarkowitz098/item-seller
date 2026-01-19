# My React Router App

A full-stack inventory management application built with React Router v7, featuring item management, sold item tracking, contact information management, and PDF generation with QR codes.

## Tech Stack

- **Framework**: React Router 7.12.0 (full-stack SSR)
- **Database**: SQLite with Drizzle ORM
- **Styling**: Tailwind CSS 4.1.13
- **Server**: Node.js with Express
- **PDF Generation**: PDFKit 0.17.2
- **Additional**: QR codes, Speakeasy (2FA support)

## Getting Started

### Installation

```bash
npm install
```

### Initialize Database

```bash
npm run init
```

This creates the SQLite database and runs schema migrations including the `items` table (with `sold` field) and `settings` table for contact information.

### Seed Database (Optional)

```bash
npm run seed
```

Populates the database with 3 sample inventory items for testing.

### Development

```bash
npm run dev
```

Starts the development server. The app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Start

```bash
npm start
```

Runs the production build.