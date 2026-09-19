import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;
	const validLocale =
		requested && (routing.locales as readonly string[]).includes(requested)
			? requested
			: routing.defaultLocale;

	return {
		locale: validLocale,
		messages: (await import(`../messages/${validLocale}.json`)).default,
	};
});
