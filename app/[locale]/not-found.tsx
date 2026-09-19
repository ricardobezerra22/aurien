"use client";

import { cn } from "cn";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button, buttonVariants } from "@/components/ui/button";

export default function NotFound() {
	const t = useTranslations("errors");
	const tCommon = useTranslations("common");

	return (
		<div className="flex min-h-svh items-center justify-center px-5">
			<div className="flex flex-col items-center gap-6 text-center max-w-md">
				<span className="text-[80px] leading-none font-medium tracking-tighter text-sage opacity-40 select-none">
					404
				</span>

				<div className="flex flex-col gap-2">
					<h1 className="text-xl font-medium tracking-[-0.03em] text-text-primary">
						{t("notFoundTitle")}
					</h1>
					<p className="text-sm leading-relaxed text-text-secondary">
						{t("notFoundDescription")}
					</p>
				</div>

				<div className="flex gap-3">
					<Button
						variant="outline"
						className="border-auren-border text-forest hover:bg-surface-muted rounded-[12px]"
						onClick={() => history.back()}
					>
						{tCommon("back")}
					</Button>
					<Link
						href="/"
						className={cn(
							buttonVariants(),
							"bg-forest text-white hover:bg-forest-light rounded-[12px]",
						)}
					>
						{t("goHome")}
					</Link>
				</div>
			</div>
		</div>
	);
}
