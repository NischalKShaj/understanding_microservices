# Microservices-Based Authentication & File Upload System

## 📌 Overview

This project follows a Microservices Architecture where authentication and file handling services are independent, loosely coupled, and communicate through an API Gateway.

### 📂 Services in the Project

* API Gateway → Centralized entry point for routing requests.
* Auth Service → Handles user authentication (signup, login, JWT verification).
* File Service → Manages file uploads, retrievals, and storage.
* Admin Service → Manages the admin side for the application.

## 🚀 Project Setup

### 1️⃣ Clone the Repository

``` bash
 git clone http://192.168.2.81:3000/nischal/microservice_test_application.git
 cd microservice_test_application
```

### 2️⃣ Install Dependencies

Each service has its own dependencies. Navigate into each folder and install them:

```bash
cd api-gateway && npm install
cd ../auth-service && npm install
cd ../file-service && npm install
cd ../admin && npm install
```

### 3️⃣ Set Up Environment Variables

Create a .env file in each service folder with the following variables:

API Gateway (.env)

```.env
# main frontend url
BASE_URL=http://localhost:5173

# auth server url
AUTH_URL=http://localhost:4001

# file server url
FILE_URL=http://localhost:4002

# admin server url
ADMIN_URL=http://localhost:4003

# Main port of the application
PORT=4000
```

Auth Service (.env)

```.env
# main frontend url
BASE_URL=http://localhost:5173

# Main Gateway URL
API_GATEWAY_URL=http://localhost:4000

# port for the auth service
PORT=4001

# for the database settings
AUTH_DB_USER=postgres
AUTH_DB_HOST=localhost
AUTH_DB_NAME=microservice_authentication
AUTH_DB_PASSWORD=admin
AUTH_DB_PORT=5432
```

File Service (.env)

```.env
# main frontend url
BASE_URL=http://localhost:5173

# Main Gateway URL
API_GATEWAY_URL=http://localhost:4000

# port for the file service
PORT=4002

# for the database settings
FILE_DB_USER=postgres
FILE_DB_HOST=localhost
FILE_DB_NAME=microservice_fileupload
FILE_DB_PASSWORD=admin
FILE_DB_PORT=5432
```

Admin Service

```.env
# main frontend url
BASE_URL=http://localhost:5173

# Main Gateway URL
API_GATEWAY_URL=http://localhost:4000

# port for the admin service
PORT=4003
```

## 🛠 Running the Services

Each service needs to be run separately:

### 1️⃣ Start API Gateway

```bash
cd api-gateway
npm run dev
```

### 2️⃣ Start Auth Service

```bash
cd auth-service
npm run dev
```

### 3️⃣ Start File Service

```bash
cd file-service
npm run dev
```

### 4️⃣ Start Admin Service

```bash
cd admin
npm run dev
```

## 📡 Inter-Service Communication

### Using Axios to Call Other Services via API Gateway

Auth Service fetches user-related files from File Service using the API Gateway:

```javascript
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

async uploadFiles(id, fileName, file_path) {
    try {
      console.log("api", process.env.API_GATEWAY_URL);
      let existUser = await axios.get(
        `${process.env.API_GATEWAY_URL}/auth/user/${id}`
      );
      console.log("exist user", existUser);
      if (!existUser.data) {
        return { success: false, data: "user not found" };
      }
      console.log("user data from the file repo", existUser.data);

      const uploading = await this.#fileRepository.uploadFiles(
        id,
        fileName,
        file_path
      );
      return { success: true, data: uploading };
    } catch (error) {
      console.error("error from here", error);
      return { success: false, data: error };
    }
  }
  ```

## 🔒 CORS Configuration

CORS should be configured in API Gateway to allow frontend access and communication between services.

### API Gateway (corsOptions.js)

```javascript
const dotenv = require("dotenv");
dotenv.config();

const corsOptions = {
  origin: [process.env.BASE_URL, process.env.AUTH_URL, process.env.FILE_URL],
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"],
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "Authorization",
  ],
  credentials: true,
};

module.exports = corsOptions;
```

Each microservice should allow API Gateway’s requests.

## 📌 API Endpoints

### Authentication Service (/auth)

### **Auth Service (/auth)**

| Method | Endpoint     | Description                              |
|--------|------------|------------------------------------------|
| POST   | `/signup`   | For user signup                        |
| POST   | `/login`    | For user login                         |
| GET    | `/user/:id` | Get user details based on the user ID  |

### **File Service (/file)**

| Method | Endpoint  | Description          |
|--------|----------|----------------------|
| POST   | `/upload` | For uploading a file |

### **Admin Service (/admin)**

| Method | Endpoint     | Description                              |
|--------|------------|------------------------------------------|
| GET   | `/users`   | For getting all the users                         |
| GET   | `/files`    | For getting all the files                         |

## 🛠 Tech Stack

* Backend: Node.js, Express.js

* Language: Javascript

* Architecture: Microservices (Clean Architecture)

* Database: PostgreSQL

* Communication: Axios via API Gateway

* File Storage: Local storage (extendable to AWS S3, Cloudinary)

## 👨‍💻 Contributors

[Nischal K Shaj](http://192.168.2.81:3000/nischal)
