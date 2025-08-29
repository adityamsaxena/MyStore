"use client";

import { useCart } from "../context/cartContext";
import Link from "next/link";
import Image from "next/image";

// Custom loader for external images
const myLoader = ({ src }) => src;

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div
        className="d-flex flex-column h-100 p-3"
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.2s ease",
        }}
      >
        {/* Image + Title clickable */}
        <Link
          href={`/products/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
          className="mb-3"
        >
          {product.images?.[0] && (
            <div
              style={{ width: "100%", height: "200px", position: "relative" }}
            >
              <Image
                loader={myLoader}
                src={product.images[0]}
                alt={product.title}
                fill
                style={{ objectFit: "cover", borderRadius: "6px" }}
              />
            </div>
          )}
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              marginTop: "10px",
              color: "#111827",
            }}
          >
            {product.title}
          </h2>
        </Link>

        <p
          style={{
            color: "#4b5563",
            margin: "6px 0 12px",
            fontSize: "0.95rem",
          }}
        >
          ${product.price}
        </p>

        <div className="d-flex gap-2 mt-auto">
          <button
            onClick={() => addToCart(product)}
            className="flex-grow-1 btn btn-primary"
          >
            Add to Cart
          </button>

          <Link
            href={`/products/${product.id}`}
            className="flex-grow-1 btn btn-success text-center"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
