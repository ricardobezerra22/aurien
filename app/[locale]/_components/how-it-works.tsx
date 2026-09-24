import { Reveal } from "./reveal";

interface Step {
	num: string;
	title: string;
	body: string;
}

interface Props {
	heading: string;
	steps: [Step, Step, Step, Step];
}

export function HowItWorks({ heading, steps }: Props) {
	return (
		<section id="how-it-works" className="py-20 md:py-28 bg-surface-muted/40">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				<Reveal>
					<div className="mb-16">
						<div className="flex items-center gap-3 mb-6">
							<div className="w-5 h-px bg-sage" />
							<span className="text-[0.6875rem] tracking-[0.1em] uppercase text-sage-dark font-medium">
								The process
							</span>
						</div>
						<h2
							className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.08] tracking-[-0.03em] text-text-primary font-normal"
							style={{ fontFamily: "var(--font-fraunces, serif)" }}
						>
							{heading}
						</h2>
					</div>
				</Reveal>

				{/* Desktop: 4-col with dashed connector */}
				<div className="hidden md:grid grid-cols-4 gap-8 relative">
					<div
						className="absolute top-[2.25rem] left-[12.5%] right-[12.5%] border-t border-dashed border-auren-border"
						aria-hidden="true"
					/>
					{steps.map((step, i) => (
						<Reveal key={step.num} delay={i * 0.09}>
							<div className="flex flex-col">
								<span
									className="text-[4.5rem] leading-none font-normal text-text-muted/[0.12] mb-4 select-none"
									style={{ fontFamily: "var(--font-fraunces, serif)" }}
									aria-hidden="true"
								>
									{step.num}
								</span>
								<h3
									className="text-base font-normal text-text-primary mb-2"
									style={{ fontFamily: "var(--font-fraunces, serif)" }}
								>
									{step.title}
								</h3>
								<p className="text-sm text-text-secondary leading-[1.65]">
									{step.body}
								</p>
							</div>
						</Reveal>
					))}
				</div>

				{/* Mobile: vertical list */}
				<div className="flex flex-col gap-10 md:hidden">
					{steps.map((step, i) => (
						<Reveal key={step.num} delay={i * 0.08}>
							<div className="flex gap-5 items-start">
								<span
									className="text-[3rem] leading-none font-normal text-text-muted/[0.15] shrink-0 select-none w-12"
									style={{ fontFamily: "var(--font-fraunces, serif)" }}
									aria-hidden="true"
								>
									{step.num}
								</span>
								<div className="pt-1">
									<h3
										className="text-base font-normal text-text-primary mb-1.5"
										style={{ fontFamily: "var(--font-fraunces, serif)" }}
									>
										{step.title}
									</h3>
									<p className="text-sm text-text-secondary leading-[1.65]">
										{step.body}
									</p>
								</div>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
