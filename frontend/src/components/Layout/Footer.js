import React from 'react';
import {
  makeStyles,
  Container
} from '../UIComponents'
import CopyRightLabel from '../CopyrightLabel'

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    // marginTop: theme.spacing(8),
    padding: theme.spacing(3, 0),
  },
}));

// ToDo: make this footer sticky at button
export default function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <CopyRightLabel />
      </Container>
    </footer>
  );
}
