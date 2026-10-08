import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import { AuthContext } from '../context/AuthContext'
import BookCard from './BookCard'
import DeleteBookModal from './DeleteBookModal'

import useDelete from '../hooks/useDelete'
import useGet from '../hooks/useGet'

import { useContext, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'

import type { Book } from '../types'

type DeleteBookModalData = {
	open: boolean,
	book?: Book
}

export default function UserBooks() {
	const params = useParams()
	const auth = useContext(AuthContext)

	const [requestURL, setRequestURL] = useState("")
	const [ownerView, setOwnerView] = useState<boolean>(!params.user_id)
	const {data, error: getError, loading: getLoading, refetch} = useGet<Array<Book>>(requestURL, {headers: {"Authorization": `Bearer ${auth!.getUser()!.token}`}})

	const [deleteBookModalData, setDeleteBookModalData] = useState<DeleteBookModalData>({open: false})
	const {deleteRequest, error: deleteError, loading: deleteLoading}  = useDelete()

	const navigate = useNavigate()
	
	useEffect(function() {
		if (!data) {
			let lookupId = ownerView ? auth?.getUser().id : params.user_id
			setRequestURL(`${import.meta.env['VITE_API_URL']}/users/${lookupId}/books`)
		}
	}, [data])

	useEffect(function() {
		if (!deleteLoading && !deleteError) {
			// Book was successfully deleted
			setDeleteBookModalData({open: false})
			refetch()
		}
	}, [deleteError, deleteLoading])

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
		<nav style={{display: 'flex', gap: '5px'}}>
			<Button variant="contained" onClick={function() {navigate("/books/add")}}>
				Add book
			</Button>
			<Button variant="contained" onClick={function() {navigate("/find-users")}}>
				Find users
			</Button>
			<Button variant="contained" onClick={function() {navigate("/logout")}}>
				Log out
			</Button>
		</nav>
		<DeleteBookModal 
				open={deleteBookModalData.open}
				book={deleteBookModalData.book}
				onDelete={handleDeleteBook}
				onClose={function() {setDeleteBookModalData({open: false})}}
		/>
		<Grid container
			spacing={2} sx={{width: '100%'}}
		>

			{ data && data.map((book, index) => {
				return <Grid size={{xs: 12, md: 6, lg: 4}} key={index}>
					<BookCard
						book={book}
						currentPageUserId={params.user_id ?? ''}
						loggedInUserId={auth?.getUser()?.id ?? ''}
						onDelete={handleOpenDeleteModal}
					/>
				</Grid>
				})
			}
		</Grid>
	</>)
}
