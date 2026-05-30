
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { AuthProvider } from './context/AuthContext'

import Layout from './components/Layout'

import AddBook from './pages/AddBook'
import Books from './pages/Books'
import EditBook from './pages/EditBook'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'

import { BrowserRouter, Routes, Route } from 'react-router'

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#6D213C',
		},
		background: {
			default: '#F6F7EB',
			paper: '#F6F7EB'
		},
	},
	colorSchemes: {
		dark: {
			palette: {
				secondary: {
					main: '#F7F7F7',
				},
			},
		},
	},
})

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline enableColorScheme />
			<BrowserRouter>
				<AuthProvider>
					<Routes>
						<Route path="/" element={<Layout />} >
							<Route path="books" element={<Books />} />
							<Route path="books/add" element={<AddBook />} />
							<Route path="/books/:book_id" element={<EditBook />} />
							<Route path="/user/:user_id" element={<Profile />} />
						</Route>
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
