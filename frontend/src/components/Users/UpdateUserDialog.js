import React, { useState, useEffect } from 'react';
import {
	Button,
	TextField,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '../UIComponents'

const UpdateUserDialog = ({ openUpdateUser, setOpenUpdateUser, updateUser, user }) => {
	const [_user, setUser] = useState({...user})
	useEffect(()=>{
		setUser(user)
	}, [user])
    
	const handleClose = () => {
		setOpenUpdateUser(false)
	}
	
	const onSendReview = () => {
		updateUser(_user)
		setOpenUpdateUser(false)
	}
	
	if(_user){
		return (
			<Dialog open={openUpdateUser} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Update User</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Name"
						value={_user.name}
						fullWidth
						onChange={({ target }) => { setUser({..._user, name: target.value}) }}
					/>
					<TextField
						margin="dense"
						id="name"
						label="User name"
						value={_user.username}
						fullWidth
						onChange={({ target }) => { setUser({..._user, username: target.value}) }}
					/>
					<TextField
						margin="dense"
						id="url"
						label="Email"
						value={_user.email}
						fullWidth
						onChange={({ target }) => { setUser({..._user, email: target.value}) }}
					/>
					<TextField
						margin="dense"
						id="url"
						label="Role"
						value={_user.role}
						fullWidth
						onChange={({ target }) => { setUser({..._user, role: target.value}) }}
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
		setOpenUpdateUser(false)
		return null
	}
}

export default UpdateUserDialog