import React, { useState } from 'react'
import {
  makeStyles,
  CssBaseline,
  Container
} from '../UIComponents'
import TopBar from './TopBar'
import LeftDrawer from './LeftDrawer'
import Footer from './Footer'
import Toast from '../Toast'
import BackDropSpinner from '../BackDropSpinner'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))

const MainLayout = ({ component: Component, user, ...props}) => {
  const classes = useStyles();
  const [openLeftDrawer, setOpenLeftDrawer] = useState(false)
  const [toastState, setToastState] = useState(null)
  const [loadingModal, setLoadingModal] = useState(false)

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
      <BackDropSpinner open={loadingModal}/>
      <Toast open={!!toastState} handleClose={() => { setToastState(null) }} severity={toastState?.severity} message={toastState?.message} />
        <LeftDrawer user={user} open={openLeftDrawer} setOpenDrawer={setOpenLeftDrawer}/>
        <TopBar title="RestaurantReview" setOpenDrawer={setOpenLeftDrawer}>
          <main>
            <Component setToastState={setToastState} setLoadingModal={setLoadingModal}/>
          </main>
        </TopBar>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  )
}

export default MainLayout
