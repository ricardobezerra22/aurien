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
							<h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-text-primary font-normal mb-4">
								{heading}
							</h2>
							<p className="text-base md:text-lg text-text-secondary leading-[1.6] mb-8">
								{body}
							</p>
							<a
								href="#waitlist"
								className="inline-flex items-center gap-2 h-12 px-6 rounded-[12px] bg-forest text-white text-sm font-medium hover:bg-forest-light transition-colors"
							>
								{cta}
							</a>
							<p className="mt-4 text-xs text-text-muted">{disclaimer}</p>
						</Reveal>
					</div>

					{/* PDF mockup — pure CSS, decorative */}
					<Reveal delay={0.08}>
						<div
							className="rounded-2xl border border-auren-border bg-surface shadow-[var(--shadow-elevated)] p-8 max-w-xs mx-auto"
							aria-hidden="true"
							role="presentation"
						>
							{/* Header */}
							<div className="flex items-center gap-3 mb-6 pb-5 border-b border-auren-border">
								<div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center shrink-0">
									<div className="w-4 h-0.5 bg-white" />
								</div>
								<div>
									<div className="h-2.5 w-16 bg-text-primary/20 rounded mb-1.5" />
									<div className="h-2 w-24 bg-text-muted/30 rounded" />
								</div>
							</div>
							{/* Lines */}
							<div className="flex flex-col gap-3 mb-6">
								<div className="h-2 rounded bg-surface-muted w-full" />
								<div className="h-2 rounded bg-surface-muted w-4/5" />
								<div className="h-2 rounded bg-surface-muted w-[90%]" />
								<div className="h-2 rounded bg-surface-muted w-2/3" />
								<div className="h-2 rounded bg-surface-muted w-3/4" />
							</div>
							{/* Score bar section */}
							<div className="bg-surface-muted/60 rounded-xl p-4 mb-4">
								<div className="h-2 w-20 bg-sage/40 rounded mb-3" />
								<div className="mb-2">
									<div className="h-1.5 bg-surface rounded-full overflow-hidden">
										<div className="h-full bg-sage/60 rounded-full w-[72%]" />
									</div>
								</div>
								<div className="mb-2">
									<div className="h-1.5 bg-surface rounded-full overflow-hidden">
										<div className="h-full bg-sage/60 rounded-full w-[58%]" />
									</div>
								</div>
								<div>
									<div className="h-1.5 bg-surface rounded-full overflow-hidden">
										<div className="h-full bg-sage/60 rounded-full w-[81%]" />
									</div>
								</div>
							</div>
							{/* Footer lines */}
							<div className="h-2 rounded bg-surface-muted mb-2 w-3/5" />
							<div className="h-2 rounded bg-surface-muted w-4/5" />
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
