"use client";

import { ClinicianCards } from "./clinician-cards";
import { DiagnosisDisclaimer } from "./diagnosis-disclaimer";
import { EducationalSection } from "./educational-section";
import { EvidenceSection } from "./evidence-section";
import { FinalCta } from "./final-cta";
import { HeroSection } from "./hero-section";
import { HowItWorks } from "./how-it-works";
import { LandingFooter } from "./landing-footer";
import { LandingNav } from "./landing-nav";
import { PdfReportSection } from "./pdf-report-section";
import { PrivacySection } from "./privacy-section";
import { ResultsPreview } from "./results-preview";
import { ScreeningPreview } from "./screening-preview";
import { TrustBadges } from "./trust-badges";

export interface LandingProps {
	locale: string;
	// Hero
	heroHeadline: string;
	heroBody: string;
	heroImageAlt: string;
	// Waitlist (shared)
	waitlistPlaceholder: string;
	waitlistCta: string;
	waitlistSuccess: string;
	waitlistError: string;
	// Trust
	trust: [
		{ label: string; desc: string },
		{ label: string; desc: string },
		{ label: string; desc: string },
		{ label: string; desc: string },
	];
	// Educational
	educationalHeading: string;
	educationalIntro: string;
	educationalTopics: [
		{ title: string; body: string },
		{ title: string; body: string },
		{ title: string; body: string },
	];
	educationalImageAlt: string;
	educationalHumanAlt: string;
	// How it works
	howItWorksHeading: string;
	howItWorksSteps: [
		{ num: string; title: string; body: string },
		{ num: string; title: string; body: string },
		{ num: string; title: string; body: string },
		{ num: string; title: string; body: string },
	];
	// Screening preview
	screeningHeading: string;
	screeningBadge: string;
	screeningProgress: string;
	screeningQuestion: string;
	screeningOptions: [string, string, string, string, string];
	// Privacy
	privacyHeading: string;
	privacyPillars: [string, string, string];
	privacyLink: string;
	// Diagnosis disclaimer
	disclaimerHeading: string;
	disclaimerBody: string;
	screeningLabel: string;
	screeningDesc: string;
	diagnosisLabel: string;
	diagnosisDesc: string;
	// Results preview
	resultsHeading: string;
	resultsBody: string;
	resultsScore: string;
	resultsImageAlt: string;
	resultsCategories: [string, string, string, string];
	// Evidence
	evidenceHeading: string;
	evidenceBody: string;
	evidenceItems: [
		{ title: string; body: string },
		{ title: string; body: string },
		{ title: string; body: string },
		{ title: string; body: string },
	];
	// PDF
	pdfHeading: string;
	pdfBody: string;
	pdfCta: string;
	pdfDisclaimer: string;
	// Clinicians
	cliniciansHeading: string;
	cliniciansBody: string;
	cliniciansImageAlt: string;
	cliniciansCards: [
		{ name: string; title: string; location: string; specialty: string },
		{ name: string; title: string; location: string; specialty: string },
	];
	cliniciansOnline: string;
	cliniciansVerified: string;
	// Final CTA
	finalCtaHeading: string;
	finalCtaBody: string;
	finalCtaImageAlt: string;
	// Footer
	footerTagline: string;
	footerDisclaimer: string;
	footerPrivacy: string;
}

export function LandingClient(props: Readonly<LandingProps>) {
	return (
		<main>
			<LandingNav />
			<HeroSection
				locale={props.locale}
				headline={props.heroHeadline}
				body={props.heroBody}
				waitlistPlaceholder={props.waitlistPlaceholder}
				waitlistCta={props.waitlistCta}
				waitlistSuccess={props.waitlistSuccess}
				waitlistError={props.waitlistError}
				heroImageAlt={props.heroImageAlt}
			/>
			<TrustBadges items={props.trust} />
			<EducationalSection
				heading={props.educationalHeading}
				intro={props.educationalIntro}
				topics={props.educationalTopics}
				editorialImageAlt={props.educationalImageAlt}
				humanImageAlt={props.educationalHumanAlt}
			/>
			<HowItWorks
				heading={props.howItWorksHeading}
				steps={props.howItWorksSteps}
			/>
			<ScreeningPreview
				heading={props.screeningHeading}
				badge={props.screeningBadge}
				progress={props.screeningProgress}
				question={props.screeningQuestion}
				options={props.screeningOptions}
			/>
			<PrivacySection
				heading={props.privacyHeading}
				pillars={props.privacyPillars}
				privacyLink={props.privacyLink}
			/>
			<DiagnosisDisclaimer
				heading={props.disclaimerHeading}
				body={props.disclaimerBody}
				screeningLabel={props.screeningLabel}
				screeningDesc={props.screeningDesc}
				diagnosisLabel={props.diagnosisLabel}
				diagnosisDesc={props.diagnosisDesc}
			/>
			<ResultsPreview
				heading={props.resultsHeading}
				body={props.resultsBody}
				score={props.resultsScore}
				imageAlt={props.resultsImageAlt}
				categories={props.resultsCategories}
			/>
			<EvidenceSection
				heading={props.evidenceHeading}
				body={props.evidenceBody}
				items={props.evidenceItems}
			/>
			<PdfReportSection
				heading={props.pdfHeading}
				body={props.pdfBody}
				cta={props.pdfCta}
				disclaimer={props.pdfDisclaimer}
			/>
			<ClinicianCards
				heading={props.cliniciansHeading}
				body={props.cliniciansBody}
				imageAlt={props.cliniciansImageAlt}
				cards={props.cliniciansCards}
				onlineLabel={props.cliniciansOnline}
				verifiedLabel={props.cliniciansVerified}
			/>
			<FinalCta
				locale={props.locale}
				heading={props.finalCtaHeading}
				body={props.finalCtaBody}
				waitlistPlaceholder={props.waitlistPlaceholder}
				waitlistCta={props.waitlistCta}
				waitlistSuccess={props.waitlistSuccess}
				waitlistError={props.waitlistError}
				imageAlt={props.finalCtaImageAlt}
			/>
			<LandingFooter
				tagline={props.footerTagline}
				disclaimer={props.footerDisclaimer}
				privacyLink={props.footerPrivacy}
			/>
		</main>
	);
}
