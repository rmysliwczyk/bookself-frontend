import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Grow from '@mui/material/Grow'
import TextField from '@mui/material/TextField'
import Input from '@mui/material/Input'

import type {BookFormData} from '../types'

import {useState, useEffect} from 'react'

interface BookFormProps {
	defaultValues?: BookFormData
	onValidated: ({data, cover_picture}:{data: BookFormData, cover_picture: File | null}) => void
	loading?: boolean
}

export default function BookForm({defaultValues, onValidated, loading}: BookFormProps) {
	console.log(defaultValues?.cover_picture?.name);
	const [filename, setFilename] = useState(defaultValues?.cover_picture?.name);

	const bookData = defaultValues ? defaultValues :
		{
			id: "",
			user_id: "",
			title: "",
			author: "",
			rating: "" as any as number,
			visibility_to_others: false,
			cover_picture: null
		}

	async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
		event.preventDefault()
		const formData = new FormData(event.target)
		const formDataObject = Object.fromEntries(formData) as any as BookFormData
		formDataObject.id = bookData.id
		if (!formDataObject.visibility_to_others) {
			formDataObject.visibility_to_others = false
		} else {
			formDataObject.visibility_to_others = true
		}

		let coverPicture: File | null
		if (bookData.cover_picture && !formDataObject.cover_picture) {
			coverPicture = bookData.cover_picture
		} else {
			coverPicture = formDataObject.cover_picture || null
		}
		delete formDataObject.cover_picture

		onValidated({data: formDataObject as any as BookFormData, cover_picture: coverPicture})

	}

	useEffect(() => {
		if (defaultValues) {
			setFilename(defaultValues.cover_picture?.name)
		}
	}, [defaultValues])

	return (
		<>
			<form onSubmit={handleSubmit} autoComplete='off'>
				<Grow in={true} timeout={1000}>
					<Grid container spacing={2} sx={{maxWidth: '360px'}}>
						<Grid size={12}>
							<TextField defaultValue={bookData.title} name="title" label="Title" fullWidth slotProps={{ inputLabel: {shrink: true}}}/>
						</Grid>	<Grid size={12}>
							<TextField defaultValue={bookData.author} name="author" label="Author" fullWidth slotProps={{ inputLabel: {shrink: true}}}/>
						</Grid>
						<Grid size={12}>
							<TextField defaultValue={bookData.rating} name="rating" label="Rating" type="number" slotProps={{htmlInput: {'min': 0, 'max': 10}, inputLabel: {shrink: true}}} fullWidth/>
						</Grid>
						<Grid size={12}>
							<FormGroup>
								<FormControlLabel control={<Checkbox key={String(bookData.visibility_to_others)} defaultChecked={Boolean(bookData.visibility_to_others)} name="visibility_to_others" />} label="Visible to others" />
							</FormGroup>
						</Grid>
						<Grid size={12} key="cover_image">
							<Button component="label" variant="contained" sx={{width: "100%", height: "100%"}}>Upload cover image <Input sx={{display: "none"}} type="file" name="cover_picture" onChange={(event) => {
								let files = (event.target as HTMLInputElement).files;
								if (files && files.length > 0) {
									setFilename(files[0].name);
								}
							}}/>
							</Button>
						</Grid>
						<Grid size={12} sx={{textAlign: 'center'}}>
							{filename ? <p>Selected file: {filename}</p> : ""}
						</Grid>
						<Grid size={12} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
							<Button variant='contained' type="submit" disabled={loading} sx={{width: "100px"}}>
								Submit {loading && <CircularProgress size={20} sx={{marginLeft: "5px"}}/>}
							</Button>
						</Grid>
					</Grid>
				</Grow>
			</form>
		</>
	)
}
