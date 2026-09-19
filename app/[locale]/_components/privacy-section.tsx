import { FileText, Minimize2, ShieldCheck } from "lucide-react";
import { Reveal } from "./reveal";

interface Props {
	heading: string;
	pillars: [string, string, string];
	privacyLink: string;
}

const icons = [ShieldCheck, FileText, Minimize2];

export function PrivacySection({ heading, pillars, privacyLink }: Props) {
	return (
		<section className="py-20 md:py-28 bg-[#173B36]">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				<Reveal>
					<h2 className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] tracking-[-0.03em] text-white font-normal mb-12">
						{heading}
					</h2>
				</Reveal>

				<div className="grid md:grid-cols-3 gap-8">
					{pillars.map((text, i) => {
						const Icon = icons[i];
						return (
							<Reveal key={text} delay={i * 0.08}>
								<div className="flex flex-col gap-4">
									<div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
										<Icon
											size={18}
											className="text-sage-light"
											aria-hidden="true"
										/>
									</div>
									<p className="text-base text-white/80 leading-[1.6]">
										{text}
									</p>
								</div>
							</Reveal>
						);
					})}
				</div>

				<Reveal delay={0.2}>
					<p className="mt-10 text-sm text-sage-light/70">
						<a
							href="/privacy"
							className="underline underline-offset-4 hover:text-sage-light transition-colors"
						>
							{privacyLink}
						</a>
					</p>
				</Reveal>
			</div>
		</section>
	);
}
