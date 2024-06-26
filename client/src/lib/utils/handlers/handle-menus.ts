import { IHandleMenus } from '@/types';
import { clearUserInStorage } from '../storage';

export function handleMenus({
	label,
	path,
	newTab,
	navigate,
}: IHandleMenus) {
	if (label === 'logout') {
		clearUserInStorage();
	}
	if (newTab) {
		window.open(path, '_blank');
	} else {
		navigate(path);
	}
}
