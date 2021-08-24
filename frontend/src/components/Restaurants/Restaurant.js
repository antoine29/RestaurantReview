import React, { useState, useEffect } from 'react';
import { GetRestaurant, GetRestaurantReviews } from '../../services/Restaurants';
import { useRouteMatch } from 'react-router-dom'
import {
    makeStyles,
    CssBaseline,
    Grid,
    Container
} from '../UIComponents'

// import MainFeaturedPost from './MainFeaturedPost';
import RestaurantCard from './RestaurantCard';
import RestaurantReviewCard from './RestaurantReviewCard';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}))

const Restaurant = ({ id }) => {
    const classes = useStyles();
    const userMatcher = useRouteMatch('/restaurants/:id')
    const [restaurant, setRestaurant] = useState(null)
    const [restaurantReviews, setRestaurantReviews] = useState(null)

    useEffect(() => {
        const restaurantId = userMatcher.params.id
        const getRestaurantInfoCall = async () => {
            const restaurant = await GetRestaurant(restaurantId)
            const restaurantReviews = await GetRestaurantReviews(restaurantId)
            setRestaurant(restaurant)
            setRestaurantReviews(restaurantReviews)
        }

        if(userMatcher.params.id) getRestaurantInfoCall()
    }, [userMatcher.params.id])

    if(!!restaurant && !! restaurantReviews){
        return (
            <>
            <RestaurantCard restaurant={restaurant}/>
            {restaurantReviews.map(review => <RestaurantReviewCard review={review}/>)}
            </>
        )
    }

    return (
        <>
        {/* <div>
            restaurant with id: {userMatcher ? userMatcher.params.id : 'errro'}
        </div> */}
        <div>
            {JSON.stringify(restaurant)}
            {JSON.stringify(restaurantReviews)}
        </div>
        </>
    );
}

export default Restaurant
