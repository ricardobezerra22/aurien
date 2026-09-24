import { Reveal } from "./reveal";

interface TrustItem {
	label: string;
	desc: string;
}

interface Props {
	items: [TrustItem, TrustItem, TrustItem, TrustItem];
}

const nums = ["01", "02", "03", "04"];

export function TrustBadges({ items }: Props) {
	return (
		<section className="border-y border-auren-border bg-surface-muted/40">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12 py-10">
				<Reveal>
					{/* Desktop: single row with vertical dividers */}
					<ul className="hidden md:flex items-stretch divide-x divide-auren-border">
						{items.map((item, i) => (
							<li
								key={item.label}
								className="flex-1 flex flex-col justify-center px-8 first:pl-0 last:pr-0 gap-1.5"
							>
								<span
									className="text-[0.625rem] tracking-[0.12em] text-text-muted/50 font-medium select-none"
									style={{ fontFamily: "var(--font-fraunces, serif)" }}
									aria-hidden="true"
								>
									{nums[i]}
								</span>
								<span
									className="text-sm font-medium text-text-primary leading-snug"
									style={{ fontFamily: "var(--font-fraunces, serif)" }}
								>
									{item.label}
								</span>
								<p className="text-xs text-text-muted leading-[1.5]">
									{item.desc}
								</p>
							</li>
						))}
					</ul>

					{/* Mobile: 2×2 grid */}
					<ul className="grid grid-cols-2 gap-x-6 gap-y-7 md:hidden">
						{items.map((item, i) => (
							<li key={item.label} className="flex flex-col gap-1.5">
								<span
									className="text-[0.625rem] tracking-[0.12em] text-text-muted/50 font-medium select-none"
									style={{ fontFamily: "var(--font-fraunces, serif)" }}
									aria-hidden="true"
								>
									{nums[i]}
								</span>
								<span
									className="text-sm font-medium text-text-primary leading-snug"
									style={{ fontFamily: "var(--font-fraunces, serif)" }}
								>
									{item.label}
								</span>
								<p className="text-xs text-text-muted leading-[1.5]">
									{item.desc}
								</p>
							</li>
						))}
					</ul>
				</Reveal>
			</div>
		</section>
	);
}
