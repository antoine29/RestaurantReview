import React, { useState, useEffect } from 'react'
import {
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	IconButton,
	DeleteIcon,
	EditIcon,
	Button
} from './UIComponents'

import { GetUsers, DeleteUser } from '../services/Users'
import DeleteConfirmationDialog from './Users/DeleteConfirmationDIalog'

const columns = [
	{ id: 'avatar', label: 'Avatar', maxWidth: 20, align: 'left' },
	{ id: 'name', label: 'Name', minWidth: 100, align: 'left' },
	{
		id: 'username',
		label: 'User Name',
		minWidth: 100,
		align: 'left',
	},
	{
		id: 'email',
		label: 'email',
		minWidth: 100,
		align: 'left'
	},
	{
		id: 'role',
		label: 'Role',
		minWidth: 100,
		align: 'left'
	},
	{
		id: 'actions',
		label: 'Actions',
		minWidth: 100,
		align: 'center'
	}
]

const useStyles = makeStyles({
	root: {
		width: '100%',
	},
	container: {
		maxHeight: 440,
	},
})


const Users = ({ setToastState, setLoadingModal }) => {
	const classes = useStyles()
	const [users, setUsers] = useState([])
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
	const [userToDelete, setUserToDelete] = useState(null)

	const onDeleteUser = () => {
		console.log('deleting user', userToDelete)
		const deleteUserCall = async () => {
			setLoadingModal(true)
			try{
				await DeleteUser(userToDelete)
				const users = await GetUsers()
				setUsers(users)
			}
			catch(error){
				setToastState({severity: 'error', message: 'Error deleting user'})
			}
			setLoadingModal(false)
		}

		deleteUserCall()
	}

	const onEditUser = (userId) => {
		console.log('editing user', userId)
	}

	useEffect(() => {
		const getUsersCall = async () => {
			setLoadingModal(true)
			const users = await GetUsers()
			setUsers(users)
			setLoadingModal(false)
		}
		getUsersCall()
	}, [])

	return (
		<>
			<DeleteConfirmationDialog openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog} onDeleteUser={onDeleteUser} />
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) =>
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>)}
							</TableRow>
						</TableHead>
						<TableBody>
							{users.map(user =>
								<TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
									<>
										{columns.map(column => column.id !== 'actions' ?
											<TableCell key={column.id} align={column.align}>
												{user[column.id]}
											</TableCell> : null
										)}
										<TableCell align="left" >
											<IconButton aria-label="delete">
												<EditIcon />
											</IconButton>
											<IconButton aria-label="delete" onClick={ () => {
												setUserToDelete(user.id)
												setOpenDeleteDialog(true)
											}}>
												<DeleteIcon />
											</IconButton>
										</TableCell>
									</>	
								</TableRow>)}
						</TableBody>
					</Table>
				</TableContainer>
				{/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
			</Paper>
		</>
	)
}

export default Users