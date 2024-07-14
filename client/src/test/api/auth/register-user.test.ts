import { registerUser } from '@/api';
import { axiosInstance } from '@/lib/axios';
import * as api from '@/lib/axios';
import { IRegisterResponse, IRegisterUser } from '@/types';

describe('API - registerUser', () => {
	const params: IRegisterUser = {
		username: 'testuser',
		email: 'testuser@example.com',
		password: 'password123',
		confirmPassword: 'password123',
	};
	it('should register user successfully', async () => {
		const mockResponse: IRegisterResponse = {
			message: 'Register successfully',
		};
		const postSpy = vi
			.spyOn(axiosInstance, 'post')
			.mockResolvedValue({ data: mockResponse });

		const result = await registerUser(params);
		expect(result).toEqual(mockResponse);
		expect(postSpy).toHaveBeenCalledWith(
			'/auth/register',
			params,
		);
	});

	it('should call axiosError on failure', async () => {
		const mockError = new Error('Request failed');
		const postSpy = vi
			.spyOn(axiosInstance, 'post')
			.mockRejectedValue(mockError);
		const axiosErrorSpy = vi.spyOn(api, 'axiosError');

		await expect(registerUser(params)).rejects.toThrow(
			'Unexpected error occurred',
		);

		expect(axiosErrorSpy).toHaveBeenCalledWith(mockError);
		expect(postSpy).toHaveBeenCalledWith(
			'/auth/register',
			params,
		);
	});
});
