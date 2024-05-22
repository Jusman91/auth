import { type UseMutateFunction } from '@tanstack/react-query';
import type { FormInstance, UploadFile } from 'antd';
import { Rule } from 'antd/es/form';
import { AxiosError } from 'axios';

// api
export interface IResponseError extends AxiosError {
	message: string;
	status: number;
}
export interface IThemeContext {
	myTheme: string;
	toggleMyTheme: () => void;
}

export interface IErrorUseContext {
	context: unknown;
	message: string;
}

export type FormName =
	| 'login'
	| 'forgot-password'
	| 'reset-password'
	| 'token-expired';

export interface IFormContext {
	open: boolean;
	setOpen: (value: boolean) => void;
	form: FormInstance;
	formName: string;
	objURL: UploadFile | undefined;
	submittable: boolean;
	setFormName: (value: FormName) => void;
	setSubmittable: (value: boolean) => void;
	setObjURL: (value: UploadFile | undefined) => void;
}

// auth
export interface IAuthTitleProps {
	title: string;
	subtitle: string;
	className?: string;
}
export interface IAuthModalContentProps {
	icon: string;
	title: string;
	subtitle: string;
}
export interface IAuthModalProps {
	success: boolean;
}
export interface ILoginInput {
	email: string;
	password: string;
	rememberMe: boolean;
}
export interface ILoginResponse {
	message: string;
	accessToken: string;
}
export interface IRulesLogin {
	email: Rule[];
	password: Rule[];
}
export type AuthAction =
	| { type: 'LOGIN_SUCCESS'; payload: IUser }
	| { type: 'SET_LOADING'; payload: boolean }
	| { type: 'LOGIN_ERROR'; payload: string }
	| { type: 'LOGOUT' };
export interface IAuthContext {
	user: IUser | null;
	isAuthenticated: boolean;
	loading: boolean;
	error: IResponseError | Error | null;
	userLogin: UseMutateFunction<
		ILoginResponse | undefined,
		Error,
		ILoginInput,
		unknown
	>;
	dispatch: React.Dispatch<AuthAction>;
}

// user
export interface IUser {
	_id: string;
	username: string;
	email: string;
	profilePic: string;
	role: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
