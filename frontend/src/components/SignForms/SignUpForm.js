import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useFormik  } from 'formik'
import * as yup from 'yup'
import { GetStoredUser, SignUp } from '../../services/Users'
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
} from '../UIComponents'
import Toast from '../Layout/Toast'
import BackDropSpinner from '../Layout/BackDropSpinner'
import SimpleBackDropDialog from './SimpleBackDropDialog'
import CopyrightLabel from '../Layout/CopyrightLabel'

const signUpFormValidationSchema = yup.object({
	name: yup
		.string('Enter your full name')
		.min(5, 'Name should be of minimum 5 characters length')
		.required('Name is required'),
	email: yup
		.string('Enter your email')
		.email('Enter a valid email')
		.required('Email is required'),
	username: yup
		.string('Enter your username')
		.min(5, 'Username should be of minimum 5 characters length')
		.required('Username is required'),
	password: yup
		.string('Enter your password')
		.min(5, 'Password should be of minimum 5 characters length')
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

const _signUp = async (name, email, username, password, setSuccesfulSignUp, setShowFailedSignUpToast) => {
	console.log("Signing up: ", username, email, password)
	try {
		const user = await SignUp({ name, username, email, password })
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
	const classes = useStyles()
	const history = useHistory()
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [succesfulSignUp, setSuccesfulSignUp] = useState(false)
	const [showFailedSignUpToast, setShowFailedSignUpToast] = useState(false)

	useEffect(() => {
		const storedUserToken = GetStoredUser()
		if (!!storedUserToken) {
			console.log("Already signed user")
			history.push('/')
		}
	}, [])

	useEffect(() => {
		if (succesfulSignUp) {
		}
	}, [succesfulSignUp])

	const formik = useFormik({
		initialValues: {
		  name: '',
		  email: '',
		  username: '',
		  password: '',
		},
		validationSchema: signUpFormValidationSchema,
		onSubmit: (values) => {
		  const signUpCall = async (name, email, username, password, setLoading, setSuccesfulSignUp, setShowFailedSignUpToast) => {
			setLoading(true)
			await _signUp(name, email, username, password, setSuccesfulSignUp, setShowFailedSignUpToast)
			setLoading(false)
		}

		signUpCall(values.name, values.email, values.username, values.password, setLoading, setSuccesfulSignUp, setShowFailedSignUpToast)
		},
	  })

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<BackDropSpinner open={loading}/>
			{succesfulSignUp && <SimpleBackDropDialog text="New account succesfuly created. Please sign in to start using the application." buttonText="Ok" history={history}/>}
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
					<form className={classes.form} onSubmit={formik.handleSubmit} >
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="name"
							label="Name"
							value={formik.values.name}
							onChange={formik.handleChange}
							error={formik.touched.name && Boolean(formik.errors.name)}
							helperText={formik.touched.name && formik.errors.name}
						/>
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
							id="email"
							label="User Name"
							name="username"
							value={formik.values.username}
							onChange={formik.handleChange}
							error={formik.touched.username && Boolean(formik.errors.username)}
							helperText={formik.touched.username && formik.errors.username}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							fullWidth
							id="password"
							label="Password"
							type="password"
							name="password"
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
							Sign Up
						</Button>
						<Box mt={5}>
							<CopyrightLabel />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	)
}

export default SignUpForm