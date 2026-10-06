import Alert from '@mui/material/Alert'
import Grow from '@mui/material/Grow'

import {AuthContext} from '../context/AuthContext'
import BookForm from '../components/BookForm'

import useGet from '../hooks/useGet'
import usePatch from '../hooks/usePatch'

import type {Book, BookFormData} from '../types'

import {useContext, useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router'

export default function EditBook() {
	const auth = useContext(AuthContext)
	const params = useParams()
	const [initialData, setInitialData] = useState<BookFormData>()
	const {data, error, loading, patch} = usePatch()
	const [coverPicture, setCoverPicture] = useState<File|null>(null)
	const [pictureHandled, setPictureHandled] = useState(false);
	const {data: getData, error: getError, loading: getLoading, refetch} = useGet<Book>(`${import.meta.env['VITE_API_URL']}/books/${params.book_id}`, {headers: {"Authorization": `Bearer ${auth!.getUser()!.token}`}})
	const navigate = useNavigate()

	async function handleValidated({data, cover_picture}:{data: BookFormData, cover_picture: File | null}) {
		data.user_id = auth?.getUser()?.id || null
		let book_id = data.id
		delete data.id
		await patch(`${import.meta.env.VITE_API_URL}/books/${book_id}`, JSON.stringify(data), {headers: {"Content-Type": "application/json"}})
		
		if (cover_picture) {
			console.log(cover_picture)
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
				`${import.meta.env.VITE_API_URL}/books/${getData?.id}/cover`,
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
				setTimeout(function() {setPictureHandled(true)}, 10)
			}
		}
	}

	useEffect(function() {
		async function parseData(getData: Book) {
			
			let existingCoverPicture = null;
			if (getData.cover_photo_url) {
				try {
					const response = await fetch(getData.cover_photo_url)
					let imageBlob = null

					if (response.status == 200) {
						imageBlob = await response.blob()
						if (imageBlob) {
							existingCoverPicture = new File([imageBlob], "cover.jpg", {type: "image/jpeg"})
						}
					}
				} catch (e) {
					console.error(`Couldn't fetch existing cover picture: ${e}`);
				}
			}

			setInitialData({
				id: getData.id,
				user_id: getData.user_id,
				title: getData.title,
				author: getData.author,
				rating: getData.rating,
				visibility_to_others: getData.visibility_to_others,
				cover_picture: existingCoverPicture
			})
		}

		if (getData && !getError && !getError) {
			parseData(getData)
		}
	},[getData])

	useEffect(function() {
		if (data && coverPicture) {
			console.log(coverPicture)
			uploadCover();
		}

		if (data && !loading && !error && pictureHandled) {
			navigate(`/user/${auth?.getUser()?.id}/books`)
		}
		
	},[data, coverPicture, pictureHandled])

	return (
		<>
			{ <BookForm defaultValues={initialData} onValidated={handleValidated} loading={loading && pictureHandled} /> }
			{ error && <Grow in={Boolean(error)}><Alert severity="error">{error}</Alert></Grow> }
		</>
	)
}
