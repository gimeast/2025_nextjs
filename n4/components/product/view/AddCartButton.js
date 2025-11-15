"use client";

import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useState } from "react";
import AddCartModal from "@/components/product/view/AddCartModal";
import { useRouter } from "next/navigation";
import { mutate } from "swr";

export default function AddCartButton({ pno }) {
  const { session } = useAuthCheck();
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleClickAdd = async () => {
    const param = {
      account: session?.user?.email,
      pno: pno,
      quantity: 1,
    };

    const res = await fetch("/api/cart/change", {
      method: "POST",
      body: JSON.stringify(param),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("장바구니 추가에 실패했습니다.");
    }

    const result = await res.json();
    console.log("product > view AddCartButton.js > result", result);

    setShow(true);

    await mutate("/api/cart/list");
  };

  const closeModal = async (value) => {
    setShow(false);

    if (value === "c") {
      router.back();
    } else if (value === "m") {
      router.replace("/mypage");
    }
  };

  return (
    <div className="pt-4">
      {session?.user && (
        <button
          onClick={handleClickAdd}
          className="w-full px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          구매하기
        </button>
      )}
      {show && <AddCartModal closeModal={closeModal} />}
    </div>
  );
}
