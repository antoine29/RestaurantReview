const bcrypt = require('bcrypt')
const User = require('./models/User')
const Restaurant = require('./models/Restaurant')
const Review = require('./models/Review')

const config = require('./utils/config')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)

const createdOwners = {}
const createdRests = {}

const insertUsers = async () => {
    const saltRounds = 5

    const admin0Pass = await bcrypt.hash("admin0", saltRounds)
    const admin0 = new User({
        name: 'Gus Fring',
        username: "gus_admin0",
        email: "admin0@mail.com",
        role: "admin",
        passwordHash: admin0Pass,
    })
    const createdAdmin0 = await admin0.save()
    createdOwners['admin0'] = createdAdmin0
    console.log(createdAdmin0)
    
    const owner0Pass = await bcrypt.hash("owner0", saltRounds)
    const owner0 = new User({
        name: 'Matt Murdock',
        username: "mat_owner0",
        email: "owner0@mail.com",
        role: "owner",
        passwordHash: owner0Pass,
    })
    const createdOwner0 = await owner0.save()
    createdOwners['owner0'] = createdOwner0 
    console.log(createdOwner0)

    const owner1Pass = await bcrypt.hash("owner1", saltRounds)
    const owner1 = new User({
        name: "Peter Parker",
        username: "peter_owner1",
        email: "owner1@mail.com",
        role: "owner",
        passwordHash: owner1Pass,
    })
    const createdOwner1 = await owner1.save()
    createdOwners['owner1'] = createdOwner1
    console.log(createdOwner1)

    const owner2Pass = await bcrypt.hash("owner2", saltRounds)
    const owner2 = new User({
        name: "Steve R",
        username: "steve_owner2",
        email: "owner2@mail.com",
        role: "owner",
        passwordHash: owner2Pass,
    })
    const createdOwner2 = await owner2.save()
    createdOwners['owner2'] = createdOwner2 
    console.log(createdOwner2)
}

const insertRestaurants = async () => {
    const rest00 = new Restaurant({
        name: 'Piccola Cucina Osteria',
        address: '196 Spring St Soho, New York City, NY 10012-3621',
        url: "https://media-cdn.tripadvisor.com/media/photo-m/1280/16/9f/ef/5c/philip-guardione.jpg",
        owner: createdOwners['owner0']._id,
        rating: {
            averageStars: 5,
            totalReviews: 1,
            minStar:5,
            maxStar:5,
        }
    })
    const createdRest00 = await rest00.save()
    console.log(createdRest00)
    createdRests['rest00'] = createdRest00

    const rest01 = new Restaurant({
        name: 'Boucherie West Village',
        address: '99 7th Ave S, New York City, NY 10014-3415',
        url: 'https://media-cdn.tripadvisor.com/media/photo-o/0f/4b/bd/30/patio.jpg',
        owner: createdOwners['owner0']._id
    })
    const createdRest01 = await rest01.save()
    console.log(createdRest01)

    const rest10 = new Restaurant({
        name: 'City Vineyard',
        address: '233 West Street Pier 26, Hudson River Park, New York City, NY 10013',
        url: 'https://media-cdn.tripadvisor.com/media/photo-o/14/94/d8/8e/city-vineyard-dining.jpg',
        owner: createdOwners['owner1']._id,
        rating: {
            averageStars: 3,
            totalReviews: 1,
            minStar:3,
            maxStar:3,
        }   
    })
    const createdRest10 = await rest10.save()
    console.log(createdRest10)
    createdRests['rest10'] = createdRest10

    const rest11 = new Restaurant({
        name: "Spice Symphony",
        address: "150 E 50th St Between Lexington & 3rd Avenue, New York City, NY 10022-9500",
        url: "https://media-cdn.tripadvisor.com/media/photo-w/10/e3/88/03/olio-e-piu-patio.jpg",
        owner: createdOwners['owner1']._id
    })
    const createdRest11 = await rest11.save()
    console.log(createdRest11)

    const rest20 = new Restaurant({
        name: "Olio e Pi??",
        address: "3 Greenwich Ave, New York City, NY 10014-3543",
        url: "https://media-cdn.tripadvisor.com/media/photo-w/10/e3/88/03/olio-e-piu-patio.jpg",
        owner: createdOwners['owner2']._id,
        rating: {
            averageStars: 1,
            totalReviews: 1,
            minStar:1,
            maxStar:1,
        }  
    })
    const createdRest20 = await rest20.save()
    console.log(createdRest20)
    createdRests['rest20'] = createdRest20

    const rest21 = new Restaurant({
        name: "Joanne",
        address: "70 W 68th St, New York City, NY 10023-6044",
        url: "https://media-cdn.tripadvisor.com/media/photo-w/04/88/ea/1b/joanne.jpg",
        owner: createdOwners['owner2']._id
    })
    const createdRest21 = await rest21.save()
    console.log(createdRest21)
}

const insertReviews = async () => {
    const revR00 = new Review({
        comment: "comment left for rest 00",
        stars: 5,
        restaurant: createdRests['rest00']._id,
        user: createdOwners['owner0']._id
    })
    const createdRevR00 = await revR00.save()
    // picola
    createdRests['rest00'].reviews = [createdRevR00._id]
    await createdRests['rest00'].save()
    console.log(createdRevR00)

    const revR10 = new Review({
        comment: "comment left for rest 10",
        stars: 3,
        restaurant: createdRests['rest10']._id,
        user: createdOwners['owner1']._id
    })
    const createdRevR10 = await revR10.save()
    // vineyard
    createdRests['rest10'].reviews = [createdRevR10._id]
    await createdRests['rest10'].save()
    console.log(createdRevR10)

    const revR20 = new Review({
        comment: "comment left for rest 20",
        stars: 1,
        restaurant: createdRests['rest20']._id,
        user: createdOwners['owner2']._id
    })
    const createdRevR20 = await revR20.save()
    // rest20
    createdRests['rest20'].reviews = [createdRevR20._id]
    await createdRests['rest20'].save()
    console.log(createdRevR20)
}

mongoose
    .connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        await insertUsers()
        await insertRestaurants()
        await insertReviews()
    })
    .catch(error => console.error('error connecting to MongoDB:', error.message))
    .finally(() => {
        process.exit(0)
    })
