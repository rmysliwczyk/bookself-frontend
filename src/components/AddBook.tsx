import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

import usePost from '../hooks/usePost'

import BookForm from './BookForm'

import type {BookFormData} from '../types'

import {useEffect} from 'react'

export default function AddBook() {
	const {data, error, loading, post} = usePost()

	function handleValidated(data: BookFormData) {
		post(`${import.meta.env.VITE_API_URL}/books`, data)
		console.log(data)
	}
	
	useEffect(function() {
		console.log(data)
	},[data])


	return (
		<>
			{ error && <Alert severity="error">{error}</Alert> }
			{ loading ? <CircularProgress/> :
			<BookForm onValidated={handleValidated}/> }
		</>
	)
}
