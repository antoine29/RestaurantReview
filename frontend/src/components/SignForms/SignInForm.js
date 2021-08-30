import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { SignIn, SetStoredUser, GetStoredUser } from '../../services/Users'
import {
	Avatar,
	Button,
	TextField,
	Link,
	Paper,
	Box,
	Grid,
	LockOutlinedIcon,
	Typography,
	makeStyles,
	CssBaseline,
} from '../UIComponents'
import Toast from '../Layout/Toast'
import BackDropSpinner from '../Layout/BackDropSpinner'
import CopyrightLabel from '../Layout/CopyrightLabel'

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
	}
}))

const _signIn = async (email, password, setSuccesfulSigIn, setShowFailedSignInToast) => {
	console.log("SingIn: ", email, password)
	try {
		const user = await SignIn({ email, password })
		SetStoredUser(user)
		console.log('Signed user:', user)
		setSuccesfulSigIn(true)
		setShowFailedSignInToast(false)
	}
	catch (exception) {
		console.error("invalid credentials")
		setSuccesfulSigIn(false)
		setShowFailedSignInToast(true)
	}
}

const SignInForm = () => {
	const classes = useStyles()
	const history = useHistory()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [succesfulSignIn, setSuccesfulSigIn] = useState(false)
	const [showFailedSignInToast, setShowFailedSignInToast] = useState(false)

	useEffect(() => {	
		const storedUserToken = GetStoredUser()
		if (!!storedUserToken) {
			console.log("Already signed user")
			history.push('/')
		}
	}, [])

	useEffect(() => {
		if (succesfulSignIn) {
			setEmail('')
			setPassword('')
			history.push('/')
		}
	}, [succesfulSignIn])

	const clearForm = () => {
		setEmail('')
		setPassword('')
	}

	// ToDo: add proper fields validation
	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Toast open={showFailedSignInToast} handleClose={() => { setShowFailedSignInToast(false) }} severity="error" message="Wrong credentials. Please try again."></Toast>
			<BackDropSpinner open={loading} />
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
						const signInCall = async (email, password, setLoading, setSuccesfulSignIn, setShowFailedSignInToast) => {
							setLoading(true)
							await _signIn(email, password, setSuccesfulSignIn, setShowFailedSignInToast)
							setLoading(false)
						}

						signInCall(email, password, setLoading, setSuccesfulSigIn, setShowFailedSignInToast)
						clearForm()
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
							onChange={({ target }) => { setEmail(target.value) }}
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
							onChange={({ target }) => { setPassword(target.value) }}
						/>
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
								<Link variant="body2" onClick={() => { history.push('/signup') }}>
									{"Don't have an account yet? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						<Box mt={5}>
							<CopyrightLabel />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}

export default SignInForm
