"use client";

import type { Snippet } from "@/server/db/schema";
import { useAuth } from "@clerk/nextjs";
import { Loader2, Plus } from "lucide-react";
import { useSnippetsManager } from "../hooks";
import { SnippetCard } from "./snippet-card";
import { SnippetModal } from "./snippet-model";

// 代码片段创建卡片组件
const CreateSnippetCard = ({
	onClick,
}: {
	onClick: () => void;
}) => {
	return (
		<button
			onClick={onClick}
			className="w-full h-28 flex flex-col items-center justify-center bg-black/25 hover:bg-black/40 p-3 rounded-md border-2 border-dashed border-zinc-800 hover:border-zinc-700 text-center transition-all group overflow-hidden cursor-pointer"
			type="button"
		>
			<Plus className="w-6 h-6 text-zinc-500 group-hover:text-zinc-300 mb-2 transition-colors" />
			<span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">
				创建代码片段
			</span>
		</button>
	);
};

// 管理组件
export const SnippetsManager = () => {
	const { isSignedIn } = useAuth();
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
				{isSignedIn && (
					<CreateSnippetCard onClick={() => setShowCreateModal(true)} />
				)}
				<SnippetModal
					onClose={() => setShowCreateModal(false)}
					onSaveNew={handleCreate}
					isLoading={isCreating}
					isCreate
					isOpen={showCreateModal}
				/>
			</div>
		);
	}

	return (
		<>
			<div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full">
				{snippets.map((snippet: Snippet) => (
					<SnippetCard
						key={snippet.id}
						snippet={snippet}
						onEdit={setEditingSnippet}
						onDelete={deleteSnippet}
						isAdmin={!!isSignedIn}
					/>
				))}
				{isSignedIn && (
					<CreateSnippetCard onClick={() => setShowCreateModal(true)} />
				)}
			</div>

			{editingSnippet && (
				<SnippetModal
					snippet={editingSnippet}
					onClose={() => setEditingSnippet(null)}
					onSave={handleUpdate}
					isLoading={isUpdating}
					isOpen={!!editingSnippet}
				/>
			)}

			<SnippetModal
				onClose={() => setShowCreateModal(false)}
				onSaveNew={handleCreate}
				isLoading={isCreating}
				isCreate
				isOpen={showCreateModal}
			/>
		</>
	);
};
