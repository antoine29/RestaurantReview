import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { GetUserRestaurants, CreateRestaurant } from '../../services/Restaurants'
import RestaurantCard from './RestaurantCard'
import AddRestaurantDialog from './AddRestaurantDialog'
import {
    makeStyles,
    Button,
    Icon,
    AddIcon
} from '../UIComponents'

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}))

const sendNewRestaurant = async (restaurant, setToastState) => {
    try{
        const createdRestaurant = await CreateRestaurant(restaurant)
        return createdRestaurant
    }
    catch(error){
        setToastState({severity: 'error', message: error.error})
        return null
    }
}

const OwnerRestaurants = ({setLoadingModal, setToastState}) => {
    // ToDo: add validation to avoid owners going toa anothers ownerRestaurants view
    // ToDo: fix restaurant creation error toast
    const classes = useStyles()
    const userMatcher = useRouteMatch('/owner/:id/restaurants')
    const [restaurants, setRestaurants] = useState([])
    const [openAddRestaurant, setOpenAddRestaurant] = useState(false)

    useEffect(() => {
        const userId = userMatcher.params.id
        const getRestaurantsCall = async () => {
            setLoadingModal(true)
            const restaurants = await GetUserRestaurants(userId)
            setRestaurants(restaurants)
            setLoadingModal(false)
        }

        getRestaurantsCall()
    }, [])

    const addRestaurant = (restaurant) => {
        const createRestaurantCall = async restaurant => {
            setLoadingModal(true)
            const createdRestaurant = await sendNewRestaurant(restaurant, setToastState)
            if(createdRestaurant) setRestaurants([...restaurants, createdRestaurant])
            setLoadingModal(false)
        }
        
        createRestaurantCall(restaurant)
    }

    if (restaurants && restaurants.length > 0)
        return (
            <>
            <AddRestaurantDialog openAddRestaurant={openAddRestaurant} setOpenAddRestaurant={setOpenAddRestaurant} addRestaurant={addRestaurant}/>
            {restaurants.map(restaurant =>
            <RestaurantCard restaurant={restaurant} ownerView />)}
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={() => {setOpenAddRestaurant(true)}}
            >
              Add restaurant
            </Button>
            </>
        )
    else return (<div>NO RESTS</div>)
}

export default OwnerRestaurants
