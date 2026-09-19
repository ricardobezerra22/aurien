import Stripe from "stripe";
import { env } from "./env";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
	_stripe ??= new Stripe(env.STRIPE_SECRET_KEY!, {
		apiVersion: "2026-08-26.dahlia",
	});
	return _stripe;
}

export { _stripe as stripe };
