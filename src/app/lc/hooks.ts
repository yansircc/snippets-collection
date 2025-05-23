import { createAuthClient } from "@/lib/client";
import type { Snippet } from "@/server/db/schema";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

// 公开代码片段Hook
export const usePublicSnippets = () => {
	const authClient = createAuthClient(async () => null);
	const { isSignedIn } = useAuth();

	const { data: snippets, isPending: isLoading } = useQuery({
		queryKey: ["public-snippets"],
		queryFn: async () => {
			const res = await authClient.snippet.getAll.$get();
			return await res.json();
		},
	});

	return {
		snippets,
		isLoading,
		isLoggedIn: !!isSignedIn,
	};
};

// 管理员代码片段Hook
export const useSnippetsManager = () => {
	const [editingSnippet, setEditingSnippet] = useState<Snippet | null>(null);
	const [showCreateModal, setShowCreateModal] = useState(false);

	const queryClient = useQueryClient();
	const { getToken, isSignedIn } = useAuth();
	const authClient = createAuthClient(getToken);

	// 获取所有代码片段
	const {
		data: snippets,
		isPending: isLoading,
		refetch,
	} = useQuery({
		queryKey: ["snippets"],
		queryFn: async () => {
			const res = await authClient.snippet.getAll.$get();
			const data = await res.json();
			return data;
		},
	});

	// 创建代码片段
	const { mutate: createSnippet, isPending: isCreating } = useMutation({
		mutationFn: async (data: {
			name: string;
			code: string;
			description?: string;
		}) => {
			const res = await authClient.snippet.create.$post(data);
			return await res.json();
		},
		onSuccess: async () => {
			await refetch();
			setShowCreateModal(false);
		},
	});

	// 更新代码片段
	const { mutate: updateSnippet, isPending: isUpdating } = useMutation({
		mutationFn: async (data: {
			id: number;
			name: string;
			description?: string;
			code: string;
			order: number;
		}) => {
			const res = await authClient.snippet.update.$post(data);
			return await res.json();
		},
		onSuccess: async () => {
			await refetch();
			setEditingSnippet(null);
		},
	});

	// 删除代码片段
	const { mutate: deleteSnippet, isPending: isDeleting } = useMutation({
		mutationFn: async ({ id }: { id: number }) => {
			const res = await authClient.snippet.delete.$post({ id });
			return await res.json();
		},
		onSuccess: async () => {
			await refetch();
		},
	});

	const handleCreate = (data: {
		name: string;
		description?: string;
		code: string;
	}) => {
		createSnippet(data);
	};

	const handleUpdate = (data: {
		name: string;
		description?: string;
		code: string;
		order: number;
	}) => {
		if (editingSnippet) {
			updateSnippet({ id: editingSnippet.id, ...data });
		}
	};

	return {
		snippets,
		isLoading,
		isCreating,
		isUpdating,
		isDeleting,
		editingSnippet,
		showCreateModal,
		setEditingSnippet,
		setShowCreateModal,
		handleCreate,
		handleUpdate,
		deleteSnippet: (id: number) => deleteSnippet({ id }),
		refetch, // 导出 refetch 函数以便在需要时手动刷新
	};
};
