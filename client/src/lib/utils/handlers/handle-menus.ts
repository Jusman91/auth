import { IHandleMenus } from '@/types';
import { hadndleDeleteUser } from './user';

export function handleMenus({
	label,
	path,
	newTab,
	navigate,
	userDeleted,
	id,
}: IHandleMenus) {
	if (label === 'logout') {
		hadndleDeleteUser({ id, userDeleted, navigate });
	} else if (newTab) {
		window.open(path, '_blank');
	} else {
		navigate(path);
	}
}
