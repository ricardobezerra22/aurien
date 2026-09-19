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
	const initials = name
		.split(" ")
		.filter((_, i) => i === 0 || i === name.split(" ").length - 1)
		.map((n) => n[0])
		.join("");
	return (
		<div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center shrink-0">
			<span className="text-sm font-medium text-sage">{initials}</span>
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
		<section className="py-20 md:py-28 bg-surface-muted/40">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					{/* Image */}
					<Reveal>
						<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
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
							<h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-text-primary font-normal mb-4">
								{heading}
							</h2>
							<p className="text-base md:text-lg text-text-secondary leading-[1.6] mb-8">
								{body}
							</p>
						</Reveal>

						<div className="flex flex-col gap-4">
							{cards.map((card, i) => (
								<Reveal key={card.name} delay={i * 0.06}>
									<div className="rounded-2xl border border-auren-border bg-surface shadow-[var(--shadow-card)] p-5">
										<div className="flex items-start gap-4">
											<Avatar name={card.name} />
											<div className="flex-1 min-w-0">
												<div className="flex items-center gap-2 mb-0.5">
													<span className="text-sm font-medium text-text-primary">
														{card.name}
													</span>
													<CheckCircle
														size={14}
														className="text-sage shrink-0"
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
													<span className="flex items-center gap-1.5 text-xs text-sage">
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
