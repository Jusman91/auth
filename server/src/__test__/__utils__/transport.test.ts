import nodemailer from 'nodemailer';
import { createTransport } from '../../lib/nodemailer/transport';

jest.mock('../../config', () => ({
	SENDER_MAIL: 'test@example.com',
	APP_PASS: 'testpassword',
}));
jest.mock('nodemailer', () => ({
	createTransport: jest.fn(),
}));

describe('createTransport', () => {
	it('should create a transport object with the correct configuration', () => {
		createTransport();

		expect(nodemailer.createTransport).toHaveBeenCalledWith(
			{
				service: 'gmail',
				host: 'smtp.gmail.com',
				port: 587,
				secure: false,
				auth: {
					user: 'test@example.com',
					pass: 'testpassword',
				},
			},
		);
	});
});
