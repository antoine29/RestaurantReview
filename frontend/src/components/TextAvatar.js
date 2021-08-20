import React from 'react'
import { Avatar, makeStyles, deepPurple } from './UIComponents'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}))

const TextAvatar = ({text}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>      
      <Avatar className={classes.purple}>{text}</Avatar>
    </div>
  )
}

export default TextAvatar
