# Dry Fruit Detection and Information System - Backend

## Overview

This is a comprehensive backend API for a Dry Fruit Detection and Information System built with Node.js, Express.js, and MongoDB. The system provides:

- **User Authentication & Authorization**: JWT-based authentication with role-based access control (user/admin)
- **Product Management**: CRUD operations for dry fruit products with nutritional information, pricing, and location data
- **AI Integration**: OpenAI integration for intelligent dry fruit detection and analysis
- **Search & Filtering**: Advanced search functionality with fuzzy search and filtering by province, price, and trending status
- **File Upload**: Image upload support for user profiles and product images
- **Email Services**: Password reset and notification emails
- **Health Information**: Nutritional and health benefits data for dry fruits
- **Location Management**: Province and city-based product categorization
- **Feedback System**: User feedback and review management
- **Statistics**: Admin dashboard with overview statistics

The API follows RESTful conventions and includes comprehensive error handling, data validation, and security measures.

## Features

- 🔐 **Authentication & Security**: JWT tokens, password hashing, role-based access control
- 🍇 **Dry Fruit Detection**: AI-powered identification using OpenAI integration
- 📊 **Nutritional Analysis**: Detailed calorie, protein, carb, and fat tracking
- 🛒 **Product Management**: Complete CRUD operations with image uploads
- 🔍 **Advanced Search**: Fuzzy search with province, price, and trending filters
- 📍 **Location-Based**: Province and city categorization for products
- 📧 **Email Services**: Password reset and user notifications
- 📈 **Statistics Dashboard**: Admin overview with key metrics
- 💬 **Feedback System**: User reviews and feedback management
- 🏥 **Health Information**: Nutritional benefits and dietary guidance
- 📁 **File Management**: Secure image upload and storage
- 🌐 **CORS Support**: Cross-origin resource sharing enabled

## Project Structure

```
app.js
eslint.config.mjs
package.json
server.js
confiq/
    db.js
controller/
    auth.controller.js
    city.js
    contact.js
    feed-back.js
    health.js
    product.controller.js
    province.js
    qa.js
    season.js
    shop.js
    stats.js
    user.controller.js
dev-data/
    data/
        dryfruits.json
        import-dev-data.js
        product.json
middleware/
    auth.js
    error.middleware.js
    optionalAuth.js
    upload-user-image.js
    upload.js
    user.js
models/
    city.js
    contact.js
    feed-back.js
    health.js
    product.model.js
    province.js
    season.js
    shop.js
    user.model.js
repository/
    auth.js
    city.js
    contact.js
    feedback.js
    health.js
    product.js
    province.js
    season.js
    shop.js
    user.js
routes/
    city.js
    contact.js
    feed-back.js
    health.js
    product.routes.js
    province.js
    qaRoutes.js
    season.js
    shop.js
    stats.js
    user.routes.js
services/
    auth.js
    city.js
    contact.js
    email.js
    feedback.js
    health.js
    product.js
    province.js
    season.js
    shop.js
    stats.js
    user.js
uploads/
    products/
    users/
        1764750052860-smiling-young-man-illustration_1308-173524.avif
        1764750060887-smiling-young-man-illustration_1308-173524.avif
        1764750195317-smiling-young-man-illustration_1308-173524.avif
        1764750387426-smiling-young-man-illustration_1308-173524.avif
        1764750612939-smiling-young-man-illustration_1308-173524.avif
        1764750979738-smiling-young-man-illustration_1308-173524.avif
        1764751360515-smiling-young-man-illustration_1308-173524.avif
util/
    app-errors.js
    catch-async.js
```

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Database Structure](#database-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **multer** - File upload handling
- **cors** - Cross-origin resource sharing
- **morgan** - HTTP request logger
- **nodemailer** - Email sending
- **openai** - AI integration for dry fruit detection
- **fuse.js** - Fuzzy search functionality
- **string-similarity** - String comparison algorithms
- **validator** - Data validation
- **dotenv** - Environment variable management

## API Endpoints

### Authentication (`/api/v1/users`)

- **POST** `/api/v1/users/signup` - Register a new user (with profile picture upload)
- **POST** `/api/v1/users/login` - Login user and return JWT token
- **POST** `/api/v1/users/forgotpassword` - Request password reset
- **PATCH** `/api/v1/users/resetpassword/:token` - Reset password with token

### User Management (`/api/v1/users`) - Protected Routes

- **GET** `/api/v1/users/me` - Get current user profile
- **PATCH** `/api/v1/users/updateMyPassword` - Update current user's password
- **PATCH** `/api/v1/users/updateMe` - Update current user profile (with profile picture)
- **DELETE** `/api/v1/users/deleteMe` - Delete current user account

### Admin User Management (`/api/v1/users`) - Admin Only

- **GET** `/api/v1/users/` - Get all users
- **GET** `/api/v1/users/:id` - Get user by ID
- **PATCH** `/api/v1/users/:id` - Update user by ID
- **DELETE** `/api/v1/users/deleteUser/:id` - Delete user by ID (admin only)

### Products (`/api/v1/products`)

- **GET** `/api/v1/products/` - Get all products (optional authentication)
- **GET** `/api/v1/products/search` - Search products with filters (province, price, trending)
- **GET** `/api/v1/products/by-name/:name` - Get product by name
- **GET** `/api/v1/products/:id` - Get product by ID
- **POST** `/api/v1/products/` - Create a new product (with image upload)
- **PATCH** `/api/v1/products/:id` - Update product (with image upload)
- **DELETE** `/api/v1/products/:id` - Delete product (admin only)

### Feedback (`/api/v1/feedbacks`)

- **GET** `/api/v1/feedbacks/` - Get all feedback (public)
- **GET** `/api/v1/feedbacks/:id` - Get feedback by ID
- **POST** `/api/v1/feedbacks/` - Create feedback (user only)
- **DELETE** `/api/v1/feedbacks/:id` - Delete feedback

### Health Information (`/api/v1/health`)

- **GET** `/api/v1/health/` - Get all health information
- **GET** `/api/v1/health/:id` - Get health information by ID
- **POST** `/api/v1/health/` - Create health information (admin only)
- **PUT** `/api/v1/health/:id` - Update health information

### Statistics (`/api/v1/stats`) - Admin Only

- **GET** `/api/v1/stats/overview` - Get overview statistics

### Provinces (`/api/v1/provinces`)

- CRUD operations for province management

### Cities (`/api/v1/cities`)

- CRUD operations for city management

### Shops (`/api/v1/shops`)

- CRUD operations for shop management

### Contacts (`/api/v1/contacts`)

- CRUD operations for contact management

### Seasons (`/api/v1/seasons`)

- CRUD operations for season management

### QA (`/api/qa`)

- Q&A related endpoints

## Database Structure

The application uses MongoDB with Mongoose ODM. The main collections are:

### Users Collection

```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique, validated),
  phoneNumber: String (required, unique, 10-15 digits),
  password: String (required, min 8 chars, hashed),
  role: String (enum: 'user'/'admin', default: 'user'),
  profileImage: String,
  active: Boolean (default: true),
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date
}
```

### Products Collection

```javascript
{
  product: String (required), // Product name
  description: String (required),
  calories: Number (required, min: 0),
  protein: Number (required, min: 0),
  carbs: Number (required, min: 0),
  fats: Number (required, min: 0),
  price: Number (required, min: 0),
  image: String,
  dietInfo: String,
  vitamins: {
    vitaminE: Number,
    vitaminB6: Number,
    vitaminK: Number
  },
  minerals: {
    magnesium: Number,
    potassium: Number,
    iron: Number,
    calcium: Number
  },
  shop: ObjectId (ref: 'Shop'),
  province: ObjectId (ref: 'Province'),
  trending: Boolean (default: false),
  benefits: String,
  unbenefits: String
}
```

### Other Collections

- **Feedback**: User feedback and reviews
- **Health**: Health information related to dry fruits
- **Provinces**: Province/location data
- **Cities**: City data
- **Shops**: Shop/store information
- **Contacts**: Contact form submissions
- **Seasons**: Seasonal information for products

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd Dry-Fruit-Detection-and-Information-System-Backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `config.env` file in the root directory with the following environment variables:

   ```env
   NODE_ENV=development
   PORT=3000
   DATABASE=your-database-here
   JWT_SECRET=your-jwt-secret-key
   JWT_EXPIRES_IN=90d
   EMAIL_USERNAME=your-email@gmail.com
   EMAIL_PASSWORD=your-email-password
   OPENAI_API_KEY=your-openai-api-key
   ```

5. (Optional) Import development data:
   ```bash
   npm run data:import
   ```

## Usage

### Development

```bash
npm run start:dev
```

Starts the server with nodemon for automatic restarts during development.

### Production

```bash
npm run start:prod
```

Starts the server in production mode.

### Regular Start

```bash
npm start
```

Starts the server with nodemon.

### Data Management

```bash
npm run data:import  # Import development data
npm run data:delete  # Delete all data
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
