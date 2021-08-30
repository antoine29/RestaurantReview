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
  CardActions,
  CardHeader,
  Avatar,
  red
} from '../UIComponents'

import DeleteConfirmationDialog from '../DeleteConfirmationDIalog'
import AddReviewResponseDialog from './AddReviewResponseDialog'
import { CreateRestaurantReviewResponse, DeleteRestaurantReview } from '../../services/Restaurants'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
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
      try {
        await DeleteRestaurantReview(review.restaurant, review.id)
        setReloadRestaurant(true)
      } catch (error) {
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
        <Card >
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title={review.user.username}
            subheader={review.createdAt}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {review.comment}
            </Typography>
          </CardContent>

          {!!review.response &&
            <>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                title={review.response.user.username}
                subheader={review.createdAt}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {review.response.response}
                </Typography>
              </CardContent>
            </>
          }

          {!review.response && ownerView &&
            <CardActions disableSpacing>
                <Button onClick={() => {
                  setReviewIdToResponse(review.id)
                  setOpenAddResponse(true)
                }}>
                  response
                </Button>
            </CardActions>
              }

          {adminView &&
              <CardActions disableSpacing>
                <IconButton aria-label="Delete review" onClick={() => { setOpenDeleteDialog(true) }}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            }
        </Card>
      </Grid>
    </>
  )
}

export default RestaurantReviewCard

RestaurantReviewCard.propTypes = {
  review: PropTypes.object,
}
