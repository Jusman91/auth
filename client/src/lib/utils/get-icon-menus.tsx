import { LabelMenu } from '@/types';
import {
	Home,
	User,
	Phone,
	Github,
	Linkedin,
	LogOut,
} from 'lucide-react';

export const getIconMenus = (label: LabelMenu) => {
	switch (label) {
		case 'home':
			return (
				<Home
					className='w-full h-full object-cover'
					strokeWidth={1.5}
				/>
			);
		case 'about':
			return (
				<User className='w-full h-auto' strokeWidth={1.5} />
			);
		case 'contact':
			return (
				<Phone
					className='w-full h-auto'
					strokeWidth={1.5}
				/>
			);
		case 'github':
			return (
				<Github
					className='w-full h-auto'
					strokeWidth={1.5}
				/>
			);
		case 'linkedin':
			return (
				<Linkedin
					className='w-full h-auto'
					strokeWidth={1.5}
				/>
			);
		case 'logout':
			return (
				<LogOut
					className='w-full h-auto'
					strokeWidth={1.5}
				/>
			);
		default:
			return (
				<Home className='w-full h-auto' strokeWidth={1.5} />
			);
	}
};

export default getIconMenus;
