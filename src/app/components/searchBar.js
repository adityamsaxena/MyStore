"use client";

export default function SearchBar({ search, setSearch }) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "400px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        overflow: "hidden",
        backgroundColor: "white",
      }}
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        style={{
          flex: 1,
          padding: "8px 12px",
          border: "none",
          outline: "none",
          fontSize: "14px",
        }}
      />
    </div>
  );
}
