import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import type { Book } from '../types'

import { useNavigate } from 'react-router'

export interface BookCardProps {
	book: Book,
	onDelete: (book: Book) => void
}

export default function BookCard({book, onDelete}: BookCardProps) {
	const navigate = useNavigate()
	return (
				<Grow in={true} timeout={1300}>
					<Grid container spacing={1} component={Paper} variant="outlined" sx={{padding: '10px'}}>
						<Grid size={6}>
							<Box sx={{height: '200px'}}>
							<img style={{width: '100%', height: '100%', objectFit: 'contain'}} src={book.cover_photo_url}/>
							</Box>
						</Grid>
						<Grid size={6}>
							<Stack spacing={1} sx={{height: '100%', width: '100%', justifyContent: 'flex-start'}}>
								<Stack direction='row' spacing={1} useFlexGap sx={{flexWrap: 'wrap'}}>
									<Typography sx={{fontWeight: 600}}>Title:</Typography>
									<Typography>{book.title}</Typography>
								</Stack>
								<Stack direction='row' spacing={2}>
									<Typography sx={{fontWeight: 600}}>Rating:</Typography>
									<Typography sx={{mt: '1px'}}>{book.rating}/10</Typography>
								</Stack>
								<Stack direction='row' sx={{height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
									<Button onClick={function() {navigate(`/books/${book.id}`)}}><EditIcon/></Button><Button onClick={function() {onDelete(book)}}><DeleteIcon/></Button>
								</Stack>
							</Stack>
						</Grid>
					</Grid>
				</Grow>
	)
}
