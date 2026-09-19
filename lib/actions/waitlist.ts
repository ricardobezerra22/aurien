"use server";

import { z } from "zod";
import { sendEmail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";

const schema = z.object({
	email: z.string().min(1).max(254).email(),
	locale: z.enum(["en", "pt-BR", "es"]).default("en"),
});

export type WaitlistState =
	| { status: "idle" }
	| { status: "success" }
	| { status: "error"; message: string };

export async function joinWaitlist(
	_prev: WaitlistState,
	formData: FormData,
): Promise<WaitlistState> {
	const parsed = schema.safeParse({
		email: formData.get("email"),
		locale: formData.get("locale") ?? undefined,
	});

	if (!parsed.success) {
		return { status: "error", message: parsed.error.issues[0].message };
	}

	const { email, locale } = parsed.data;

	try {
		await prisma.waitlistEntry.create({ data: { email, locale } });
	} catch (e: unknown) {
		if ((e as { code?: string }).code === "P2002") {
			return { status: "success" };
		}
		throw e;
	}

	void sendConfirmationEmail(email, locale).catch(() => {});

	return { status: "success" };
}

async function sendConfirmationEmail(email: string, locale: string) {
	const subject =
		locale === "pt-BR"
			? "Você está na lista — Auren"
			: locale === "es"
				? "Estás en la lista — Auren"
				: "You're on the list — Auren";

	const body =
		locale === "pt-BR"
			? "Obrigado por se inscrever. Entraremos em contato quando Auren estiver disponível."
			: locale === "es"
				? "Gracias por inscribirte. Te avisaremos cuando Auren esté disponible."
				: "Thanks for joining. We'll reach out when Auren is ready.";

	await sendEmail({
		to: email,
		subject,
		html: `<p style="font-family:sans-serif;color:#172522;line-height:1.6">${body}</p>`,
	});
}
