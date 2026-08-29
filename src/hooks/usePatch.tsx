import { useContext, useState } from 'react'

import { AuthContext } from '../context/AuthContext'
import { parseApiError } from '../utils/ApiErrorParser'

interface UsePatchState<T> {
	data: T | null
	loading: boolean
	error: string | null
}

export default function usePatch<T>() {
	const auth = useContext(AuthContext)
	const [state, setState] = useState<UsePatchState<T>>({
		data: null,
		error: null,
		loading: false,
	})

	async function patch(
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
				...options,
				method: 'PATCH',
				headers,
				body: payload,
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

	return { patch, reset, ...state }
}
