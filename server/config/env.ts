import * as dotenv from 'dotenv';
dotenv.config();

const {
	PORT,
	DATABASE_URL,
	ACCESS_TOKEN_SECRET_KEY,
	RESET_PASSWORD_TOKEN_SECRET_KEY,
} = process.env;

export {
	PORT,
	DATABASE_URL,
	ACCESS_TOKEN_SECRET_KEY,
	RESET_PASSWORD_TOKEN_SECRET_KEY,
};
