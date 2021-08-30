import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import {
  makeStyles,
  Toolbar,
  IconButton,
  Typography,
  AppBar,
  CssBaseline,
  useScrollTrigger,
  Box,
  Container,
  Fab,
  KeyboardArrowUpIcon,
  Zoom,
  MenuIcon,
  StarRateIcon
} from '../UIComponents'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  scrollTopButton: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

const ScrollTopButton = (props) => {
  const { children, window } = props
  const classes = useStyles()
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    // target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.scrollTopButton}>
        {children}
      </div>
    </Zoom>
  )
}

const TopBar = (props) => {
  const classes = useStyles()
  let location = useLocation()

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=> {props.setOpenDrawer(true)}}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Restaurant Review</Typography>
          { location.pathname === '/restaurants' && 
          <div style={{ marginLeft: 'auto'}}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={()=> {
                props.setOpenStarFilterDialog(true)
              }}
            >
              <StarRateIcon />
            </IconButton>
          </div>
          }
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <Container>
        <Box my={2}>
          {props.children}
        </Box>
      </Container>
      <ScrollTopButton {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTopButton>
    </React.Fragment>
  )
}

export default TopBar
