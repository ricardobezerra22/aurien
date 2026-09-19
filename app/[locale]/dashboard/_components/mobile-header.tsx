"use client";

import { Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

interface MobileHeaderProps {
	locale: string;
	user: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
}

export function MobileHeader({ locale, user }: MobileHeaderProps) {
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-40 flex items-center gap-3 px-4 h-14 border-b border-border bg-background/80 backdrop-blur-md md:hidden">
			<button
				type="button"
				onClick={() => setOpen(true)}
				aria-label="Open navigation"
				className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
			>
				<Menu size={20} aria-hidden />
			</button>
			<span className="text-forest dark:text-primary font-medium tracking-[-0.03em] text-base">
				Auren
			</span>

			<Sheet open={open} onOpenChange={setOpen}>
				<SheetContent side="left" className="w-60 p-0">
					<SheetTitle className="sr-only">Navigation</SheetTitle>
					<Sidebar locale={locale} user={user} />
				</SheetContent>
			</Sheet>
		</header>
	);
}
