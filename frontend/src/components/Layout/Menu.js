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
} from '../UIComponents'
import TextAvatar from '../TextAvatar'
import { DeleteStoredUser } from '../../services/Users'

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
})

const Menu = ({user, setOpenDrawer}) => {
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
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <TextAvatar text={NameAvatar(user?.name || '')} />
                </ListItemAvatar>
                <ListItemText
                    primary={user?.name || "missing name"}
                    secondary={
                        <React.Fragment>
                            {`@${user?.username || "missing_username"}`}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => {
                setOpenDrawer(false)
                history.push('/restaurants')
            }}>
                <ListItemIcon><RestaurantIcon /></ListItemIcon>
                <ListItemText primary="Restaurants" />
            </ListItem>
            { user?.role === 'admin' &&
            <ListItem button onClick={() => {
                setOpenDrawer(false)
                history.push('/users')
            }}>
                <ListItemIcon><AnnouncementIcon /></ListItemIcon>
                <ListItemText primary="Users" />
            </ListItem>}
            { user?.role === 'owner' &&
            <ListItem button onClick={() => {
                setOpenDrawer(false)
                history.push(`/users/${user.id}/restaurants`)
            }}>
                <ListItemIcon><RateReviewIcon /></ListItemIcon>
                <ListItemText primary="My Restaurants" />
            </ListItem>}
        </List>
        <Divider />
        <List>
            <ListItem button onClick={()=>{
                DeleteStoredUser()
                history.push('/signin')}}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Sign out" />
            </ListItem>
        </List>
    </div>)
}

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
export default Menu
