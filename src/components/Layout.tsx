import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import Typography from '@mui/material/Typography'

import { useColorScheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

import { useEffect } from 'react'
import { Outlet } from 'react-router'

export default function Layout() {	
	// Hooks preparation section
	// Dark theme related
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
	const { mode, setMode } = useColorScheme()


	// Functions and hook calling section
	// Dark theme related
	useEffect(() => {
		if (prefersDarkMode) {
			setMode('dark')
		} else {
			setMode('light')
		}
	}, [prefersDarkMode])

	function toggleColorSchemeMode() {
		if (mode == 'system') {
			if (prefersDarkMode) {
				setMode('light')
			} else {
				setMode('dark')
			}
		} else if (mode == 'light') {
			setMode('dark')
		} else {
			setMode('light')
		}
	}
	return (
			<Container
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 1,
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Typography
						sx={{
							textAlign: 'center',
							typography: { xs: 'h4', sm: 'h2' },
							ml: '64px'
						}}
					>
						BookSelf
					</Typography>
					<Button color='inherit' onClick={toggleColorSchemeMode} sx={{width: '64px', height: '64px', borderRadius: '100%'}}>
						<DarkModeIcon />
					</Button>
				</Box>

				<Outlet />
			</Container>
	)
}
