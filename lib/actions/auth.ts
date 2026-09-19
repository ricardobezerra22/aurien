"use server";

import { signIn, signOut } from "@/auth";

export async function handleGoogleSignIn(formData: FormData) {
	const locale = (formData.get("locale") as string) || "en";
	await signIn("google", { redirectTo: `/${locale}/dashboard` });
}

export async function handleSignOut() {
	await signOut({ redirectTo: "/en" });
}
