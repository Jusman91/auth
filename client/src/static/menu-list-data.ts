import { IMenuListData } from '@/types';

export const menuListData: IMenuListData[] = [
	{
		label: 'home',
		path: '/',
		newTab: false,
	},
	{
		label: 'about',
		path: '/about',
		newTab: false,
	},
	{
		label: 'contact',
		path: '/contact',
		newTab: false,
	},
	{
		label: 'github',
		path: 'https://github.com/Jusman91',
		newTab: true,
	},
	{
		label: 'linkedin',
		path: 'https://www.linkedin.com/in/jusman-jaharudding-a18a78254/',
		newTab: true,
	},
	{
		label: 'logout',
		path: '/auth/login',
		newTab: false,
	},
];
