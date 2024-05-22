import { IRulesLogin } from '@/types';

export const authFormLoginValidations: IRulesLogin = {
	email: [
		{
			type: 'email',
			message: 'The input is not valid Email!',
		},
		{
			required: true,
			message: 'Email masih kosong!',
		},
	],
	password: [
		{
			required: true,
			message: 'Password masih kosong!',
		},
	],
};
