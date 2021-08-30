import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { GetRestaurants } from '../../services/Restaurants'
import RestaurantCard from './RestaurantCard'

const Restaurants = ({ setToastState, setLoadingModal }) => {
    const history = useHistory()
    const [restaurants, setRestaurants] = useState([])
    useEffect(() => {
        const getRestaurantsCall = async () => {
            setLoadingModal(true)
            try{
                const restaurants = await GetRestaurants()
                setRestaurants(restaurants)
            }
            catch(error){
                setToastState({ severity: 'error', message: 'Error fetching restaurants, please sign in again.' })
                history.push('/signin')
                setLoadingModal(false)
            }
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
