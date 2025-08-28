import { Suspense } from "react";
import ProductsClient from "./productsPageClient";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={<p className="text-center mt-5">Loading products...</p>}
    >
      <ProductsClient />
    </Suspense>
  );
}
