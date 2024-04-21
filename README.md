# Full Stack Technical Assignment

# React + TypeScript + Vite

# Running the Codebase

Please read guide to will walk you through setting up and running the codebase on a your machine, detailing the process for both the server and the client setups.

## Prerequisites

Please ensure the following software is installed:

- Node.js (version 14.x or higher recommended)
- npm (version 6.x or higher)
- MongoDB (needed for the server operations)
- A Cloudinary account (required for managing image uploads)

## Setting Up the Server

### Clone the Repository

To get started, please clone the repository by executing:

```
   git clone <repository-url>
```

Remember to replace `<repository-url>` with the actual URL of the repository.

### Navigate to the Server Directory

Move to the server's directory:

```
   cd server
```

### Install Dependencies

Run this command to download all required dependencies:

```
   pnpm install
```

### Set Up Environment Variables

Create a `.env` file at the root of the server directory and please include these environment variables:

```
   MONGODB_URL=<your-mongodb-connection-string>
   CLOUDINARY_NAME=<your-cloudinary-name>
   CLOUDINARY_KEY=<your-cloudinary-key>
   CLOUDINARY_SECRET=<your-cloudinary-secret>
   PORT=<port-number>
```

Fill in the placeholders with actual values for MongoDB connection string, Cloudinary credentials, and the desired server port number.

### Start the Server

Before running the server run:

```
npx tsc
```

```
npx tsc
```

Begin running the server using:

```
   pnpm start
```

The server should now be live, and you will be informed about the port it is operating on via console messages.

## Setting Up the Client

### Navigate to the Client Directory

Switch to the client directory by:

```
   cd client
```

### Install Dependencies

To install all necessary dependencies, run:

```
   npm install
```

### Start the Client

Launch the client with:

```
   npm start
```

The client should now be actively running, and a message will display the URL and port number of the development server.

## Accessing the Application

**Server Access:**
Visit http://localhost:<port-number> in your web browser, replacing `<port-number>` with the port listed in your `.env`.

**Client Access:**
Connect to the client via http://localhost:3000.
