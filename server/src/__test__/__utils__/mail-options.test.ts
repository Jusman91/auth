import { createMailOptions } from '../../lib/nodemailer/mail-options';
import { getMessageBySubject } from '../../lib/nodemailer/get-message';
import { SENDER_MAIL } from '../../config';
import { mockSendMailParams } from '../__mocks__';
import { generateMailOptions } from '../../lib/nodemailer/generate-mail-options';

jest.mock('../../lib/nodemailer/get-message', () => ({
	getMessageBySubject: jest.fn(),
}));

describe('createMailOptions', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should create mail options with correct values', () => {
		const mockMessage =
			'Thank you for registering. Please click the button below to verify your email address.';
		(getMessageBySubject as jest.Mock).mockReturnValue(
			mockMessage,
		);

		const expectedOptions = generateMailOptions(
			mockSendMailParams,
			mockMessage,
			SENDER_MAIL,
		);

		const mailOptions = createMailOptions(
			mockSendMailParams,
		);

		expect(getMessageBySubject).toHaveBeenCalledWith(
			mockSendMailParams.subject,
		);
		expect(mailOptions).toEqual(expectedOptions);
	});
});
