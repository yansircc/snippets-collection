"use client";

import { cn } from "@/lib/utils";
import { SnippetsManager } from "./components/snippets-manager";

export default function SnippetsPage() {
	return (
		<div className="flex flex-col items-center w-full h-full">
			<div className="absolute inset-0 -z-10 opacity-50 mix-blend-soft-light bg-[url('/noise.svg')] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
			<div className="container flex flex-col items-center gap-6 px-4 py-8">
				<h1
					className={cn(
						"text-3xl md:text-4xl font-medium",
						"bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent mb-8",
					)}
				>
					LC 代码
				</h1>
				<SnippetsManager />
			</div>
		</div>
	);
}
