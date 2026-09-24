import { Reveal } from "./reveal";

interface EvidenceItem {
	title: string;
	body: string;
}

interface Props {
	heading: string;
	body: string;
	items: [EvidenceItem, EvidenceItem, EvidenceItem, EvidenceItem];
}

export function EvidenceSection({ heading, body, items }: Props) {
	return (
		<section className="py-20 md:py-28 bg-surface-muted/40">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				<Reveal>
					<div className="max-w-2xl mb-12">
						<div className="flex items-center gap-3 mb-6">
							<div className="w-5 h-px bg-sage" />
							<span className="text-[0.6875rem] tracking-[0.1em] uppercase text-sage-dark font-medium">
								The evidence
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
					<div className="max-w-2xl divide-y divide-auren-border border border-auren-border rounded-xl overflow-hidden bg-surface">
						{items.map((item) => (
							<details key={item.title} className="group">
								<summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none transition-colors hover:bg-surface-muted/40">
									<span
										className="text-[0.9375rem] font-normal text-text-primary"
										style={{ fontFamily: "var(--font-fraunces, serif)" }}
									>
										{item.title}
									</span>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										className="shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180"
										aria-hidden="true"
									>
										<path
											d="M4 6l4 4 4-4"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</summary>
								<div className="px-6 pb-5 pt-1 text-sm text-text-secondary leading-[1.65]">
									{item.body}
								</div>
							</details>
						))}
					</div>
				</Reveal>
			</div>
		</section>
	);
}
