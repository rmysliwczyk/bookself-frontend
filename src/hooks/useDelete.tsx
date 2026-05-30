import { useContext, useState } from 'react'

import { AuthContext } from '../context/AuthContext'
import { parseApiError } from '../utils/ApiErrorParser'

interface UseDeleteState {
	loading: boolean
	error: string | null
}

export default function useDelete() {
	const auth = useContext(AuthContext)

	const [state, setState] = useState<UseDeleteState>({
		error: null,
		loading: false,
	})

	async function deleteRequest(
		url: string,
		options?: RequestInit
	) {
		setState({error: null, loading: true})

		try {
			const headers = new Headers(options?.headers || {})
			headers.set('Content-Type', 'application/json')
			const user = auth?.getUser()

			if (user) {
				headers.set('Authorization', `Bearer ${user.token}`)
			}

			const res = await fetch(url, {
				method: 'DELETE',
				headers,
				...options,
			})

			if (!res.ok) {
				const parsedError = await parseApiError(res)
				setState({error: parsedError, loading: false})
			}
			else {
				setState({error: null, loading: false})
			}

		} catch (err: any) {
			setState({
				error: "Something went wrong",
				loading: false,
			})
		}
	}

	const reset = async () => {
		setState({error: null, loading: false})
	}

	return { deleteRequest, reset, ...state }
}
