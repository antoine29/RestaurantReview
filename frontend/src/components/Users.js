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
} from './UIComponents'

import { GetUsers } from '../services/Users'

const columns = [
	{ id: 'avatar', label: 'Avatar', minWidth: 170 },
	{ id: 'name', label: 'Name', minWidth: 100 },
	{
		id: 'username',
		label: 'User Name',
		minWidth: 170,
		align: 'right',
	},
	{
		id: 'email',
		label: 'email',
		minWidth: 170,
		align: 'right'
	},
	{
		id: 'role',
		label: 'Role',
		minWidth: 170,
		align: 'right'
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
	const [users, setUsers] = React.useState([])

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
		<Paper className={classes.root}>
			<TableContainer className={classes.container}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map(user =>
							<TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
								{columns.map(column =>
									<TableCell key={column.id} align={column.align}>
										{user[column.id]}
									</TableCell>
								)}
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
	)
}

export default Users