import bcrypt from 'bcryptjs';
import { createError } from '../../middleware/error';

export const encrypPassword = async (password: string) => {
	const hashedPassword = await bcrypt.hash(password, 10);
	return { hashedPassword };
};

export const comparePassword = async (
	password: string,
	existingPassword: string,
) => {
	const isPasswordValid = await bcrypt.compare(
		password,
		existingPassword,
	);

	if (!isPasswordValid)
		throw createError(400, 'Invalid password');
};
