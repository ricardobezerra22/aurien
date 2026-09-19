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
							<h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-text-primary font-normal mb-4">
								{heading}
							</h2>
							<p className="text-base md:text-lg text-text-secondary leading-[1.6] mb-10">
								{body}
							</p>
						</Reveal>

						{/* Result card mockup */}
						<Reveal delay={0.08}>
							<div
								className="rounded-2xl border border-auren-border bg-surface shadow-[var(--shadow-elevated)] p-6"
								aria-hidden="true"
								role="presentation"
							>
								<p className="text-xs font-medium tracking-[0.06em] uppercase text-sage mb-4">
									Screening result
								</p>
								<p className="text-sm text-text-secondary leading-[1.6] mb-8 pb-6 border-b border-auren-border">
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
											<div className="h-1.5 bg-surface-muted rounded-full overflow-hidden">
												<div
													className="h-full bg-sage rounded-full"
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
						<div className="relative aspect-square rounded-2xl overflow-hidden">
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
