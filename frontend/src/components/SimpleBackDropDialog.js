import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from './UIComponents'
import { useTheme } from '@material-ui/core/styles'

const SimpleBackDropDialog = ({text, buttonText}) => {
  const [open, setOpen] = React.useState(true)
  const theme = useTheme()

  const handleClose = () => {
    setOpen(false)
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