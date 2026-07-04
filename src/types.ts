export interface BookFormData {
	user_id: string | null
	title: string | null
	author: string | null
	rating: number | null
	visibility_to_others: boolean | null
	cover_image?: File | string | null
}

export type User = {
	id: string,
	token: string
}

export type Book = {
	id: string,
	title: string,
	author: string,
	rating: number,
	cover_image: string
}

export type Credentials = {
	username: string,
	password: string
}
