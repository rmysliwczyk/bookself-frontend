import type { User } from '../types'

import { createContext } from 'react'

interface AuthContext {
	login: (user: User) => void
	getUser: () => User | null
}

export const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: any }) {
	function login(user: User) {
		// TODO - Do some checks on the incoming user object
		window.localStorage.setItem('user', JSON.stringify(user))
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

	return (
		<AuthContext
			value={{
				login,
				getUser
			}}
		>
			{children}
		</AuthContext>
	)
}
