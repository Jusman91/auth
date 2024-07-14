import { IHandleMenus } from '@/types';

export function handleMenus({
	label,
	path,
	newTab,
	id,
	navigate,
	handleDeleteUser,
}: IHandleMenus) {
	if (label === 'logout') {
		handleDeleteUser({ id, navigate });
	} else if (newTab) {
		window.open(path, '_blank');
	} else {
		navigate(path);
	}
}
