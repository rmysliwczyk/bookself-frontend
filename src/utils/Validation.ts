import type {User} from '../types'

export function ValidateUserObject(user: User) {
	if (typeof(user) != 'object')
	{
		return false
	}

	if (!('id' in user)) {
		return false
	}
	else {
		if (typeof(user.id) != 'string') {
			return false
		}
	}

	if (!('token' in user)) {
		return false
	}
	else {
		if (typeof(user.token) != 'string') {
			return false
		}
	}

	return true
}
