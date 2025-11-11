import ProductCatalog from "@/components/product/ProductCatalog";

export async function generateStaticParams() {
  const res = await fetch(`http://localhost:8080/api/products/countCatalog?size=4`);
  const pageCount = await res.json();
  const arr = [];
  for (let i = 1; i <= pageCount; i++) {
    arr.push({ page: String(i) });
  }
  return arr;
  // return [{ page: "1" }, { page: "2" }];
}

export default async function ProductCatalogPage({ params, searchParams }) {
  const { page = "1" } = await params;
  const size = "4";

  const res = await fetch(`http://localhost:8080/api/products/list?page=${page}&size=${size}`, {
    next: { revalidate: 60 },
  });

  const result = await res.json();
  console.log(result);
  const { list, total, pageRequestDTO } = result;

  return (
    <div>
      <div>Product Catalog Page {page}</div>
      <ProductCatalog products={list} current={pageRequestDTO.page} size={pageRequestDTO.size} total={total} />
    </div>
  );
}
