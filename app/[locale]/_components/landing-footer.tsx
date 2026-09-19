interface Props {
	tagline: string;
	disclaimer: string;
	privacyLink: string;
}

export function LandingFooter({ tagline, disclaimer, privacyLink }: Props) {
	return (
		<footer
			role="contentinfo"
			className="border-t border-auren-border bg-background py-10"
		>
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
					<div>
						<span className="text-forest font-semibold tracking-[-0.03em] text-base block mb-1">
							Auren
						</span>
						<p className="text-xs text-text-muted">{tagline}</p>
					</div>
					<div className="flex flex-col gap-2 md:items-end">
						<a
							href="/privacy"
							className="text-xs text-text-muted hover:text-text-secondary transition-colors underline underline-offset-4"
						>
							{privacyLink}
						</a>
						<p className="text-xs text-text-muted max-w-xs md:text-right leading-[1.5]">
							{disclaimer}
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
