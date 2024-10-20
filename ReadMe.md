# Rule Engine Project

This project is a 3-tier rule engine application designed to determine user eligibility based on attributes such as age, department, income, and spend. It allows dynamic creation, modification, and combination of rules using an Abstract Syntax Tree (AST). The project also includes **JWT-based authentication to ensure only the admin can create, modify, or combine rules.

## Features
- Dynamic Rule Creation: Create rules using an intuitive UI.
- Rule Combination: Combine multiple rules using AND or OR operators.
- Rule Modification: Modify existing rules by their ID.
- Rule Evaluation: Evaluate user data against a set of rules.
- Authentication: JWT-based admin authentication to secure access to rule management.
- AST Representation: Visualize rules as an Abstract Syntax Tree (AST).
- Responsive UI: Simple and clean user interface.

## Technologies Used
- *Backend*: Node.js, Express.js, MongoDB, Mongoose
- *Frontend*: React.js
- *Authentication*: JWT (JSON Web Tokens)
- *Database*: MongoDB (using Mongoose ODM)
- *API Testing*: Postman
- *Environment*: Docker (optional)

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MongoDB (local instance or cloud instance, such as MongoDB Atlas)
- Postman (for testing API requests)

---

## Installation and Setup

### 1. Clone the Repository


git clone https://github.com/HARISHsPareek/Harish_assignment1 

### 2. change the directory

`cd rule-engine`


### 3. Install Dependencies 
  ### 3.1 Backend

`cd server`

`npm install`

  ### 3.2 Frontend

`cd ..`

`cd frontend`

`npm install`
        


### 4. Set Up Environment Variables
Create a .env file in the server directory and add the following variables:


PORT=5000
JWT_SECRET="your_jwt_secret"
MONGO_URI="your_mongodb_connection_string"


### 5. Run the Backend Server
Navigate to the server directory and run the backend server:

`cd ..`

`cd server`

`node server.js`

### 5. Run the Frontend Application
Navigate to the client directory and start the React frontend:

`cd ..`

`cd frontend`

`npm run dev`


# To use Docker-compose file:
    docker-compose up --build
## Demo

Insert gif or link to demo

