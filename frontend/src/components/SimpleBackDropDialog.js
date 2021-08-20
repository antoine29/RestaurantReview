import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from './UIComponents'

const SimpleBackDropDialog = ({text, buttonText, history}) => {
  const [open, setOpen] = React.useState(true)

  const handleClose = () => {
    setOpen(false)
    history.push('/signin')
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="responsive-dialog-title">{"Welcome to RestaurantReview!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            {buttonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default SimpleBackDropDialog