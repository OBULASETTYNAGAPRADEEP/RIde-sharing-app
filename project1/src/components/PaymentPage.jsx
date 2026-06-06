import React, { useState, useEffect } from "react";
import "../css/PaymentPage.css";

// Payment method icons - you may use SVG or PNG assets
const icons = {
  Cash: "💵",
  UPI: "📲",
  Card: "💳",
  Wallet: "🔄",
};

function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [rideFare, setRideFare] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(1000);

  const serviceFee = 20;
  const tax = 0.18;

  useEffect(() => {
    setRideFare(Math.floor(Math.random() * (500 - 100 + 1) + 100));
    // Load wallet balance from localStorage
    const savedBalance = localStorage.getItem("walletBalance");
    if (savedBalance) {
      setWalletBalance(parseFloat(savedBalance));
    }
  }, []);

  const totalBill = (rideFare + serviceFee + rideFare * tax).toFixed(2);

  const handlePayment = () => {
    // Check if wallet payment and sufficient balance
    if (paymentMethod === "Wallet") {
      if (walletBalance < totalBill) {
        setFeedback(`❌ Insufficient wallet balance! Required: ₹${totalBill}, Available: ₹${walletBalance.toFixed(2)}`);
        return;
      }
    }

    setLoading(true);
    setFeedback("");
    // Simulate API payment request
    setTimeout(() => {
      // If wallet payment, deduct from balance
      if (paymentMethod === "Wallet") {
        const newBalance = walletBalance - parseFloat(totalBill);
        setWalletBalance(newBalance);
        localStorage.setItem("walletBalance", newBalance.toString());
      }
      
      setFeedback(`✅ Payment of ₹${totalBill} successful via ${paymentMethod}!`);
      setLoading(false);
      setTimeout(() => setFeedback(""), 3000);
    }, 2000);
  };

  return (
    <div className="page-container">
      <div className="content-box">
        <h2>Payment</h2>
        <p>Select your preferred payment method:</p>

        <div className="payment-options">
          {["Cash", "UPI", "Card", "Wallet"].map((method) => (
            <label
              key={method}
              className={
                `pay-label pay-${method.toLowerCase()}` +
                (paymentMethod === method ? " selected" : "")
              }
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                disabled={loading}
              />
              <span className="pay-icon" role="img" aria-label={method}>
                {icons[method]}
              </span>
              <span className="pay-text">{method === "Card" ? "Credit/Debit Card" : method}</span>
            </label>
          ))}
        </div>

        <div className="bill-details">
          <div className="bill-row">
            <span>Ride Fare:</span>
            <span>₹{rideFare}</span>
          </div>
          <div className="bill-row">
            <span>Service Fee:</span>
            <span>₹{serviceFee}</span>
          </div>
          <div className="bill-row">
            <span>Tax (18% GST):</span>
            <span>₹{(rideFare * tax).toFixed(2)}</span>
          </div>
          <div className="bill-total">
            <span>Total:</span>
            <span>₹{totalBill}</span>
          </div>
        </div>

        <button className="pay-now-btn" onClick={handlePayment} disabled={loading}>
          {loading ? (<span className="spinner"></span>) : "Pay Now"}
        </button>
        {feedback && (
          <div className="payment-feedback success" role="status">{feedback}</div>
        )}
        <div className="secure-label">
          <span>Payments are securely processed. Need help? <a href="#">Contact support</a></span>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
