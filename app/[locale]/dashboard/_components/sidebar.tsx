"use client";

import { cn } from "cn";
import { LayoutDashboard, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { UserMenu } from "./user-menu";

interface SidebarProps {
	locale: string;
	user: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
}

export function Sidebar({ locale, user }: SidebarProps) {
	const tDash = useTranslations("dashboard");
	const tSet = useTranslations("settings");
	const pathname = usePathname(); // locale-stripped: "/dashboard", "/dashboard/settings"

	const navItems = [
		{ label: tDash("title"), href: "/dashboard", icon: LayoutDashboard },
		{ label: tSet("title"), href: "/dashboard/settings", icon: Settings },
	];

	return (
		<nav className="flex flex-col h-full" aria-label="Main navigation">
			{/* Brand */}
			<div className="px-4 py-5 border-b border-border">
				<span className="text-forest dark:text-primary font-medium tracking-[-0.03em] text-base">
					Auren
				</span>
			</div>

			{/* Nav links */}
			<ul className="flex-1 px-2 py-3 space-y-0.5 list-none">
				{navItems.map(({ label, href, icon: Icon }) => {
					const isSettings = href === "/dashboard/settings";
					const isActive = isSettings
						? pathname.startsWith("/dashboard/settings")
						: pathname === "/dashboard";

					return (
						<li key={href}>
							<Link
								href={href}
								locale={locale}
								aria-current={isActive ? "page" : undefined}
								className={cn(
									"flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
									isActive
										? "bg-secondary text-foreground font-medium"
										: "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
								)}
							>
								<Icon size={16} aria-hidden />
								{label}
							</Link>
						</li>
					);
				})}
			</ul>

			{/* User menu */}
			<div className="px-2 py-3 border-t border-border">
				<UserMenu user={user} locale={locale} />
			</div>
		</nav>
	);
}
