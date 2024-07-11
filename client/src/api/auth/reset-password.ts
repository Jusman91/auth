import { axiosError, axiosInstance } from '@/lib/axios';
import {
	IResetPasswordResponse,
	IResetPasswordUser,
} from '@/types';

export default async function resetPassword({
	formFields,
	id,
	token,
}: IResetPasswordUser) {
	try {
		const { data } =
			await axiosInstance.put<IResetPasswordResponse>(
				`/auth/reset_password/${id}/${token}`,
				formFields,
			);
		return data;
	} catch (error) {
		axiosError(error as Error);
	}
}
