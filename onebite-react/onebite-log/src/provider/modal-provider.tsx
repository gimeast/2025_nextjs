import type { ReactNode } from "react";
import PostEditorModal from "@/components/modal/post-editor-modal.tsx";
import { createPortal } from "react-dom";

const ModalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {createPortal(
        <PostEditorModal />,
        document.getElementById("modal-root")!,
      )}
      {children}
    </>
  );
};

export default ModalProvider;
