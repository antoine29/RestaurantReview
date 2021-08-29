import React, { useState } from 'react';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Box,
	Typography,
	Rating
} from '../UIComponents'

const AddReviewDialog = ({ openAddReview, setOpenAddReview, addReview }) => {
	const [comment, setComment] = useState('');
	const [starRating, setStarRating] = useState(0);

	const handleClose = () => {
		setComment('')
		setStarRating(0)
		setOpenAddReview(false)
	};

	const onSendReview = () => {
		handleClose(true)
		addReview(comment, starRating)
	}

	return (

		<Dialog open={openAddReview} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Add review</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Do yo have any comment about this restaurant?
				</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="comment"
					type="email"
					value={comment}
					fullWidth
					onChange={({ target }) => { setComment(target.value) }}
				/>
				<div>
					<Box component="fieldset" mb={3} borderColor="transparent">
						<Typography component="legend">Controlled</Typography>
						<Rating
							name="simple-controlled"
							value={starRating}
							onChange={(event, newValue) => {
								setStarRating(newValue);
							}}
						/>
					</Box>
				</div>
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

export default AddReviewDialog