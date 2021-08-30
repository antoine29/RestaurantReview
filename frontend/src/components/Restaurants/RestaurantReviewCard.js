import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  makeStyles,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  DeleteIcon,
  EditIcon,
  CardActions
} from '../UIComponents'

import DeleteConfirmationDialog from '../DeleteConfirmationDIalog'
import AddReviewResponseDialog from './AddReviewResponseDialog'
import { CreateRestaurantReviewResponse, DeleteRestaurantReview } from '../../services/Restaurants'

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
  try {
    await CreateRestaurantReviewResponse(restaurantId, reviewId, { response: responseString })
    setReloadRestaurant(true)
  }
  catch (error) {
    setToastState({ severity: 'error', message: error.error })
    console.log(error)
  }
  setLoadingModal(false)
}

const RestaurantReviewCard = ({ review, ownerView, setLoadingModal, setToastState, setReloadRestaurant, adminView }) => {
  const [openAddResponse, setOpenAddResponse] = useState(false)
  const [reviewIdToResponse, setReviewIdToResponse] = useState(null)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const classes = useStyles()

  const sendResponse = (response) => {
    _addReviewResponse(review.restaurant, reviewIdToResponse, response, setLoadingModal, setToastState, setReloadRestaurant)
  }

  const onDeleteReview = () => {
    const deleteReviewCall = async () => {
      setLoadingModal(true)
      try{
        await DeleteRestaurantReview(review.restaurant, review.id)
        setReloadRestaurant(true)
      }catch(error){
        setToastState({ severity: 'error', message: 'Error deleting review.' })
      }
      setLoadingModal(false)
    }

    deleteReviewCall()
  }

  return (
    <>
      <DeleteConfirmationDialog openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog} onConfirmation={onDeleteReview} deleteDialog="Delete review?" />
      <AddReviewResponseDialog
        openAddResponse={openAddResponse}
        setOpenAddResponse={setOpenAddResponse}
        sendResponse={sendResponse}
      />
      <Grid item xs={12} md={6}>
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
                <Button onClick={() => {
                  setReviewIdToResponse(review.id)
                  setOpenAddResponse(true)
                }}>
                  response
                </Button>
              }
            </CardContent>
            {adminView &&
            <CardActions disableSpacing>
              <IconButton aria-label="Delete review" onClick={()=>{setOpenDeleteDialog(true)}}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
            }
          </div>
          {/* <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
          </Hidden> */}
        </Card>
      </Grid>
    </>
  )
}

export default RestaurantReviewCard

RestaurantReviewCard.propTypes = {
  review: PropTypes.object,
}
