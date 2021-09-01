import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik  } from 'formik'
import * as yup from 'yup'
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

const signInFormValidationSchema = yup.object({
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	password: yup
		.string('Enter your password')
		// .min(8, 'Password should be of minimum 8 characters length')
		.required('Password is required'),
})

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
	try {
		const user = await SignIn({ email, password })
		SetStoredUser(user)
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
			history.push('/')
		}
	}, [succesfulSignIn])

	const formik = useFormik({
	  initialValues: {
		email: '',
		password: '',
	  },
	  validationSchema: signInFormValidationSchema,
	  onSubmit: (values) => {
		console.log('signin in. email: ', values.email, 'password: ', values.password)
		const signInCall = async (email, password, setLoading, setSuccesfulSignIn, setShowFailedSignInToast) => {
			setLoading(true)
			await _signIn(email, password, setSuccesfulSignIn, setShowFailedSignInToast)
			setLoading(false)
		}

		signInCall(values.email, values.password, setLoading, setSuccesfulSigIn, setShowFailedSignInToast)
	  },
	})
	
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
					<form className={classes.form} onSubmit={formik.handleSubmit}>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.touched.email && formik.errors.email}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							error={formik.touched.password && Boolean(formik.errors.password)}
							helperText={formik.touched.password && formik.errors.password}
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
	)
}

export default SignInForm
