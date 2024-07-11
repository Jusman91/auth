import { deleteUser } from '@/api';
import { axiosInstance } from '@/lib/axios';
import { IDeleteUserResponse } from '@/types';
import * as api from '@/lib/axios';

describe('API - deleteUser', () => {
	const id = 'userId';
	it('should delete user successfully', async () => {
		const mockResponse: IDeleteUserResponse = {
			message: 'Delete user successfully',
		};
		const deleteSpy = vi
			.spyOn(axiosInstance, 'delete')
			.mockResolvedValue({ data: mockResponse });
		const result = await deleteUser(id);
		expect(result).toEqual(mockResponse);
		expect(deleteSpy).toHaveBeenCalledWith(`/users/${id}`);
	});

	it('should call axiosError on failure', async () => {
		const mockError = new Error('Request failed');
		const deleteSpy = vi
			.spyOn(axiosInstance, 'delete')
			.mockRejectedValue(mockError);
		const axiosErrorSpy = vi.spyOn(api, 'axiosError');

		await expect(deleteUser(id)).rejects.toThrow(
			'Unexpected error occurred',
		);

		expect(axiosErrorSpy).toHaveBeenCalledWith(mockError);
		expect(deleteSpy).toHaveBeenCalledWith(`/users/${id}`);
	});
});
