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
		<section className="py-20 md:py-28 bg-surface-muted/40">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				<Reveal>
					<h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-text-primary font-normal mb-14">
						{heading}
					</h2>
				</Reveal>

				{/* Mobile: vertical timeline */}
				<div className="flex flex-col gap-0 md:hidden">
					{steps.map((step, i) => (
						<Reveal key={step.num} delay={i * 0.08}>
							<div className="relative flex gap-6 pb-10 last:pb-0">
								{/* Line */}
								{i < steps.length - 1 && (
									<div
										className="absolute left-5 top-10 bottom-0 w-px bg-auren-border"
										aria-hidden="true"
									/>
								)}
								{/* Number */}
								<div className="shrink-0 w-10 h-10 rounded-full border-2 border-auren-border bg-background flex items-center justify-center z-10">
									<span className="text-xs font-medium text-text-muted">
										{step.num}
									</span>
								</div>
								{/* Content */}
								<div className="pt-1.5">
									<h3 className="text-base font-medium text-text-primary mb-1.5">
										{step.title}
									</h3>
									<p className="text-sm text-text-secondary leading-[1.6]">
										{step.body}
									</p>
								</div>
							</div>
						</Reveal>
					))}
				</div>

				{/* Desktop: 4-col */}
				<div className="hidden md:grid grid-cols-4 gap-8 relative">
					{/* Connecting line */}
					<div
						className="absolute top-5 left-[12.5%] right-[12.5%] h-px bg-auren-border"
						aria-hidden="true"
					/>
					{steps.map((step, i) => (
						<Reveal key={step.num} delay={i * 0.08}>
							<div className="flex flex-col gap-5">
								<div className="w-10 h-10 rounded-full border-2 border-auren-border bg-background flex items-center justify-center relative z-10">
									<span className="text-xs font-medium text-text-muted">
										{step.num}
									</span>
								</div>
								<div>
									<h3 className="text-base font-medium text-text-primary mb-2">
										{step.title}
									</h3>
									<p className="text-sm text-text-secondary leading-[1.6]">
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
