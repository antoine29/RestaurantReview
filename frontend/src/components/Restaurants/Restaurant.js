import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom'
import { GetRestaurant, CreateRestaurantReview, DeleteRestaurant, UpdateRestaurant } from '../../services/Restaurants';
import {
	makeStyles,
	Button,
	DeleteIcon,
	EditIcon,
	SendIcon,
} from '../UIComponents'

import RestaurantCard from './RestaurantCard';
import RestaurantReviewCard from './RestaurantReviewCard';
import AddReviewDialog from './AddReviewDialog';

import DeleteConfirmationDialog from '../DeleteConfirmationDIalog';
import UpdateRestaurantDialog from './UpdateRestaurantDialog';

const useStyles = makeStyles((theme) => ({
	content: {
		marginBottom: theme.spacing(3),
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

const isOwnerView = (restaurantOwnerId, signedUserId) => restaurantOwnerId === signedUserId
const isAdminView = signedUserRole => signedUserRole === 'admin'

const Restaurant = ({ setToastState, setLoadingModal, user }) => {
	const classes = useStyles()
	const history = useHistory()
	const userMatcher = useRouteMatch('/restaurants/:id')
	const [openAddReview, setOpenAddReview] = useState(false)
	const [restaurant, setRestaurant] = useState(null)
	const [reloadRestaurant, setReloadRestaurant] = useState(false)

	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
	const [openUpdateRestaurantDialog, setOpenUpdateRestaurantDialog] = useState(false)
	const [restaurantToUpdate, setRestaurantToUpdate] = useState(null)

	const getRestaurantCall = async (restaurantId) => {
		setLoadingModal(true)
		try {
			const restaurant = await GetRestaurant(restaurantId)
			setRestaurant(restaurant)
			setLoadingModal(false)
		}
		catch (error) {
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
			catch (error) {
				setToastState({ severity: 'error', message: 'Error deleting restaurant.' })
			}
			setLoadingModal(false)
		}

		deleteRestaurantCall()
	}

	const updateRestaurant = restaurant => {
		const updateRestaurantCall = async () => {
			setLoadingModal(true)
			try {
				await UpdateRestaurant(restaurant.id, {
					name: restaurant.name,
					address: restaurant.address,
					url: restaurant.url,
				})
				setReloadRestaurant(true)
			}
			catch (error) {
				setToastState({ severity: 'error', message: 'Error updating restaurant.' })
			}
			setLoadingModal(false)
		}

		updateRestaurantCall()
	}

	if (restaurant) {
		return (
			<>
				<UpdateRestaurantDialog openUpdateRestaurant={openUpdateRestaurantDialog} setOpenUpdateRestaurant={setOpenUpdateRestaurantDialog} onUpdate={updateRestaurant} restaurant={restaurantToUpdate} />
				<DeleteConfirmationDialog openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog} onConfirmation={deleteRestaurant} deleteDialog="Delete restaurant ?" />
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
				<div className={classes.content}>
					{user && isAdminView(user.role) &&
						<>
							<Button
								variant="contained"
								color="secondary"
								className={classes.button}
								startIcon={<DeleteIcon />}
								onClick={() => { setOpenDeleteDialog(true) }}
							>
								Delete
							</Button>
							{/* ToDo: this button seems not be working at the first click */}
							<Button
								variant="contained"
								color="primary"
								className={classes.button}
								startIcon={<EditIcon />}
								onClick={() => {
									setRestaurantToUpdate({ ...restaurant })
									setOpenUpdateRestaurantDialog(true)
								}}
							>
								Edit
							</Button>
						</>
					}
					{restaurant.owner && user && !isOwnerView(restaurant.owner.id, user.id) && !isAdminView(user.role) &&
						<Button
							variant="contained"
							color="primary"
							startIcon={<SendIcon />}
							onClick={() => { setOpenAddReview(true) }}
						>
							Add review
						</Button>
					}
				</div>
				{restaurant.reviews && restaurant.reviews.length > 0 && restaurant.reviews.map(review =>
					<RestaurantReviewCard
						review={review}
						ownerView={isOwnerView(restaurant.owner.id, user.id)}
						setLoadingModal={setLoadingModal}
						setToastState={setToastState}
						setReloadRestaurant={setReloadRestaurant}
						adminView={isAdminView(user.role)}
					/>)}
			</>
		)
	}

	return null
}

export default Restaurant
