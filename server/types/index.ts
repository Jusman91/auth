import { Request } from 'express';

export interface ICustomError extends Error {
	status?: number;
}

export type validationSchema = (
	data: Request,
) => Promise<void | null>;

export type AuthValidationName =
	| 'register'
	| 'login'
	| 'forgot-password'
	| 'reset-password';
export type NodemailerSubject =
	| 'Verify_Email'
	| 'Forgot_Password';
export interface IUserPayload {
	id: string;
	role: string;
}
export interface IUserRequest extends Request {
	user?: IUserPayload;
}
export interface ISendMailParams {
	to: string;
	subject: NodemailerSubject;
	btnText: string;
	url: string;
}
