"use client";

import type { Snippet } from "@/server/db/schema";
import { Loader2, Plus } from "lucide-react";
import { useSnippetsManager } from "../hooks";
import { SnippetCard } from "./snippet-card";
import { SnippetModal } from "./snippet-model";

// 管理组件
export const SnippetsManager = () => {
	const {
		snippets,
		isLoading,
		isCreating,
		isUpdating,
		editingSnippet,
		showCreateModal,
		setEditingSnippet,
		setShowCreateModal,
		handleCreate,
		handleUpdate,
		deleteSnippet,
	} = useSnippetsManager();

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
			</div>
		);
	}

	if (!snippets || snippets.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center gap-4">
				<p className="text-zinc-400 text-center">暂无代码片段</p>
				<button
					type="button"
					onClick={() => setShowCreateModal(true)}
					className="flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition"
				>
					<Plus className="w-4 h-4" />
					<span>创建代码片段</span>
				</button>
			</div>
		);
	}

	return (
		<>
			<div className="w-full flex justify-end mb-4">
				<button
					type="button"
					onClick={() => setShowCreateModal(true)}
					className="flex items-center gap-2 px-4 py-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition"
				>
					<Plus className="w-4 h-4" />
					<span>创建代码片段</span>
				</button>
			</div>

			<div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full">
				{snippets.map((snippet: Snippet) => (
					<SnippetCard
						key={snippet.id}
						snippet={snippet}
						onEdit={setEditingSnippet}
						onDelete={deleteSnippet}
						isAdmin
					/>
				))}
			</div>

			{editingSnippet && (
				<SnippetModal
					snippet={editingSnippet}
					onClose={() => setEditingSnippet(null)}
					onSave={handleUpdate}
					isLoading={isUpdating}
				/>
			)}

			{showCreateModal && (
				<SnippetModal
					onClose={() => setShowCreateModal(false)}
					onSaveNew={handleCreate}
					isLoading={isCreating}
					isCreate
				/>
			)}
		</>
	);
};
