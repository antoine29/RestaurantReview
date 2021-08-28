import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom'
import { GetRestaurant, GetRestaurantReviews, CreateRestaurantReview } from '../../services/Restaurants';
import { GetStoredUser } from '../../services/Users';
import {
    makeStyles,
    Button,
    Icon
} from '../UIComponents'

import RestaurantCard from './RestaurantCard';
import RestaurantReviewCard from './RestaurantReviewCard';
import AddReviewDialog from './AddReviewDialog';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}))

const _addReview = async (restaurantId, comment, stars, setToastState) => {
    try{
        const storedUser = GetStoredUser()
        const createdReview = await CreateRestaurantReview(restaurantId, comment, stars, storedUser.token)
        return createdReview
    }
    catch(error){
        setToastState({severity: 'error', message: error.error})
        return null
    }
}

const Restaurant = ({ setToastState, setLoadingModal}) => {
    const classes = useStyles()
    const userMatcher = useRouteMatch('/restaurants/:id')
    const [openAddReview, setOpenAddReview] = useState(false)
    const [restaurant, setRestaurant] = useState(null)
    const [restaurantReviews, setRestaurantReviews] = useState(null)

    useEffect(() => {
        const restaurantId = userMatcher.params.id
        const getRestaurantInfoCall = async () => {
            setLoadingModal(true)
            const restaurant = await GetRestaurant(restaurantId)
            const restaurantReviews = await GetRestaurantReviews(restaurantId)
            setRestaurant(restaurant)
            setRestaurantReviews(restaurantReviews)
            setLoadingModal(false)
        }

        if(userMatcher.params.id) getRestaurantInfoCall()
    }, [userMatcher.params.id])

    if(!!restaurant && !! restaurantReviews){
        return (
            <>
            <AddReviewDialog
                openAddReview={openAddReview}
                setOpenAddReview={setOpenAddReview}
                addReview={async (comment, stars)=>{
                    const createdReview = await _addReview(userMatcher.params.id, comment, stars, setToastState)
                    if(createdReview){
                        setRestaurantReviews([...restaurantReviews, createdReview])
                    }
                }}
            />
            <RestaurantCard restaurant={restaurant}/>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
              onClick={() => {setOpenAddReview(true)}}
            >
              Add review
            </Button>
            {restaurantReviews.map(review => <RestaurantReviewCard review={review}/>)}
            </>
        )
    }

    return null

    // return (
        
        // <>
        {/* <div>
            restaurant with id: {userMatcher ? userMatcher.params.id : 'errro'}
        </div> */}
        {/* <div>
            {JSON.stringify(restaurant)}
            {JSON.stringify(restaurantReviews)}
        </div> */}
        // </>
    // )
}

export default Restaurant
