import axiosInstance from '@/lib/axios/axios-instance';
import {
	ILoginInput,
	ILoginResponse,
	IResponseError,
} from '@/types';
import axios from 'axios';

export async function getLoginUserFn(params: ILoginInput) {
	try {
		const { data } =
			await axiosInstance.post<ILoginResponse>(
				'/auth/login',
				params,
			);
		return data;
	} catch (error) {
		if (axios.isAxiosError<IResponseError>(error)) {
			throw error.response?.data;
		}
	}
}

export async function getMeFn() {
	try {
		const { data } = await axiosInstance.get('/users/me');
		return data;
	} catch (error) {
		if (axios.isAxiosError<IResponseError>(error)) {
			throw error.response?.data;
		}
	}
}
