export default function Loading() {
	return (
		<div className="flex min-h-svh items-center justify-center">
			<div className="flex flex-col items-center gap-5">
				<div className="relative w-12 h-12">
					<div className="absolute inset-0 rounded-full bg-sage opacity-30 animate-ping" />
					<div className="absolute inset-0 rounded-full bg-sage opacity-60" />
					<div className="absolute inset-0 translate-x-3 translate-y-1.5 rounded-full bg-sage-light opacity-40" />
				</div>
				<span className="text-sm text-text-muted tracking-wide">Loading…</span>
			</div>
		</div>
	);
}
