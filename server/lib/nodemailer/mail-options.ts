import { SendMailOptions } from 'nodemailer';
import { SENDER_MAIL } from '../../config';
import { ISendMailParams } from '../../types';
import { getMessageBySubject } from './get-message';
import { generateMailOptions } from './generate-mail-options';

export function createMailOptions(params: ISendMailParams) {
	const message = getMessageBySubject(params.subject);

	return generateMailOptions(params, message, SENDER_MAIL);
}
