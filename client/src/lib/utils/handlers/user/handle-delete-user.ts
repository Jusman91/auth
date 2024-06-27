import { IHandleDeleteUser } from '@/types';
import { clearUserInStorage } from '../../storage';

export async function hadndleDeleteUser({
	id,
	userDeleted,
	navigate,
}: IHandleDeleteUser) {
	userDeleted(id, {
		onSuccess: () => {
			clearUserInStorage();
			navigate('/auth/login');
		},
		onError: (data) => {
			console.log(data?.message);
		},
	});
}
