import type { Snippet } from "@/server/db/schema";
import { Check, ClipboardCopy, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

// 代码片段卡片组件
export const SnippetCard = ({
	snippet,
	onEdit,
	onDelete,
	isAdmin = false,
}: {
	snippet: Snippet;
	onEdit?: (snippet: Snippet) => void;
	onDelete?: (id: number) => void;
	isAdmin?: boolean;
}) => {
	const [copiedId, setCopiedId] = useState<string | null>(null);

	const copyToClipboard = async (code: string, id: string) => {
		await navigator.clipboard.writeText(code);
		setCopiedId(id);
		setTimeout(() => setCopiedId(null), 2000);
	};

	return (
		<div className="relative group">
			<button
				onClick={() => copyToClipboard(snippet.code, snippet.id.toString())}
				className="w-full relative flex flex-col items-center justify-center bg-black/25 hover:bg-black/40 p-3 rounded-md text-center transition-all group overflow-hidden h-28 cursor-copy"
				type="button"
			>
				<span className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

				{copiedId === snippet.id.toString() ? (
					<div className="flex flex-col items-center justify-center gap-1 text-emerald-400">
						<Check className="w-5 h-5" />
						<span className="text-xs">已复制</span>
					</div>
				) : (
					<>
						<ClipboardCopy className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 mb-2 transition-colors" />
						<h3 className="text-sm font-medium text-zinc-200 line-clamp-2">
							{snippet.name}
						</h3>
						<span className="text-xs text-zinc-500 mt-1">
							{snippet.description || "暂无描述"}
						</span>
					</>
				)}
			</button>

			{isAdmin && (
				<div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
					<button
						type="button"
						onClick={() => onEdit?.(snippet)}
						className="p-1.5 rounded-md bg-zinc-800/90 hover:bg-zinc-700/90 text-zinc-400 hover:text-zinc-200 transition"
					>
						<Pencil className="w-4 h-4" />
					</button>
					<button
						type="button"
						onClick={() => onDelete?.(snippet.id)}
						className="p-1.5 rounded-md bg-red-950/90 hover:bg-red-900/90 text-red-400 hover:text-red-300 transition"
					>
						<Trash2 className="w-4 h-4" />
					</button>
				</div>
			)}
		</div>
	);
};
