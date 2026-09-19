import { getTranslations, setRequestLocale } from "next-intl/server";
import { SettingsNav } from "./_components/settings-nav";

export default async function SettingsLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations("settings");

	const navItems = [
		{ label: t("profile"), href: "/dashboard/settings/profile" },
		{ label: t("appearance"), href: "/dashboard/settings/appearance" },
		{ label: t("account"), href: "/dashboard/settings/account" },
	];

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-xl font-medium tracking-tight text-foreground">
					{t("title")}
				</h1>
			</div>
			<div className="flex flex-col sm:flex-row gap-6">
				<SettingsNav items={navItems} locale={locale} />
				<div className="flex-1 min-w-0">{children}</div>
			</div>
		</div>
	);
}
