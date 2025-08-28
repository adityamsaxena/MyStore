"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [featured, setFeatured] = useState([]);

  // Fetch some products (e.g., first 4)
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(
        "https://api.escuelajs.co/api/v1/products?offset=0&limit=4"
      );
      const data = await res.json();
      setFeatured(data);
    };
    fetchProducts();
  }, []);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <div>
          <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
            Welcome to MyStore
          </h1>
          <p style={{ fontSize: "1.2rem", margin: "10px 0 20px" }}>
            Shop the latest trends at unbeatable prices
          </p>
          <Link
            href="/products"
            style={{
              backgroundColor: "#2563eb",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
            }}
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Featured Categories</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80"
                alt="Electronics"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <h4 className="mt-3">Electronics</h4>
            </div>
          </div>
          <div className="col-md-4">
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80"
                alt="Fashion"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <h4 className="mt-3">Fashion</h4>
            </div>
          </div>
          <div className="col-md-4">
            <div
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=600&q=80"
                alt="Home"
                style={{
                  width: "100%",
                  borderRadius: "6px",
                  height: "200px",
                  objectFit: "cover",
                }}
              />
              <h4 className="mt-3">Home & Living</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row g-4">
          {featured.map((product) => (
            <div key={product.id} className="col-md-3">
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  padding: "15px",
                  textAlign: "center",
                  height: "100%",
                }}
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
                <h5 className="mt-3">{product.title}</h5>
                <p className="text-muted">${product.price}</p>
                <Link
                  href={`/products/${product.id}`}
                  style={{
                    display: "inline-block",
                    backgroundColor: "#2563eb",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    textDecoration: "none",
                  }}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call To Action */}
      <div
        style={{
          marginTop: "50px",
          padding: "40px 20px",
          backgroundColor: "#1a202c",
          color: "white",
          textAlign: "center",
        }}
      >
        <h2>Don't Miss Out!</h2>
        <p>Grab your favorite products before they’re gone.</p>
        <Link
          href="/products"
          style={{
            backgroundColor: "#f59e0b",
            padding: "12px 24px",
            borderRadius: "6px",
            textDecoration: "none",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Explore Deals
        </Link>
      </div>
    </div>
  );
}
