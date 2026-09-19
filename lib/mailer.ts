import { Resend } from "resend";
import { env } from "./env";

let _resend: Resend | null = null;

export function getResend(): Resend {
	if (!_resend) {
		_resend = new Resend(env.RESEND_API_KEY);
	}
	return _resend;
}

export type SendEmailParams = {
	to: string | string[];
	subject: string;
	html: string;
	from?: string;
};

export async function sendEmail(
	params: SendEmailParams,
	resend = getResend(),
): Promise<void> {
	const { error } = await resend.emails.send({
		from: params.from ?? "Auren <no-reply@tryauren.com>",
		to: params.to,
		subject: params.subject,
		html: params.html,
	});
	if (error) throw new Error(`Resend error: ${error.message}`);
}
