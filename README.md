<p align="center">
  <img src="./the-logo.jpg" alt="Egyzon Logo" width="280" style="border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);" />
</p>

<h1 align="center">Egyzon — Multi-Vendor E-Commerce Platform</h1>

<p align="center">
  <strong>A modern, scalable multi-vendor marketplace connecting Egyptian shop owners and artisans with customers nationwide.</strong>
</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#system-architecture">Architecture</a> •
  <a href="#technologies">Technologies</a> •
  <a href="#repository-structure">Repository Structure</a> •
  <a href="#key-features">Key Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#environment-variables">Environment Variables</a> •
  <a href="#api-documentation">API Docs</a>
</p>

---

## 📌 Overview

**Egyzon** is a full-stack multi-vendor e-commerce platform designed specifically for the Egyptian market. It empowers local merchants, shop owners, and vendors to set up digital storefronts, manage catalogs, process orders, and withdraw earnings. Customers enjoy an intuitive, responsive shopping experience with localized payment gateways, instant cart/wishlist management, and real-time order notifications.

The project is organized as a modular monorepo containing:
- **Client (`codeBase/client`)**: Customer storefront and seller self-service portal built with Next.js 16 App Router.
- **Server (`codeBase/server`)**: Robust RESTful API and WebSocket engine built with Express 5, TypeScript, MongoDB, and Redis.
- **Admin Dashboard (`codeBase/admin`)**: Operations and platform management portal built with React 19, React Router v7, and Radix UI.
- **Planning (`Planning`)**: Architecture diagrams including Use Case, Class, and Entity-Relationship (ERD) diagrams.

---

## 🏗 System Architecture & Design

The platform's design is documented in the [`Planning`](./Planning) directory:

- **Use Case Diagram** (`Planning/new ecommerce platform use case.drawio.png`): Details interactions across the three core actors—**Customer**, **Seller**, and **Admin**.
- **Class Diagram** (`Planning/class diagram.drawio.png`): Maps domain entities, methods, and relationships (`User`, `Customer`, `Seller`, `Product`, `Order`, `Payment`, `Review`, `Cart`, `Wishlist`).
- **Entity Relationship Diagram (ERD)** (`Planning/ERD Diagram.jpg`): Outlines MongoDB schemas, document relations, transactions, wallets, and auditing collections.

```
                  ┌──────────────────────────────────────────────┐
                  │                 EGYZON CLIENT                │
                  │         Next.js 16 (React 19, Tailwind)       │
                  └───────────────┬──────────────────────────────┘
                                  │ HTTP / WebSockets
                                  ▼
┌──────────────────────┐  REST / WS  ┌─────────────────────────────────┐
│     ADMIN PORTAL     │────────────▶│          EGYZON SERVER          │
│ React 19 + Radix UI  │             │   Express 5 + TypeScript Engine  │
└──────────────────────┘             └───────────────┬─────────────────┘
                                                     │
                   ┌───────────────────┬─────────────┴──────┬───────────────────┐
                   ▼                   ▼                    ▼                   ▼
             ┌───────────┐       ┌───────────┐        ┌───────────┐       ┌───────────┐
             │  MongoDB  │       │   Redis   │        │  Cloudinary│      │  Paymob   │
             │ Database  │       │Cache/Limit│        │Media/Assets│      │ Payments  │
             └───────────┘       └───────────┘        └───────────┘       └───────────┘
```

---

## 💻 Technologies

### 1. Client-Side (`codeBase/client`)
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router architecture with React Server Components & Client Components)
- **Library**: React 19
- **Language**: TypeScript 5 (Strict Mode)
- **Styling**: Tailwind CSS v4 & PostCSS
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & Base UI / Radix primitives
- **Icons**: Lucide React & React Icons
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [SWR](https://swr.vercel.app/) & Axios
- **Real-Time**: Socket.IO Client
- **Carousel & Media**: Embla Carousel React

### 2. Server-Side (`codeBase/server`)
- **Runtime & Framework**: [Node.js](https://nodejs.org/) & [Express 5](https://expressjs.com/) (ES Modules)
- **Language**: TypeScript (compiled via `tsc` / run with `tsx` & `nodemon`)
- **Database & ODM**: [MongoDB](https://www.mongodb.com/) via [Mongoose 9](https://mongoosejs.com/)
- **Caching & Rate Limiting**: [Redis](https://redis.io/), `rate-limit-redis`, `express-rate-limit`
- **Authentication & Security**:
  - JSON Web Tokens (`jsonwebtoken`) with HTTP-Only Cookie storage
  - Passport.js with Google OAuth 2.0 (`passport-google-oauth20`)
  - Password hashing with `bcryptjs`
  - Helmet for secure HTTP headers
  - ClamAV integration (`clamscan`) for antivirus checks on uploaded files
  - XSS prevention with `sanitize-html`
- **File Uploads**: `multer`, `file-type` MIME inspection, and [Cloudinary SDK](https://cloudinary.com/)
- **Payment & Payout Gateway**: [Paymob](https://paymob.com/) Accept & Payouts API integration (HMAC SHA-512 verification, iframe checkout, encrypted bank details with AES)
- **Email Delivery**: [Resend](https://resend.com/) & [Nodemailer](https://nodemailer.com/) (Gmail SMTP)
- **Real-Time Communication**: [Socket.IO](https://socket.io/) (HTTP server attached)
- **API Documentation**: [Swagger / OpenAPI 3.0](https://swagger.io/) via `swagger-ui-express`
- **Validation**: [Zod](https://zod.dev/)
- **Logging**: Winston logger & Morgan HTTP request logging

### 3. Admin Portal (`codeBase/admin`)
- **Framework**: React 19 (SPA bootstrapped with Create React App & TypeScript)
- **Routing**: React Router DOM v7
- **UI Library**: Radix UI Themes (`@radix-ui/themes`) & Tailwind CSS v3
- **Charts & Data Analytics**: [Recharts](https://recharts.org/)
- **State & Data Fetching**: Zustand, SWR, Axios
- **Real-Time Updates**: Socket.IO Client

---

## 📂 Repository Structure

```plaintext
Egyzon/
├── the-logo.jpg                # Egyzon official logo
├── README.md                   # Main project documentation
├── Planning/                   # System design & architectural diagrams
│   ├── README.md               # Planning documentation summary
│   ├── new ecommerce platform use case.drawio.png
│   ├── class diagram.drawio.png
│   └── ERD Diagram.jpg
└── codeBase/
    ├── client/                 # Next.js 16 Customer & Seller storefront
    │   ├── src/
    │   │   ├── app/            # App router pages, layouts, and route groups:
    │   │   │   ├── (auth)/     # Authentication pages (login, register, verification)
    │   │   │   ├── (seller)/   # Seller dashboard, inventory, store setup
    │   │   │   ├── (store)/    # Customer shopping pages, product listings, cart
    │   │   │   └── api/        # Next.js API bridge endpoints
    │   │   ├── components/     # Reusable UI & feature components
    │   │   ├── contexts/       # React Contexts (e.g. AuthContext)
    │   │   ├── hooks/          # Custom reusable React hooks
    │   │   ├── lib/            # ServerClient and utilities
    │   │   ├── services/       # Client-side API service layer
    │   │   ├── stores/         # Zustand global stores
    │   │   └── types/          # TypeScript definitions
    │   └── package.json
    │
    ├── server/                 # Express 5 + TypeScript backend server
    │   ├── server.ts           # Server entry point, middleware & route mounting
    │   ├── src/
    │   │   ├── config/         # Database, Redis, Socket.IO, and Cloudinary configuration
    │   │   ├── controller/     # Request handlers (auth, products, orders, etc.)
    │   │   ├── docs/           # Swagger specification definitions
    │   │   ├── middleware/     # Rate limiter, auth guards, ClamAV, Morgan logger
    │   │   ├── models/         # Mongoose database models & schemas
    │   │   ├── routes/         # API route declarations
    │   │   ├── services/       # Business logic (payment, email, wallet, notifications)
    │   │   ├── utils/          # Winston logger, encryption, token helpers
    │   │   └── validators/     # Zod schema validation
    │   └── package.json
    │
    └── admin/                  # React 19 Admin dashboard portal
        ├── src/
        │   ├── components/     # Admin-specific navigation, tables, modals
        │   ├── pages/          # Seller verification, user management, metrics
        │   ├── services/       # Admin API integration services
        │   └── context/        # Socket and Auth contexts
        └── package.json
```

---

## 🚀 Key Features

### 🛍️ Customers
- **Catalog & Discovery**: Multi-criteria search, category filters, sorting, and dynamic product showcases.
- **Cart & Wishlist**: Persistent cart and wishlist with real-time stock sync.
- **Secure Checkout**: Paymob card payments, mobile wallets, and cash on delivery (COD).
- **Order Management**: Order tracking, status history, and item-level delivery updates.
- **Reviews & Ratings**: Verified customer ratings with feedback submissions.
- **Real-Time Alerts**: In-app notifications when order status changes.

### 🏪 Vendors & Sellers
- **Onboarding & Verification**: Business registration, KYC document uploads, and automated antivirus scanning.
- **Inventory & Catalog Management**: Dynamic product creation, image uploads with Cloudinary, price discounts, and SKU variations.
- **Order Fulfillment**: Track seller-specific orders and update shipment steps.
- **Wallet & Payouts**: Real-time sales balance calculation, bank detail management (AES-encrypted), and payout requests via Paymob.

### 🛡️ Admin & Operations
- **Seller Verification**: Review and approve/reject seller applications and legal identity documents.
- **Platform Governance**: Moderate products, categories, users, and disputes.
- **Financial Auditing**: Platform-wide transaction monitoring and fee splits.
- **Live Analytics**: Visualized revenue charts, top categories, and growth statistics using Recharts.

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher (or pnpm / yarn)
- **MongoDB**: Local replica set or MongoDB Atlas URI
- **Redis**: Local instance or cloud Redis server

---

### 1. Setting Up the Server

```bash
cd codeBase/server

# Install dependencies
npm install

# Create environment file (.env) and fill in credentials
cp .env.example .env # or configure .env directly

# Start in development mode (with nodemon + tsx)
npm run dev

# Or build and start production build
npm run build
npm start
```
The server will run on `http://localhost:8080`.

---

### 2. Setting Up the Client (Storefront)

```bash
cd codeBase/client

# Install dependencies
npm install

# Start Next.js development server
npm run dev

# Build for production
npm run build
npm start
```
The client will run on `http://localhost:3000`.

---

### 3. Setting Up the Admin Dashboard

```bash
cd codeBase/admin

# Install dependencies
npm install

# Start React admin app
npm start
```
The admin portal will run on `http://localhost:3001` (or next available port).

---

## 🔐 Environment Variables

### Server (`codeBase/server/.env`)
| Variable | Description |
| :--- | :--- |
| `PORT` | Server listening port (e.g. `8080`) |
| `MONGO_URI` | MongoDB connection string |
| `REDIS_URL` | Redis connection URL (`redis://localhost:6379`) |
| `JWT_SECRET` | Secret key for access token signing |
| `REFRESH_TOKEN_SECRET`| Secret key for refresh tokens |
| `FRONTEND_URL` | Client origin for CORS (e.g. `http://localhost:3000`) |
| `CLOUDINARY_*` | Cloud name, API key, and Secret for asset storage |
| `GOOGLE_*` | Google OAuth Client ID, Secret, and Callback URL |
| `PAYMOB_*` | Paymob API keys, Public/Secret Keys, HMAC Key, & IFrame ID |
| `BANK_ENCRYPTION_KEY` | 32-byte hexadecimal key for AES bank data encryption |
| `GMAIL_*` / `RESEND_*` | SMTP credentials for email delivery |

### Client (`codeBase/client/.env.local`)
| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_BACKEND_URL` | Base URL of the Express backend (default: `http://localhost:8080`) |
| `NEXT_PUBLIC_SOCKET_URL`  | URL for WebSocket connection (default: `http://localhost:8080`) |
| `NEXT_PUBLIC_APP_URL`     | Public frontend URL (default: `http://localhost:3000`) |

### Admin (`codeBase/admin/.env`)
| Variable | Description |
| :--- | :--- |
| `REACT_APP_API_BASE_URL` | Express API endpoint (default: `http://localhost:8080/api`) |
| `REACT_APP_SOCKET_URL`   | WebSocket server URL (default: `http://localhost:8080`) |

---

## 📖 API Documentation

The backend server features built-in interactive **Swagger / OpenAPI** documentation.

1. Ensure the server is running (`npm run dev` in `codeBase/server`).
2. Open your browser and navigate to:
   - **Interactive UI**: `http://localhost:8080/api-docs`
   - **JSON Spec**: `http://localhost:8080/api-docs.json`

### Key Endpoint Groups
| Route | Description |
| :--- | :--- |
| `/api/auth` | User registration, login, refresh token, and Google OAuth |
| `/api/product` | Product catalog, search, details, and seller management |
| `/api/category` | Category hierarchy and taxonomy |
| `/api/cart` | Shopping cart operations |
| `/api/wishlist` | Saved items and wishlist management |
| `/api/order` | Order creation, tracking, and cancellation |
| `/api/payment` | Paymob payment initiation and HMAC webhook callbacks |
| `/api/seller` | Seller onboarding, document upload, and store settings |
| `/api/wallet` | Vendor balance, bank information, and payout requests |
| `/api/customer` | Customer profile and address book management |
| `/api/admin` | Administrative moderation, user access, and verification |
| `/api/notifications`| Notification retrieval and read-state management |

---

## 📄 License

This project is licensed under the ISC License.

