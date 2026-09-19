import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function ProfilePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	setRequestLocale(locale);

	const [session, t] = await Promise.all([auth(), getTranslations("settings")]);
	const user = session?.user;
	if (!user) return null;

	return (
		<div className="space-y-6 max-w-lg">
			<div>
				<h2 className="text-base font-medium text-foreground">
					{t("profileTitle")}
				</h2>
				<p className="text-sm text-muted-foreground mt-1">
					{t("profileSubtitle")}
				</p>
			</div>

			<Card>
				<CardContent className="pt-6 space-y-4">
					{/* Avatar */}
					{user.image && (
						<div className="flex items-center gap-4">
							<Image
								src={user.image}
								alt={user.name ?? ""}
								width={56}
								height={56}
								className="rounded-full"
							/>
							<div>
								<p className="font-medium text-sm text-foreground">
									{user.name}
								</p>
								<p className="text-xs text-muted-foreground">
									{t("managedByGoogle")}
								</p>
							</div>
						</div>
					)}

					<Separator />

					<div className="space-y-3">
						<div>
							<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
								{t("name")}
							</p>
							<p className="text-sm text-foreground">{user.name ?? "—"}</p>
						</div>
						<div>
							<p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
								{t("email")}
							</p>
							<p className="text-sm text-foreground">{user.email ?? "—"}</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
