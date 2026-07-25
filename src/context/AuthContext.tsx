import { ValidateUserObject } from '../utils/Validation'
import type { User } from '../types'

import { createContext } from 'react'

interface AuthContext {
	login: (user: User) => void
	logout: () => void
	getUser: () => User | null
	isTokenValid: () => Promise<boolean>
}

export const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: any }) {
	function login(user: User) {
		if (ValidateUserObject(user) == false) {
			throw Error('Invalid user object. Cannot save to localStorage')
		}
		else {
			window.localStorage.removeItem('user')
			window.localStorage.setItem('user', JSON.stringify(user))
		}
	}
	
	function logout() {
		window.localStorage.removeItem('user')
	}

	function getUser(): User | null {
		const user_raw = window.localStorage.getItem('user')
		if (user_raw) {
			return JSON.parse(user_raw)
		}
		else {
			return null
		}
	}

	async function isTokenValid(): Promise<boolean> {
		const user = getUser()

		if (!user) {
			return false
		}
		
		const res = await fetch(
			`${import.meta.env["VITE_API_URL"]}/users/me`,
			{
				'headers': {
					'Authorization': `Bearer ${user.token}`
				}
			}
		)

		if (res.status === 200) {
			return true
		} else {
			return false
		}
	}

	return (
		<AuthContext
			value={{
				login,
				logout,
				getUser,
				isTokenValid
			}}
		>
			{children}
		</AuthContext>
	)
}
