import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);

    try {
      await API.post("/auth/forgot-password", { email: email.trim() });
      toast.success("Reset link sent to your email!", { id: "forgot-pw" });
      setEmail("");
    } catch {
      toast.error("User not found or server error", { id: "forgot-pw" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page compact">
      <form className="auth-card single-card" onSubmit={handleSubmit}>
        <div className="auth-heading">
          <p className="eyebrow">Password recovery</p>
          <h2>Forgot password?</h2>
          <p>Enter your email and we will send a reset link.</p>
        </div>

        <div className="field">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            className="input"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send reset link"}
        </button>

        <p className="auth-footer">
          Remembered it? <Link to="/">Back to sign in</Link>
        </p>
      </form>
    </main>
  );
};

export default ForgotPassword;
