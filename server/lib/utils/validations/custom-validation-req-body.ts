import * as Yup from 'yup';
import { validationSchema } from '../../../types';
import { Request } from 'express';
import { createError } from '../../../middleware';

export const customValidationReqBody =
	(schema: Yup.ObjectSchema<any>): validationSchema =>
	async (data: Request) => {
		try {
			await schema.validate(data, { abortEarly: false });
			return null;
		} catch (error: any) {
			// output message = message: ['errorMessage1, errorMessage2']
			const validationErrors: string[] = [];
			error.inner.map((err: { message: any }) => {
				validationErrors.push(err.message);
			});

			throw createError(
				422,
				validationErrors as unknown as string,
			); // 422 Unprocessable Entity
		}
	};
