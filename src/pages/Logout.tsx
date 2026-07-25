import { AuthContext } from '../context/AuthContext'

import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function Logout() {
	const auth = useContext(AuthContext)
	const navigate = useNavigate()

	useEffect(() => {
		auth?.logout()
		navigate('/login')
	}, [])
	return null
}
