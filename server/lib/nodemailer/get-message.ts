import { NodemailerSubject } from '../../types';

export function getMessageBySubject(
	subject: NodemailerSubject,
): string {
	switch (subject) {
		case 'Verify_Email':
			return 'Thank you for registering. Please click the button below to verify your email address.';
		case 'Forgot_Password':
			return 'You have requested to reset your password. Click the button below to proceed. <strong style="color: red;">This link is only valid for 5 minutes.</strong>';
		default:
			return 'Please click the button below to proceed.';
	}
}
