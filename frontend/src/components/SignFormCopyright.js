import React, { useState, useEffect } from 'react'
import {
  Link,
  Typography
} from './UIComponents'

const CopyRight = () => {
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

export default CopyRight