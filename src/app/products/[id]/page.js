"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/app/context/cartContext";

export default function ProductDetails() {
  const { id } = useParams(); // get product id from route params
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <h2 className="text-center mt-5">Loading...</h2>;

  const handleBuyNow = () => {
    router.push("/payment");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          {product.images?.[0] && (
            <Image
              src={product.images[0]}
              alt={product.title}
              width={400} // adjust width
              height={400} // adjust height
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          )}
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h1 className="fw-bold mb-3">{product.title}</h1>
          <h4 className="text-success fw-semibold mb-3">${product.price}</h4>
          <p className="text-muted mb-4">{product.description}</p>
          <p className="text-secondary mb-2">
            <strong>Category:</strong> {product.category?.name}
          </p>

          {/* Buttons */}
          <div className="d-flex gap-3 mt-4 flex-wrap">
            <button
              className="btn btn-primary px-4 py-2"
              onClick={() => addToCart(product)}
            >
              Add to Cart 🛒
            </button>
            <button
              onClick={handleBuyNow}
              className="btn btn-outline-secondary px-4 py-2"
            >
              Buy Now ⚡
            </button>
            <Link href="/products" className="btn btn-dark px-4 py-2">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
