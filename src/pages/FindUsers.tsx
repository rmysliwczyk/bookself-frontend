import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'


import useGet from '../hooks/useGet'

import type { UserPublic } from '../types'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export default function FindUsers() {
	const [username, setUsername] = useState<string>("")
	const [searchQuery, setSearchQuery] = useState<string>("")
	const [timeoutID, setTimeoutID] = useState<number>()
	const {data, loading, error} = useGet<Array<UserPublic>>(`${import.meta.env['VITE_API_URL']}/users?username=${searchQuery}`)
	const navigate = useNavigate()

	useEffect(() => {
		debouncedSearch(username)
	}, [username])

	function debouncedSearch(value: string) {
		clearTimeout(timeoutID)
		setTimeoutID(setTimeout(function() {setSearchQuery(value)}, 1000))
	}

	return (
		<Box>
			<TextField placeholder="Search for..." value={username} onChange={function(event) {setUsername(event.target.value)}}/>
			<List>
				{data?.map((user, index) => (
					<ListItem key={index}>
						<ListItemButton component="a" onClick={function() {navigate(`/user/${user.id}/books`)}}>
							<ListItemText primary={user.username}/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)
}
