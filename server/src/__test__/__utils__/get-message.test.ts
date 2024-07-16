import { getMessageBySubject } from '../../lib/nodemailer/get-message';
import { NodemailerSubject } from '../../types';

describe('get message', () => {
	it('should return correct message for Verify_Email', () => {
		const subject: NodemailerSubject = 'Verify_Email';
		const message = getMessageBySubject(subject);
		expect(message).toBe(
			'Thank you for registering. Please click the button below to verify your email address.',
		);
	});

	it('should return the correct message for Forgot_Password', () => {
		const subject: NodemailerSubject = 'Forgot_Password';
		const message = getMessageBySubject(subject);
		expect(message).toBe(
			'You have requested to reset your password. Click the button below to proceed. <strong style="color: red;">This link is only valid for 5 minutes.</strong>',
		);
	});

	it('should return the default message for an unknown subject', () => {
		const subject = 'Unknown_Subject' as NodemailerSubject;
		const message = getMessageBySubject(subject);
		expect(message).toBe(
			'Please click the button below to proceed.',
		);
	});
});
