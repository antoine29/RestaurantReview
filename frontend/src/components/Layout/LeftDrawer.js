import React from 'react'
import { Drawer } from '../UIComponents'
import Menu from './Menu'

const LeftDrawer = ({ open, setOpenDrawer }) => {
    return (
        <div>
            <React.Fragment>
                <Drawer anchor="left" open={open} onClose={() => { setOpenDrawer(false) }}>
                    <Menu setOpenDrawer={setOpenDrawer}/>
                </Drawer>
            </React.Fragment>
        </div>
    )
}

export default LeftDrawer
