# Jarviot Challenge - Full Stack

## Author

Shubham Jorwal

## Introduction

This repository contains the source code for the Jarviot Challenge - Full Stack. It consists of a frontend and backend application that fetches and displays analytics data.

## Technologies Used

- React.js: Frontend JavaScript library for building user interfaces (I used Vite + React)
- Node.js: JavaScript runtime environment for the backend
- Express.js: Web application framework for Node.js
- axios: Promise-based HTTP client for making API requests

Note: I used MongoDB for database. but I've also wrote a './server/ToUsePostgreSQL.js' file to use PostgreSQL pls corporate with this.

## Getting Started

### Prerequisites

To run this application locally, you need to have the following software installed on your system:

- Node.js
- npm (Node Package Manager)

### Installation

Follow the steps below to run the application on your local machine:

1. Clone the repository:
   git clone https://github.com/ShubhamJorwal/jarviot-challenge-full-stack

2. Navigate to the project directory:
   cd jarviot-challenge-full-stack

3. Install the dependencies for both the frontend and backend applications:
   cd frontend
   npm install
   cd ../backend
   npm install

### Configuration

Before running the application, you need to configure the backend API endpoint URL in the frontend application.

1. Open the file `frontend/src/components/Analytics.jsx` in a text editor.

2. Locate the line that fetches the analytics data from the backend API:
   const response = await axios.get("http://localhost:5000/analytics");

3. Replace `"http://localhost:5000/analytics"` with the actual URL of your backend API.

### Usage

To start the application, follow these steps:

1. Start the backend server:
   cd backend
   npm start

2. In a separate terminal, start the frontend development server:
   cd frontend
   npm start

## Additional Information

### File Structure

- `frontend`: Contains the React frontend application.
- `backend`: Contains the Node.js backend application.

### Customization

- CSS styles: You can customize the CSS styles in the `frontend/src/components/Analytics.scss` file to modify the appearance of the analytics page.
- API endpoint: Update the API endpoint URL in `frontend/src/components/Analytics.jsx` to fetch data from your backend API.

### Contact

For any inquiries or questions, please contact [Your Name] at [secondsj2002@gmail.com].

### Resume

For more information about my skills and experience, please refer to my [resume](https://shubham-sj-resume.vercel.app/).
