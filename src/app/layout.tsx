import type { Metadata } from "next";
import { Providers } from "./components/providers";
import "./globals.css";
import { Header } from "./components/header";

export const metadata: Metadata = {
	title: "Snippets Collection",
	description: "轻松收集和管理你的代码片段",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="zh-CN" className="h-full">
			<body className="antialiased h-full flex flex-col bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
				<Providers>
					<Header />
					<main className="flex-1 flex flex-col overflow-auto">{children}</main>
				</Providers>
			</body>
		</html>
	);
}
