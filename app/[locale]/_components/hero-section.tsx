"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { WaitlistForm } from "./waitlist-form";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.09, duration: 0.4, ease: EASE },
	}),
};

interface Props {
	locale: string;
	headline: string;
	body: string;
	waitlistPlaceholder: string;
	waitlistCta: string;
	waitlistSuccess: string;
	waitlistError: string;
	heroImageAlt: string;
}

export function HeroSection({
	locale,
	headline,
	body,
	waitlistPlaceholder,
	waitlistCta,
	waitlistSuccess,
	waitlistError,
	heroImageAlt,
}: Props) {
	return (
		<section className="relative overflow-hidden bg-background">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				<div className="grid lg:grid-cols-2 lg:gap-16 lg:min-h-[calc(100svh-64px)] items-center">
					{/* Text content */}
					<div className="py-16 md:py-20 lg:py-24 flex flex-col gap-8">
						<motion.div
							custom={0}
							variants={fadeUp}
							initial="hidden"
							animate="visible"
						>
							<span className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-sage bg-surface-muted px-3 py-1.5 rounded-full">
								Early access
							</span>
						</motion.div>

						<motion.h1
							custom={1}
							variants={fadeUp}
							initial="hidden"
							animate="visible"
							className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] tracking-[-0.04em] text-text-primary font-normal"
						>
							{headline}
						</motion.h1>

						<motion.p
							custom={2}
							variants={fadeUp}
							initial="hidden"
							animate="visible"
							className="text-base md:text-lg leading-[1.6] text-text-secondary max-w-prose"
						>
							{body}
						</motion.p>

						<motion.div
							custom={3}
							variants={fadeUp}
							initial="hidden"
							animate="visible"
							className="w-full max-w-md"
						>
							<WaitlistForm
								locale={locale}
								placeholder={waitlistPlaceholder}
								cta={waitlistCta}
								successMsg={waitlistSuccess}
								errorMsg={waitlistError}
								size="hero"
							/>
						</motion.div>

						<motion.p
							custom={4}
							variants={fadeUp}
							initial="hidden"
							animate="visible"
							className="text-xs text-text-muted leading-[1.5] max-w-sm"
						>
							Screening is not a diagnosis. Results are based on self-reported
							information.
						</motion.p>
					</div>

					{/* Hero image */}
					<div className="relative lg:h-full lg:min-h-[600px] -mx-5 md:-mx-8 lg:mx-0 order-first lg:order-last">
						<div className="relative lg:absolute lg:inset-0 h-[320px] sm:h-[420px] lg:h-full overflow-hidden lg:rounded-none">
							<Image
								src="/images/hero.jpeg"
								alt={heroImageAlt}
								fill
								priority
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover object-center"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-background/20 lg:to-transparent" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
