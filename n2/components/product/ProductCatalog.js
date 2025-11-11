import Link from "next/link";
import Image from "next/image";

export default function ProductCatalog({ products, total, current, size }) {
  if (!products || products.length === 0) {
    throw new Error("No Products in this page");
  }

  console.log("products", products);

  const hasPrev = current !== 1;
  const hasNext = current !== Math.ceil(total / size);

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li className="m-2 p-1 border" key={product.pno}>
            <div>PNO: {product.pno}</div>
            <div>NAME: {product.pname}</div>
            <div>PRICE: {product.price} </div>
            <div className="relative w-1/3 h-40">
              {/* 부모 크기 제한 */}
              <Image
                src={`http://localhost:8080/s_${product.fileName}`}
                alt={product.pname}
                fill
                style={{ objectFit: "cover" }}
                sizes="33vw"
                priority={true}
              />
            </div>
          </li>
        ))}
      </ul>
      {hasPrev && <Link href={`/product/catalog/${current - 1}`}>Prev</Link>}
      {hasNext && <Link href={`/product/catalog/${current + 1}`}>Next</Link>}
    </div>
  );
}
