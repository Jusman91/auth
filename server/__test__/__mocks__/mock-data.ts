import { ISendMailParams } from '../../types';

export const mockDATABASE_URL = 'mocked_database_url';
export const mockHashedPassword =
	'$2a$10$EIX/0oBjFhM4m0FioH8y4u/Ju1O3Zr6l5qv7qI0ue6F8Tp1z9DjeW';

export const mockSendMailParams: ISendMailParams = {
	to: 'test@example.com',
	subject: 'Forgot_Password',
	btnText: 'Click Me',
	url: 'http://example.com',
};
export const mockUser = {
	id: '60d5ec49c2b8b2282a92b1c5',
	username: 'testuser',
	email: 'testuser@example.com',
	role: 'user',
	avatar: 'avatar_url',
	createdAt: new Date(),
	updatedAt: new Date(),
};
