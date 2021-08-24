import React, { useState, useEffect } from 'react';
import { GetRestaurants } from '../../services/Restaurants';
import {
    makeStyles,
    CssBaseline,
    Grid,
    Container,
    GitHubIcon,
    FacebookIcon,
    TwitterIcon
} from '../UIComponents'
// import TopBar from './TopBar';
// import LeftDrawer from '../LeftDrawer';

// import MainFeaturedPost from './MainFeaturedPost';
import RestaurantCard from './RestaurantCard';
// import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
}))

// const mainFeaturedPost = {
//   title: 'Title of a longer featured blog post',
//   description:
//     "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
//   image: 'https://source.unsplash.com/random',
//   imgText: 'main image description',
//   linkText: 'Continue reading…',
// };

// const featuredPosts = [
//   {
//     title: 'Featured post',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageText: 'Image Text',
//   },
//   {
//     title: 'Post title',
//     date: 'Nov 11',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageText: 'Image Text',
//   },
// ];

// const posts = [post1, post2, post3];


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
