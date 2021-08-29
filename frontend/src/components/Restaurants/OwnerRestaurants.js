import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { GetUserRestaurants } from '../../services/Restaurants'
import RestaurantCard from './RestaurantCard'

const OwnerRestaurants = ({setLoadingModal}) => {
    const userMatcher = useRouteMatch('/owner/:id/restaurants')
    const [restaurants, setRestaurants] = useState([])
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

    if (restaurants && restaurants.length > 0)
        return (restaurants.map(restaurant => <RestaurantCard restaurant={restaurant} ownerView />))
    else return (<div>NO RESTS</div>)
}

export default OwnerRestaurants
