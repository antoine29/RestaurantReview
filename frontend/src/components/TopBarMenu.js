import React from 'react'
import { useHistory } from 'react-router-dom'
import {
    makeStyles,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    ExitToAppIcon,
    RestaurantIcon,
    AnnouncementIcon,
    RateReviewIcon,
    ListItemAvatar
} from './UIComponents'
import TextAvatar from './TextAvatar'
import { SignOut } from '../services/Auth'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
})

const TopBarMenu = ({setOpenDrawer}) => {
    const classes = useStyles()
    const history = useHistory()

    return(
        <div
        className={classes.list}
        role="presentation"
        onClick={() => { setOpenDrawer(false) }}
        onKeyDown={() => { setOpenDrawer(false) }}
    >
        <List>
            {/* ToDo: fill real user info */}
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <TextAvatar text="UN" />
                </ListItemAvatar>
                <ListItemText
                    primary="User Name"
                    secondary={
                        <React.Fragment>
                            {"@userName"}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider />
            <ListItem button>
                <ListItemIcon><RestaurantIcon /></ListItemIcon>
                <ListItemText primary="Restaurants" />
            </ListItem>
            <ListItem button>
                <ListItemIcon><AnnouncementIcon /></ListItemIcon>
                <ListItemText primary="Latest Reviews" />
            </ListItem>
            <ListItem button>
                <ListItemIcon><RateReviewIcon /></ListItemIcon>
                <ListItemText primary="My Reviews" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button onClick={()=>{SignOut(history)}}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Sign out" />
            </ListItem>
        </List>
    </div>)
}

export default TopBarMenu
