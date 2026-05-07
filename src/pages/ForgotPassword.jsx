import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setNotice(null);
    setLoading(true);

    try {
      const { data } = await API.post("/auth/forgot-password", { email: email.trim() });
      const message = data.message || "Reset link sent to your email.";
      setNotice({ type: "success", message });
      toast.success(message, { id: "forgot-pw" });
      setEmail("");
    } catch (error) {
      const message = error.code === "ECONNABORTED"
        ? "Email service is taking too long. Please try again."
        : error.response?.data?.message || "User not found or server error";

      setNotice({ type: "error", message });
      toast.error(message, { id: "forgot-pw" });
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

        {loading && (
          <div className="mail-progress" aria-live="polite">
            <div className="mail-progress-icon">
              <span />
            </div>
            <div>
              <strong>Sending reset link</strong>
              <p>Connecting to the mail service and preparing your secure link.</p>
            </div>
          </div>
        )}

        {notice && !loading && (
          <div className={`form-notice ${notice.type}`} role="status">
            {notice.message}
          </div>
        )}

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
            disabled={loading}
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
