import { useContext, useState } from 'react'

import { AuthContext } from '../context/AuthContext'
import { parseApiError } from '../utils/ApiErrorParser'

interface UsePostState<T> {
	data: T | null
	loading: boolean
	error: string | null
}

export default function usePost<T>() {
	const auth = useContext(AuthContext)
	const [state, setState] = useState<UsePostState<T>>({
		data: null,
		error: null,
		loading: false,
	})

	async function post(
		url: string,
		payload: any,
		options?: RequestInit
	) {
		setState({ data: null, error: null, loading: true })

		try {
			const headers = new Headers(options?.headers || {})

			const user = auth?.getUser()
			if (user) {
				headers.set('Authorization', `Bearer ${user.token}`)
			}

			const res = await fetch(url, {
				method: 'POST',
				headers,
				body: payload,
				...options,
			})

			if (!res.ok) {
				const parsedError = await parseApiError(res)
				setState({data: null, error: parsedError, loading: false})
			}
			else {
				const resData = await res.json()
				setState({data: resData, error: null, loading: false})
			}

		} catch (err: any) {
			setState({
				data: null,
				error: "Something went wrong",
				loading: false,
			})
		}
	}

	const reset = async () => {
		setState({ data: null, error: null, loading: false })
	}

	return { post, reset, ...state }
}
