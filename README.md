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
node dist/index.js
```

Begin running the server using:

```
   pnpm start
```

or

```
node dist/index.js
```

The server should now be live, and you will be informed about the port it is operating on via console messages.

### API DOCUMENTATION

please visit https://documenter.getpostman.com/view/18403916/2sA3BobruW for full documentation

## Setting Up the Client

### Navigate to the Client Directory

Switch to the client directory by:

```
   cd client
```

### Install Dependencies

To install all necessary dependencies, run:

```
   pnpm install
```

### Start the Client

Launch the client with:

```
   pnpm run dev
```

The client should now be actively running, and a message will display the URL and port number of the development server.

## Accessing the Application

**Server Access:**
Visit http://localhost:<port-number> in your web browser, replacing `<port-number>` with the port listed in your `.env`.

**Client Access:**
Connect to the client via http://localhost:5173/ or port number shown on your console.

### Application User Assumptions

-Registration and Sign In: Users are expected to register and login to access certain features of the application. This includes having an email address and a user name, no password is required. On signing only a user name or email is required, on sign up user needs to provide a user name and email

-Create Post: Users are expected to be able to create post to be viewed by other users on the platform.

-Interaction with Posts: Users are expected to be able to create, view, like, and comment on posts. They might assume that posts are organized in a feed or a timeline, and that they can interact with posts by liking or commenting.

-Friends: Users are assumed be able to view a list of suggested users and add as friends, a friend request is sent to the user who can either accept or reject.

Profile Management: Users are expected to have a profile where they can view their information, view their see their friends.

Notifications: Users are expected to receive notifications for various activities such as post update, or friend requests.
