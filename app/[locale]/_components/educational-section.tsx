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
				<Reveal>
					<div className="max-w-2xl mb-12">
						<h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-text-primary font-normal mb-4">
							{heading}
						</h2>
						<p className="text-base md:text-lg text-text-secondary leading-[1.6]">
							{intro}
						</p>
					</div>
				</Reveal>

				<div className="grid lg:grid-cols-5 gap-10 lg:gap-16 items-start">
					{/* Topic cards */}
					<div className="lg:col-span-3 flex flex-col gap-4">
						{topics.map((topic, i) => (
							<Reveal key={topic.title} delay={i * 0.08}>
								<div className="p-6 rounded-2xl border border-auren-border bg-surface shadow-[var(--shadow-card)]">
									<h3 className="text-base font-medium text-text-primary mb-2">
										{topic.title}
									</h3>
									<p className="text-sm text-text-secondary leading-[1.6]">
										{topic.body}
									</p>
								</div>
							</Reveal>
						))}
					</div>

					{/* Editorial image */}
					<Reveal delay={0.1} className="lg:col-span-2">
						<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
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
				<Reveal delay={0.12} className="mt-12">
					<div className="relative rounded-2xl overflow-hidden h-56 md:h-72">
						<Image
							src="/images/neurodiversity.jpeg"
							alt={humanImageAlt}
							fill
							sizes="100vw"
							className="object-cover object-top"
						/>
						<div className="absolute inset-0 bg-gradient-to-r from-forest/20 to-transparent" />
					</div>
				</Reveal>
			</div>
		</section>
	);
}
