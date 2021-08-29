import React, { useState, useEffect } from 'react'
import { GetRestaurants } from '../../services/Restaurants'
import RestaurantCard from './RestaurantCard'

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
        </>
        )
    else return null
}

export default Restaurants
