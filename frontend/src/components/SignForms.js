import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import signIn from '../services/Auth'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  LockOutlinedIcon,
  Typography,
  makeStyles
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

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/collection/7053955)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const GoTo = (history, route) => {
  history.push(route)
}

const _signIn = async (email, password, setLoading, setSuccesfulSigIn, failedSignInCounter, setFailedSignInCounter) => {
  console.log("SingIn: ", email, password)
  setLoading(true)
  try {
    const user = await signIn({ email, password })
    window.localStorage.setItem('RRUserToken', JSON.stringify(user))
    console.log('Signed user:', user)
    setSuccesfulSigIn(true)
  }
  catch (exception) {
    console.error("invalid credentials")
    setSuccesfulSigIn(false)
    setFailedSignInCounter(failedSignInCounter+1)
  }
  finally{
    setLoading(false)
  }
}

const SignInForm = () =>  {
  const classes = useStyles();
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [succesfulSignIn, setSuccesfulSigIn] = useState(false)
  const [failedSignInCounter, setFailedSignInCounter] = useState(0)
  const [failedSignInMessage, setFailedSignInMessage] = useState(false)
  
  useEffect(() => {
    const storedUserToken = window.localStorage.getItem('RRUserToken')
    if (storedUserToken) {
      console.log("Already signed user")
      history.push('/')
    }
  }, [])

  useEffect(() => {
    if(succesfulSignIn){
      setEmail('')
      setPassword('')
      history.push('/')
    }
  }, [succesfulSignIn])

  useEffect(() => {
    setEmail('')
    setPassword('')
    setFailedSignInMessage(true)
    setTimeout(() => {
      setFailedSignInMessage(false)
    }, 2000);
  }, [failedSignInCounter])

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={event => {
            event.preventDefault()
            const signInCall = async (email, password, setLoading, setSuccesfulSigIn, failedSignInCounter, setFailedSignInCounter) => {
              await _signIn(email, password, setLoading, setSuccesfulSigIn, failedSignInCounter, setFailedSignInCounter)
            }

            signInCall(email, password, setLoading, setSuccesfulSigIn, failedSignInCounter, setFailedSignInCounter)
          }}>
            <TextField
              value={email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={({target}) => {setEmail(target.value)}}
            />
            <TextField
              value={password}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={({target}) => {setPassword(target.value)}}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link variant="body2" onClick={()=>{GoTo(history, '/signup')}}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
              {/* ToDo: enhance these messages */}
              <Grid item>
                {loading && <p>LOADING</p>}
              </Grid>
              {failedSignInMessage && (
              <Grid item>
                {failedSignInMessage && <p>Wrong credentials</p>}
                {failedSignInCounter > 0 && <p>{`failed count: ${failedSignInCounter}`}</p>}
              </Grid>)}
            </Grid>
            <Box mt={5}>
              <CopyRight />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const SignUpForm = () =>  {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="User Name"
              name="userName"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Box mt={5}>
              <CopyRight />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export {
  SignInForm,
  SignUpForm
}