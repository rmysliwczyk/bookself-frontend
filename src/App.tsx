
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { AuthProvider } from './context/AuthContext'

import AddBook from './components/AddBook'
import Layout from './components/Layout'
import MyBooks from './components/MyBooks'

import { BrowserRouter, Routes, Route} from 'react-router'

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
							<Route path="books" element={<MyBooks />} />
							<Route path="books/add" element={<AddBook />} />
						</Route>
					</Routes>
				</AuthProvider>
			</BrowserRouter>
		</ThemeProvider>
	)
}

export default App
