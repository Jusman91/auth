import { loggedInUser } from '@/api';
import { axiosInstance } from '@/lib/axios';
import { IUser } from '@/types';
import * as api from '@/lib/axios';

describe('API - loggedInUser', () => {
	const mockResponse: IUser = {
		id: 'userId',
		username: 'userName',
		email: 'example@example.com',
		profilePic: '',
		role: 'user',
		createdAt: '2024-07-11T00:00:00.000Z',
		updatedAt: '2024-07-11T00:00:00.000Z',
		__v: 0,
	};
	it('should loggedIn user successfully', async () => {
		const postSpy = vi
			.spyOn(axiosInstance, 'get')
			.mockResolvedValue({ data: mockResponse });

		const result = await loggedInUser();
		expect(result).toEqual(mockResponse);
		expect(postSpy).toHaveBeenCalledWith('/users/me');
	});

	it('should call axiosError on failure', async () => {
		const mockError = new Error('Request failed');
		const postSpy = vi
			.spyOn(axiosInstance, 'get')
			.mockRejectedValue(mockError);
		const axiosErrorSpy = vi.spyOn(api, 'axiosError');

		await expect(loggedInUser()).rejects.toThrow(
			'Unexpected error occurred',
		);

		expect(axiosErrorSpy).toHaveBeenCalledWith(mockError);
		expect(postSpy).toHaveBeenCalledWith('/users/me');
	});
});
