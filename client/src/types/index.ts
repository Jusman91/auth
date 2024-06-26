import type {
	FormInstance,
	FormProps,
	ModalProps,
} from 'antd';
import { Rule } from 'antd/es/form';
import {
	QueryObserverResult,
	UseMutateFunction,
} from '@tanstack/react-query';
import { ReactNode } from 'react';
import { type Transition } from 'framer-motion';

export enum keys {
	THEME_STORAGE = 'theme-storage',
	ACCESSTOKEN_STORAGE = 'accessToken-storage',
	AUTHENTICATED_STORAGE = 'isAuthenticated-storage',
	USER_STORAGE = 'user-storage',
	REGISTER = 'register',
	LOGIN = 'login',
	LOGGEDIN = 'logged-in',
	FORGOT_PASSWORD = 'forgot-password',
	RESET_PASSWORD = 'reset-password',
}
export type FormName =
	| 'register'
	| 'login'
	| 'forgot-password'
	| 'reset-password';
export interface ITypographyProps {
	text: string | undefined;
	className?: string;
}
export interface IHeader {
	title: string;
	subtitle?: string | undefined;
}
export interface IHeaderContentProps extends IHeader {
	classTitle?: string;
	classSubtitle?: string;
	classWrapper?: string;
}
export interface IIconSvgProps {
	src: string;
	alt?: string;
	className?: string;
}
// <api>
export interface IMessageResponse {
	message: string;
}
export interface IRegisterResponse
	extends IMessageResponse {}
export interface IForgotPasswordResponse
	extends IMessageResponse {}
export interface IResetPasswordResponse
	extends IMessageResponse {}
export interface ILoginResponse extends IRegisterResponse {
	accessToken: string;
}
// <api/>

// <storage>
export interface IRememberMe {
	rememberMe: boolean;
}
export interface ISaveAccessToken extends IRememberMe {
	accessToken: string;
}
export interface ISaveUser extends IRememberMe {
	user: IUser;
}
export interface ISaveAuthenticated extends IRememberMe {
	authenticated: boolean;
	rememberMe: boolean;
}
// <storage/>

// <contexts>
export interface IThemeContext {
	myTheme: string;
	toggleMyTheme: () => void;
}
export interface IFormContext<T> {
	form: FormInstance;
	name: FormName;
	values: T;
	submittable: boolean;
	setFieldsValue: (values: T) => void;
	resetFieldsValue: () => void;
}
export interface IFormProviderProps {
	children: ReactNode;
	name: FormName;
}
export interface IErrorUseContext {
	context: unknown;
	message: string;
}
// <contexts/>

// <auth>
export interface IObjAuthStaticData {
	path: string;
	goTo: string;
	desc: string;
	titleForm: string;
	subtitleForm: string;
	titleModal: string;
	subtitleModal: string;
	txtBtnForm: string;
	iconModal: string;
}
export type IForgotPasswordUser = IForgotPasswordFields;
export interface IResetPasswordUser {
	formFields: IResetPasswordFields;
	id: string;
	token: string;
}
export type ILoginUser = ILoginFields;
export type IRegisterUser = IRegisterFields;
export interface IRulesAuth {
	username: Rule[];
	email: Rule[];
	password: Rule[];
	confirmPassword: Rule[];
}
export type FieldName =
	| 'username'
	| 'email'
	| 'password'
	| 'confirmPassword'
	| 'rememberMe';
export interface IFieldHidden {
	fieldName: FieldName;
	formName: FormName;
}
export interface AuthFormProps extends FormProps {
	loading: boolean;
	className?: string;
}
export interface IHeaderAuthForm {
	register: IHeader;
	login: IHeader;
	forgotPassword: IHeader;
	resetPassword: IHeader;
}
export interface ISwitchAuthData {
	path: string;
	desc: string;
	txtLink: string;
}
export interface ISwitchAuthProps extends ISwitchAuthData {}
export interface IAuthModalProps extends ModalProps {
	isSuccess: boolean;
	title: FormName;
	description: string;
}
export interface IRegisterFields extends ILoginFields {
	username: string;
	confirmPassword: string;
}
export interface ILoginFields
	extends IForgotPasswordFields {
	password: string;
	rememberMe?: boolean;
}
export interface IForgotPasswordFields {
	email: string;
}
export interface IResetPasswordFields {
	password: string;
	confirmPassword: string;
}
export interface IInitialValues {
	register: IRegisterFields;
	login: ILoginFields;
	forgotPassword: IForgotPasswordFields;
	resetPassword: IResetPasswordFields;
}
export interface IButtonSubmitFormProps {
	disabled: boolean;
	loading?: boolean;
	className?: string;
}
export interface IHandleLoggedInProps {
	userLoggedIn: () => Promise<
		QueryObserverResult<IUser | undefined, Error>
	>;
	formFields: ILoginFields;
}
export interface IHandleLoginProps
	extends IHandleLoggedInProps {
	userLogin: UseMutateFunction<
		ILoginResponse | undefined,
		Error,
		ILoginUser,
		unknown
	>;
	openModal: () => void;
}
export interface IHandleRegisterProps {
	userRegister: UseMutateFunction<
		IRegisterResponse | undefined,
		Error,
		IRegisterUser,
		unknown
	>;
	formFields: IRegisterFields;
	openModal: () => void;
}
export interface IHandleForgotPasswordProps {
	sendRequest: UseMutateFunction<
		IForgotPasswordResponse | undefined,
		Error,
		IForgotPasswordUser,
		unknown
	>;
	formFields: IForgotPasswordFields;
	openModal: () => void;
}
export interface IHandleResetPasswordProps {
	userResetPassword: UseMutateFunction<
		IResetPasswordResponse | undefined,
		Error | null,
		IResetPasswordUser,
		unknown
	>;
	formFields: IResetPasswordFields;
	openModal: () => void;
	id: string;
	token: string;
}
// <auth/>

// <user>
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
// <user/>
export interface IAnimateFloatingProps {
	children: ReactNode;
	config: Transition;
}
//<MENU>
export type LabelMenu =
	| 'home'
	| 'about'
	| 'contact'
	| 'github'
	| 'linkedin'
	| 'logout';
export interface IMenuListData {
	path: string;
	label: LabelMenu;
	newTab: boolean;
}
export interface IHandleMenus extends IMenuListData {
	navigate: (path: string) => void;
}
export interface IMenuButton {
	setOpen: () => void;
}
export interface IMenuListButtonProps {
	label: LabelMenu;
	onClick: () => void;
}
//<MENU/>
