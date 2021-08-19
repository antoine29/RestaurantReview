import React from 'react'
import { CircularProgress, makeStyles } from './UIComponents'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

const Spinner = () => {
  const classes = useStyles()
  return(
    <div classes={classes.root}>
      <CircularProgress />
    </div>)
}

export default Spinner