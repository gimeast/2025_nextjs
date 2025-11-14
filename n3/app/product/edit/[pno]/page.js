import ProductEdit from "@/components/product/ProductEdit";

export default async function ProductEditPage({ params, searchParams }) {
  const { pno } = await params;
  const query = await searchParams;
  const from = query.from ? decodeURIComponent(query.from) : "/product/category/1";

  const res = await fetch(`${process.env.API_SERVER_HOST}/api/products/${pno}`, { method: "GET", chache: "no-store" });
  const product = await res.json();
  console.log(product);

  return (
    <div>
      <div>Product Edit Page</div>
      <ProductEdit product={product} from={from} />
    </div>
  );
}
