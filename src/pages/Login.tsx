import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import Slide from '@mui/material/Slide'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { AuthContext } from '../context/AuthContext'

import type {Credentials, User} from '../types'

import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'

export default function Login() {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)
	const [loginInProgress, setLoginInProgress] = useState<boolean>(false)
	const [error, setError] = useState<string|null>(null)

	async function loginHandler(event: React.SubmitEvent) {
		event.preventDefault()
		setLoginInProgress(true)
		setError(null)
		const formData = new FormData(event.target)
		const credentials = Object.fromEntries(formData) as any as Credentials
		const response = await fetch(`${import.meta.env['VITE_API_URL']}/users/login`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					username: credentials.username,
					password: credentials.password,
				}),
			}
		)
		if (!response.ok) {
			setError("Login failed")
		} else {
			const response_json_data = await response.json()
			const user: User = {id: response_json_data.user.id, token: response_json_data.access_token}
			auth?.login(user)
			navigate(`/user/${user.id}/books`)
		}
	}

	return(
		<>
			<Slide in={true} direction="up" timeout={500}>
				<Container
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						height: '80vh',
					}}
				>
					<Box
						component={Card}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: '30px',
							maxWidth: '300px',
							padding: '20px',
							overflow: 'auto',
						}}
					>
						<Box>
							<Typography variant="h4">
								BookSelf
							</Typography>
						</Box>
						<Box
							component="form"
							onSubmit={loginHandler}
							noValidate
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '20px',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<FormControl>
								<TextField
									id="username"
									name="username"
									label="Username"
									variant="standard"
									autoComplete="off"
								/>
							</FormControl>
							<FormControl>
								<TextField
									id="password"
									name="password"
									label="Password"
									variant="standard"
									type="password"
								/>
							</FormControl>
							<FormControl>
								<Button
									type="submit"
									loading={loginInProgress}
								>
									Login
								</Button>
							</FormControl>
							<Typography>No account? <Link to="/register">Register</Link></Typography>
							{error && (
								<Alert severity="error">
									{error}
								</Alert>
							)}
						</Box>
					</Box>
				</Container>
			</Slide>
		</>
	)
}
