
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Grow from '@mui/material/Grow'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './context/ProtectedRoute'

import Layout from './components/Layout'

import AddBook from './pages/AddBook'
import Books from './pages/Books'
import EditBook from './pages/EditBook'
import FindUsers from './pages/FindUsers'
import Login from './pages/Login'
import Logout from './pages/Logout'
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
						<Route element={<ProtectedRoute/>}>
							<Route path="/" element={<Layout />} >
								<Route path="/books/add" element={<AddBook />} />
								<Route path="/books/:book_id" element={<EditBook />} />
								<Route path="/find-users" element={<FindUsers />} />
								<Route path="/user/:user_id" element={<Profile />} />
								<Route path="/user/:user_id/books" element={<Books />} />
								<Route path="/logout" element={<Logout />} />
							</Route>
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
