export default function ProductCatalog({ products, total, current, size }) {
  if (!products || products.length === 0) {
    throw new Error("No Products in this page");
  }

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li className="m-2 p-1 border" key={product.pno}>
            <div>PNO: {product.pno}</div>
            <div>NAME: {product.pname}</div>
            <div>PRICE: {product.price} </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
