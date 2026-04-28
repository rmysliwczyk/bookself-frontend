import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import { AuthContext } from '../context/AuthContext'
import BookCard from './BookCard'

import useGet from '../hooks/useGet'

import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
type Book = {
	title: string,
	author: string,
	rating: number,
	cover_photo_url: string
}

const books = [
	{ 
		cover_photo_url: 'https://upload.wikimedia.org/wikipedia/en/6/62/JohnWyndham_TheDayOfTheTriffids.jpg',
		title: 'The Day of the Triffids',
		author: 'John Wyndham',
		rating: 7
	}
	,
	{
		cover_photo_url: 'https://www.wydawnictwoliterackie.pl/storage/images/products/460x724/niezwyciezony_60588194a1f7e.jpg',
		title: 'Niezwyciężony',
		author: 'Stanisław Lem',
		rating: 8
	}
]

export default function MyBooks() {
	const auth = useContext(AuthContext)
	const [requestURL, setRequestURL] = useState("")
	const {data, error, loading} = useGet<Array<Book>>(requestURL)

	// React-router related
	const navigate = useNavigate()
	
	console.log(data)

	function loggedIn() {
		console.log(auth?.getUser().id)
		setRequestURL(`http://127.0.0.1:8000/books/${auth?.getUser().id}`)
	}

	return (<>
		<Button variant="contained" onClick={function() {navigate("/books/add")}}>
			Add book
		</Button>
		<Button variant="contained" onClick={function() {auth?.login({id: "85c4a3a9-8f5e-4b5e-a9db-7a413e6abae8", token: "abc"}); loggedIn()}}>
			TEMP - Login
		</Button>
		<Grid container
			spacing={2}
		>
			{ data && [...data, ...books].map((book, index) => {
				console.log(book)
				return <Grid size={{xs: 12, sm: 6, md: 4}} key={index}>
					<BookCard props={{...book, coverPhotoUrl: book.cover_photo_url}}/>
				</Grid>
				})
			}
		</Grid>
	</>)
}
