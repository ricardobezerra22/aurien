import Image from "next/image";
import { Reveal } from "./reveal";

interface Props {
	heading: string;
	body: string;
	score: string;
	imageAlt: string;
	categories: [string, string, string, string];
}

const categoryValues = [72, 58, 81, 64];

export function ResultsPreview({
	heading,
	body,
	score,
	imageAlt,
	categories,
}: Props) {
	return (
		<section className="py-20 md:py-28 bg-background">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					<div>
						<Reveal>
							<div className="flex items-center gap-3 mb-6">
								<div className="w-5 h-px bg-sage" />
								<span className="text-[0.6875rem] tracking-[0.1em] uppercase text-sage-dark font-medium">
									Your results
								</span>
							</div>
							<h2
								className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.08] tracking-[-0.03em] text-text-primary font-normal mb-4"
								style={{ fontFamily: "var(--font-fraunces, serif)" }}
							>
								{heading}
							</h2>
							<p className="text-base md:text-lg text-text-secondary leading-[1.65] mb-10">
								{body}
							</p>
						</Reveal>

						{/* Result card mockup */}
						<Reveal delay={0.08}>
							<div
								className="rounded-2xl ring-1 ring-auren-border bg-surface shadow-[var(--shadow-elevated)] p-6"
								aria-hidden="true"
								role="presentation"
							>
								<p
									className="text-[0.6875rem] tracking-[0.08em] uppercase text-sage-dark mb-5"
									style={{ fontFamily: "var(--font-fraunces, serif)" }}
								>
									Screening result
								</p>
								<p
									className="text-[1rem] text-text-secondary leading-[1.65] mb-8 pb-6 border-b border-auren-border"
									style={{
										fontFamily: "var(--font-fraunces, serif)",
										fontStyle: "italic",
									}}
								>
									{score}
								</p>
								<div className="flex flex-col gap-5">
									{categories.map((cat, i) => (
										<div key={cat}>
											<div className="flex items-center justify-between mb-2">
												<span className="text-xs text-text-secondary">
													{cat}
												</span>
												<span className="text-xs text-text-muted">
													{categoryValues[i]}%
												</span>
											</div>
											<div className="h-2 bg-surface-muted rounded-full overflow-hidden">
												<div
													className="h-full bg-sage/70 rounded-full"
													style={{ width: `${categoryValues[i]}%` }}
												/>
											</div>
										</div>
									))}
								</div>
							</div>
						</Reveal>
					</div>

					{/* Image */}
					<Reveal delay={0.1}>
						<div className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-auren-border/40">
							<Image
								src="/images/tech-result.jpeg"
								alt={imageAlt}
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover"
							/>
						</div>
					</Reveal>
				</div>
			</div>
		</section>
	);
}
