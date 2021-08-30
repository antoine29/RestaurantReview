# Restaurant Review - Backend

1. You'll need a mongo instance, the fastest way to get this is by runnig a mongo docker container: 
```
$ docker run -d -p 27017:27017 --name mongo --rm -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=password mongo
```

2. In order to set some testing data
```
$ node testData.js
```

3. The backend service works with an `.env` file at the root of the `bakend` folder.
The content os this file must go as follows:
```
MONGODB_URI='mongodb://mongoadmin:password@localhost:27017/RestaurantReviewApp?authSource=admin'
TEST_MONGODB_URI='mongodb+srv://someUser:somePassword@someMongoUrlConnection'
PORT=3001
SECRET='s3cr37'
```

4. To run the backend service in development mode
```
$ npm install
$ npm run dev
```

### * Developed and tested over Node 12.21 