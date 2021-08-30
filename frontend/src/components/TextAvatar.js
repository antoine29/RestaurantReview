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

const NameAvatar = (name) => {
  // ToDo: unittests
  const twocharsStringGenerator = (name) => {
      if(!name || name==='') return ''
      const words = name.split(' ')
      if(words.length > 1) {
          const word1 = words[0].replace(/\s/g,'')
          const word2 = words[1].replace(/\s/g,'')
          if(word1.length > 0 && word2.length > 0) return word1.charAt(0).concat(word2.charAt(0))
      }
  
      const word = name.replace(/\s/g,'')
      if(!word || word==='') return ''
      if(word.length > 1) return word.slice(0, 2)
      return word
  }

  return twocharsStringGenerator(name).toUpperCase()
}

const TextAvatar = ({text}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>      
      <Avatar className={classes.purple}>{NameAvatar(text)}</Avatar>
    </div>
  )
}

export default TextAvatar
