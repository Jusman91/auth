import { sendEmail } from '../../lib/nodemailer';
import { createMailOptions } from '../../lib/nodemailer/mail-options';
import { createTransport } from '../../lib/nodemailer/transport';
import {
	mockCreateMailOptions,
	mockCreateTransport,
	mockSendMailParams,
} from '../__mocks__';

jest.mock('../../lib/nodemailer/transport');
jest.mock('../../lib/nodemailer/mail-options');

describe('sendEmail', () => {
	beforeEach(() => {
		(createTransport as jest.Mock).mockImplementation(
			mockCreateTransport,
		);
		(createMailOptions as jest.Mock).mockImplementation(
			mockCreateMailOptions,
		);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should create transport and mail options correctly', async () => {
		await sendEmail(mockSendMailParams);

		expect(mockCreateTransport).toHaveBeenCalled();
		expect(mockCreateMailOptions).toHaveBeenCalledWith({
			to: mockSendMailParams.to,
			subject: mockSendMailParams.subject,
			btnText: mockSendMailParams.btnText,
			url: mockSendMailParams.url,
		});
	});

	it('should send email successfully and return response 250 OK', async () => {
		const mockResponse = { response: '250 OK' };

		const result = await sendEmail(mockSendMailParams);
		expect(
			mockCreateTransport().sendMail,
		).toHaveBeenCalledWith(
			expect.objectContaining({
				from: 'no-reply@example.com',
				to: mockSendMailParams.to,
				subject: mockSendMailParams.subject,
				html: `<a href="${mockSendMailParams.url}">${mockSendMailParams.btnText}</a>`,
			}),
			expect.any(Function),
		);
		expect(result).toEqual(mockResponse);
	});

	it('should handle error during email sending', async () => {
		const mockError = new Error('sendMail failed');
		mockCreateTransport.mockReturnValue({
			sendMail: jest.fn((mailOptions, callback) => {
				callback(mockError);
			}),
		});

		await expect(
			sendEmail(mockSendMailParams),
		).rejects.toThrow('sendMail failed');

		expect(
			mockCreateTransport().sendMail,
		).toHaveBeenCalledWith(
			expect.objectContaining({
				from: 'no-reply@example.com',
				to: mockSendMailParams.to,
				subject: mockSendMailParams.subject,
				html: `<a href="${mockSendMailParams.url}">${mockSendMailParams.btnText}</a>`,
			}),
			expect.any(Function),
		);
	});
});
