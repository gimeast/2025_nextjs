import { useMutation } from "@tanstack/react-query";
import { createPost } from "@/api/post.ts";
import type { UseMutationCallback } from "@/types.ts";

export function useCreatePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      callbacks?.onSuccess?.();
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
  });
}
