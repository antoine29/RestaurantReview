import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom'
import { GetRestaurant, CreateRestaurantReview } from '../../services/Restaurants';
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
        const createdReview = await CreateRestaurantReview(restaurantId, comment, stars)
        return createdReview
    }
    catch(error){
        setToastState({severity: 'error', message: error.error})
        return null
    }
}

const signedUserIsTheRestaurantOwner = (restaurantOwnerId, signedUserId) => restaurantOwnerId===signedUserId

const Restaurant = ({ setToastState, setLoadingModal, user }) => {
    const classes = useStyles()
    const userMatcher = useRouteMatch('/restaurants/:id')
    const [openAddReview, setOpenAddReview] = useState(false)
    const [restaurant, setRestaurant] = useState(null)
    const [reloadRestaurant, setReloadRestaurant] = useState(false)
    
    const getRestaurantInfoCall = async (restaurantId) => {
        setLoadingModal(true)
        const restaurant = await GetRestaurant(restaurantId)
        setRestaurant(restaurant)
        setLoadingModal(false)            
    }

    useEffect(() => {
        const restaurantId = userMatcher.params.id
        if(userMatcher.params.id) getRestaurantInfoCall(restaurantId)
    }, [userMatcher.params.id])

    useEffect(()=>{
        const restaurantId = userMatcher.params.id
        if(reloadRestaurant && userMatcher.params.id) getRestaurantInfoCall(restaurantId)
        setReloadRestaurant(false)
    }, [reloadRestaurant])

    if(!!restaurant){
        return (
            <>
            <AddReviewDialog
                openAddReview={openAddReview}
                setOpenAddReview={setOpenAddReview}
                addReview={async (comment, stars)=>{
                    const createdReview = await _addReview(userMatcher.params.id, comment, stars, setToastState)
                    if(createdReview){
                        const updatedRestaurant = await GetRestaurant(userMatcher.params.id)
                        setRestaurant(updatedRestaurant)
                    }
                }}
            />
            <RestaurantCard restaurant={restaurant}/>
            {restaurant.owner && user && !signedUserIsTheRestaurantOwner(restaurant.owner.id, user.id) &&
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              endIcon={<Icon>send</Icon>}
              onClick={() => {setOpenAddReview(true)}}
            >
              Add review
            </Button>
            }
            {restaurant.reviews && restaurant.reviews.length > 0 && restaurant.reviews.map(review =>
            <RestaurantReviewCard
                review={review}
                ownerView={signedUserIsTheRestaurantOwner(restaurant.owner.id, user.id)}
                setLoadingModal={setLoadingModal}
                setToastState={setToastState}
                setReloadRestaurant={setReloadRestaurant}
            />)}
            </>
        )
    }

    return null
}

export default Restaurant
