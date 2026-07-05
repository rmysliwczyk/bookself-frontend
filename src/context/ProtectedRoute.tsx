import { AuthContext } from '../context/AuthContext'

import { Outlet, useNavigate } from 'react-router'
import { useContext, useState, useEffect } from 'react'

export default function ProtectedRoute() {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

	useEffect(function() {
		async function authenticate() {
			if (auth) {
				const canBeAuthenticated = await auth.isTokenValid()
				setIsAuthenticated(canBeAuthenticated)
				if (!canBeAuthenticated) {
					navigate('/login')
				}
			}
		}

		authenticate()
	}, [auth])

	return isAuthenticated ? <Outlet /> : <></>
}
