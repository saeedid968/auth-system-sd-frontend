import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import PasswordInput from "../components/PasswordInput";

const Login = () => {
  const { login, user, isCheckingAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  if (!isCheckingAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    setFormData((current) => ({
      ...current,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);

    try {
      await login(formData.email.trim(), formData.password);
      toast.success("Successfully logged in!", { id: "auth-toast" });
      navigate("/dashboard");
    } catch {
      toast.error("Invalid email or password", { id: "auth-toast" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="brand-panel">
          <div className="brand-badge">sd</div>
          <div>
            <p className="eyebrow">Secure account access</p>
            <h1>MERN Auth</h1>
            <p className="brand-copy">A cleaner, faster sign-in flow for your deployed auth system.</p>
          </div>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-heading">
            <h2>Welcome back</h2>
            <p>Sign in to continue to your dashboard.</p>
          </div>

          <div className="field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              className="input"
              type="email"
              name="email"
              placeholder="name@company.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <PasswordInput
            id="password"
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="auth-links">
            <Link to="/forgot-password">Forgot password?</Link>
            <span>
              New here? <Link to="/signup">Create account</Link>
            </span>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
