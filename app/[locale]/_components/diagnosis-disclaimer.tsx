import { Reveal } from "./reveal";

interface Props {
	heading: string;
	body: string;
	screeningLabel: string;
	screeningDesc: string;
	diagnosisLabel: string;
	diagnosisDesc: string;
}

export function DiagnosisDisclaimer({
	heading,
	body,
	screeningLabel,
	screeningDesc,
	diagnosisLabel,
	diagnosisDesc,
}: Props) {
	return (
		<section className="py-20 md:py-28 bg-surface-muted/40">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				<Reveal>
					<div className="max-w-2xl mb-12">
						<div className="flex items-center gap-3 mb-6">
							<div className="w-5 h-px bg-sage" />
							<span className="text-[0.6875rem] tracking-[0.1em] uppercase text-sage-dark font-medium">
								Important distinction
							</span>
						</div>
						<h2
							className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.08] tracking-[-0.03em] text-text-primary font-normal mb-4"
							style={{ fontFamily: "var(--font-fraunces, serif)" }}
						>
							{heading}
						</h2>
						<p className="text-base md:text-lg text-text-secondary leading-[1.65]">
							{body}
						</p>
					</div>
				</Reveal>

				<Reveal delay={0.08}>
					{/* Split card */}
					<dl className="max-w-2xl rounded-2xl ring-1 ring-auren-border bg-surface shadow-[var(--shadow-card)] overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-auren-border">
						<div className="p-6 md:p-8">
							<div className="flex items-center gap-2 mb-4">
								<div
									className="w-2 h-2 rounded-full bg-sage"
									aria-hidden="true"
								/>
								<dt
									className="text-xs font-medium tracking-[0.08em] uppercase text-sage-dark"
									style={{ fontFamily: "var(--font-fraunces, serif)" }}
								>
									{screeningLabel}
								</dt>
							</div>
							<dd className="text-sm text-text-secondary leading-[1.65]">
								{screeningDesc}
							</dd>
						</div>
						<div className="p-6 md:p-8">
							<div className="flex items-center gap-2 mb-4">
								<div
									className="w-2 h-2 rounded-full bg-text-muted/40"
									aria-hidden="true"
								/>
								<dt
									className="text-xs font-medium tracking-[0.08em] uppercase text-text-muted"
									style={{ fontFamily: "var(--font-fraunces, serif)" }}
								>
									{diagnosisLabel}
								</dt>
							</div>
							<dd className="text-sm text-text-secondary leading-[1.65]">
								{diagnosisDesc}
							</dd>
						</div>
					</dl>
				</Reveal>
			</div>
		</section>
	);
}
