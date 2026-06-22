import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import { AuthContext } from '../context/AuthContext'
import BookCard from './BookCard'
import DeleteBookModal from './DeleteBookModal'

import useDelete from '../hooks/useDelete'
import useGet from '../hooks/useGet'

import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import type { Book } from '../types'

type DeleteBookModalData = {
	open: boolean,
	book?: Book
}

export default function MyBooks() {
	const auth = useContext(AuthContext)

	const [requestURL, setRequestURL] = useState("")
	const {data, error: getError, loading: getLoading, refetch} = useGet<Array<Book>>(requestURL, {headers: {"Authorization": `Bearer ${auth!.getUser()!.token}`}})

	const [deleteBookModalData, setDeleteBookModalData] = useState<DeleteBookModalData>({open: false})
	const {deleteRequest, error: deleteError, loading: deleteLoading}  = useDelete() // TODO Finish implementing it

	const navigate = useNavigate()
	
	useEffect(function() {
		if (!data) {
			setRequestURL(`${import.meta.env['VITE_API_URL']}/books/${auth?.getUser().id}`)
		}
	}, [data])

	useEffect(function() {
		if (!deleteLoading && !deleteError) {
			// Book was successfully deleted
			setDeleteBookModalData({open: false})
			refetch()
		}
	}, [deleteError, deleteLoading])

	function loggedIn() {

	}

	function handleOpenDeleteModal(book: Book) {
		setDeleteBookModalData(
			{
				open: true,
				book: book
			}
		)
	}

	async function handleDeleteBook(book: Book) {
		await deleteRequest(`${import.meta.env["VITE_API_URL"]}/books/${book.id}`)
	}

	return (<>
		<Button variant="contained" onClick={function() {navigate("/books/add")}}>
			Add book
		</Button>
		<DeleteBookModal 
				open={deleteBookModalData.open}
				book={deleteBookModalData.book}
				onDelete={handleDeleteBook}
				onClose={function() {setDeleteBookModalData({open: false})}}
		/>
		<Grid container
			spacing={2}
		>

			{ data && data.map((book, index) => {
				console.log(book)
				return <Grid size={{xs: 12, sm: 6, md: 4}} key={index}>
					<BookCard onDelete={handleOpenDeleteModal} book={book}/>
				</Grid>
				})
			}
		</Grid>
	</>)
}
