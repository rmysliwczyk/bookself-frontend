import {useParams} from 'react-router'

export default function Profile() {
	const params = useParams()

	return <>Profile ID: {params.user_id}</>
}
