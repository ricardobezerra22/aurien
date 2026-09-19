import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Auren — More clarity. Better decisions.",
	description:
		"A calm, evidence-informed bridge between self-discovery and professional support.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html className={`${inter.variable} h-full`} suppressHydrationWarning>
			<body className="min-h-full flex flex-col bg-background text-foreground antialiased">
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
