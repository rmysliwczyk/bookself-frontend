import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'

import type {BookFormData} from '../types'

import TC from '../utils/TitleCaseFromSnakeCase'

interface BookFormProps {
	defaultValues?: BookFormData
	onValidated: (data: BookFormData) => void
	loading?: boolean
}

export default function BookForm({defaultValues, onValidated, loading}: BookFormProps) {
	const bookData = defaultValues ? defaultValues :
		{
			user_id: "",
			title: "",
			author: "",
			rating: "" as any as number,
			cover_photo_url: "",
			visibility_to_others: "" as any as boolean,
		}

	function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData(event.target)
		onValidated(Object.fromEntries(formData) as any as BookFormData)
	}

	return (
		<>
			<form onSubmit={handleSubmit} autoComplete='off'>
				<Grid container spacing={2}>
					{Object.keys(bookData).map(function (key) {
						return (
							<Grid size={{xs: 12, md: 6}} key={key}>
								<TextField defaultValue={bookData[key as keyof BookFormData]} name={key} label={TC(key)} fullWidth />
							</Grid>
						)
					})}
					<Grid size={12} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
						<Button variant='contained' type="submit" disabled={loading} sx={{width: "100px"}}>
							Submit {loading && <CircularProgress size={20} sx={{marginLeft: "5px"}}/>}
						</Button>
					</Grid>
				</Grid>
			</form>
		</>
	)
}
