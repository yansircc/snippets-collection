import { Loader2 } from "lucide-react";
import { usePublicSnippets } from "../hooks";
import type { Snippet } from "../types";
import { SnippetCard } from "./snippet-card";

// 公共展示组件
export const PublicSnippets = () => {
	const { snippets, isLoading } = usePublicSnippets();

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-full">
				<Loader2 className="w-5 h-5 animate-spin text-zinc-400" />
			</div>
		);
	}

	if (!snippets || snippets.length === 0) {
		return <p className="text-zinc-400 text-center">暂无代码片段</p>;
	}

	return (
		<div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full">
			{snippets.map((snippet: Snippet) => (
				<SnippetCard key={snippet.id} snippet={snippet} />
			))}
		</div>
	);
};
