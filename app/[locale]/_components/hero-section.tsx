"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { WaitlistForm } from "./waitlist-form";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
	hidden: { opacity: 0, y: 24 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: { delay: i * 0.1, duration: 0.5, ease: EASE },
	}),
};

function GhostRings() {
	return (
		<svg
			className="absolute -right-16 -top-16 w-[420px] h-[420px] pointer-events-none select-none"
			viewBox="0 0 420 420"
			fill="none"
			aria-hidden="true"
		>
			<circle
				cx="210"
				cy="210"
				r="190"
				stroke="#173B36"
				strokeWidth="1"
				opacity="0.04"
			/>
			<circle
				cx="270"
				cy="210"
				r="140"
				stroke="#7E9B91"
				strokeWidth="1"
				opacity="0.05"
			/>
		</svg>
	);
}

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
		<section id="top" className="relative overflow-hidden bg-background">
			<div className="flex flex-col lg:flex-row lg:min-h-[calc(100svh-64px)]">
				{/* ── Left: text content ── */}
				<div
					className="relative flex flex-col justify-center overflow-hidden
					           py-16 md:py-20
					           px-5 md:px-8
					           lg:pl-[max(3rem,calc(50vw-34.5rem))]
					           lg:pr-14
					           lg:w-1/2 flex-shrink-0"
				>
					<GhostRings />

					{/* Eyebrow */}
					<motion.div
						custom={0}
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						className="flex items-center gap-3 mb-8"
					>
						<div className="w-6 h-px bg-sage" />
						<span className="text-[0.6875rem] tracking-[0.1em] uppercase text-sage-dark font-medium">
							Early access
						</span>
					</motion.div>

					{/* Headline */}
					<motion.h1
						custom={1}
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						className="text-[clamp(2.1rem,4.5vw,3.5rem)] leading-[1.06] tracking-[-0.04em] text-text-primary font-normal mb-6"
						style={{ fontFamily: "var(--font-fraunces, serif)" }}
					>
						{headline}
					</motion.h1>

					{/* Body copy */}
					<motion.p
						custom={2}
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						className="text-base md:text-[1.0625rem] leading-[1.65] text-text-secondary max-w-[42ch] mb-10"
					>
						{body}
					</motion.p>

					{/* Waitlist form */}
					<motion.div
						custom={3}
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						className="w-full max-w-md mb-5"
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

					{/* Disclaimer */}
					<motion.p
						custom={4}
						variants={fadeUp}
						initial="hidden"
						animate="visible"
						className="text-xs text-text-muted leading-[1.6] max-w-[38ch]"
					>
						Screening is not a diagnosis. Results are based on self-reported
						information.
					</motion.p>
				</div>

				{/* ── Right: image panel ── */}
				<div className="relative order-first lg:order-last flex-1 h-[64vw] max-h-[440px] lg:max-h-none">
					<Image
						src="/images/hero.jpeg"
						alt={heroImageAlt}
						fill
						priority
						sizes="(max-width: 1024px) 100vw, 55vw"
						className="object-cover object-[65%_center]"
					/>
					{/* Gradient: bleeds left into text panel on desktop */}
					<div
						className="absolute inset-y-0 left-0 w-40 hidden lg:block z-10"
						style={{
							background:
								"linear-gradient(to right, var(--auren-bg), transparent)",
						}}
						aria-hidden="true"
					/>
					{/* Gradient: fades to bg at bottom on mobile */}
					<div
						className="absolute inset-x-0 bottom-0 h-28 lg:hidden"
						style={{
							background:
								"linear-gradient(to top, var(--auren-bg), transparent)",
						}}
						aria-hidden="true"
					/>
				</div>
			</div>
		</section>
	);
}
