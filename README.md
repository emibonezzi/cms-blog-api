## CMS Blog API with CRUD Functionality

This repository provides a Node.js and Express.js based API for a Content Management System (CMS) blog. It allows CRUD (Create, Read, Update, Delete) operations on blog posts and serves as a foundational backend development practice project.

### Features

- Create new blog posts
- Retrieve all blog posts or a specific post by ID
- Update existing blog posts
- Delete existing blog posts
- Robust validation of request data using Joi
- Custom error handling for informative responses

### Tech Stack

- **Node.js**: Server-side JavaScript runtime environment
- **Express.js**: Web framework for routing and middleware
- **PostgreSQL**: Relational database for storing blog post data
- **Joi**: Schema validation library for request payloads
- **dotenv**: Library for managing environment variables

### Installation

1.  Clone the repository:

    ```bash
    git clone [https://github.com/username/emibonezzi-cms-blog-api.git](https://github.com/username/emibonezzi-cms-blog-api.git)
    ```

2.  Install dependencies:

    ```bash
    cd emibonezzi-cms-blog-api
    npm install
    ```

3.  Configure environment variables:

    Create a `.env` file in the project root directory and define the following variables:

    ```
    DB_USER=your_database_username
    DB_PASSWORD=your_database_password
    DB_HOST=your_database_host
    DB_PORT=your_database_port
    DB_NAME=your_database_name
    ```

### Usage

1.  Start the server:

    ```bash
    npm start
    ```

    This will run the API on port 3000 by default.

2.  API Endpoints:

    - **GET /blog/posts**: Retrieves all blog posts
    - **GET /blog/posts/:id**: Retrieves a specific blog post by ID
    - **POST /blog/posts**: Creates a new blog post
    - **PATCH /blog/posts/:id**: Updates an existing blog post by ID
    - **DELETE /blog/posts/:id**: Deletes a blog post by ID

**Note:** All requests should be sent to `http://localhost:3000` (or your chosen port)

### Directory Structure

The project includes the following directories and files:

- **index.js**: Main entry point for the server, starting the Express app and handling routing
- **package.json**: Defines project dependencies, scripts, and metadata
- **controllers**: Contains controller functions for handling API requests

  - **postController.js**: Handles CRUD operations for blog posts

- **db**: Connects to the PostgreSQL database

  - **index.js**: Establishes a connection pool

- **models**: Defines data models for blog posts

  - **post.js**: Validates post data using Joi schema

- **routes**: Defines API endpoints and maps them to controller functions

  - **postsRoute.js**: Routes for CRUD operations on blog posts

- **services**: Provides business logic for interacting with the database

  - **postService.js**: Implements functionalities for fetching, creating, updating, and deleting posts

- **utils**: Contains utility functions

  - **MyCustomError.js**: Class for creating custom errors with status codes
  - **validateBody.js**: Validates request body against the post schema
