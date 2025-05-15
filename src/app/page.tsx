import { cn } from "@/lib/utils";
import Link from "next/link";
import { navItems } from "./config/navigation";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center w-full h-full relative">
			{/* 噪点背景 */}
			<div className="absolute inset-0 -z-10 opacity-50 mix-blend-soft-light bg-[url('/noise.svg')] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />

			<div className="container flex flex-col items-center justify-center gap-6 px-4 py-12">
				<h1
					className={cn(
						"text-4xl sm:text-5xl md:text-6xl font-semibold leading-none",
						"bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent text-center",
					)}
				>
					Snippets Collection
				</h1>

				<p className="text-zinc-400 text-lg md:text-xl text-center max-w-2xl mb-8">
					轻松收集和管理你的代码片段
				</p>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
					{navItems.map((item) => (
						<Link
							href={item.href}
							key={item.href}
							className="group flex flex-col p-6 bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/50 hover:border-zinc-700/50 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-zinc-950/20"
						>
							<h2 className="text-xl font-medium text-white mb-2 group-hover:text-zinc-100">
								{item.label}
							</h2>
							<p className="text-zinc-400 group-hover:text-zinc-300 text-sm">
								{item.description}
							</p>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
