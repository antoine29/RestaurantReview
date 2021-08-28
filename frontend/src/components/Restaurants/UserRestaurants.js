import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom'
import { GetUserRestaurants } from '../../services/Restaurants';
import { makeStyles } from '../UIComponents'
import RestaurantCard from './RestaurantCard';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}))

const UserRestaurants = () => {
    const userMatcher = useRouteMatch('/users/:id/restaurants')
    const [restaurants, setRestaurants] = useState([])
    useEffect(() => {
        const userId = userMatcher.params.id
        const getRestaurantsCall = async () => {
            const restaurants = await GetUserRestaurants(userId)
            setRestaurants(restaurants)
        }

        getRestaurantsCall()
    }, [])

    if (restaurants && restaurants.length > 0)
        return (restaurants.map(restaurant => <RestaurantCard restaurant={restaurant} />))
    else return (<div>NO RESTS</div>)
}

export default UserRestaurants
