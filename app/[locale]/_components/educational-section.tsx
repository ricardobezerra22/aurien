import Image from "next/image";
import { Reveal } from "./reveal";

interface Topic {
	title: string;
	body: string;
}

interface Props {
	heading: string;
	intro: string;
	topics: [Topic, Topic, Topic];
	editorialImageAlt: string;
	humanImageAlt: string;
}

export function EducationalSection({
	heading,
	intro,
	topics,
	editorialImageAlt,
	humanImageAlt,
}: Props) {
	return (
		<section className="py-20 md:py-28 bg-background">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				{/* Header */}
				<Reveal>
					<div className="max-w-2xl mb-14">
						<div className="flex items-center gap-3 mb-6">
							<div className="w-5 h-px bg-sage" />
							<span className="text-[0.6875rem] tracking-[0.1em] uppercase text-sage-dark font-medium">
								Understanding autism
							</span>
						</div>
						<h2
							className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.08] tracking-[-0.03em] text-text-primary font-normal mb-4"
							style={{ fontFamily: "var(--font-fraunces, serif)" }}
						>
							{heading}
						</h2>
						<p className="text-base md:text-lg text-text-secondary leading-[1.65]">
							{intro}
						</p>
					</div>
				</Reveal>

				<div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
					{/* Topic list */}
					<div className="lg:col-span-3 flex flex-col gap-8">
						{topics.map((topic, i) => (
							<Reveal key={topic.title} delay={i * 0.08}>
								<div className="flex gap-5">
									<span
										className="text-[0.625rem] tracking-[0.1em] text-text-muted/40 font-medium pt-1 shrink-0 w-6"
										style={{ fontFamily: "var(--font-fraunces, serif)" }}
										aria-hidden="true"
									>
										0{i + 1}
									</span>
									<div className="border-l border-sage/40 pl-5">
										<h3
											className="text-base font-normal text-text-primary mb-2 leading-snug"
											style={{ fontFamily: "var(--font-fraunces, serif)" }}
										>
											{topic.title}
										</h3>
										<p className="text-sm text-text-secondary leading-[1.65]">
											{topic.body}
										</p>
									</div>
								</div>
							</Reveal>
						))}
					</div>

					{/* Editorial image */}
					<Reveal delay={0.1} className="lg:col-span-2">
						<div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
							<Image
								src="/images/artistic-editorial.jpeg"
								alt={editorialImageAlt}
								fill
								sizes="(max-width: 1024px) 100vw, 40vw"
								className="object-cover"
							/>
						</div>
					</Reveal>
				</div>

				{/* Human moment */}
				<Reveal delay={0.12} className="mt-14">
					<div className="relative rounded-2xl overflow-hidden h-60 md:h-80">
						<Image
							src="/images/neurodiversity.jpeg"
							alt={humanImageAlt}
							fill
							sizes="100vw"
							className="object-cover object-top"
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-forest/25 to-transparent" />
					</div>
				</Reveal>
			</div>
		</section>
	);
}
