import * as Yup from 'yup';
import { validationSchema } from '../../../types';
import { createError } from '../../../middleware/error';
import { Request } from 'express';

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
