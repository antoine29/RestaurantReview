# Restaurant Review
This application is splitted in two folders: `Backend` and `Frontend`.

## Development setup
* Developed and tested over Node 12.21

### 1. Backend
This a NodeJs/Express API service. You'll need a MongoDB instance runnig as a persistence layer for the aplication. The fastest way to get this is by runnig a mongo docker container:
```
$ docker run -d -p 27017:27017 --name mongo --rm -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=password mongo
```

* Aditionally, In order to set some testing data you can run this script
```
$ node testData.js
```

The backend service works with an `.env` file at the root of the `bakend` folder. The content of this file must go as follows:
```
MONGODB_URI='mongodb://mongoadmin:password@localhost:27017/RestaurantReviewApp?authSource=admin'
TEST_MONGODB_URI='mongodb+srv://someUser:somePassword@someMongoUrlConnection'
COMPOSE_MONGODB_URI='mongodb://mongo:27017/RestaurantReviewApp
PORT=3001
SECRET='s3cr37'
```
To run the backend service in development mode:
```
$ npm install
$ npm run dev
```

### 2. Frontend
This is a React/MaterialUI single page web-application. It works with the `backend` service running on port 3001. 
To run the frontend application:
``` 
$ npm install
$ npm start
```

You can start navigating the application by 'signing up' a new account.

### Docker-Compose setup
Aditionally you can run a production deployment of the overall application (including the testing data) by following the next instructions:

1. Set your host ip in frontend/package.json file as follows:
``` 
...
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "prod_build": "REACT_APP_BACKEND_API='http://{YOUR_HOST_IP}:3001' npm run build"
  },
...
``` 

2. Build the Docker image. Being in the same folder of the `Dockerfile` file run:
``` 
$ docker build . -t rrapp
``` 

3. Run the compose file:
``` 
$ docker-compose -f docker-compose.yml up
``` 

At this point, backend service should be running on port 3001 and frontend should be accesible from port 5000.

### * Testing data
By runnig the test data script you'll get following credentials to sign in:

| email           | password |
|-----------------|----------|
| admin0@mail.com | admin0   |
| owner0@mail.com | owner0   |
| owner1@mail.com | owner1   |
| owner2@mail.com | owner2   |
