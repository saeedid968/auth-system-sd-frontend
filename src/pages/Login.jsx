import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from 'react-hot-toast';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);
    setError("");
    try {
      await login(formData.email, formData.password);
      toast.success("Successfully logged in!", { id: "auth-toast" });
      navigate("/dashboard");
    } catch (err) {
      toast.error("Invalid email or password", { id: "auth-toast" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Please enter your details to sign in.</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="test@company.com"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              backgroundColor: loading ? "#818CF8" : "#4F46E5",
              cursor: loading ? "not-allowed" : "pointer"
            }}
            disabled={loading}
          >
            {loading ? "Loging in..." : "Login In"}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don't have an account? <Link to="/signup" style={styles.link}>Sign up</Link>
          </p>
          <p style={styles.footerText}>
            <Link to="/forgot-password" style={styles.link}>Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

// UI Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#F3F4F6", // Light neutral background
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
    margin: "0 0 30px 0",
    fontSize: "14px",
    color: "#6B7280",
    textAlign: "center",
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
  errorBox: {
    backgroundColor: "#FEE2E2",
    color: "#B91C1C",
    padding: "10px",
    borderRadius: "6px",
    fontSize: "14px",
    marginBottom: "20px",
    textAlign: "center",
    border: "1px solid #FECACA",
  },
  footer: {
    marginTop: "25px",
    textAlign: "center",
  },
  footerText: {
    fontSize: "14px",
    color: "#6B7280",
    margin: "5px 0",
  },
  link: {
    color: "#4F46E5",
    textDecoration: "none",
    fontWeight: "500",
  }
};

export default Login;