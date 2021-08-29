import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from './UIComponents'

const DeleteConfirmationDialog = ({openDeleteDialog, setOpenDeleteDialog, onConfirmation, deleteDialog}) => {
  return (
    <div>
      <Dialog
        open={openDeleteDialog}
        onClose={()=>{setOpenDeleteDialog(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{deleteDialog}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure?
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={()=>{setOpenDeleteDialog(false);}} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpenDeleteDialog(false)
              onConfirmation()}}
            color="primary" autoFocus >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteConfirmationDialog