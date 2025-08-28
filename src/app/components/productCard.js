"use client";

import { useCart } from "../context/cartContext";
import Link from "next/link";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="col-md-4 col-sm-6 mb-4">
      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "10px",
          padding: "16px",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.2s ease",
        }}
      >
        {/* Image + Title clickable */}
        <Link
          href={`/products/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={product.images[0]}
            alt={product.title}
            style={{
              width: "100%",
              height: "180px",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
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

        <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
          <button
            onClick={() => addToCart(product)}
            style={{
              flex: 1,
              backgroundColor: "#2563eb",
              color: "white",
              padding: "10px 14px",
              borderRadius: "6px",
              border: "none",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>

          <Link
            href={`/products/${product.id}`}
            style={{
              flex: 1,
              backgroundColor: "#10b981",
              color: "white",
              padding: "10px 14px",
              borderRadius: "6px",
              textAlign: "center",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
