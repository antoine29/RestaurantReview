import React, { useState, useEffect } from 'react';
import { GetRestaurants } from '../../services/Restaurants';
import { makeStyles } from '../UIComponents'

import RestaurantCard from './RestaurantCard';
// import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}))

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([])
    useEffect(() => {
        const getRestaurantsCall = async () => {
            const restaurants = await GetRestaurants()
            setRestaurants(restaurants)
        }

        getRestaurantsCall()
    }, [])

    if (restaurants && restaurants.length > 0)
        return (restaurants.map(restaurant => <RestaurantCard restaurant={restaurant} />))
    else return (<div>NO RESTS</div>)
}

export default Restaurants
