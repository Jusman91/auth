import nodemailer from 'nodemailer';
import { APP_PASS, SENDER_MAIL } from '../../config';

export function createTransport() {
	const objTrasport = nodemailer.createTransport({
		service: 'gmail',
		host: 'smtp.gmail.com',
		port: 587,
		secure: false,
		auth: {
			user: SENDER_MAIL,
			pass: APP_PASS,
		},
	});
	return objTrasport;
}
