import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  makeStyles,
  Paper,
  Typography,
  Rating,
  RoomIcon,  
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  ArrowDownwardIcon,
  ArrowUpwardIcon,
  CommentIcon,
  AnnouncementIcon,
} from '../UIComponents'

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(4),
  },
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
  },
  button: {
    margin: theme.spacing(1),
  },
  chips: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}))

const ResponsedReviewsLabel = reviews => {
  if (reviews && reviews.length > 0) {
    let counter = 0
    reviews.forEach(review => {
      if (!review.response) counter++
    })

    return counter
  }

  return 0
}

const RestaurantCard = ({ restaurant, ownerView, adminView }) => {
  const classes = useStyles()
  const history = useHistory()

  return(
    <Card className={classes.card}>
      <CardActionArea onClick={()=>{ history.push(`/restaurants/${restaurant.id}`)}}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={restaurant.url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {restaurant.name}
          </Typography>
          <Rating name="read-only" value={restaurant.rating.averageStars} readOnly size="large"/>
          <Typography variant="subtitle1" color="textSecondary" component="p">
            <RoomIcon /> {restaurant.address}
          </Typography>
          

          <div className={classes.chips}>
            <Chip
                icon={<CommentIcon />}
                label={`${restaurant.rating.totalReviews} reviews`}
                className={classes.chip}
            />
            <Chip
                icon={<ArrowUpwardIcon />}
                label={`best: ${restaurant.rating.maxStar}`}
                className={classes.chip}
            />
            <Chip
                icon={<ArrowDownwardIcon />}
                label={`lowest: ${restaurant.rating.minStar}`}
                className={classes.chip}
            />
            { ownerView &&
            <Chip
                icon={<AnnouncementIcon />}
                label={`${ResponsedReviewsLabel(restaurant.reviews)} pending reviews`}
                className={classes.chip}
            />
            }
          </div>

        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default RestaurantCard

RestaurantCard.propTypes = {
  post: PropTypes.object,
}