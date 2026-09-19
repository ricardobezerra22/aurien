import { BookOpen, Lock, Share2, User } from "lucide-react";
import { Reveal } from "./reveal";

interface TrustItem {
	label: string;
	desc: string;
}

interface Props {
	items: [TrustItem, TrustItem, TrustItem, TrustItem];
}

const icons = [Lock, User, BookOpen, Share2];

export function TrustBadges({ items }: Props) {
	return (
		<section className="border-y border-auren-border bg-surface-muted/50">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12 py-10">
				<Reveal>
					<ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
						{items.map((item, i) => {
							const Icon = icons[i];
							return (
								<li key={item.label} className="flex flex-col gap-2">
									<div className="flex items-center gap-2.5">
										<Icon
											size={16}
											className="text-sage shrink-0"
											aria-hidden="true"
										/>
										<span className="text-sm font-medium text-text-primary">
											{item.label}
										</span>
									</div>
									<p className="text-xs text-text-muted leading-[1.5]">
										{item.desc}
									</p>
								</li>
							);
						})}
					</ul>
				</Reveal>
			</div>
		</section>
	);
}
