"use client";

import { LogOut, Settings } from "lucide-react";
import { useTranslations } from "next-intl";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "@/i18n/navigation";
import { handleSignOut } from "@/lib/actions/auth";

interface UserMenuProps {
	user: {
		name?: string | null;
		email?: string | null;
		image?: string | null;
	};
	locale: string;
}

function getInitials(name?: string | null) {
	if (!name) return "?";
	return name
		.split(" ")
		.slice(0, 2)
		.map((n) => n[0])
		.join("")
		.toUpperCase();
}

export function UserMenu({ user, locale }: UserMenuProps) {
	const t = useTranslations("settings");
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				aria-label="User menu"
			>
				<Avatar className="h-7 w-7 shrink-0">
					<AvatarImage src={user.image ?? undefined} alt={user.name ?? ""} />
					<AvatarFallback className="text-xs bg-sage text-white">
						{getInitials(user.name)}
					</AvatarFallback>
				</Avatar>
				<div className="flex-1 min-w-0 text-left">
					<p className="font-medium text-foreground truncate text-xs leading-tight">
						{user.name}
					</p>
					<p className="text-muted-foreground truncate text-xs leading-tight">
						{user.email}
					</p>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" side="top" className="w-56">
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col gap-0.5">
						<span className="font-medium text-foreground text-sm">
							{user.name}
						</span>
						<span className="text-muted-foreground text-xs">{user.email}</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => router.push("/dashboard/settings/profile", { locale })}
					className="flex items-center gap-2 cursor-pointer"
				>
					<Settings size={14} aria-hidden />
					{t("title")}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => handleSignOut()}
					variant="destructive"
					className="flex items-center gap-2 cursor-pointer"
				>
					<LogOut size={14} aria-hidden />
					{t("signOutAll")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
