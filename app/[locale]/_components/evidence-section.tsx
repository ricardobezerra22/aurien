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
						<h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-text-primary font-normal mb-4">
							{heading}
						</h2>
						<p className="text-base md:text-lg text-text-secondary leading-[1.6]">
							{body}
						</p>
					</div>
				</Reveal>

				<Reveal delay={0.08}>
					<div className="max-w-2xl divide-y divide-auren-border border border-auren-border rounded-2xl overflow-hidden bg-surface shadow-[var(--shadow-card)]">
						{items.map((item) => (
							<details key={item.title} className="group">
								<summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none hover:bg-surface-muted/60 transition-colors">
									<span className="text-sm font-medium text-text-primary">
										{item.title}
									</span>
									<span className="text-text-muted shrink-0 group-open:rotate-45 transition-transform duration-200 text-lg leading-none">
										+
									</span>
								</summary>
								<div className="px-6 pb-5 text-sm text-text-secondary leading-[1.6]">
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
