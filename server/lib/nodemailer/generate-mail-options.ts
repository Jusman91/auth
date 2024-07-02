import { SendMailOptions } from 'nodemailer';
import { ISendMailParams } from '../../types';

export function generateMailOptions(
	params: ISendMailParams,
	message: string,
	from: string | undefined,
): SendMailOptions {
	const { to, subject, btnText, url } = params;
	return {
		from: from,
		to: to,
		subject: subject,
		html: `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the MeDiscover.</h2>
    <p>${message}</p>
    
    <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${btnText}</a>

    <p>If the button doesn't work for any reason, you can also click on the link below:</p>

    <div>${url}</div>
    </div>
  `,
	};
}
