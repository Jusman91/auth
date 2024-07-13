import { axiosError } from '@/lib/axios';
import { AxiosError } from 'axios';

describe('axiosError', () => {
	it('should throw error.response.data if error is AxiosError', () => {
		const mockError = {
			isAxiosError: true,
			response: {
				data: 'Mocked error data',
			},
		} as AxiosError;

		expect(() => axiosError(mockError)).toThrow(
			'Mocked error data',
		);
	});

	it('should throw "Unexpected error occurred" if error is not AxiosError', () => {
		const nonAxiosError = new Error('Non-Axios error');

		expect(() => axiosError(nonAxiosError)).toThrow(
			'Unexpected error occurred',
		);
	});
});
