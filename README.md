# 🛍️ WooCommerce Product Sync App

A full-stack web application that allows sellers to register, log in, create products, and automatically sync them to a WooCommerce store via its REST API.

---

## 🚀 Features

- ✅ Seller registration and login (JWT-based authentication)
- ✅ Product creation with:
  - Name
  - Description
  - Price
  - Image URL
- ✅ View list of created products
- ✅ Sync products to WooCommerce via `/wp-json/wc/v3/products`
- ✅ Mongoose + MongoDB for database management

---

## 🧰 Tech Stack

- **Frontend**: React.js (Vite)
- **Backend**: Node.js with Express.js
- **Database**: MongoDB (with Mongoose)
- **Auth**: JWT (JSON Web Tokens)
- **WooCommerce Integration**: REST API (OAuth 1.0a or Basic Auth)

---

## 🛠️ Setup Instructions

### 🔧 Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/Ashish32507/deploy.git](https://github.com/Ashish32507/deploy.git
   cd deploy/backend
