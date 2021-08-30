import React from 'react'
import { Backdrop, CircularProgress, makeStyles } from '../UIComponents'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  }
}));

const BackDropSpinner = ({open}) => {
  const classes = useStyles()

  return(
    <Backdrop className={classes.backdrop} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>)
}

export default BackDropSpinner