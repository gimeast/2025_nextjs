"use client";

import { useAuthCheck } from "@/hooks/useAuthCheck";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function MyPageCartList() {
  const { session } = useAuthCheck(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch("/api/cart/list", { method: "GET" }).then((res) => {
        res.json().then((serverItems) => {
          console.log(serverItems);
          setCartItems(() => serverItems);
        });
      });
    }
  }, [session]);
  return (
    <div>
      <div>
        <div>Cart Items {cartItems.length}</div>
        <ul>
          {cartItems.map((cartItem) => (
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
