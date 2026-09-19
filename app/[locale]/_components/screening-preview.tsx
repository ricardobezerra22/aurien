import { Reveal } from "./reveal";

interface Props {
	heading: string;
	badge: string;
	progress: string;
	question: string;
	options: [string, string, string, string, string];
}

export function ScreeningPreview({
	heading,
	badge,
	progress,
	question,
	options,
}: Props) {
	return (
		<section className="py-20 md:py-28 bg-background">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				<Reveal>
					<div className="max-w-2xl mx-auto text-center mb-12">
						<h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-text-primary font-normal">
							{heading}
						</h2>
					</div>
				</Reveal>

				<Reveal delay={0.06}>
					<div
						className="max-w-lg mx-auto rounded-2xl border border-auren-border bg-surface shadow-[var(--shadow-elevated)] overflow-hidden"
						aria-hidden="true"
						role="presentation"
					>
						{/* Progress bar */}
						<div className="px-6 pt-5 pb-4 border-b border-auren-border">
							<div className="flex items-center justify-between mb-3">
								<span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-[0.06em] uppercase text-sage bg-surface-muted px-2.5 py-1 rounded-full">
									{badge}
								</span>
								<span className="text-xs text-text-muted">{progress}</span>
							</div>
							<div className="w-full h-1 bg-surface-muted rounded-full overflow-hidden">
								<div className="h-full w-1/4 bg-forest rounded-full" />
							</div>
						</div>

						{/* Question */}
						<div className="px-6 py-8">
							<p className="text-lg font-normal text-text-primary leading-[1.5] mb-8">
								{question}
							</p>

							{/* Answer options */}
							<div className="flex flex-col gap-2.5">
								{options.map((opt, i) => (
									<div
										key={opt}
										className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-colors cursor-default
											${
												i === 2
													? "border-forest bg-forest/5 text-forest font-medium"
													: "border-auren-border bg-surface text-text-secondary"
											}`}
									>
										<div
											className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center
											${i === 2 ? "border-forest" : "border-text-muted"}`}
										>
											{i === 2 && (
												<div className="w-2 h-2 rounded-full bg-forest" />
											)}
										</div>
										<span className="text-sm">{opt}</span>
									</div>
								))}
							</div>
						</div>

						{/* Navigation hint */}
						<div className="px-6 pb-5 flex items-center justify-between">
							<span className="text-xs text-text-muted">← Back</span>
							<span className="text-xs text-text-muted">Continue →</span>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
