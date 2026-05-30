import Alert from '@mui/material/Alert'
import Grow from '@mui/material/Grow'

import usePost from '../hooks/usePost'

import BookForm from '../components/BookForm'

import type {BookFormData} from '../types'

import {useEffect} from 'react'
import {useNavigate, useParams} from 'react-router'

export default function AddBook() {
	const {data, error, loading, post} = usePost() // TODO - REPLACE WITH usePATCH when implemented
	const navigate = useNavigate()
	const params = useParams()

	function handleValidated(data: BookFormData) {
		console.log("TODO - PATCH")
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
			ID: {params.book_id}
			{ <BookForm onValidated={handleValidated}  loading={loading} /> }
			{ error && <Grow in={Boolean(error)}><Alert severity="error">{error}</Alert></Grow> }
		</>
	)
}
