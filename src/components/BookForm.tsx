import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'

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
			visibility_to_others: "" as any as boolean,
		}

	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData(event.target)
		const formDataObject = Object.fromEntries(formData) as any as BookFormData
		if (formDataObject.cover_image && formDataObject.cover_image instanceof File) {
			formDataObject.cover_image = (await formDataObject.cover_image.bytes()).toBase64()
			console.log(formDataObject.cover_image)
		}
		onValidated(formDataObject as any as BookFormData)
	}

	return (
		<>
			<form onSubmit={handleSubmit} autoComplete='off'>
				<Grid container spacing={2}>
					{Object.keys(bookData).map(function (key) {
						if(key != "user_id"){
							return (
								<Grid size={{xs: 12, md: 6}} key={key}>
									<TextField defaultValue={bookData[key as keyof BookFormData]} name={key} label={TC(key)} fullWidth />
								</Grid>
							)
						}
					})}
					<Grid size={{xs: 12, md: 12}} key="cover_image">
						<Button component="label" variant="contained" sx={{width: "100%", height: "100%"}}>Upload cover image <Input sx={{display: "none"}}type="file" name="cover_image"/></Button>
					</Grid>
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
