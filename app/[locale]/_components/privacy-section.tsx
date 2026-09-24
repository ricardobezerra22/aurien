import { FileText, Minimize2, ShieldCheck } from "lucide-react";
import { Reveal } from "./reveal";

interface Props {
	heading: string;
	pillars: [string, string, string];
	privacyLink: string;
}

const icons = [ShieldCheck, FileText, Minimize2];
const nums = ["01", "02", "03"];

export function PrivacySection({ heading, pillars, privacyLink }: Props) {
	return (
		<section id="privacy" className="py-20 md:py-28 bg-[#173B36]">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12">
				<Reveal>
					<div className="mb-14">
						<div className="flex items-center gap-3 mb-6">
							<div className="w-5 h-px bg-white/30" />
							<span className="text-[0.6875rem] tracking-[0.1em] uppercase text-sage-light font-medium">
								Privacy
							</span>
						</div>
						<h2
							className="text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.08] tracking-[-0.03em] text-white font-normal max-w-xl"
							style={{ fontFamily: "var(--font-fraunces, serif)" }}
						>
							{heading}
						</h2>
					</div>
				</Reveal>

				<div className="grid md:grid-cols-3 gap-10">
					{pillars.map((text, i) => {
						const Icon = icons[i];
						return (
							<Reveal key={text} delay={i * 0.08}>
								<div className="flex flex-col gap-5">
									<div className="flex items-center gap-3">
										<span
											className="text-[0.625rem] tracking-[0.1em] text-white/20 font-medium select-none"
											style={{ fontFamily: "var(--font-fraunces, serif)" }}
											aria-hidden="true"
										>
											{nums[i]}
										</span>
										<Icon
											size={16}
											className="text-sage-light"
											aria-hidden="true"
										/>
									</div>
									<p className="text-[0.9375rem] text-white/75 leading-[1.65]">
										{text}
									</p>
								</div>
							</Reveal>
						);
					})}
				</div>

				<Reveal delay={0.2}>
					<p className="mt-14 text-sm text-sage-light">
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
