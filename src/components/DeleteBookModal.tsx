import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import type { Book } from '../types'

interface DeleteBookModalProps {
	open: boolean
	book?: Book
	onDelete: (book: Book) => void
	onClose: () => void
}

export default function DeleteBookModal({open, book, onDelete, onClose}: DeleteBookModalProps) {
	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box component={Card} className="modal">
				<Stack spacing={2}>
					<Typography id="modal-modal-title" variant="h5" textAlign="center">
						{book ? <>Deleting <strong> {book.title} </strong></> : "No book to delete"}
					</Typography>
					<Typography id="modal-modal-description" textAlign="center">
						{book? "Do you want to delete it, or cancel?" : "Something went wrong."}
					</Typography>
					<Stack direction='row' spacing={2} sx={{justifyContent: "center"}}>
						{book && <Button variant="contained" onClick={function() {onDelete(book)}}>Delete</Button>}
						<Button variant="outlined" onClick={onClose}>Cancel</Button>
					</Stack>
				</Stack>
			</Box>
		</Modal>
	)
}
