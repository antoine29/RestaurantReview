import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
    makeStyles,
    Typography,
    Grid,
    Card,
    CardContent,
    Button
} from '../UIComponents'

import AddReviewResponseDialog from './AddReviewResponseDialog'
import { CreateRestaurantReviewResponse } from '../../services/Restaurants'

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
})

const _addReviewResponse = async (restaurantId, reviewId, responseString, setLoadingModal, setToastState, setReloadRestaurant) => {
  setLoadingModal(true)
  try{
    await CreateRestaurantReviewResponse(restaurantId, reviewId, { response: responseString })
    setReloadRestaurant(true)
  }
  catch(error){
    setToastState({severity: 'error', message: error.error})
    console.log(error)
  }
  setLoadingModal(false)
}
const RestaurantReviewCard = ({review, ownerView, setLoadingModal, setToastState, setReloadRestaurant}) => {
  const [openAddResponse, setOpenAddResponse] = useState(false)
  const [reviewIdToResponse, setReviewIdToResponse] = useState(null)
  const classes = useStyles()

  const sendResponse = (response) => {
    _addReviewResponse(review.restaurant, reviewIdToResponse, response, setLoadingModal, setToastState, setReloadRestaurant)
  }

  return (
    <>
    <AddReviewResponseDialog
      openAddResponse={openAddResponse}
      setOpenAddResponse={setOpenAddResponse}
      sendResponse={sendResponse}
    />
    <Grid item xs={12} md={6}>
      {/* <CardActionArea component="a" href="#"> */}
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                @{review.user.username}:
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {review.createdAt}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {review.comment}
              </Typography>
              {!!review.response &&
              <Typography variant="subtitle1" paragraph>
                @{review.response.user.username}: {review.response.response}                    
              </Typography>
              }
              {!review.response && ownerView &&
              <Button onClick={()=>{
                setReviewIdToResponse(review.id)
                setOpenAddResponse(true)
              }}>
                response
              </Button>
              }
            </CardContent>
          </div>
          {/* <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
          </Hidden> */}
        </Card>
      {/* </CardActionArea> */}
    </Grid>
    </>
  )
}

export default RestaurantReviewCard

RestaurantReviewCard.propTypes = {
  review: PropTypes.object,
}
