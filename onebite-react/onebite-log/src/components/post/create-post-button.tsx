import { PlusCircleIcon } from "lucide-react";
import { useOpenPostEditorModal } from "@/store/post-editor-modal.ts";

const CreatePostButton = () => {
  const isOpen = useOpenPostEditorModal();
  return (
    <div
      className="bg-muted text-muted-foreground cursor-pointer rounded-xl px-6 py-4"
      onClick={isOpen}
    >
      <div className="flex items-center justify-between">
        <div>나누고 싶은 이야기가 있나요?</div>
        <PlusCircleIcon className="h-5 w-5" />
      </div>
    </div>
  );
};

export default CreatePostButton;
