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
					<div className="max-w-xl mx-auto text-center mb-12">
						<div className="flex items-center justify-center gap-3 mb-6">
							<div className="w-5 h-px bg-sage" />
							<span className="text-[0.6875rem] tracking-[0.1em] uppercase text-sage-dark font-medium">
								The experience
							</span>
							<div className="w-5 h-px bg-sage" />
						</div>
						<h2
							className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.08] tracking-[-0.03em] text-text-primary font-normal"
							style={{ fontFamily: "var(--font-fraunces, serif)" }}
						>
							{heading}
						</h2>
					</div>
				</Reveal>

				<Reveal delay={0.06}>
					<div
						className="max-w-lg mx-auto rounded-2xl ring-1 ring-auren-border bg-surface shadow-[var(--shadow-elevated)] overflow-hidden"
						aria-hidden="true"
						role="presentation"
					>
						{/* Progress bar */}
						<div className="px-6 pt-5 pb-4 border-b border-auren-border">
							<div className="flex items-center justify-between mb-3">
								<span className="inline-flex items-center gap-1.5 text-[0.6875rem] font-medium tracking-[0.08em] uppercase text-sage-dark bg-surface-muted px-2.5 py-1 rounded-full">
									{badge}
								</span>
								<span className="text-xs text-text-muted">{progress}</span>
							</div>
							<div className="w-full h-0.5 bg-surface-muted rounded-full overflow-hidden">
								<div className="h-full w-1/4 bg-sage rounded-full" />
							</div>
						</div>

						{/* Question */}
						<div className="px-6 py-8">
							<p
								className="text-[1.1rem] font-normal text-text-primary leading-[1.5] mb-8"
								style={{ fontFamily: "var(--font-fraunces, serif)" }}
							>
								{question}
							</p>

							{/* Answer options */}
							<div className="flex flex-col gap-2">
								{options.map((opt, i) => (
									<div
										key={opt}
										className={`flex items-center gap-3 px-4 py-3 rounded-full border transition-colors cursor-default text-sm
											${
												i === 2
													? "border-forest bg-forest text-white font-medium"
													: "border-auren-border bg-surface text-text-secondary"
											}`}
									>
										<div
											className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 flex items-center justify-center
											${i === 2 ? "border-white/80" : "border-text-muted/40"}`}
										>
											{i === 2 && (
												<div className="w-1.5 h-1.5 rounded-full bg-white" />
											)}
										</div>
										{opt}
									</div>
								))}
							</div>
						</div>

						{/* Navigation hint */}
						<div className="px-6 pb-5 flex items-center justify-between border-t border-auren-border pt-4">
							<span className="text-[0.75rem] text-text-muted tracking-wide">
								← Back
							</span>
							<span className="text-[0.75rem] text-text-muted tracking-wide">
								Continue →
							</span>
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
