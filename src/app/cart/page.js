"use client";
import { useCart } from "../context/cartContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Save cart to localStorage
    localStorage.setItem("cartForPayment", JSON.stringify(cart));
    // Navigate to /payment
    router.push("/payment");
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5">
        <h1 className="text-center fw-bold fs-3">Your 🛒 is empty</h1>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="fw-bold fs-2 mb-4">Your Cart</h1>

      <div className="row gy-3">
        {cart.map((item) => (
          <div key={item.id} className="col-12">
            <div className="card shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center">
                {/* Product Info */}
                <div className="d-flex align-items-center">
                  {item.images?.[0] && (
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      width={70}
                      height={70}
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                    />
                  )}
                  <div className="ms-3">
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="mb-2 text-muted">
                      Price: <strong>${item.price}</strong>
                    </p>

                    {/* Quantity Controls */}
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="mx-2 fw-bold">{item.quantity}</span>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Subtotal & Remove */}
                <div className="text-end">
                  <p className="mb-2">
                    Subtotal:{" "}
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Checkout */}
      <div className="d-flex justify-content-between align-items-center mt-4 p-3 border rounded shadow-sm">
        <h4 className="mb-0">Total: ${total.toFixed(2)}</h4>
        <div className="d-flex gap-2">
          <button onClick={clearCart} className="btn btn-dark">
            Clear Cart
          </button>
          <button onClick={handleCheckout} className="btn btn-success">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
