import ProductView from "@/components/product/ProductView";

export async function generateStaticParams() {
  const arr = [{ pno: "1" }, { pno: "2" }, { pno: "4" }];
  return arr;
}

export default async function ProductViewPage({ params, searchParams }) {
  const param = await params;

  const pno = param.pno;

  console.log("pno", pno);

  const res = await fetch(`http://localhost:8080/api/products/${pno}`, { next: { revalidate: 120 } });
  const product = await res.json();

  console.log(product);

  const query = await searchParams;
  const from = query.from ? decodeURIComponent(query.from) : "product/catalog/1";

  return (
    <div>
      <div> Product View Page </div>
      <ProductView product={product} from={from} />
    </div>
  );
}
