import React from 'react'
import {
  Link,
  Typography
} from './UIComponents'

const CopyRightLabel = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          RestaurantReview
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default CopyRightLabel