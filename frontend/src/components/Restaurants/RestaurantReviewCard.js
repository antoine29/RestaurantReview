import React from 'react';
import PropTypes from 'prop-types';
import {
    makeStyles,
    Typography,
    Grid,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Hidden
} from '../UIComponents'

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});


// [
//     {
//       "comment": "comment left for rest 00",
//       "stars": 5,
//       "restaurant": "6124257599fe4594bab728b5",
//       "user": {
//         "username": "owner0",
//         "email": "owner0",
//         "id": "6124257599fe4594bab728a6"
//       },
//       "id": "6124257699fe4594bab728c1"
//     }
//   ]
const RestaurantReviewCard = ({review}) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      {/* <CardActionArea component="a" href="#"> */}
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                @{review.user.username}:
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {!!review.date ? review.date : "stuB date"}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {review.comment}
              </Typography>
              {/* <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography> */}
            </CardContent>
          </div>
          {/* <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
          </Hidden> */}
        </Card>
      {/* </CardActionArea> */}
    </Grid>
  )
}

export default RestaurantReviewCard

RestaurantReviewCard.propTypes = {
  review: PropTypes.object,
};