import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
	const body = await req.text();
	const sig = (await headers()).get("stripe-signature");

	if (!sig) return new Response("Missing stripe-signature", { status: 400 });

	let event;
	try {
		event = getStripe().webhooks.constructEvent(
			body,
			sig,
			process.env.STRIPE_WEBHOOK_SECRET!,
		);
	} catch (err) {
		return new Response(`Webhook error: ${(err as Error).message}`, {
			status: 400,
		});
	}

	switch (event.type) {
		case "customer.subscription.created":
		case "customer.subscription.updated":
		case "customer.subscription.deleted": {
			// TODO: handle subscription lifecycle
			break;
		}
		case "checkout.session.completed": {
			const session = event.data.object;
			if (session.customer && session.client_reference_id) {
				await prisma.user.update({
					where: { id: session.client_reference_id },
					data: { stripeCustomerId: session.customer as string },
				});
			}
			break;
		}
	}

	return new Response(null, { status: 200 });
}
