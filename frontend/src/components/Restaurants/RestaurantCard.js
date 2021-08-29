import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
  Box,
  Rating,
  RoomIcon,
  IconButton,
  DeleteIcon
} from '../UIComponents'

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    }
  },
  highLightedText: {
    backgroundColor: '#c0ffc8',
    // padding: theme.spacing(-0.5)
  }
}))

const ResponsedReviewsLabel = reviews => {
  if(reviews && reviews.length > 0){
    let counter = 0
    reviews.forEach(review => {
      if(!review.response) counter++
    })

    return counter
  }

  return 0
}

const RestaurantCard = ({ restaurant, ownerView, adminView }) => {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Paper
      className={classes.mainFeaturedPost}
      style={{ backgroundImage: `url(${restaurant.url})` }}
      onClick={()=>{ history.push(`/restaurants/${restaurant.id}`)}}>
      {/* Increase the priority of the hero background image */}
      {/* {<img style={{ display: 'none' }} src={post.url} alt={post.imageText} />} */}
      {<img style={{ display: 'none' }} src={restaurant.url} />}
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              <mark className={classes.highLightedText}>{restaurant.name}</mark>
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              <mark className={classes.highLightedText}> <RoomIcon /> {restaurant.address}</mark>
            </Typography>
          </div>
        </Grid>
        <Grid item>
          <div className={classes.mainFeaturedPostContent}>
            <Box component="fieldset" mb={3} borderColor="transparent" style={{backgroundColor: '#c0ffc8', padding: 0, color: 'black'}}>
              <Rating name="read-only" value={restaurant.rating.averageStars} readOnly size="large"/>
              <Typography variant="subtitle1">{restaurant.rating.totalReviews} reviews </Typography>
              <Typography variant="subtitle1">{restaurant.rating.maxStar} max rating / {restaurant.rating.minStar} min rating </Typography>
            </Box>
          </div>
        </Grid>
        { ownerView && 
        <Grid item style={{ backgroundColor:'black' }}>
          Pending reviews { ResponsedReviewsLabel(restaurant.reviews)}
        </Grid>}
      </Grid>
      {adminView &&
      <IconButton aria-label="delete" onClick={ () => {
				/* setUserToDelete(user.id)
				setOpenDeleteDialog(true) */
			}}>
				<DeleteIcon />
			</IconButton>}
    </Paper>
  )
}

export default RestaurantCard

RestaurantCard.propTypes = {
  post: PropTypes.object,
}