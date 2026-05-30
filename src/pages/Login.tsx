import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { AuthContext } from '../context/AuthContext'

import type {Credentials, User} from '../types'

import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'

export default function Login() {
	const navigate = useNavigate()
	const auth = useContext(AuthContext)
	const [error, setError] = useState<string|null>(null)

	async function loginHandler(event: React.SubmitEvent) {
		event.preventDefault()
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
			navigate("/books")
		}
	}

	return(
		<>
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
								loading={auth?.loginInProgress}
							>
								Login
							</Button>
						</FormControl>
						{error && (
							<Alert severity="error">
								{error}
							</Alert>
						)}
					</Box>
				</Box>
			</Container>
		</>
	)
}
