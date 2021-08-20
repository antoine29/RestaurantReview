import React, { useState } from 'react'
import {
  makeStyles,
  CssBaseline,
  Grid,
  Container
} from '../UIComponents'
import TopBar from './TopBar';
import LeftDrawer from '../LeftDrawer';

import Footer from './Footer';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))


const Home = () => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <LeftDrawer open={openDrawer} setOpenDrawer={setOpenDrawer}/>
        <TopBar title="RestaurantReview" setOpenDrawer={setOpenDrawer}>
          working...
        </TopBar>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  );
}

export default Home