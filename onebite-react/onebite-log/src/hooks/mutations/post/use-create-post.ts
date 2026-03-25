import { useMutation } from "@tanstack/react-query";
import { createPostWithImages } from "@/api/post.ts";
import type { UseMutationCallback } from "@/types.ts";

export function useCreatePost(callbacks?: UseMutationCallback) {
  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      callbacks?.onSuccess?.();
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
  });
}
