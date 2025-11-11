import Image from "next/image";

export default function ProductView({ product }) {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <div>Product View Component</div>
      <div>{product.pno}</div>
      <div>{product.pname}</div>
      <div>{product.price}</div>
      <div>{product.writer}</div>
      <div>{product.createdDate}</div>

      {product.fileNames && product.fileNames.length > 0 ? (
        product.fileNames.map((fileName) => (
          <div className="relative w-1/3 h-80" key={fileName}>
            <Image
              src={`http://localhost:8080/${fileName}`}
              alt={product.pname}
              fill
              style={{ objectFit: "cover" }}
              sizes="33vw"
              priority={true}
              unoptimized={true}
            />
          </div>
        ))
      ) : (
        <div>No images available</div>
      )}
    </div>
  );
}
