import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import PasswordInput from "../components/PasswordInput";

const Signup = () => {
  const { register, user, isCheckingAuth } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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
      await register(formData.name.trim(), formData.email.trim(), formData.password);
      toast.success(`Welcome, ${formData.name.trim()}!`, { id: "auth-toast" });
      navigate("/dashboard");
    } catch {
      toast.error("Signup failed. Try a different email.", { id: "auth-toast" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="brand-panel">
          <div className="brand-badge">MA</div>
          <div>
            <p className="eyebrow">Create your workspace</p>
            <h1>MERN Auth</h1>
            <p className="brand-copy">Start with a clean profile and protected dashboard session.</p>
          </div>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="auth-heading">
            <h2>Create account</h2>
            <p>Use a valid email and a password with at least 6 characters.</p>
          </div>

          <div className="field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              className="input"
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            minLength={6}
            required
          />

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>

          <p className="auth-footer">
            Already have an account? <Link to="/">Sign in</Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Signup;
