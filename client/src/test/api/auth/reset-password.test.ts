import { resetPassword } from '@/api';
import { axiosInstance } from '@/lib/axios';
import {
	IResetPasswordResponse,
	IResetPasswordUser,
} from '@/types';
import * as api from '@/lib/axios';

describe('API - resetPassword', () => {
	const params: IResetPasswordUser = {
		formFields: {
			password: 'password123',
			confirmPassword: 'password123',
		},
		id: 'valid-id',
		token: 'valid-token',
	};
	it('should reset password user successfully', async () => {
		const mockResponse: IResetPasswordResponse = {
			message: 'Reset successfully',
		};
		const postSpy = vi
			.spyOn(axiosInstance, 'put')
			.mockResolvedValue({ data: mockResponse });

		const result = await resetPassword(params);
		expect(result).toEqual(mockResponse);
		expect(postSpy).toHaveBeenCalledWith(
			`/auth/reset_password/${params.id}/${params.token}`,
			params.formFields,
		);
	});

	it('should call axiosError on failure', async () => {
		const mockError = new Error('Request failed');
		const postSpy = vi
			.spyOn(axiosInstance, 'put')
			.mockRejectedValue(mockError);
		const axiosErrorSpy = vi.spyOn(api, 'axiosError');

		await expect(resetPassword(params)).rejects.toThrow(
			'Unexpected error occurred',
		);

		expect(axiosErrorSpy).toHaveBeenCalledWith(mockError);
		expect(postSpy).toHaveBeenCalledWith(
			`/auth/reset_password/${params.id}/${params.token}`,
			params.formFields,
		);
	});
});
