import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ImageIcon, XIcon } from "lucide-react";
import { usePostEditorModal } from "@/store/post-editor-modal.ts";
import { type ChangeEvent, useEffect, useRef, useState } from "react";
import { useCreatePost } from "@/hooks/mutations/post/use-create-post.ts";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel.tsx";
import { useSession } from "@/store/session.ts";

type Image = {
  file: File;
  previewUrl: string;
};

const PostEditorModal = () => {
  const session = useSession();
  const { isOpen, close } = usePostEditorModal();

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageAttachButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      console.log("files:", files);

      files.forEach((file) =>
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) },
        ]),
      );
    }

    e.target.value = "";
  };

  const handleCreatePostClick = () => {
    if (content.trim() === "") return;
    createPost({
      content,
      images: images.map((image) => image.file),
      userId: session!.user.id,
    });
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prevState) =>
      prevState.filter((item) => item.previewUrl !== image.previewUrl),
    );
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
    setImages([]);
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
        <input
          onChange={handleSelectImages}
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept="image/*"
          multiple
        />
        {images.length > 0 && (
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem className="basis-2/5" key={image.previewUrl}>
                  <div className="relative">
                    <img
                      className="h-full w-full rounded-sm object-cover"
                      src={image.previewUrl}
                      alt=""
                    />
                    <div
                      className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1 hover:bg-black/50"
                      onClick={() => handleDeleteImage(image)}
                    >
                      <XIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={handleImageAttachButtonClick}
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
