import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom'
import { GetRestaurant, CreateRestaurantReview, DeleteRestaurant } from '../../services/Restaurants';
import {
	makeStyles,
	Button,
	Icon,
  	DeleteIcon,
  	EditIcon,
} from '../UIComponents'

import RestaurantCard from './RestaurantCard';
import RestaurantReviewCard from './RestaurantReviewCard';
import AddReviewDialog from './AddReviewDialog';

import DeleteConfirmationDialog from '../DeleteConfirmationDIalog';

const useStyles = makeStyles((theme) => ({
	mainGrid: {
		marginTop: theme.spacing(3),
	},
}))

const _addReview = async (restaurantId, comment, stars, setToastState) => {
	try {
		const createdReview = await CreateRestaurantReview(restaurantId, comment, stars)
		return createdReview
	}
	catch (error) {
		setToastState({ severity: 'error', message: error.error })
		return null
	}
}

const ownerView = (restaurantOwnerId, signedUserId) => restaurantOwnerId === signedUserId
const adminView = signedUserRole => signedUserRole === 'admin'

const Restaurant = ({ setToastState, setLoadingModal, user }) => {
	const classes = useStyles()
	const history = useHistory()
	const userMatcher = useRouteMatch('/restaurants/:id')
	const [openAddReview, setOpenAddReview] = useState(false)
	const [restaurant, setRestaurant] = useState(null)
	const [reloadRestaurant, setReloadRestaurant] = useState(false)

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

	const getRestaurantCall = async (restaurantId) => {
		setLoadingModal(true)
		try{
			const restaurant = await GetRestaurant(restaurantId)
			setRestaurant(restaurant)
			setLoadingModal(false)
		}
		catch(error){
			setToastState({ severity: 'error', message: 'Error deleting restaurant.' })
			history.push('/restaurants')
		}
		setLoadingModal(false)
	}

	useEffect(() => {
		const restaurantId = userMatcher.params.id
		if (userMatcher.params.id) getRestaurantCall(restaurantId)
	}, [userMatcher.params.id])
	
	useEffect(() => {
		const restaurantId = userMatcher.params.id
		if (reloadRestaurant && userMatcher.params.id) getRestaurantCall(restaurantId)
		setReloadRestaurant(false)
	}, [reloadRestaurant])
	

	const deleteRestaurant = () => {
		console.log('deleting restaurant:', restaurant.id)
		const deleteRestaurantCall = async () => {
			setLoadingModal(true)
			try {
				await DeleteRestaurant(restaurant.id)
				setLoadingModal(false)
				history.push('/restaurants')
			}
			catch(error) {
				setToastState({ severity: 'error', message: 'Error deleting restaurant.' })
			}
			setLoadingModal(false)
		}

		deleteRestaurantCall()
	}

	if (!!restaurant) {
		return (
			<>
				<DeleteConfirmationDialog openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog} onConfirmation={deleteRestaurant} deleteDialog="Delete restaurant ?"  />
				<AddReviewDialog
					openAddReview={openAddReview}
					setOpenAddReview={setOpenAddReview}
					addReview={async (comment, stars) => {
						const createdReview = await _addReview(userMatcher.params.id, comment, stars, setToastState)
						if (createdReview) {
							const updatedRestaurant = await GetRestaurant(userMatcher.params.id)
							setRestaurant(updatedRestaurant)
						}
					}}
				/>
				<RestaurantCard restaurant={restaurant} />
				{user && adminView(user.role) &&
					<div>
						<Button
							variant="contained"
							color="secondary"
							className={classes.button}
							startIcon={<DeleteIcon />}
							onClick={()=>{setOpenDeleteDialog(true)}}
						>
							Delete
						</Button>
						{/* This Button uses a Font Icon, see the installation instructions in the Icon component docs. */}
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							startIcon={<EditIcon />}
						>
							Edit
						</Button>
					</div>
				}
				{restaurant.owner && user && !ownerView(restaurant.owner.id, user.id) &&
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						endIcon={<Icon>send</Icon>}
						onClick={() => { setOpenAddReview(true) }}
					>
						Add review
					</Button>
				}
				{restaurant.reviews && restaurant.reviews.length > 0 && restaurant.reviews.map(review =>
					<RestaurantReviewCard
						review={review}
						ownerView={ownerView(restaurant.owner.id, user.id)}
						setLoadingModal={setLoadingModal}
						setToastState={setToastState}
						setReloadRestaurant={setReloadRestaurant}
					/>)}
			</>
		)
	}

	return null
}

export default Restaurant
