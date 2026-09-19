import { getTranslations, setRequestLocale } from "next-intl/server";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { handleSignOut } from "@/lib/actions/auth";
import { prisma } from "@/lib/prisma";

export default async function AccountPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	const [session, t] = await Promise.all([auth(), getTranslations("settings")]);
	const user = session?.user;
	if (!user) return null;

	const dbUser = user.email
		? await prisma.user.findUnique({
				where: { email: user.email },
				select: { stripeCustomerId: true },
			})
		: null;

	const hasSubscription = Boolean(dbUser?.stripeCustomerId);
	const tDash = await getTranslations("dashboard");

	return (
		<div className="space-y-6 max-w-lg">
			<div>
				<h2 className="text-base font-medium text-foreground">
					{t("accountTitle")}
				</h2>
				<p className="text-sm text-muted-foreground mt-1">
					{t("accountSubtitle")}
				</p>
			</div>

			{/* Account info */}
			<Card>
				<CardContent className="pt-6 space-y-3">
					<div>
						<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
							{t("email")}
						</p>
						<p className="text-sm text-foreground">{user.email ?? "—"}</p>
					</div>
					<Separator />
					<div className="flex items-center justify-between">
						<div>
							<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
								{tDash("subscription.title")}
							</p>
							<Badge
								variant={hasSubscription ? "default" : "secondary"}
								className="text-xs"
							>
								{hasSubscription
									? tDash("subscription.active")
									: tDash("subscription.free")}
							</Badge>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Danger zone */}
			<div>
				<p className="text-sm font-medium text-foreground mb-3">
					{t("dangerZone")}
				</p>
				<Card className="border-destructive/30">
					<CardContent className="pt-6">
						<div className="flex items-center justify-between gap-4">
							<div>
								<p className="text-sm font-medium text-foreground">
									{t("signOutAll")}
								</p>
								<p className="text-xs text-muted-foreground mt-0.5">
									{t("signOutAllHint")}
								</p>
							</div>
							<form action={handleSignOut}>
								<Button type="submit" variant="destructive" size="sm">
									{t("signOutAll")}
								</Button>
							</form>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
