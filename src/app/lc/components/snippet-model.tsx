import type { Snippet } from "@/server/db/schema";
import { X } from "lucide-react";
import { useState } from "react";

interface EditModalProps {
	snippet?: Snippet;
	onClose: () => void;
	onSave?: (data: { name: string; code: string; order: number }) => void;
	onSaveNew?: (data: { name: string; code: string }) => void;
	isLoading: boolean;
	isCreate?: boolean;
}

export const SnippetModal = ({
	snippet,
	onClose,
	onSave,
	onSaveNew,
	isLoading,
	isCreate = false,
}: EditModalProps) => {
	const [name, setName] = useState(snippet?.name || "");
	const [code, setCode] = useState(snippet?.code || "");
	const [order, setOrder] = useState(snippet?.order || 0);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !code.trim()) return;

		if (isCreate && onSaveNew) {
			onSaveNew({ name, code });
		} else if (onSave) {
			onSave({ name, code, order });
		}
	};

	return (
		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
			<div className="bg-zinc-900 rounded-lg w-full max-w-2xl p-6 shadow-xl">
				<div className="flex justify-between items-center mb-4">
					<h3 className="text-lg font-medium text-zinc-200">
						{isCreate ? "创建代码片段" : "编辑代码片段"}
					</h3>
					<button
						type="button"
						onClick={onClose}
						className="text-zinc-400 hover:text-zinc-200"
					>
						<X className="w-5 h-5" />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="name" className="text-sm text-zinc-400">
							标题
						</label>
						<input
							id="name"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-full rounded-md bg-black/50 hover:bg-black/75 focus:bg-black/75 h-12 px-4 py-2 text-zinc-100 ring-2 ring-transparent focus:ring-zinc-800 focus-visible:outline-none transition"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="code" className="text-sm text-zinc-400">
							代码
						</label>
						<textarea
							id="code"
							value={code}
							onChange={(e) => setCode(e.target.value)}
							className="w-full rounded-md bg-black/50 hover:bg-black/75 focus:bg-black/75 min-h-[200px] p-4 text-zinc-100 ring-2 ring-transparent focus:ring-zinc-800 focus-visible:outline-none font-mono text-sm transition"
						/>
					</div>

					{!isCreate && (
						<div className="space-y-2">
							<label htmlFor="order" className="text-sm text-zinc-400">
								排序 (数字越小越靠前)
							</label>
							<input
								id="order"
								type="number"
								min="0"
								value={order}
								onChange={(e) => setOrder(Number.parseInt(e.target.value) || 0)}
								className="w-full rounded-md bg-black/50 hover:bg-black/75 focus:bg-black/75 h-12 px-4 py-2 text-zinc-100 ring-2 ring-transparent focus:ring-zinc-800 focus-visible:outline-none transition"
							/>
						</div>
					)}

					<div className="flex justify-end gap-3 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 rounded-md bg-zinc-800/50 hover:bg-zinc-800/75 text-zinc-300 transition"
						>
							取消
						</button>
						<button
							type="submit"
							disabled={isLoading || !name.trim() || !code.trim()}
							className="px-6 py-2 rounded-md bg-gradient-to-tl from-zinc-300 to-zinc-200 text-zinc-800 font-medium hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition"
						>
							{isLoading ? "保存中..." : isCreate ? "创建" : "保存"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
