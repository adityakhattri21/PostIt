# PostIT
PostIt is an application where users can signup to post there thoughts and view publically. It allows other users to comment and generate a thread of discussion.

## Setup Locally
There are two ways to setup the project locally.
1. Using Local Nodejs instance.
2. Using Docker

## Prerequisites
1. MongoDB running locally or on Atlas and its URL
2. Nodejs installed locally ([How to install NodeJS ?](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs))
3. Docker installed ([How to install Docker ?](https://docs.docker.com/engine/install/))


## Setup
### Local Nodejs Instance
1. Clone the repository using ```git clone``` and navigate to the folder.
2. Create a ```.env``` file in root folder
   
   ``` bash
   touch .env
   ```
3. Enter the following details in the ```.env``` file

   ``` bash
   DB_URI = YOUR_MONGO_URL
   JWT_SECRET = YOUR_JSON_WEB_TOKEN_SECRET
   ```
   eg.
   ``` bash
   DB_URI = mongodb://username:password@host:port/database
   JWT_SECRET = sdkasdklakwko12k3w1l32l2kdflksdklsjke
   ```
   
4. Open the terminal in the root folder and run the following commands :

   ``` bash
   npm install
   ```
5. Run the server in Dev mode using
    ``` bash
    npm run dev
    ```
    or use command
   ``` bash
    npm start
   ``` 
6. Once this is done, the server is up and runnning at port 3000

   ``` bash
    Server is listening at port 3000
    Connected to database
   ```
### Using Docker
1. To run the app with docker, run the following command

   ``` bash
   docker build --build-arg DB_URI="mongodb://username:password@host:port/database" \
    --build-arg  JWT_SECRET="sdkasdklakwko12k3w1l32l2kdflksdklsjke" \
    -t postit:latest .
   ``` 
2. To run the application, run

   ``` bash
   docker run -it --rm --name postit -p 3000:3000 postit:latest 
   ```
3. The Server is up and running on localhost:3000

### Using Docker Compose 
  If you don't have MongoDB locally installed we can use docker compose to run the application
1. Make the Docker Image of the application using Dockerfile in the folder.
    ``` bash
     docker build --build-arg DB_URI="mongodb://mongo:27017/postit" \
    --build-arg  JWT_SECRET="sdkasdklakwko12k3w1l32l2kdflksdklsjke" \
    -t postit:latest .
    ```
    Note the DB_URI is mongodb://mongo:27017/postit that will be used to connect to the MongoDB container.

2. Run the application using 
 ``` bash
  docker compose up
```

## Architecture
### Tech Stack
- Backend - **NodeJS**

  Node.js is used for making the backend as it is developer friendly and allows use to build scalable application at ease.
- Database - **MongoDB**

  MongoDB is as it provides complete flexibility over schema and facilitates faster & accessible development with help of its cloud clusters.
  It can also cater to handle large data and it read/write using various features like indexes.
- Frontend - **Static files served by ExpressJS**

  For project with less requirement on frontend using framework like React/Angular made no sense at it would have unnecessary boilerplate code and will require
  various additions like Router and handle Cors Error appropriately.
  
### Database Structure
- Users Schema
  
  | Name string | Email string | Password string | Avatar string |
  |------|-------|----------|-------|

- Posts Schema

  | Content string | Author objectID (ref users) | Comments []ObjectID (ref comments) | Timestamps date |
  |----------------|----------------------------|-----------------|------------------------------------|

- Comments Schema

  | Text string | Author (ref users) | Timestamp date |
  |-------------|--------------------|----------------|

## Brief Overwie
1. Users can view the posts without logging in but only authenticated users can post and comment.
2. Users are logged in with a JWT token stored in cookies.
3. Once they are done, they can logout and view all the posts again.

## Screenshot
![Screenshot from 2024-07-08 08-16-40](https://github.com/adityakhattri21/PostIt/assets/101019545/5a645062-bd6d-4076-b83c-b13c33031e76)
![Screenshot from 2024-07-08 08-17-05](https://github.com/adityakhattri21/PostIt/assets/101019545/2d1f29a4-0a00-430a-9da7-be566c9645d5)
![Screenshot from 2024-07-08 08-17-00](https://github.com/adityakhattri21/PostIt/assets/101019545/8977d1ca-e5fe-45b2-85d4-57cc3320b56e)

### Flow Chart
![Untitled Diagram drawio (1)](https://github.com/adityakhattri21/PostIt/assets/101019545/fec9fe43-5769-4c61-9554-36f028786341)



