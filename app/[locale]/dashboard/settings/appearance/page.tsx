"use client";

import { cn } from "cn";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

const themes = [
	{ value: "light", icon: Sun },
	{ value: "dark", icon: Moon },
	{ value: "system", icon: Monitor },
] as const;

export default function AppearancePage() {
	const t = useTranslations("settings");
	const { theme, setTheme } = useTheme();

	return (
		<div className="space-y-6 max-w-lg">
			<div>
				<h2 className="text-base font-medium text-foreground">
					{t("appearanceTitle")}
				</h2>
				<p className="text-sm text-muted-foreground mt-1">
					{t("appearanceSubtitle")}
				</p>
			</div>

			<div>
				<p className="text-sm font-medium text-foreground mb-3">
					{t("theme.label")}
				</p>
				<div className="grid grid-cols-3 gap-3">
					{themes.map(({ value, icon: Icon }) => {
						const isActive = theme === value;
						const labelKey = `theme.${value}` as
							| "theme.light"
							| "theme.dark"
							| "theme.system";
						return (
							<button
								key={value}
								type="button"
								onClick={() => setTheme(value)}
								aria-pressed={isActive}
								className={cn(
									"flex flex-col items-center gap-2 p-4 rounded-xl border text-sm transition-colors",
									isActive
										? "border-primary bg-secondary text-foreground font-medium"
										: "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
								)}
							>
								<Icon size={20} aria-hidden />
								{t(labelKey)}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
}
