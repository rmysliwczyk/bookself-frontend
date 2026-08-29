import Alert from '@mui/material/Alert'
import Grow from '@mui/material/Grow'

import {AuthContext} from '../context/AuthContext'
import BookForm from '../components/BookForm'

import usePost from '../hooks/usePost'

import type {Book, BookFormData} from '../types'

import {useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router'

export default function AddBook() {
	const auth = useContext(AuthContext)
	const {data: postData, error, loading, post} = usePost<Book>()
	const [coverPicture, setCoverPicture] = useState<File>()
	const [pictureHandled, setPictureHandled] = useState(false);
	const navigate = useNavigate()

	async function handleValidated({data, cover_picture}:{data: BookFormData, cover_picture: File | null}) {
		data.user_id = auth?.getUser()?.id || null
		delete data.id
		await post(`${import.meta.env.VITE_API_URL}/books/`, JSON.stringify(data), {headers: {"Content-Type": "application/json"}})

		console.log(cover_picture)
		if (cover_picture) {
			setCoverPicture(cover_picture)
		} else {
			setPictureHandled(true)
		}
	}

	async function uploadCover() {
		if (coverPicture) {
			const formData = new FormData()
			formData.append("cover_image_file", coverPicture)

			const res = await fetch(
				`${import.meta.env.VITE_API_URL}/books/${postData?.id}/cover`,
				{
					method: "PUT",
					body: formData,
					headers: {
						'Authorization': `Bearer ${auth?.getUser()?.token}`
					}
				}
			)
			
			if (res.status === 200) {
				// Giving time to server to save the picture as it sends response too soon. Fix on server side in the future.
				setTimeout(function() {setPictureHandled(true)}, 1000)
			}
		}
	}
	
	useEffect(function() {
		if (postData && coverPicture) {
			uploadCover();
		}

		if (postData && !loading && !error && pictureHandled) {
			navigate(`/user/${auth?.getUser()?.id}/books`)
		}
		
	},[postData, coverPicture, pictureHandled])


	return (
		<>
			{ <BookForm onValidated={handleValidated}  loading={loading} /> }
			{ error && <Grow in={Boolean(error)}><Alert severity="error">{error}</Alert></Grow> }
		</>
	)
}
