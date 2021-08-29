import React, { useState } from 'react'
import {
    Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '../UIComponents'

const AddReviewResponseDialog = ({ openAddResponse, setOpenAddResponse, sendResponse }) => {
	const [comment, setComment] = useState('')

	const handleClose = () => {
		setComment('')
		setOpenAddResponse(false)
	}

	const onSendReviewResponse = () => {
		handleClose()
		sendResponse(comment)
	}

	return (
		<Dialog open={openAddResponse} onClose={handleClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">Add review</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Do you have any comment about this review?
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
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={onSendReviewResponse} color="primary">
					Send
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default AddReviewResponseDialog