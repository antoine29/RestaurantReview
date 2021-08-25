import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  CssBaseline,
  Grid,
  Container,
  GitHubIcon,
  FacebookIcon,
  TwitterIcon
} from '../UIComponents'
import TopBar from './TopBar';
import LeftDrawer from './LeftDrawer';
import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))

const MainLayout = ({ component: Component, ...rest}) => {
  const classes = useStyles();
  const [openLeftDrawer, setOpenLeftDrawer] = useState(false)

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <LeftDrawer open={openLeftDrawer} setOpenDrawer={setOpenLeftDrawer}/>
        <TopBar title="RestaurantReview" setOpenDrawer={setOpenLeftDrawer}>
          <main>
            <Component />
          </main>
        </TopBar>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  )
}

export default MainLayout
