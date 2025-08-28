"use client";

export default function Pagination({ page, setPage, total, limit }) {
  const totalPages = Math.ceil(total / limit);

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className={`px-4 py-2 rounded ${
          page === 1 ? "bg-gray-300 text-gray-600" : "bg-blue-600 text-white"
        }`}
      >
        Prev
      </button>

      <span className="font-semibold">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className={`px-4 py-2 rounded ${
          page === totalPages
            ? "bg-gray-300 text-gray-600"
            : "bg-blue-600 text-white"
        }`}
      >
        Next
      </button>
    </div>
  );
}
