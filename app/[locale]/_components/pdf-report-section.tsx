import { Reveal } from "./reveal";

interface Props {
	heading: string;
	body: string;
	cta: string;
	disclaimer: string;
}

export function PdfReportSection({ heading, body, cta, disclaimer }: Props) {
	return (
		<section className="py-20 md:py-28 bg-background">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					<div>
						<Reveal>
							<div className="flex items-center gap-3 mb-6">
								<div className="w-5 h-px bg-sage" />
								<span className="text-[0.6875rem] tracking-[0.1em] uppercase text-sage-dark font-medium">
									Your report
								</span>
							</div>
							<h2
								className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.08] tracking-[-0.03em] text-text-primary font-normal mb-4"
								style={{ fontFamily: "var(--font-fraunces, serif)" }}
							>
								{heading}
							</h2>
							<p className="text-base md:text-lg text-text-secondary leading-[1.65] mb-8">
								{body}
							</p>
							<a
								href="#waitlist"
								className="inline-flex items-center h-9 px-5 rounded-full border border-forest text-forest text-[0.8125rem] font-medium hover:bg-forest hover:text-white transition-all duration-200"
							>
								{cta}
							</a>
							<p className="mt-4 text-xs text-text-muted leading-[1.5]">
								{disclaimer}
							</p>
						</Reveal>
					</div>

					{/* PDF mockup — decorative */}
					<Reveal delay={0.08}>
						<div
							className="rounded-2xl ring-1 ring-auren-border bg-surface shadow-[var(--shadow-elevated)] p-8 max-w-xs mx-auto"
							aria-hidden="true"
							role="presentation"
						>
							{/* Header with logomark */}
							<div className="flex items-center gap-3 mb-6 pb-5 border-b border-auren-border">
								<div className="w-8 h-8 rounded-lg bg-forest/8 flex items-center justify-center shrink-0">
									<svg
										width="18"
										height="18"
										viewBox="0 0 18 18"
										fill="none"
										aria-hidden="true"
									>
										<circle
											cx="6.5"
											cy="9"
											r="5"
											stroke="#173B36"
											strokeWidth="1"
										/>
										<circle
											cx="11.5"
											cy="9"
											r="5"
											stroke="#7E9B91"
											strokeWidth="1"
										/>
									</svg>
								</div>
								<div>
									<div
										className="text-[0.7rem] text-forest font-medium"
										style={{ fontFamily: "var(--font-fraunces, serif)" }}
									>
										Auren
									</div>
									<div className="h-1.5 w-20 bg-text-muted/15 rounded mt-1" />
								</div>
							</div>
							{/* Content lines */}
							<div className="flex flex-col gap-2.5 mb-6">
								<div className="h-1.5 rounded-full bg-surface-muted w-full" />
								<div className="h-1.5 rounded-full bg-surface-muted w-4/5" />
								<div className="h-1.5 rounded-full bg-surface-muted w-[90%]" />
								<div className="h-1.5 rounded-full bg-surface-muted w-2/3" />
								<div className="h-1.5 rounded-full bg-surface-muted w-3/4" />
							</div>
							{/* Score section */}
							<div className="bg-surface-muted/60 rounded-xl p-4 mb-4">
								<div className="h-1.5 w-16 bg-sage/40 rounded-full mb-3" />
								<div className="h-2 bg-surface rounded-full overflow-hidden mb-2">
									<div className="h-full bg-sage/60 rounded-full w-[72%]" />
								</div>
								<div className="h-2 bg-surface rounded-full overflow-hidden mb-2">
									<div className="h-full bg-sage/60 rounded-full w-[58%]" />
								</div>
								<div className="h-2 bg-surface rounded-full overflow-hidden">
									<div className="h-full bg-sage/60 rounded-full w-[81%]" />
								</div>
							</div>
							{/* Footer lines */}
							<div className="h-1.5 rounded-full bg-surface-muted w-3/5 mb-2" />
							<div className="h-1.5 rounded-full bg-surface-muted w-4/5" />
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
