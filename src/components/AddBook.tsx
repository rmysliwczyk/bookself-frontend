import Alert from '@mui/material/Alert'
import Grow from '@mui/material/Grow'

import usePost from '../hooks/usePost'

import BookForm from './BookForm'

import type {BookFormData} from '../types'

import {useEffect} from 'react'
import {useNavigate} from 'react-router'

export default function AddBook() {
	const {data, error, loading, post} = usePost()
	const navigate = useNavigate()

	function handleValidated(data: BookFormData) {
		post(`${import.meta.env.VITE_API_URL}/books`, data)
		console.log(data)
	}
	
	useEffect(function() {
		console.log(data)
		if (data && !loading && !error) {
			navigate("/books")
		}
	},[data])


	return (
		<>
			{ <BookForm onValidated={handleValidated}  loading={loading} /> }
			{ error && <Grow in={Boolean(error)}><Alert severity="error">{error}</Alert></Grow> }
		</>
	)
}
