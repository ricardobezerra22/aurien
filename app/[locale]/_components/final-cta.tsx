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
			className="relative py-24 md:py-32 overflow-hidden bg-[#0F1A17]"
		>
			{/* Background image */}
			<div className="absolute inset-0" aria-hidden="true">
				<Image
					src="/images/auren-bg.jpeg"
					alt={imageAlt}
					fill
					sizes="100vw"
					className="object-cover object-center opacity-20"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-[#0F1A17]/60 to-[#0F1A17]/80" />
			</div>

			<div className="relative mx-auto max-w-300 px-5 md:px-8 lg:px-12 text-center">
				<Reveal>
					<h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.05] tracking-[-0.04em] text-white font-normal mb-4">
						{heading}
					</h2>
					<p className="text-base md:text-lg text-white/70 leading-[1.6] mb-10 max-w-lg mx-auto">
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
