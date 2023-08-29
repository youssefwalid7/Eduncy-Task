# Backend Assessment
Welcome to the blog RESTful API Web App! This application allows authenticated users the ability to Login, make posts, and only delete or edit their posts.
This README provides an overview of the project, installation instructions, and usage guidelines.

## Overview
Technologies Used:
Node.js: The server-side runtime environment used for building the API and authenticating requests.
MongoDB: The NoSQL database for storing user data and posts.
AWS Cognito: The authentication service for secure user registration and login.


## Features
User Registration: New users can sign up and create an account and verify it using AWS Cognito.
User Authentication: Secure login and access control for registered users using AWS Cognito.
CRUD operations for BLOG posts (`GET`, `PUT` and `DELETE` can be called only by the user user who created the post).

## Docker Steps
build Docker: docker build -t "Appname".
run Docker to test the build: docker run -p 3000:3000 "Appname".

## .env Example
SERVER_PORT=
USER_POOL_ID=
CLIENT_ID=
MONGO_DB=
