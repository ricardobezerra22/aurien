"use client";

import { Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const localeLabels: Record<string, string> = {
	en: "EN",
	"pt-BR": "PT",
	es: "ES",
};

export function LandingNav() {
	const pathname = usePathname();
	const router = useRouter();
	const currentLocale = useLocale();

	function switchLocale(locale: string) {
		router.replace(pathname, { locale });
	}

	return (
		<header className="sticky top-0 z-10 border-b border-auren-border bg-background/80 backdrop-blur-md">
			<div className="mx-auto max-w-300 px-5 md:px-8 lg:px-12 flex h-16 items-center justify-between">
				<span className="text-forest font-semibold tracking-[-0.03em] text-lg">
					Auren
				</span>
				<div className="flex items-center gap-2">
					<Globe size={14} className="text-text-muted" aria-hidden="true" />
					{routing.locales.map((locale) => (
						<button
							key={locale}
							type="button"
							onClick={() => switchLocale(locale)}
							aria-label={`Switch to ${locale}`}
							aria-pressed={locale === currentLocale}
							className={`text-xs font-medium px-2 py-1 rounded-md transition-colors ${
								locale === currentLocale
									? "bg-forest text-white"
									: "text-text-secondary hover:text-forest"
							}`}
						>
							{localeLabels[locale]}
						</button>
					))}
				</div>
			</div>
		</header>
	);
}
