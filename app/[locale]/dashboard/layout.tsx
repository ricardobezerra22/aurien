import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { auth } from "@/auth";
import { routing } from "@/i18n/routing";
import { MobileHeader } from "./_components/mobile-header";
import { Sidebar } from "./_components/sidebar";

export default async function DashboardLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;

	if (!(routing.locales as readonly string[]).includes(locale)) {
		notFound();
	}

	setRequestLocale(locale);

	const session = await auth();
	if (!session?.user) {
		redirect(`/${locale}`);
	}

	const user = {
		name: session.user.name,
		email: session.user.email,
		image: session.user.image,
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Desktop sidebar */}
			<aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-60 border-r border-border bg-card">
				<Sidebar locale={locale} user={user} />
			</aside>

			{/* Mobile header */}
			<MobileHeader locale={locale} user={user} />

			{/* Main content */}
			<main className="md:pl-60">
				<div className="px-4 py-6 sm:px-6 sm:py-8 max-w-4xl mx-auto">
					{children}
				</div>
			</main>
		</div>
	);
}
