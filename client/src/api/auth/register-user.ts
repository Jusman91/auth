import { axiosError, axiosInstance } from '@/lib/axios';
import { IRegisterResponse, IRegisterUser } from '@/types';

export default async function registerUser(
	params: IRegisterUser,
) {
	try {
		const { data } =
			await axiosInstance.post<IRegisterResponse>(
				'auth/register',
				params,
			);
		return data;
	} catch (error) {
		axiosError(error as Error);
	}
}
