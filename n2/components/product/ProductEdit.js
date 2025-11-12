"use client";

import { deleteProduct, putProduct } from "@/actions/productActions";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductEdit({ product, from }) {
  const [putState, putAction, putPending] = useActionState(putProduct, { message: "", result: "" });
  const [deleteState, deleteAction, deletePending] = useActionState(deleteProduct, { message: "", result: "" });

  const { pno, pname, price, fileNames, writer, sale } = product;

  const router = useRouter();

  const [oldFiles, setOldFiles] = useState(product.fileNames);

  const handleImageDelete = (targetFileName) => {
    console.log("targetFileName", targetFileName);
    const result = oldFiles.filter((fname) => targetFileName !== fname);
    setOldFiles(result);
  };

  useEffect(() => {
    if (putState.result === "success") {
      router.push(from);
      return;
    }

    if (deleteState.result === "success") {
      router.push(from);
    }
  }, [putPending, deletePending, putState, deleteState]);

  return (
    <div>
      <div>Product Edit Component</div>

      <form>
        <div>
          PNO: <input type="text" name="pno" defaultValue={pno} />
        </div>
        <div>
          PNAME: <input type="text" name="pname" defaultValue={pname} />
        </div>
        <div>
          PRICE: <input type="number" name="price" defaultValue={price} />
        </div>
        <div>
          WRITER: <input type="text" name="writer" defaultValue={writer} />
        </div>
        <div>
          Files: <input type="file" name="files" multiple />
        </div>
        <div>
          SALE{" "}
          <select defaultValue={sale ? "true" : "false"} name="sale">
            <option value="true">판매</option>
            <option value="false">판매중지</option>
          </select>
        </div>
        <div>
          <ul className="flex flex-wrap">
            {oldFiles.map((fileName) => (
              <li key={fileName} className="relative w-48 h-48 mr-4 mb-4">
                <Image
                  src={`http://localhost:8080/${fileName}`}
                  alt={product.pname}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                />
                {/* Delete button (client-side only) */}
                <button
                  type="button"
                  className="absolute top-0 right-0 -mt-2 -mr-2 z-10 w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center hover:bg-red-700 transition-colors"
                  onClick={() => handleImageDelete(fileName)}
                >
                  X
                </button>
                <input type="hidden" name="fileNames" value={fileName} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button type="submit" formAction={putAction}>
            수정
          </button>
        </div>
        <div>
          <button type="submit" formAction={deleteAction}>
            삭제
          </button>
        </div>
      </form>
    </div>
  );
}
