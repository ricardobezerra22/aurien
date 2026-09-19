import { getTranslations, setRequestLocale } from "next-intl/server";
import { LandingClient } from "./_components/landing-client";

export default async function LandingPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations("landing");
	const tNav = await getTranslations("nav");
	const tCommon = await getTranslations("common");
	const tAuth = await getTranslations("auth");

	return (
		<LandingClient
			screening={tNav("screening")}
			tagline={t("tagline")}
			description={t("description")}
			cta={t("cta")}
			ctaSecondary={t("ctaSecondary")}
			disclaimer={t("disclaimer")}
			signInDescription={tAuth("signInDescription")}
			signIn={tCommon("signIn")}
		/>
	);
}
