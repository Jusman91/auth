import axios, { AxiosError } from 'axios';

export function axiosError(error: Error) {
	if (axios.isAxiosError<AxiosError>(error)) {
		throw error.response?.data;
	} else {
		throw new Error('Unexpected error occurred');
	}
}
