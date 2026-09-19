import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

function getTimeOfDay(): "morning" | "afternoon" | "evening" {
	const hour = new Date().getHours();
	if (hour < 12) return "morning";
	if (hour < 18) return "afternoon";
	return "evening";
}

export default async function DashboardPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	const [session, t] = await Promise.all([
		auth(),
		getTranslations("dashboard"),
	]);
	const user = session?.user;
	if (!user) return null;

	const firstName = user.name?.split(" ")[0] ?? "there";
	const timeOfDay = getTimeOfDay();
	const welcomeKey =
		timeOfDay === "morning"
			? "welcomeMorning"
			: timeOfDay === "afternoon"
				? "welcomeAfternoon"
				: "welcomeEvening";

	const dbUser = user.email
		? await prisma.user.findUnique({
				where: { email: user.email },
				select: { stripeCustomerId: true },
			})
		: null;

	const hasSubscription = Boolean(dbUser?.stripeCustomerId);

	return (
		<div className="space-y-8">
			{/* Welcome */}
			<div className="flex items-center gap-4">
				{user.image && (
					<Image
						src={user.image}
						alt={user.name ?? ""}
						width={48}
						height={48}
						className="rounded-full"
					/>
				)}
				<div>
					<h1 className="text-2xl font-medium tracking-tight text-foreground">
						{t(welcomeKey, { name: firstName })}
					</h1>
					<p className="text-sm text-muted-foreground mt-0.5">{user.email}</p>
				</div>
			</div>

			{/* Cards */}
			<div className="grid gap-4 sm:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle>{t("subscription.title")}</CardTitle>
						<CardDescription>
							{hasSubscription
								? t("subscription.active")
								: t("subscription.upgradeHint")}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Badge
							variant={hasSubscription ? "default" : "secondary"}
							className="text-xs"
						>
							{hasSubscription
								? t("subscription.active")
								: t("subscription.free")}
						</Badge>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
