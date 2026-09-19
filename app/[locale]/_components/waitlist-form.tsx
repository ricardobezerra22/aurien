"use client";

import { CheckCircle } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { joinWaitlist, type WaitlistState } from "@/lib/actions/waitlist";

interface Props {
	locale: string;
	placeholder: string;
	cta: string;
	successMsg: string;
	errorMsg: string;
	size?: "default" | "hero";
}

const initial: WaitlistState = { status: "idle" };

export function WaitlistForm({
	locale,
	placeholder,
	cta,
	successMsg,
	errorMsg,
	size = "default",
}: Props) {
	const [state, action, isPending] = useActionState(joinWaitlist, initial);
	const inputRef = useRef<HTMLInputElement>(null);
	const statusId = `waitlist-status-${locale}`;

	useEffect(() => {
		if (state.status === "error") {
			inputRef.current?.focus();
		}
	}, [state]);

	if (state.status === "success") {
		return (
			<div
				role="status"
				aria-live="polite"
				className="flex items-center gap-3 text-forest"
			>
				<CheckCircle size={20} className="shrink-0" />
				<span
					className={
						size === "hero" ? "text-base font-medium" : "text-sm font-medium"
					}
				>
					{successMsg}
				</span>
			</div>
		);
	}

	return (
		<form action={action} className="w-full">
			<input type="hidden" name="locale" value={locale} />
			<div
				className={`flex flex-col gap-3 ${size === "hero" ? "sm:flex-row" : "sm:flex-row"} w-full`}
			>
				<div className="flex-1">
					<label htmlFor={`email-${locale}`} className="sr-only">
						Email address
					</label>
					<input
						ref={inputRef}
						id={`email-${locale}`}
						name="email"
						type="email"
						autoComplete="email"
						required
						placeholder={placeholder}
						aria-describedby={state.status === "error" ? statusId : undefined}
						aria-invalid={state.status === "error"}
						className={`
							w-full rounded-[12px] border border-auren-border bg-surface
							px-4 text-text-primary placeholder:text-text-muted
							focus:outline-none focus:ring-2 focus:ring-forest/30 focus:border-forest
							transition-colors
							${size === "hero" ? "h-14 text-base" : "h-12 text-sm"}
							${state.status === "error" ? "border-red-400" : ""}
						`}
					/>
					{state.status === "error" && (
						<p
							id={statusId}
							role="alert"
							aria-live="assertive"
							className="mt-2 text-xs text-red-600"
						>
							{errorMsg}
						</p>
					)}
				</div>
				<Button
					type="submit"
					disabled={isPending}
					className={`
						shrink-0 rounded-[12px] bg-forest text-white hover:bg-forest-light
						font-medium transition-colors disabled:opacity-60
						${size === "hero" ? "h-14 px-8 text-base" : "h-12 px-6 text-sm"}
					`}
				>
					{isPending ? "…" : cta}
				</Button>
			</div>
		</form>
	);
}
