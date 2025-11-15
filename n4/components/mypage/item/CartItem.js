"use client";

import { useAuthCheck } from "@/hooks/useAuthCheck";
import Image from "next/image";
import { mutate } from "swr";

export default function CartItem({ cartItem }) {
  const { session } = useAuthCheck();

  const handleClickQty = async (amount) => {
    const param = {
      account: session.user.email,
      pno: cartItem.pno,
      quantity: amount,
    };
    const res = await fetch("/api/cart/change", {
      method: "POST",
      body: JSON.stringify(param),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    console.log(result);

    mutate("/api/cart/list");
  };

  return (
    <li key={cartItem.cno} className="border-2 p-1 m-1">
      <div>CNO: {cartItem.cno}</div>
      <div>PNO: {cartItem.pno}</div>
      <div>PNAME: {cartItem.pname}</div>
      <div>PRICE: {cartItem.price}</div>
      <div>QTY: {cartItem.quantity}</div>
      <div>
        <Image
          src={`http://localhost:8080/s_${cartItem.fileName}`}
          alt={cartItem.pname}
          width={100} // Add the width here
          height={100} // Add the height here
          priority
        />
      </div>
      <div className="text-3xl ">
        <button onClick={() => handleClickQty(1)} className="m-2 p-2 bg-blue-500">
          +
        </button>
        <button onClick={() => handleClickQty(-1)} className="m-2 p-2 bg-red-500">
          -
        </button>
      </div>
    </li>
  );
}
