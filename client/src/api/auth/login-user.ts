import { axiosError, axiosInstance } from '@/lib/axios';
import { ILoginResponse, ILoginUser } from '@/types';

export default async function loginUser(
	params: ILoginUser,
) {
	try {
		const { data } =
			await axiosInstance.post<ILoginResponse>(
				'/auth/login',
				params,
			);
		return data;
	} catch (error) {
		axiosError(error as Error);
	}
}
