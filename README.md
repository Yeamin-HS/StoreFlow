# 🛒 StoreFlow Backend (6thSense Challenge)

Hellooo!! This is a backend API built with **Node.js**, **TypeScript**, **Express**, and **MongoDB** to manage products and categories.

## 🚀 Features

- **Product Creation** with auto-generated unique product codes
- **Code Generation Logic**:
  - Extract longest strictly increasing substrings from product name
  - Prefix with an MD5 hash of the name
  - Format: `<hash>-<startIndex><substring><endIndex>`
- **Category Association**: Each product is linked to a valid category
- **Update Product Info**: Status, discount, and description
- **Product Filtering**:
  - Filter by category
  - Search by name
  - Include original and discounted price in response

## 🧰   Tech Stack

- Node.js + Express
- TypeScript
- MongoDB Atlas + Compass

## 📬  API Collection

🔗 [Live Postman Collection ] <link> https://tinyurl.com/storeflowpostman </link>

## 🧪 Run Locally

```bash
git clone https://github.com/Yeamin-HS/StoreFlow.git
cd StoreFlow
npm install
npm run dev
