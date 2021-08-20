import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {SignUp} from '../services/Auth'
import {
	Avatar,
	Button,
	TextField,
	Paper,
	Box,
	Grid,
	LockOutlinedIcon,
	Typography,
	makeStyles,
	CssBaseline,
} from './UIComponents'
import Toast from './Toast'
import BackDropSpinner from './BackDropSpinner'
import SimpleBackDropDialog from './SimpleBackDropDialog'
import SignFormCopyright from './SignFormCopyright'

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

const _signUp = async (email, username, password, setSuccesfulSignUp, setShowFailedSignUpToast) => {
	console.log("SingUp: ", username, email, password)
	try {
		const user = await SignUp({ username, email, password })
		console.log('created user:', user)
		setSuccesfulSignUp(true)
		setShowFailedSignUpToast(false)
	}
	catch (error) {
		setSuccesfulSignUp(false)
		setShowFailedSignUpToast(true)
	}
}

const SignUpForm = () => {
	const classes = useStyles();
	const history = useHistory()
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [succesfulSignUp, setSuccesfulSignUp] = useState(false)
	const [showFailedSignUpToast, setShowFailedSignUpToast] = useState(false)

	useEffect(() => {
		const storedUserToken = window.localStorage.getItem('RRUserToken')
		if (storedUserToken) {
			console.log("Already signed user")
			history.push('/')
		}
	}, [])

	useEffect(() => {
		if (succesfulSignUp) {
			setUsername('')
			setEmail('')
			setPassword('')
		}
	}, [succesfulSignUp])

	const clearForm = () => {
		setEmail('')
		setUsername('')
		setPassword('')
	}

	// ToDo: add proper fields validation
	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<BackDropSpinner open={loading}/>
			{succesfulSignUp && <SimpleBackDropDialog text="New account succesfuly created. Please sign in to start using the application." buttonText="Ok"/>}
			<Toast open={showFailedSignUpToast} handleClose={() => {setShowFailedSignUpToast(false)}} severity="error" message="Error signing up. Please try again."></Toast>
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} noValidate onSubmit={event => {
						event.preventDefault()
						const signUpCall = async (email, username, password, setLoading, setSuccesfulSignUp, setShowFailedSignUpToast) => {
							setLoading(true)
							await _signUp(email, username, password, setSuccesfulSignUp, setShowFailedSignUpToast)
							setLoading(false)
						}

						signUpCall(email, username, password, setLoading, setSuccesfulSignUp, setShowFailedSignUpToast)
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
							value={username}
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="User Name"
							name="username"
							onChange={({ target }) => { setUsername(target.value) }}
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
							Sign Up
						</Button>
						<Box mt={5}>
							<SignFormCopyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}

export default SignUpForm