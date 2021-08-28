import React, { useState, useEffect } from 'react';
import { GetRestaurants } from '../../services/Restaurants';
import { makeStyles } from '../UIComponents'

// import Footer from './Footer';
import { Button } from '../UIComponents'
import RestaurantCard from './RestaurantCard';

// const useStyles = makeStyles((theme) => ({
//     mainGrid: {
//         marginTop: theme.spacing(3),
//     },
// }))

const Restaurants = ({setToastState, setLoadingModal}) => {
    const [restaurants, setRestaurants] = useState([])
    useEffect(() => {
        const getRestaurantsCall = async () => {
            setLoadingModal(true)
            const restaurants = await GetRestaurants()
            setRestaurants(restaurants)
            setLoadingModal(false)
        }

        getRestaurantsCall()
    }, [])

    if (restaurants && restaurants.length > 0)
        return (
        <>
        {
            restaurants.map(restaurant => <RestaurantCard key={restaurant.id} restaurant={restaurant} />)
        }
         {/* <Button onClick={()=>{setToastState({severity: 'error', message: 'hii'})}}> click </Button> */}
        </>
        )
    else return null
}

export default Restaurants
