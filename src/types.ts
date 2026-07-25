export interface BookFormData {
	user_id: string | null
	title: string | null
	author: string | null
	rating: number | null
	visibility_to_others: boolean | null
	cover_picture?: File | null
}

export type User = {
	id: string,
	token: string
}

export type UserPublic = {
	username: string,
	id: string
}

export type Book = {
	id: string,
	title: string,
	author: string,
	rating: number,
	cover_photo_url: string
}

export type Credentials = {
	username: string,
	password: string
}
