import { axiosError, axiosInstance } from '@/lib/axios';
import { IUser } from '@/types';

export default async function loggedInUser() {
	try {
		const { data } = await axiosInstance.get<IUser>(
			'/users/me',
		);
		return data as IUser;
	} catch (error) {
		axiosError(error as Error);
	}
}
