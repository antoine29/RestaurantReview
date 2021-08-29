import React, { useState, useEffect } from 'react';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '../UIComponents'

const UpdateRestaurantDialog = ({ openUpdateRestaurant, setOpenUpdateRestaurant, onUpdate, restaurant }) => {
	const [_restaurant, setRestaurant] = useState({...restaurant})
	useEffect(()=>{
		setRestaurant(restaurant)
	}, [restaurant])
    
	const handleClose = () => {
		setOpenUpdateRestaurant(false)
	}
	
	const onSendReview = () => {
		onUpdate(_restaurant)
		setOpenUpdateRestaurant(false)
	}
    
	if(_restaurant){
		return (
			<Dialog open={openUpdateRestaurant} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Update User</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Name"
						value={_restaurant.name}
						fullWidth
						onChange={({ target }) => { setRestaurant({..._restaurant, name: target.value}) }}
					/>
					<TextField
						margin="dense"
						id="address"
						label="Address"
						value={_restaurant.address}
						fullWidth
						onChange={({ target }) => { setRestaurant({..._restaurant, address: target.value}) }}
					/>
					<TextField
						margin="dense"
						id="url"
						label="Url"
						value={_restaurant.url}
						fullWidth
						onChange={({ target }) => { setRestaurant({..._restaurant, url: target.value}) }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button onClick={onSendReview} color="primary">
						Send
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
	else{
		setOpenUpdateRestaurant(false)
		return null
	}
}

export default UpdateRestaurantDialog