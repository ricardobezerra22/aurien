interface Props {
	tagline: string;
	disclaimer: string;
	privacyLink: string;
}

function AurenMark() {
	return (
		<svg
			width="22"
			height="22"
			viewBox="0 0 26 26"
			fill="none"
			aria-hidden="true"
			className="shrink-0"
		>
			<circle cx="9.5" cy="13" r="7.5" stroke="#173B36" strokeWidth="1.25" />
			<circle cx="16.5" cy="13" r="7.5" stroke="#7E9B91" strokeWidth="1.25" />
		</svg>
	);
}

const FOOTER_LINKS = [
	{ label: "How it works", href: "#how-it-works" },
	{ label: "Privacy", href: "#privacy" },
	{ label: "For clinicians", href: "#clinicians" },
];

export function LandingFooter({ tagline, disclaimer, privacyLink }: Props) {
	return (
		<footer
			role="contentinfo"
			className="border-t border-auren-border bg-background py-12"
		>
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				<div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-6 items-start md:items-center">
					{/* Brand */}
					<div className="flex items-center gap-2.5">
						<AurenMark />
						<div>
							<span
								className="text-forest text-base leading-none tracking-[-0.01em] block mb-0.5"
								style={{
									fontFamily: "var(--font-fraunces, serif)",
									fontWeight: 500,
								}}
							>
								Auren
							</span>
							<p className="text-[0.6875rem] text-text-muted leading-snug">
								{tagline}
							</p>
						</div>
					</div>

					{/* Nav links — center */}
					<nav
						className="flex items-center gap-5 md:justify-center"
						aria-label="Footer navigation"
					>
						{FOOTER_LINKS.map(({ label, href }) => (
							<a
								key={href}
								href={href}
								className="text-xs text-text-muted hover:text-text-secondary transition-colors"
							>
								{label}
							</a>
						))}
					</nav>

					{/* Right: privacy + disclaimer */}
					<div className="flex flex-col gap-2 md:items-end">
						<a
							href="/privacy"
							className="text-xs text-text-muted hover:text-text-secondary transition-colors underline underline-offset-4"
						>
							{privacyLink}
						</a>
						<p className="text-[0.6875rem] text-text-muted max-w-[22ch] md:text-right leading-[1.55]">
							{disclaimer}
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
