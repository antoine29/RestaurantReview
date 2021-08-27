import React from 'react'
import { Drawer } from '../UIComponents'
import Menu from './Menu'

const LeftDrawer = ({ user, open, setOpenDrawer }) => {
    return (
        <div>
            <React.Fragment>
                <Drawer anchor="left" open={open} onClose={() => { setOpenDrawer(false) }}>
                    <Menu user={user} setOpenDrawer={setOpenDrawer}/>
                </Drawer>
            </React.Fragment>
        </div>
    )
}

export default LeftDrawer
