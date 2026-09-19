"use client";

import { cn } from "cn";
import { Link, usePathname } from "@/i18n/navigation";

interface SettingsNavProps {
	items: { label: string; href: string }[];
	locale: string;
}

export function SettingsNav({ items, locale }: SettingsNavProps) {
	const pathname = usePathname();

	return (
		<nav aria-label="Settings navigation" className="sm:w-44 shrink-0">
			<ul className="flex sm:flex-col gap-1 flex-wrap list-none">
				{items.map(({ label, href }) => (
					<li key={href}>
						<Link
							href={href}
							locale={locale}
							aria-current={pathname === href ? "page" : undefined}
							className={cn(
								"block px-3 py-1.5 rounded-md text-sm transition-colors",
								pathname === href
									? "bg-secondary text-foreground font-medium"
									: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
							)}
						>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
