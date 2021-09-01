import React, { useState } from 'react'
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Rating
} from '../UIComponents'

const AddReviewDialog = ({ openAddReview, setOpenAddReview, addReview }) => {
	const [comment, setComment] = useState('')
	const [starRating, setStarRating] = useState(0)

	const handleClose = () => {
		setComment('')
		setStarRating(0)
		setOpenAddReview(false)
	}

	const onSendReview = () => {
		handleClose(true)
		addReview(comment, starRating)
	}

	return (
		<Dialog open={openAddReview} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Add review</DialogTitle>
			<DialogContent>
				<Rating
					size="large"
					name="simple-controlled"
					value={starRating}
					onChange={(event, newValue) => {
						setStarRating(newValue)
					}}
				/>
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