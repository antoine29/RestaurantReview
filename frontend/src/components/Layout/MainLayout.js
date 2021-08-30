import React, { useState } from 'react'
import {
  makeStyles,
  CssBaseline,
  Container
} from '../UIComponents'
import TopBar from './TopBar'
import LeftDrawer from './LeftDrawer'
import Footer from './Footer'
import Toast from './Toast'
import BackDropSpinner from './BackDropSpinner'
import StarFilterDialog from './StarFilterDialog'

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}))

const MainLayout = ({ component: Component, user, ...props}) => {
  const [openLeftDrawer, setOpenLeftDrawer] = useState(false)
  const [openStarFilterDialog, setOpenStarFilterDialog] = useState(false)
  const [toastState, setToastState] = useState(null)
  const [loadingModal, setLoadingModal] = useState(false)
  const [starFilter, setStarFilter] = useState(-1)

  return (
    <React.Fragment>
      <CssBaseline />
      <StarFilterDialog openStarFilterDialog={openStarFilterDialog} setOpenStarFilterDialog={setOpenStarFilterDialog} setStarFilter={setStarFilter}/>
      <Container maxWidth="lg">
      <BackDropSpinner open={loadingModal}/>
      <Toast open={!!toastState} handleClose={() => { setToastState(null) }} severity={toastState?.severity} message={toastState?.message} />
      <LeftDrawer user={user} open={openLeftDrawer} setOpenDrawer={setOpenLeftDrawer}/>
      <TopBar title="RestaurantReview" setOpenDrawer={setOpenLeftDrawer} setOpenStarFilterDialog={setOpenStarFilterDialog} >
        <main>
          <Component user={user} setToastState={setToastState} setLoadingModal={setLoadingModal} starFilter={starFilter} setStarFilter={setStarFilter}/>
        </main>
      </TopBar>
      </Container>
      <Footer title="Footer" description="Something here to give the footer a purpose!" />
    </React.Fragment>
  )
}

export default MainLayout
