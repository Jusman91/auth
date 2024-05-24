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
