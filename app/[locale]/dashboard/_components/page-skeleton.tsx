import { cn } from "cn";

function Skeleton({ className }: { className?: string }) {
	return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
}

export function DashboardSkeleton() {
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<Skeleton className="h-8 w-48" />
				<Skeleton className="h-4 w-72" />
			</div>
			<div className="grid gap-4 sm:grid-cols-2">
				<Skeleton className="h-36 rounded-xl" />
				<Skeleton className="h-36 rounded-xl" />
			</div>
		</div>
	);
}

export function SettingsSkeleton() {
	return (
		<div className="space-y-6 max-w-lg">
			<div className="space-y-2">
				<Skeleton className="h-7 w-32" />
				<Skeleton className="h-4 w-64" />
			</div>
			<div className="space-y-4">
				<Skeleton className="h-20 rounded-xl" />
				<Skeleton className="h-20 rounded-xl" />
			</div>
		</div>
	);
}
