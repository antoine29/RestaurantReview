import React, { useState } from 'react';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '../UIComponents'

const AddRestaurantDialog = ({ openAddRestaurant, setOpenAddRestaurant, addRestaurant }) => {
	const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [url, setUrl] = useState('');
	

	const handleClose = () => {
		setName('')
		setAddress('')
        setUrl('')
		setOpenAddRestaurant(false)
	};

	const onSendReview = () => {
		handleClose(true)
		addRestaurant({name, address, url})
	}

	return (

		<Dialog open={openAddRestaurant} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Add Restaurant</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Restaurant Name"
					value={name}
					fullWidth
					onChange={({ target }) => { setName(target.value) }}
				/>
				<TextField
					margin="dense"
					id="name"
					label="Address"
					value={address}
					fullWidth
					onChange={({ target }) => { setAddress(target.value) }}
				/>
				<TextField
					margin="dense"
					id="url"
					label="Url image"
					value={url}
					fullWidth
					onChange={({ target }) => { setUrl(target.value) }}
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

export default AddRestaurantDialog