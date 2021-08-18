- Entities:
    - User (reviewer, owner and admin)
        reviewer: can create reviews
        owner: can create restaurants
        admin: can upgrade reviewer users into owner
    - Restaurant
    - Review

DB:
docker run -d -p 27017:27017 --name mongo --rm -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=password mongo

.env:
MONGODB_URI='mongodb://mongoadmin:password@localhost:27017/RestaurantReviewApp?authSource=admin'
TEST_MONGODB_URI='mongodb+srv://someUser:somePassword@someMongoUrlConnection'
PORT=3001
SECRET='s3cr37'

todo:
- average star rate per restaurant
- default admin user
- endpoint to upgrade users
- .env existence validation
- pagination
- ts migration