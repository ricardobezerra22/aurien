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
						<h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-text-primary font-normal mb-4">
							{heading}
						</h2>
						<p className="text-base md:text-lg text-text-secondary leading-[1.6]">
							{body}
						</p>
					</div>
				</Reveal>

				<Reveal delay={0.08}>
					<dl className="grid md:grid-cols-2 gap-4 max-w-2xl">
						<div className="rounded-2xl border border-auren-border bg-surface p-6 shadow-[var(--shadow-card)]">
							<dt className="text-xs font-medium tracking-[0.08em] uppercase text-sage mb-3">
								{screeningLabel}
							</dt>
							<dd className="text-sm text-text-secondary leading-[1.6]">
								{screeningDesc}
							</dd>
						</div>
						<div className="rounded-2xl border border-auren-border bg-surface p-6 shadow-[var(--shadow-card)]">
							<dt className="text-xs font-medium tracking-[0.08em] uppercase text-text-muted mb-3">
								{diagnosisLabel}
							</dt>
							<dd className="text-sm text-text-secondary leading-[1.6]">
								{diagnosisDesc}
							</dd>
						</div>
					</dl>
				</Reveal>
			</div>
		</section>
	);
}
