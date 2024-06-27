import { axiosError, axiosInstance } from '@/lib/axios';

export default async function deleteUser(id: string) {
	try {
		const { data } = await axiosInstance.delete(
			`/users/${id}`,
		);
		return data;
	} catch (error) {
		axiosError(error as Error);
	}
}
