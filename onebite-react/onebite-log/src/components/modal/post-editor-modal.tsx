import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ImageIcon } from "lucide-react";
import { usePostEditorModal } from "@/store/post-editor-modal.ts";
import { useEffect, useRef, useState } from "react";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post.ts";
import { toast } from "sonner";

const PostEditorModal = () => {
  const { isOpen, close } = usePostEditorModal();

  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: createPost, isPending: isCreatePostPending } = useCreatePost({
    onSuccess: () => {
      toast.error("저장 완료", { position: "top-center" });
      close();
    },
    onError: (error) => {
      toast.error("게시물 생성을 실패했습니다.", { position: "top-center" });
    },
  });

  const handleCloseModal = () => {
    close();
  };

  const handleCreatePostClick = () => {
    if (content.trim() === "") return;
    createPost(content);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (!isOpen) return;
    textareaRef.current?.focus();
    setContent("");
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
        <textarea
          ref={textareaRef}
          className="max-h-125 min-h-25 focus:outline-none"
          placeholder="무슨 일이 있었나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isCreatePostPending}
        />
        <Button
          variant="outline"
          className="cursor-pointer"
          disabled={isCreatePostPending}
        >
          <ImageIcon />
          이미지 추가
        </Button>
        <Button
          className="cursor-pointer"
          onClick={handleCreatePostClick}
          disabled={isCreatePostPending}
        >
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditorModal;
