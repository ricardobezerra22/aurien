import Image from "next/image";
import { Reveal } from "./reveal";
import { WaitlistForm } from "./waitlist-form";

interface Props {
	locale: string;
	heading: string;
	body: string;
	waitlistPlaceholder: string;
	waitlistCta: string;
	waitlistSuccess: string;
	waitlistError: string;
	imageAlt: string;
}

export function FinalCta({
	locale,
	heading,
	body,
	waitlistPlaceholder,
	waitlistCta,
	waitlistSuccess,
	waitlistError,
	imageAlt,
}: Props) {
	return (
		<section
			id="waitlist"
			className="relative py-28 md:py-36 overflow-hidden bg-[#0F1A17]"
		>
			{/* Background image */}
			<div className="absolute inset-0" aria-hidden="true">
				<Image
					src="/images/auren-bg.jpeg"
					alt={imageAlt}
					fill
					sizes="100vw"
					className="object-cover object-center opacity-30"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-[#0F1A17]/50 via-transparent to-[#0F1A17]/70" />
			</div>

			<div className="relative mx-auto max-w-300 px-5 md:px-8 lg:px-12 text-center">
				<Reveal>
					<div className="flex items-center justify-center gap-3 mb-8">
						<div className="w-5 h-px bg-white/25" />
						<span className="text-[0.6875rem] tracking-[0.1em] uppercase text-sage-light font-medium">
							Early access
						</span>
						<div className="w-5 h-px bg-white/25" />
					</div>
					<h2
						className="text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.04] tracking-[-0.04em] text-white font-normal mb-5 max-w-2xl mx-auto"
						style={{ fontFamily: "var(--font-fraunces, serif)" }}
					>
						{heading}
					</h2>
					<p className="text-base md:text-lg text-white/60 leading-[1.65] mb-10 max-w-lg mx-auto">
						{body}
					</p>
				</Reveal>

				<Reveal delay={0.08}>
					<div className="max-w-md mx-auto">
						<WaitlistForm
							locale={locale}
							placeholder={waitlistPlaceholder}
							cta={waitlistCta}
							successMsg={waitlistSuccess}
							errorMsg={waitlistError}
							size="hero"
						/>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
