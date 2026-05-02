import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);

    try {
      await API.put(`/auth/reset-password/${token}`, { password });
      toast.success("Password reset successfully!", { id: "reset-pw" });
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error("Link expired or invalid", { id: "reset-pw" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Reset Password</h2>
        <p style={styles.subtitle}>Enter your new secure password.</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

// Unified Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#F3F4F6",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    width: "100%",
    maxWidth: "400px",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "24px",
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    margin: "0 0 25px 0",
    fontSize: "14px",
    color: "#6B7280",
    textAlign: "center",
    lineHeight: "1.5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s ease", // Smooth focus transition
  },
  button: {
    backgroundColor: "#4F46E5",
    color: "white",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    fontSize: "16px",
    fontWeight: "500",
    transition: "transform 0.1s ease, background-color 0.2s", // Click effect
  },
  successBox: {
    backgroundColor: "#ECFDF5",
    color: "#047857",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "20px",
    textAlign: "center",
    border: "1px solid #A7F3D0",
  },
  errorBox: {
    backgroundColor: "#FEE2E2",
    color: "#B91C1C",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    marginBottom: "20px",
    textAlign: "center",
    border: "1px solid #FECACA",
  },
};

export default ResetPassword;