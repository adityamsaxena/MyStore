"use client";

export default function CategoryFilter({ categories, selected, setSelected }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "12px",
        marginBottom: "24px",
      }}
    >
      {/* All button */}
      <button
        onClick={() => setSelected("all")}
        style={{
          padding: "6px 14px",
          borderRadius: "6px",
          cursor: "pointer",
          border: "none",
          backgroundColor: selected === "all" ? "#2563eb" : "#e5e7eb",
          color: selected === "all" ? "white" : "black",
          fontWeight: 500,
        }}
      >
        All
      </button>

      {/* Category buttons */}
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setSelected(cat.id.toString())}
          style={{
            padding: "6px 14px",
            borderRadius: "6px",
            cursor: "pointer",
            border: "none",
            backgroundColor:
              selected === cat.id.toString() ? "#2563eb" : "#e5e7eb",
            color: selected === cat.id.toString() ? "white" : "black",
            fontWeight: 500,
          }}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
