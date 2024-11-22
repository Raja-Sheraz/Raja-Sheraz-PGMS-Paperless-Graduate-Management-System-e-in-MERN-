# MERN Stack Project: Paperless Graduate Management System (PGMS)

## Overview
This project is a **Paperless Graduate Management System (PGMS)** built using the **MERN** stack (MongoDB, Express, React, Node.js). The project is structured with separate **frontend** and **backend** folders to clearly distinguish between the client-side and server-side components. The goal of the system is to manage graduate-related information, helping institutions maintain records and processes without paper.

### Key Features
- **Backend (Node.js & Express)**: Handles all API requests, database interactions, and authentication.
- **Frontend (React)**: Provides a user-friendly interface for users to interact with the system.
- **PDF Generation**: Generate and download reports in PDF format using the `jspdf` library.
- **Material-UI**: Use of Material-UI for a modern and responsive design.

## Installation

To get started with the project, follow these steps:

### Step 1: Install Node.js and MongoDB
Ensure that you have **Node.js** and **MongoDB** installed on your machine.

- **[Install Node.js](https://nodejs.org/)**
- **[Install MongoDB Compass](https://www.mongodb.com/products/compass)**

### Step 2: Clone the Repository
Clone the project repository to your local machine:

```bash
git clone https://github.com/your-username/your-repository.git
```
## Step 3:  Install Dependencies

There are separate dependencies for the frontend and backend. You need to install both.

Install Backend Dependencies: Navigate to the backend directory and install the necessary packages:
```bash

cd backend
npm install --legacy-peer-deps

```
Install Frontend Dependencies: Navigate to the frontend directory and install the necessary packages:

```bash

cd ../frontend
npm install --legacy-peer-deps
npm install @mui/material @emotion/react @emotion/styled --force
npm install jspdf


```



## Step 4: Run the Backend Server

After installing dependencies for the backend, start the server by running the following commands:

```bash

cd backend
npm start

```

## Step 5: Run the Frontend

Now, navigate back to the frontend directory and start the React app:

```bash

cd ../frontend
npm start


```

roubleshooting
If you face any issues during installation, here are a few things to check:

Ensure that both Node.js and MongoDB are properly installed.
Double-check your MongoDB configuration, especially if using a local instance or a cloud-based MongoDB service.
If you encounter any package errors during installation, try using --legacy-peer-deps to bypass peer dependency issues.
Additional Notes
For the backend: You can configure the backend to use a cloud database or a local MongoDB instance. Ensure that the MongoDB URI is correctly set in your configuration files.
For the frontend: You can modify the React app to include additional features or styling as needed, using Material-UI components for a modern UI.


