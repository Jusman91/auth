import { forgotPassword } from '@/api';
import { axiosInstance } from '@/lib/axios';
import * as api from '@/lib/axios';
import {
	IForgotPasswordResponse,
	IForgotPasswordUser,
} from '@/types';

describe('API - forgotPassword', () => {
	const params: IForgotPasswordUser = {
		email: 'testuser@example.com',
	};
	it('should send email if successfully', async () => {
		const mockResponse: IForgotPasswordResponse = {
			message: 'successfully, please check your email',
		};
		const postSpy = vi
			.spyOn(axiosInstance, 'post')
			.mockResolvedValue({ data: mockResponse });

		const result = await forgotPassword(params);
		expect(result).toEqual(mockResponse);
		expect(postSpy).toHaveBeenCalledWith(
			'/auth/forgot_password',
			params,
		);
	});

	it('should call axiosError on failure', async () => {
		const mockError = new Error('Request failed');
		const postSpy = vi
			.spyOn(axiosInstance, 'post')
			.mockRejectedValue(mockError);
		const axiosErrorSpy = vi.spyOn(api, 'axiosError');

		await expect(forgotPassword(params)).rejects.toThrow(
			'Unexpected error occurred',
		);

		expect(axiosErrorSpy).toHaveBeenCalledWith(mockError);
		expect(postSpy).toHaveBeenCalledWith(
			'/auth/forgot_password',
			params,
		);
	});
});
