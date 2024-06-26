import { axiosError, axiosInstance } from '@/lib/axios';
import {
	IForgotPasswordResponse,
	IForgotPasswordUser,
} from '@/types';

export default async function forgotPassword(
	params: IForgotPasswordUser,
) {
	try {
		const { data } =
			await axiosInstance.post<IForgotPasswordResponse>(
				'/auth/forgot_password',
				params,
			);
		return data;
	} catch (error) {
		axiosError(error as Error);
	}
}
