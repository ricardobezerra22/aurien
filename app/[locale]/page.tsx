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

	return (
		<LandingClient
			locale={locale}
			// Hero
			heroHeadline={t("hero.headline")}
			heroBody={t("hero.body")}
			heroImageAlt="A woman in a green jacket stands in a bright, calm space, looking thoughtfully out of a window surrounded by translucent circles"
			// Waitlist
			waitlistPlaceholder={t("waitlist.placeholder")}
			waitlistCta={t("waitlist.cta")}
			waitlistSuccess={t("waitlist.success")}
			waitlistError={t("waitlist.errorGeneric")}
			// Trust
			trust={[
				{ label: t("trust.private.label"), desc: t("trust.private.desc") },
				{ label: t("trust.adult.label"), desc: t("trust.adult.desc") },
				{ label: t("trust.evidence.label"), desc: t("trust.evidence.desc") },
				{ label: t("trust.shareable.label"), desc: t("trust.shareable.desc") },
			]}
			// Educational
			educationalHeading={t("educational.heading")}
			educationalIntro={t("educational.intro")}
			educationalTopics={[
				{
					title: t("educational.sensory.title"),
					body: t("educational.sensory.body"),
				},
				{
					title: t("educational.executive.title"),
					body: t("educational.executive.body"),
				},
				{
					title: t("educational.social.title"),
					body: t("educational.social.body"),
				},
			]}
			educationalImageAlt={t("educational.imageAlt")}
			educationalHumanAlt={t("educational.humanAlt")}
			// How it works
			howItWorksHeading={t("howItWorks.heading")}
			howItWorksSteps={[
				{
					num: t("howItWorks.step1.num"),
					title: t("howItWorks.step1.title"),
					body: t("howItWorks.step1.body"),
				},
				{
					num: t("howItWorks.step2.num"),
					title: t("howItWorks.step2.title"),
					body: t("howItWorks.step2.body"),
				},
				{
					num: t("howItWorks.step3.num"),
					title: t("howItWorks.step3.title"),
					body: t("howItWorks.step3.body"),
				},
				{
					num: t("howItWorks.step4.num"),
					title: t("howItWorks.step4.title"),
					body: t("howItWorks.step4.body"),
				},
			]}
			// Screening preview
			screeningHeading={t("screeningPreview.heading")}
			screeningBadge={t("screeningPreview.badge")}
			screeningProgress={t("screeningPreview.progress")}
			screeningQuestion={t("screeningPreview.question")}
			screeningOptions={[
				t("screeningPreview.opt1"),
				t("screeningPreview.opt2"),
				t("screeningPreview.opt3"),
				t("screeningPreview.opt4"),
				t("screeningPreview.opt5"),
			]}
			// Privacy
			privacyHeading={t("privacy.heading")}
			privacyPillars={[
				t("privacy.pillar1"),
				t("privacy.pillar2"),
				t("privacy.pillar3"),
			]}
			privacyLink={t("privacy.link")}
			// Diagnosis disclaimer
			disclaimerHeading={t("diagnosisDisclaimer.heading")}
			disclaimerBody={t("diagnosisDisclaimer.body")}
			screeningLabel={t("diagnosisDisclaimer.screeningLabel")}
			screeningDesc={t("diagnosisDisclaimer.screeningDesc")}
			diagnosisLabel={t("diagnosisDisclaimer.diagnosisLabel")}
			diagnosisDesc={t("diagnosisDisclaimer.diagnosisDesc")}
			// Results preview
			resultsHeading={t("resultsPreview.heading")}
			resultsBody={t("resultsPreview.body")}
			resultsScore={t("resultsPreview.score")}
			resultsImageAlt={t("resultsPreview.imageAlt")}
			resultsCategories={[
				t("resultsPreview.cat1"),
				t("resultsPreview.cat2"),
				t("resultsPreview.cat3"),
				t("resultsPreview.cat4"),
			]}
			// Evidence
			evidenceHeading={t("evidence.heading")}
			evidenceBody={t("evidence.body")}
			evidenceItems={[
				{ title: t("evidence.item1.title"), body: t("evidence.item1.body") },
				{ title: t("evidence.item2.title"), body: t("evidence.item2.body") },
				{ title: t("evidence.item3.title"), body: t("evidence.item3.body") },
				{ title: t("evidence.item4.title"), body: t("evidence.item4.body") },
			]}
			// PDF
			pdfHeading={t("pdf.heading")}
			pdfBody={t("pdf.body")}
			pdfCta={t("pdf.cta")}
			pdfDisclaimer={t("pdf.disclaimer")}
			// Clinicians
			cliniciansHeading={t("clinicians.heading")}
			cliniciansBody={t("clinicians.body")}
			cliniciansImageAlt={t("clinicians.imageAlt")}
			cliniciansCards={[
				{
					name: t("clinicians.card1.name"),
					title: t("clinicians.card1.title"),
					location: t("clinicians.card1.location"),
					specialty: t("clinicians.card1.specialty"),
				},
				{
					name: t("clinicians.card2.name"),
					title: t("clinicians.card2.title"),
					location: t("clinicians.card2.location"),
					specialty: t("clinicians.card2.specialty"),
				},
			]}
			cliniciansOnline={t("clinicians.online")}
			cliniciansVerified={t("clinicians.verified")}
			// Final CTA
			finalCtaHeading={t("finalCta.heading")}
			finalCtaBody={t("finalCta.body")}
			finalCtaImageAlt={t("finalCta.imageAlt")}
			// Footer
			footerTagline={t("footer.tagline")}
			footerDisclaimer={t("footer.disclaimer")}
			footerPrivacy={t("footer.privacy")}
		/>
	);
}
