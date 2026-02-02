# Dry Fruit Detection and Information System - Backend

## Overview
This project is a backend system for detecting and managing information about various dry fruits. It provides a RESTful API for interacting with the data.

## Table of Contents
- [Technologies Used](#technologies-used)
- [API Endpoints](#api-endpoints)
- [Database Structure](#database-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Multer for file uploads

## API Endpoints
### Authentication
- **POST** `/api/auth/login` - Login user and return JWT token.
- **POST** `/api/auth/register` - Register a new user.

### Users
- **GET** `/api/users` - Get all users.
- **GET** `/api/users/:id` - Get user by ID.
- **PUT** `/api/users/:id` - Update user by ID.
- **DELETE** `/api/users/:id` - Delete user by ID.

### Products
- **GET** `/api/products` - Get all products.
- **GET** `/api/products/:id` - Get product by ID.
- **POST** `/api/products` - Create a new product.
- **PUT** `/api/products/:id` - Update product by ID.
- **DELETE** `/api/products/:id` - Delete product by ID.

### Feedback
- **GET** `/api/feedback` - Get all feedback.
- **POST** `/api/feedback` - Submit feedback.

### Health Check
- **GET** `/api/health` - Check the health of the API.

## Database Structure
The database consists of the following collections:
- **Users**: Stores user information.
- **Products**: Stores product details.
- **Feedback**: Stores user feedback.

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
4. Create a `.env` file based on the `.env.example` file and configure your environment variables.

## Usage
To start the server, run:
```bash
npm start
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

## License
This project is licensed under the MIT License.