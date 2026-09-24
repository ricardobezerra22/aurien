"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
	en: "EN",
	"pt-BR": "PT",
	es: "ES",
};

const NAV_LINKS = [
	{ label: "How it works", href: "#how-it-works" },
	{ label: "Privacy", href: "#privacy" },
	{ label: "For clinicians", href: "#clinicians" },
];

function AurenMark() {
	return (
		<svg
			width="26"
			height="26"
			viewBox="0 0 26 26"
			fill="none"
			aria-hidden="true"
			className="shrink-0"
		>
			<circle
				cx="9.5"
				cy="13"
				r="7.5"
				stroke="#173B36"
				strokeWidth="1.25"
				strokeLinecap="round"
			/>
			<circle
				cx="16.5"
				cy="13"
				r="7.5"
				stroke="#7E9B91"
				strokeWidth="1.25"
				strokeLinecap="round"
			/>
		</svg>
	);
}

export function LandingNav() {
	const pathname = usePathname();
	const router = useRouter();
	const currentLocale = useLocale();
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handler = () => setScrolled(window.scrollY > 24);
		handler();
		window.addEventListener("scroll", handler, { passive: true });
		return () => window.removeEventListener("scroll", handler);
	}, []);

	function switchLocale(locale: string) {
		router.replace(pathname, { locale });
	}

	return (
		<header className="sticky top-0 z-50">
			{/* Frosted background — fades in on scroll */}
			<div
				className="absolute inset-0 -z-10 bg-[#F7F6F2]/90 backdrop-blur-md transition-opacity duration-300"
				style={{ opacity: scrolled ? 1 : 0 }}
				aria-hidden="true"
			/>
			{/* Bottom border — fades in on scroll */}
			<div
				className="absolute inset-x-0 bottom-0 h-px bg-auren-border transition-opacity duration-300"
				style={{ opacity: scrolled ? 1 : 0 }}
				aria-hidden="true"
			/>

			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12 flex h-16 items-center justify-between">
				{/* Wordmark */}
				<a
					href="#top"
					className="flex items-center gap-2.5 group"
					aria-label="Auren — back to top"
				>
					<AurenMark />
					<span
						className="text-forest text-[1.1rem] leading-none tracking-[-0.01em] transition-opacity duration-200 group-hover:opacity-80"
						style={{
							fontFamily: "var(--font-fraunces, serif)",
							fontWeight: 500,
						}}
					>
						Auren
					</span>
				</a>

				{/* Center nav — desktop only */}
				<nav
					className="hidden md:flex items-center gap-7"
					aria-label="Page sections"
				>
					{NAV_LINKS.map(({ label, href }) => (
						<a
							key={href}
							href={href}
							className="relative text-[0.8125rem] text-text-muted hover:text-text-primary transition-colors duration-200 after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-0 after:bg-sage after:transition-[width] after:duration-300 hover:after:w-full"
						>
							{label}
						</a>
					))}
				</nav>

				{/* Right: CTA + locale */}
				<div className="flex items-center gap-5">
					<a
						href="#waitlist"
						className="hidden sm:inline-flex items-center h-8 px-4 rounded-full border border-forest text-forest text-[0.75rem] font-medium tracking-[0.01em] hover:bg-forest hover:text-white transition-all duration-200"
					>
						Join waitlist
					</a>

					<fieldset
						className="flex items-center gap-0.5 border-none p-0 m-0"
						aria-label="Language switcher"
					>
						{routing.locales.map((locale, i) => (
							<span key={locale} className="flex items-center">
								{i > 0 && (
									<span className="text-[0.625rem] text-text-muted/40 select-none mx-0.5">
										·
									</span>
								)}
								<button
									type="button"
									onClick={() => switchLocale(locale)}
									aria-label={`Switch to ${locale}`}
									aria-pressed={locale === currentLocale}
									className={`text-[0.6875rem] font-medium px-1 py-0.5 rounded transition-colors duration-150 ${
										locale === currentLocale
											? "text-forest"
											: "text-text-muted hover:text-text-secondary"
									}`}
								>
									{localeLabels[locale]}
								</button>
							</span>
						))}
					</fieldset>
				</div>
			</div>
		</header>
	);
}
