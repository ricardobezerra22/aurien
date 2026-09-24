import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { brand } from "../brand.config";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const fraunces = Fraunces({
	subsets: ["latin"],
	variable: "--font-fraunces",
	display: "swap",
	axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
	title: `${brand.meta.name} — ${brand.meta.tagline}`,
	description: brand.meta.description,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			className={`${inter.variable} ${fraunces.variable} h-full`}
			suppressHydrationWarning
		>
			<body className="min-h-full flex flex-col bg-background text-foreground antialiased">
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
