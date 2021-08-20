import React from 'react'
import { Drawer } from './UIComponents'
import TopBarMenu from './TopBarMenu'

const LeftDrawer = ({ open, setOpenDrawer }) => {
    return (
        <div>
            <React.Fragment>
                <Drawer anchor="left" open={open} onClose={() => { setOpenDrawer(false) }}>
                    <TopBarMenu setOpenDrawer={setOpenDrawer}/>
                </Drawer>
            </React.Fragment>
        </div>
    )
}

export default LeftDrawer
