"use client";

import { postProduct } from "@/actions/productActions";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

export default function ProductAdd() {
  const [state, action, isPending] = useActionState(postProduct, { message: "", result: "" });
  const router = useRouter();

  return (
    <div>
      {state.result === "success" && (
        <div onClick={(e) => router.replace("/product/catalog/1")}>
          <div>New Product Added</div>
        </div>
      )}
      <div> Product Add Component</div>
      <form action={action}>
        <div>
          상품이름
          <input type="text" name="pname"></input>
        </div>
        <div>
          상품가격
          <input type="number" name="price"></input>
        </div>
        <div>
          상품이미지
          <input type="file" name="files" multiple></input>
        </div>
        <div>
          <input type="hidden" name="writer" value="user1"></input>
        </div>

        <button>Add Product</button>
      </form>
    </div>
  );
}
