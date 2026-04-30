import {ValidateUserObject} from '../utils/Validation'
import {test, expect} from 'vitest'

test('ValidateUserObject successfully validates correct User object', () => {
	const user = { 'id': '7066ff57-92b5-4e05-8ad7-a9a086b68948', token: 'fake_token' }
	expect(ValidateUserObject(user)).toBe(true)
})
