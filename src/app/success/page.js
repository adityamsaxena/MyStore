"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const [order, setOrder] = useState([]);
  const [billing, setBilling] = useState({});

  useEffect(() => {
    const savedOrder = localStorage.getItem("cartForPayment");
    if (savedOrder) {
      const data = JSON.parse(savedOrder);
      setOrder(data.cart);
      setBilling(data.billing);
      localStorage.removeItem("cartForPayment");
    }
  }, []);

  const total = order.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!order || order.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h1 className="fw-bold fs-2">No recent order found!</h1>
        <button
          onClick={() => router.push("/")}
          className="btn btn-primary mt-3"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold fs-1 text-success">
          🎉 Thank You for Your Order!
        </h1>
        <p className="fs-5">Your payment was successful.</p>
      </div>

      <div className="card p-4 shadow-sm mb-4">
        <h3 className="fw-bold mb-3">Billing Information</h3>
        <p>
          <strong>Name:</strong> {billing.name}
        </p>
        <p>
          <strong>Email:</strong> {billing.email}
        </p>
        <p>
          <strong>Address:</strong> {billing.address}
        </p>
        {billing.city && (
          <p>
            <strong>City:</strong> {billing.city}
          </p>
        )}
        {billing.zip && (
          <p>
            <strong>ZIP:</strong> {billing.zip}
          </p>
        )}
      </div>

      <div className="card p-4 shadow-sm">
        <h3 className="fw-bold mb-3">Order Summary</h3>
        {order.map((item) => (
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
        <h5 className="text-end">Total Paid: ${total.toFixed(2)}</h5>

        <div className="text-center mt-4">
          <button onClick={() => router.push("/")} className="btn btn-primary">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
