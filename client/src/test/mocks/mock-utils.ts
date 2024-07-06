import { FormName } from '@/types';
import type * as AuthModule from '@/lib/utils/auth';

// const actualAuthModule = await vi.importActual<
// 	typeof AuthModule
// >('@/lib/utils/auth');

let actualAuthModule: typeof AuthModule;

beforeAll(async () => {
	actualAuthModule = await vi.importActual<
		typeof AuthModule
	>('@/lib/utils/auth');
});
export const mockGetHeaderAuthFormData = vi.fn(
	(name: FormName) => {
		return actualAuthModule.getHeaderAuthFormData(name);
	},
);
export const mockGetInitialValues = vi.fn(
	(name: FormName) => {
		return actualAuthModule.getInitialValues(name);
	},
);

export const mockGetSwitchAuthFormData = vi.fn(
	(name: FormName) => {
		return actualAuthModule.getSwitchAuthFormData(name);
	},
);
export const mockGetFieldsAuthFormData = vi.fn(
	(name: FormName) => {
		return actualAuthModule.getFieldsAuthFormData(name);
	},
);
export const mockGetTxtBtnSubmitAuthForm = vi.fn(
	(name: FormName) => {
		return actualAuthModule.getTxtBtnSubmitAuthForm(name);
	},
);
// export const mockGetInitialValues = vi
// 	.fn()
// 	.mockReturnValue({
// 		email: '',
// 		password: '',
// 	});
// export const mockGetHeaderAuthFormData = vi
// 	.fn()
// 	.mockReturnValue({
// 		title: 'Register',
// 		subtitle: 'Please register here',
// 	});
// export const mockGetSwitchAuthFormData = vi
// 	.fn()
// 	.mockReturnValue({
// 		path: '/register',
// 		desc: "Don't have an account?",
// 		txtLink: 'Register',
// 	});
// export const mockGetFieldsAuthFormData = vi
// 	.fn()
// 	.mockReturnValue({
// 		fieldItems: [
// 			{
// 				name: 'email',
// 				type: 'email',
// 				placeholder: 'Email',
// 			},
// 			{
// 				name: 'password',
// 				type: 'password',
// 				placeholder: 'Password',
// 			},
// 		],
// 	});
// export const mockGetTxtBtnSubmitAuthForm = vi
// 	.fn()
// 	.mockReturnValue('Login');
