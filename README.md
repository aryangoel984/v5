# Global Catalog Registry (GCR)

The **Global Catalog Registry (GCR)** is an innovative platform built to simplify and optimize the product catalog management process for the **Open Network for Digital Commerce (ONDC)**. It acts as a centralized repository for catalog data, reducing the complexity of interactions between sellers and buyers. The project is implemented using **Next.js** and features a robust architecture designed to handle schema transformations, efficient data storage, and seamless API interactions.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Technical Architecture](#technical-architecture)
4. [Project Structure](#project-structure)
5. [Working of Each Directory](#working-of-each-directory)
6. [How It Works](#how-it-works)
7. [Setup and Installation](#setup-and-installation)
8. [Usage Instructions](#usage-instructions)
9. [API Documentation](#api-documentation)
10. [Database Schema](#database-schema)
11. [Adaptor Layers](#adaptor-layers)
12. [Contributing](#contributing)
13. [License](#license)

---

## Introduction

The Global Catalog Registry (GCR) solves a critical problem in the ONDC ecosystem by centralizing product catalog data. Previously, each buyer app had to request product catalogs directly from multiple seller apps, leading to an inefficient **N × N complexity**. With GCR, this is reduced to **N + N complexity**, where:

- **Seller apps** send catalog data to GCR.
- **Buyer apps** query catalog data from GCR.

This results in reduced redundancy, lower computational costs, and faster response times for all parties involved.

---

## Features

- **Centralized Catalog Management:** GCR stores and manages product catalog data from multiple seller apps.
- **Schema Adaptation:** Supports dynamic schema transformation for sellers and buyers.
- **Efficient APIs:** Provides APIs for data ingestion (sellers) and data retrieval (buyers).
- **Scalable Architecture:** Handles large-scale operations with Redis-based queuing and Prisma ORM.
- **Frontend for Merchants:** Interactive UI for individual merchants to manage their catalogs.
- **Performance Optimization:** Uses caching and indexing for fast queries.
- **ONDC Integration:** Complies with ONDC standards for interoperability.

---

## Technical Architecture

### Overview



The architecture is divided into three main layers:

1. **Seller Layer:**

   - Merchants can use a web frontend to submit catalog data.
   - Seller apps send bulk catalog data through APIs.
   - An **Adaptor Layer** converts seller-specific schemas to the unified Prisma schema.

2. **GCR Layer:**

   - Stores all catalog data in a centralized database.
   - Provides APIs for querying catalog data.
   - Uses Redis for queueing and asynchronous processing.

3. **Buyer Layer:**

   - Buyer apps query GCR for catalog data using filters.
   - An **Adaptor Layer** converts Prisma schema to buyer-specific schemas.
   - End customers interact with buyer apps to browse or purchase products.



---

## Project Structure

```plaintext
v5/
├── app/               # Core application logic (pages, layouts, routes)
│   ├── adaptor/       # Adaptor-related components and logic
│   ├── addCatalogue/  # Logic for adding catalogues
│   ├── api/           # API routes and handlers
│   ├── buyerAdaptor/  # Buyer-specific adaptor logic
│   ├── user/          # User-related components and logic
│   ├── actions.ts     # Centralized actions for state management or API calls
│   ├── favicon.ico    # Application favicon
│   ├── globals.css    # Global CSS for the application
│   ├── layout.tsx     # Shared layout for the application
│   └── page.tsx       # Root page component
├── components/        # Reusable UI components
│   ├── steps/         # Multi-step form components for catalog submission
│   │   ├── MultiStepForm.tsx       # Handles the form logic across multiple steps
│   │   ├── StepConfirmation.tsx    # Confirmation step for user inputs
│   │   ├── StepDescriptions.tsx    # Handles adding product descriptions
│   │   ├── StepOverview.tsx        # Provides a summary of the catalog
│   │   ├── StepPricing.tsx         # Handles pricing details
│   ├── ui/            # General-purpose UI components like buttons, modals
│   ├── product-catalogue-upload-form.tsx  # Component for uploading product catalogs
│   ├── sellerCatalogue.tsx        # Handles seller-specific catalog views
│   ├── sidebar.tsx                 # Navigation sidebar
│   ├── theme-provider.tsx          # Provides theme settings and context
├── data/              # Static or external data
│   ├── seed/          # Seed data for initializing the application
│   │   ├── products.json           # JSON file with sample product data
├── db/                # Database-related configuration and schema
│   ├── prisma/        # Prisma schema and migrations
│   ├── package.json   # Manages dependencies related to database tooling
├── hooks/             # Custom React hooks
│   ├── use-toast.ts   # Manages toast notifications
├── lib/               # Utility functions and libraries
│   ├── utils.ts       # Common helper functions
├── public/            # Static assets like images and icons
│   ├── file.svg       # Example SVG file
│   ├── globe.svg      # Example SVG for globe representation
├── styles/            # Global and modular CSS files
├── types/             # Global TypeScript type definitions
│   ├── product.ts     # TypeScript types for product-related data
├── utils/             # General utility functions
│   ├── cloudinary.ts  # Handles Cloudinary API interactions for image uploads
├── .env               # Environment variables
├── package.json       # Project metadata and dependencies
├── tsconfig.json      # TypeScript configuration
└── README.md          # Project documentation
```

---

## Working of Each Directory

### `app/`

- **Purpose:** Core application logic including routing, layout, and page-level components.
- **Subdirectories:**
  - `adaptor/`: Handles schema transformation from seller-specific schemas to Prisma schema.
  - `addCatalogue/`: Manages product catalog submission logic.
  - `api/`: Defines API routes for sellers and buyers.
  - `buyerAdaptor/`: Converts Prisma schema into buyer-specific schemas.
  - `user/`: Manages user-related components like authentication and user profile.
- **How It Contributes:**
  - Acts as the primary interface for seller apps, buyer apps, and merchants.

### `components/`

- **Purpose:** Reusable UI components for the application.
- **Subdirectories:**
  - `steps/`: Contains components for managing multi-step catalog forms.
    - `MultiStepForm.tsx`: Orchestrates multi-step form logic.
    - `StepDescriptions.tsx`: Handles product description inputs.
    - `StepPricing.tsx`: Allows users to add pricing details.
  - `ui/`: Houses reusable UI elements like buttons and modals.
- **How It Contributes:**
  - Standardizes UI components for consistency and reusability.
  - Simplifies catalog submission workflows.

### `data/`

- **Purpose:** Stores static data and seed data for initialization.
- **Subdirectories:**
  - `seed/`: Contains JSON files like `products.json` for testing and initializing.
- **How It Contributes:**
  - Provides a predefined dataset for development and testing.

### `db/`

- **Purpose:** Contains database configuration and schema definitions.
- **Subdirectories:**
  - `prisma/`: Manages the Prisma schema and database migrations.
- **How It Contributes:**
  - Serves as the backbone for storing and retrieving catalog data.

### `hooks/`

- **Purpose:** Custom React hooks for reusable logic.
- **Key Files:**
  - `use-toast.ts`: Manages toast notifications for user feedback.
- **How It Contributes:**
  - Improves user experience with streamlined state and UI management.

### `lib/`

- **Purpose:** Utility functions shared across the application.
- **Key Files:**
  - `utils.ts`: Provides reusable functions for data transformation and validation.
- **How It Contributes:**
  - Encapsulates complex logic to maintain cleaner code.

### `public/`

- **Purpose:** Stores static assets such as images and icons.
- **How It Contributes:**
  - Enhances the user interface with visually appealing assets.

### `styles/`

- **Purpose:** Defines global and modular styles.
- **How It Contributes:**
  - Maintains a cohesive and responsive design system.

### `types/`

- **Purpose:** Defines TypeScript types and interfaces.
- **Key Files:**
  - `product.ts`: Type definitions for product-related operations.
- **How It Contributes:**
  - Ensures type safety and reduces runtime errors.

### `utils/`

- **Purpose:** General-purpose utility functions.
- **Key Files:**
  - `cloudinary.ts`: Handles Cloudinary API for image uploads.
- **How It Contributes:**
  - Simplifies image management by abstracting Cloudinary interactions.

---

## How It Works

1. **Data Ingestion:**

   - Merchants enter product details through a form.
   - Seller apps send bulk catalog data via APIs.
   - An Adaptor Layer standardizes all incoming data to Prisma schema.

2. **Data Storage:**

   - Product catalog data is stored in a PostgreSQL database via Prisma ORM.
   - Redis queues manage asynchronous processing of data.

3. **Data Retrieval:**

   - Buyer apps query catalog data using filters (e.g., category, price range).
   - A second Adaptor Layer converts Prisma schema to buyer-specific schemas.

4. **Frontend Interaction:**

   - Merchants and buyers interact with user-friendly React-based UIs.

---

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/DHRUVMEERWAL/v5.git
   cd v5
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up the environment variables:

   - Copy `.env.example` to `.env` and configure the required variables.

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Usage Instructions

- **Merchants:** Use the frontend UI to submit or update product catalogs.
- **Seller Apps:** Send bulk data via `/api/addCatalogue`.
- **Buyer Apps:** Query data via `/api/getCatalogue` with filters.

---

## API Documentation

### Seller APIs

- **POST \*\*\*\*\*\*\*\*****`/api/addCatalogue`**: Add new product catalogs.
- **PUT \*\*\*\*\*\*\*\*****`/api/updateCatalogue`**: Update existing catalog data.
- **DELETE \*\*\*\*\*\*\*\*****`/api/deleteCatalogue`**: Delete catalog data.

### Buyer APIs

- **GET \*\*\*\*\*\*\*\*****`/api/getCatalogue`**: Retrieve catalog data with search filters.

---

## Database Schema

The Prisma schema defines the structure for product catalogs. Example:

```prisma
model Product {
  id             Int          @id @default(autoincrement())
  name           String       
  description    String?
  price          Float
  sku            String        // Stock Keeping Unit
  stockQuantity  Int          // Available stock
  sellerId       Int
  categoryId     Int
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt

  seller         Seller       @relation(fields: [sellerId], references: [id])
  category       Category     @relation(fields: [categoryId], references: [id])
  reviews        Review[]     
  images         Image[]      
  variants       Variant[]    
  specifications Specification[] // Relation to product specifications
}
```

---

## Adaptor Layers

1. **Seller Adaptor:** Converts varied seller schemas to Prisma schema.
2. **Buyer Adaptor:** Converts Prisma schema to buyer-specific schemas.

---

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the MIT License.
