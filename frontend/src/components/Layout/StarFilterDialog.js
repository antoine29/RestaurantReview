import React from 'react';
import {
	List,
	ListItem,
	ListItemText,
	DialogTitle,
	Dialog,
} from '../UIComponents'

const StarFilterDialog = ({ openStarFilterDialog, setOpenStarFilterDialog, setStarFilter }) => {
	return (
		<Dialog onClose={() => { setOpenStarFilterDialog(false) }} aria-labelledby="simple-dialog-title" open={openStarFilterDialog}>
			<DialogTitle id="simple-dialog-title">Set star filter</DialogTitle>
			<List>
				<ListItem button
					onClick={() => {
						setStarFilter(5)
						setOpenStarFilterDialog(false)
					}}
				>
					<ListItemText primary="5 stars" />
				</ListItem>
				<ListItem button
					onClick={() => {
						setStarFilter(4)
						setOpenStarFilterDialog(false)
					}}
				>
					<ListItemText primary="4 stars" />
				</ListItem>
				<ListItem button
					onClick={() => {
						setStarFilter(3)
						setOpenStarFilterDialog(false)
					}}
				>
					<ListItemText primary="3 stars" />
				</ListItem>
				<ListItem button
					onClick={() => {
						setStarFilter(2)
						setOpenStarFilterDialog(false)
					}}
				>
					<ListItemText primary="2 stars" />
				</ListItem>
				<ListItem button
					onClick={() => {
						setStarFilter(1)
						setOpenStarFilterDialog(false)
					}}
				>
					<ListItemText primary="1 stars" />
				</ListItem>
				<ListItem button
					onClick={() => {
						setStarFilter(0)
						setOpenStarFilterDialog(false)
					}}
				>
					<ListItemText primary="0 stars" />
				</ListItem>
				<ListItem button
					onClick={() => {
						setStarFilter(-1)
						setOpenStarFilterDialog(false)
					}}
				>
					<ListItemText primary="disable" />
				</ListItem>
			</List>
		</Dialog>
	);
}

export default StarFilterDialog
