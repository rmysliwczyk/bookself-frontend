export interface BookFormData {
	title: string | null
	author: string | null
	rating: number | null
	cover_photo_url: string | null
	visibility_to_others: boolean | null
}

export type User = {
	id: string,
	token: string
}
