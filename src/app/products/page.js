"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CategoryFilter from "../components/categoryFilter";
import ProductCard from "../components/productCard";
import Pagination from "../components/pagination";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  // read query params
  const query = searchParams.get("query") || "";
  const categoryFromUrl = searchParams.get("category") || "all";
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

  const [page, setPage] = useState(pageFromUrl);
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);

  const limit = 9;

  // fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/products");
        const data = await res.json();
        setAllProducts(data);

        const catRes = await fetch(
          "https://api.escuelajs.co/api/v1/categories"
        );
        const catData = await catRes.json();

        // ✅ keep only categories that actually have products
        const validCategories = catData.filter((cat) =>
          data.some((p) => p.category.id === cat.id)
        );

        setCategories(validCategories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // filter by category
  const categoryFiltered =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter(
          (p) => p.category.id.toString() === selectedCategory
        );

  // filter by search
  const searched = categoryFiltered.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  // pagination
  const total = searched.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginatedProducts = searched.slice(startIndex, startIndex + limit);

  // update URL whenever filters change
  useEffect(() => {
    router.push(
      `/products?query=${query}&category=${selectedCategory}&page=${page}`
    );
  }, [page, selectedCategory, query, router]);

  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "20px" }}
      >
        All Products
      </h1>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        selected={selectedCategory}
        setSelected={(catId) => {
          setSelectedCategory(catId);
          setPage(1); // reset page when category changes
        }}
      />

      {/* Products Grid */}
      <div className="container mt-4">
        <div className="row">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found 🚫</p>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination page={page} setPage={setPage} total={total} limit={limit} />
      )}
    </div>
  );
}
