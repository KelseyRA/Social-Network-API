# Social-Network-API

  ## Table of Content
  
  - [Project Description](#Description)
  - [Acceptance Criteria](#Acceptance-Criteria)
  - [Installation](#Installation)
  - [Contributors](#Contributors)
  - [Questions](#Questions)

## Description

```
This application is the backend of a social media application. The routes created do the following. 
GET routes are made to get all users and all thoughts. GET by ID routes are created to get users by their 
ID or a thought by it's ID. PUT routes are created to update a user and thoughts. 
POST routes are present to create a user, thoughts, and add a friend to a user. 
DELETE routes were created to delete a user, thought, or a friend. 
Lastly a POST route was created to add a reaction to a thought as well as a DELETE route to remove the reaction.
```
```
A link to the demo video is below.
```
https://drive.google.com/file/d/1n-4ZGLEKy58eMPAPfkKtajXiKVsqY7Cf/view?usp=share_link

## Acceptance-Criteria

```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

![Screenshot of Insomnia](<./Screenshot%20(37).png>)

## Installation

```
This application uses express.js, mongoDB, mongoose, node.js, and insomnia. To start the server run the command 'node server.js'.
```

## Contributors

```
Kelsey Alderman, Tutor: Matthew Calimbas, and UPenn Bootcamp Repo Resources.
```

## Questions

```
- Email: kra7888@gmail.com
- GitHub: https://github.com/KelseyRA
```