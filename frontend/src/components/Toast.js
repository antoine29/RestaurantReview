import React from 'react'
import {
    MuiAlert,
    Snackbar
} from './UIComponents'

const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props}  />
const Toast = ({open, handleClose, severity, message}) => {
  return(
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
    )
}

export default Toast