import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Snippet } from "@/server/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface EditModalProps {
	snippet?: Snippet;
	onClose: () => void;
	onSave?: (data: {
		name: string;
		description?: string;
		code: string;
		order: number;
	}) => void;
	onSaveNew?: (data: {
		name: string;
		description?: string;
		code: string;
	}) => void;
	isLoading: boolean;
	isCreate?: boolean;
	isOpen: boolean;
}

const formSchema = z.object({
	name: z.string().min(1, "标题不能为空"),
	description: z.string().optional(),
	code: z.string().min(1, "代码不能为空"),
	order: z.number().int().nonnegative("排序必须是非负整数"),
});

type FormValues = z.infer<typeof formSchema>;

export const SnippetModal = ({
	snippet,
	onClose,
	onSave,
	onSaveNew,
	isLoading,
	isCreate = false,
	isOpen,
}: EditModalProps) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: snippet?.name || "",
			description: snippet?.description || "",
			code: snippet?.code || "",
			order: snippet?.order ?? 0,
		},
	});

	const handleSubmit = (values: FormValues) => {
		if (isCreate && onSaveNew) {
			onSaveNew({
				name: values.name,
				description: values.description,
				code: values.code,
			});
		} else if (onSave) {
			onSave({
				name: values.name,
				description: values.description,
				code: values.code,
				order: values.order,
			});
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="bg-zinc-900 border-zinc-800 w-full max-w-2xl p-6">
				<DialogHeader>
					<DialogTitle className="text-lg font-medium text-zinc-200">
						{isCreate ? "创建代码片段" : "编辑代码片段"}
					</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm text-zinc-400">标题</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="bg-black/50 hover:bg-black/75 focus:bg-black/75 h-12 text-zinc-100 ring-2 ring-transparent focus:ring-zinc-800 focus-visible:outline-none transition border-zinc-800"
										/>
									</FormControl>
									<FormMessage className="text-red-400" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm text-zinc-400">描述</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="bg-black/50 hover:bg-black/75 focus:bg-black/75 h-12 text-zinc-100 ring-2 ring-transparent focus:ring-zinc-800 focus-visible:outline-none transition border-zinc-800"
										/>
									</FormControl>
									<FormDescription className="text-zinc-500 text-xs">
										可选的代码片段描述信息
									</FormDescription>
									<FormMessage className="text-red-400" />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="code"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-sm text-zinc-400">代码</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											className="bg-black/50 hover:bg-black/75 focus:bg-black/75 min-h-[200px] max-h-[400px] overflow-y-auto p-4 text-zinc-100 ring-2 ring-transparent focus:ring-zinc-800 focus-visible:outline-none font-mono text-sm transition border-zinc-800"
										/>
									</FormControl>
									<FormMessage className="text-red-400" />
								</FormItem>
							)}
						/>

						{!isCreate && (
							<FormField
								control={form.control}
								name="order"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-sm text-zinc-400">
											排序 (数字越小越靠前)
										</FormLabel>
										<FormControl>
											<Input
												type="number"
												min="0"
												{...field}
												onChange={(e) =>
													field.onChange(Number.parseInt(e.target.value) || 0)
												}
												className="bg-black/50 hover:bg-black/75 focus:bg-black/75 h-12 text-zinc-100 ring-2 ring-transparent focus:ring-zinc-800 focus-visible:outline-none transition border-zinc-800"
											/>
										</FormControl>
										<FormMessage className="text-red-400" />
									</FormItem>
								)}
							/>
						)}

						<DialogFooter className="pt-4">
							<Button
								type="button"
								variant="outline"
								onClick={onClose}
								className="bg-zinc-800/50 hover:bg-zinc-800/75 text-zinc-300 border-zinc-700"
							>
								取消
							</Button>
							<Button
								type="submit"
								disabled={isLoading || !form.formState.isValid}
								className="bg-gradient-to-tl from-zinc-300 to-zinc-200 text-zinc-800 font-medium hover:brightness-110 transition"
							>
								{isLoading ? "保存中..." : isCreate ? "创建" : "保存"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
