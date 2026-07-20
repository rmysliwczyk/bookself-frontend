import Alert from '@mui/material/Alert'
import Grow from '@mui/material/Grow'

import {AuthContext} from '../context/AuthContext'
import BookForm from '../components/BookForm'

import usePost from '../hooks/usePost'

import type {BookFormData} from '../types'

import {useContext, useEffect} from 'react'
import {useNavigate} from 'react-router'

export default function AddBook() {
	const auth = useContext(AuthContext)
	const {data, error, loading, post} = usePost()
	const navigate = useNavigate()

	async function handleValidated({data, cover_picture}:{data: BookFormData, cover_picture: File}) {
		data.user_id = auth?.getUser()?.id || null
		const readyFormData = new FormData()
		readyFormData.append("data", JSON.stringify(data))
		readyFormData.append("cover_picture", cover_picture)
		await fetch(`${import.meta.env.VITE_API_URL}/books/`, {body: readyFormData, method: "POST", headers: {"Authorization": `Bearer ${auth?.getUser()?.token}`}})
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
