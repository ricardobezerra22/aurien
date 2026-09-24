import { CheckCircle, MapPin, Video } from "lucide-react";
import Image from "next/image";
import { Reveal } from "./reveal";

interface ClinicianCard {
	name: string;
	title: string;
	location: string;
	specialty: string;
}

interface Props {
	heading: string;
	body: string;
	imageAlt: string;
	cards: [ClinicianCard, ClinicianCard];
	onlineLabel: string;
	verifiedLabel: string;
}

function Avatar({ name }: { name: string }) {
	const parts = name.split(" ");
	const initials = [parts[0], parts[parts.length - 1]]
		.map((n) => n[0])
		.join("");
	return (
		<div className="w-14 h-14 rounded-full bg-forest/10 flex items-center justify-center shrink-0">
			<span
				className="text-sm font-medium text-forest"
				style={{ fontFamily: "var(--font-fraunces, serif)" }}
			>
				{initials}
			</span>
		</div>
	);
}

export function ClinicianCards({
	heading,
	body,
	imageAlt,
	cards,
	onlineLabel,
	verifiedLabel,
}: Props) {
	return (
		<section id="clinicians" className="py-20 md:py-28 bg-surface-muted/40">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					{/* Image */}
					<Reveal>
						<div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-auren-border/40">
							<Image
								src="/images/professional-support.jpeg"
								alt={imageAlt}
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover"
							/>
						</div>
					</Reveal>

					<div>
						<Reveal>
							<div className="flex items-center gap-3 mb-6">
								<div className="w-5 h-px bg-sage" />
								<span className="text-[0.6875rem] tracking-[0.1em] uppercase text-sage-dark font-medium">
									Professional support
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
						</Reveal>

						<div className="flex flex-col gap-4">
							{cards.map((card, i) => (
								<Reveal key={card.name} delay={i * 0.06}>
									<div className="rounded-2xl ring-1 ring-auren-border/60 bg-surface shadow-[var(--shadow-card)] p-5">
										<div className="flex items-start gap-4">
											<Avatar name={card.name} />
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2 mb-0.5">
													<span
														className="text-sm font-normal text-text-primary"
														style={{
															fontFamily: "var(--font-fraunces, serif)",
														}}
													>
														{card.name}
													</span>
													<CheckCircle
														size={13}
														className="text-sage-dark shrink-0"
														aria-label={verifiedLabel}
													/>
												</div>
												<p className="text-xs text-text-secondary mb-1">
													{card.title}
												</p>
												<p className="text-xs text-text-muted mb-3">
													{card.specialty}
												</p>
												<div className="flex items-center gap-4">
													<span className="flex items-center gap-1.5 text-xs text-text-muted">
														<MapPin size={11} aria-hidden="true" />
														{card.location}
													</span>
													<span className="flex items-center gap-1.5 text-xs text-sage-dark">
														<span
															className="w-1.5 h-1.5 rounded-full bg-auren-success shrink-0"
															aria-hidden="true"
														/>
														<Video size={11} aria-hidden="true" />
														{onlineLabel}
													</span>
												</div>
											</div>
										</div>
									</div>
								</Reveal>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
