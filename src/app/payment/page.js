"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [billing, setBilling] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("cartForPayment");
    if (savedCart) {
      const data = JSON.parse(savedCart);
      setCart(data.cart || data); // handle older version without billing
      setBilling(
        data.billing || {
          name: "",
          email: "",
          address: "",
          city: "",
          zip: "",
        }
      );
    }
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBilling({ ...billing, [name]: value });
  };

  const handlePayment = () => {
    if (!billing.name || !billing.email || !billing.address) {
      alert("Please fill all required fields!");
      return;
    }

    // Save cart and billing info for SuccessPage
    localStorage.setItem("cartForPayment", JSON.stringify({ cart, billing }));

    alert(`Payment successful! Total: $${total.toFixed(2)}`);
    router.push("/success");
  };

  const handleBack = () => {
    router.push("/cart");
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h1 className="fw-bold fs-3">Your cart is empty 🛒</h1>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="fw-bold fs-2 mb-4 text-center">Checkout</h1>
      <div className="row g-4">
        {/* Billing Form */}
        <div className="col-lg-6">
          <div className="card p-4 shadow-sm">
            <h3 className="fw-bold mb-3">Billing Information</h3>

            <div className="mb-3">
              <label className="form-label">Name *</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={billing.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={billing.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address *</label>
              <input
                type="text"
                name="address"
                className="form-control"
                value={billing.address}
                onChange={handleInputChange}
              />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={billing.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">ZIP</label>
                <input
                  type="text"
                  name="zip"
                  className="form-control"
                  value={billing.zip}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="d-flex gap-2 mt-3">
              <button
                onClick={handleBack}
                className="btn btn-secondary flex-fill"
              >
                Back to Cart
              </button>
              <button
                onClick={handlePayment}
                className="btn btn-success flex-fill"
              >
                Confirm & Pay ${total.toFixed(2)}
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="col-lg-6">
          <div className="card p-4 shadow-sm">
            <h3 className="fw-bold mb-3">Order Summary</h3>
            {cart.map((item) => (
              <div
                key={item.id}
                className="d-flex mb-3 align-items-center border-bottom pb-2"
              >
                {item.images?.[0] && (
                  <Image
                    src={item.images[0]}
                    alt={item.title}
                    width={60}
                    height={60}
                    style={{ objectFit: "cover", borderRadius: "6px" }}
                  />
                )}
                <div className="ms-3 flex-grow-1">
                  <h6 className="mb-0">{item.title}</h6>
                  <small>
                    {item.quantity} x ${item.price.toFixed(2)}
                  </small>
                </div>
                <div>
                  <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              </div>
            ))}
            <hr />
            <h5 className="text-end">Total: ${total.toFixed(2)}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
