"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/cartContext";
import SearchBar from "./searchBar";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { cart } = useCart();

  // Calculate total items
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (value) => {
    setSearch(value);
    if (value.trim()) {
      router.push(`/products?query=${value}&page=1`);
    } else {
      router.push("/products");
    }
  };

  return (
    <nav
      style={{
        backgroundColor: "#1a202c",
        color: "white",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        boxShadow: "0px 2px 6px rgba(0,0,0,0.3)",
        position: "fixed", // 🔹 fix navbar
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000, // stays above all content
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          textDecoration: "none",
          color: "white",
          whiteSpace: "nowrap",
        }}
      >
        MyStore
      </Link>

      {/* Search Bar in the middle */}
      <div style={{ flex: 1, maxWidth: "450px" }}>
        <SearchBar search={search} setSearch={handleSearch} />
      </div>

      {/* Links on the right */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link href="/" style={{ textDecoration: "none", color: "white" }}>
          Home
        </Link>
        <Link
          href="/products"
          style={{ textDecoration: "none", color: "white" }}
        >
          Products
        </Link>

        {/* Cart with badge */}
        <Link
          href="/cart"
          style={{
            textDecoration: "none",
            color: "white",
            position: "relative",
          }}
        >
          🛒
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-12px",
                backgroundColor: "red",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
                borderRadius: "9999px",
                padding: "2px 6px",
              }}
            >
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
