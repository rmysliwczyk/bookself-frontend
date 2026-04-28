import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'


export interface BookCardProps {
	coverPhotoUrl: string,
	title: string,
	rating: number
}

export default function BookCard({props}: {props: BookCardProps}) {
	return (
		<>
			<Box
				component={Paper}
				sx={{
					width: '100%',
					padding: '10px'
				}}
				variant="outlined"
			>
				<Grid container spacing={1}>
					<Grid size={6}>
						<Box sx={{height: '200px'}}>
						<img style={{width: '100%', height: '100%', objectFit: 'contain'}} src={props.coverPhotoUrl}/>
						</Box>
					</Grid>
					<Grid size={6}>
						<Grid
							container spacing={1}
						>
							<Grid size={12}>
								<Typography sx={{fontWeight: 600}}>Title:</Typography>
							</Grid>
							<Grid size={12}>
								<Typography>{props.title}</Typography>
							</Grid>


							<Grid size={{xs: 3, sm: 5}}>
								<Typography sx={{fontWeight: 600}}>Rating:</Typography>
							</Grid>
							<Grid size='auto'>
								<Typography sx={{mt: '1px'}}>{props.rating}/10</Typography>

							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}
