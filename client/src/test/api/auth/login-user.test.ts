import { loginUser } from '@/api';
import { axiosInstance } from '@/lib/axios';
import * as api from '@/lib/axios';
import { ILoginResponse, ILoginUser } from '@/types';

describe('API - loginUser', () => {
	const params: ILoginUser = {
		email: 'testuser@example.com',
		password: 'password123',
	};
	it('should login user successfully', async () => {
		const mockResponse: ILoginResponse = {
			message: 'Login successfully',
			accessToken: 'accessToken123',
		};
		const postSpy = vi
			.spyOn(axiosInstance, 'post')
			.mockResolvedValue({ data: mockResponse });

		const result = await loginUser(params);
		expect(result).toEqual(mockResponse);
		expect(postSpy).toHaveBeenCalledWith(
			'/auth/login',
			params,
		);
	});

	it('should call axiosError on failure', async () => {
		const mockError = new Error('Request failed');
		const postSpy = vi
			.spyOn(axiosInstance, 'post')
			.mockRejectedValue(mockError);
		const axiosErrorSpy = vi.spyOn(api, 'axiosError');

		await expect(loginUser(params)).rejects.toThrow(
			'Unexpected error occurred',
		);

		expect(axiosErrorSpy).toHaveBeenCalledWith(mockError);
		expect(postSpy).toHaveBeenCalledWith(
			'/auth/login',
			params,
		);
	});
});
