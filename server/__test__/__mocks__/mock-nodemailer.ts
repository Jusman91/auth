import { mockSendMailParams } from './mock-data';

export const mockSendEmail = jest.fn();
export const mockCreateTransport = jest
	.fn()
	.mockReturnValue({
		sendMail: jest.fn((mailOptions, callback) => {
			const mockResponse = { response: '250 OK' };
			callback(null, mockResponse);
		}),
	});
export const mockCreateMailOptions = jest
	.fn()
	.mockReturnValue({
		from: 'no-reply@example.com',
		to: mockSendMailParams.to,
		subject: mockSendMailParams.subject,
		html: `<a href="${mockSendMailParams.url}">${mockSendMailParams.btnText}</a>`,
	});
