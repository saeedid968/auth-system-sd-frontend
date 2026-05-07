import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api";
import PasswordInput from "../components/PasswordInput";

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
      setTimeout(() => navigate("/"), 1200);
    } catch {
      toast.error("Link expired or invalid", { id: "reset-pw" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page compact">
      <form className="auth-card single-card" onSubmit={handleSubmit}>
        <div className="auth-heading">
          <p className="eyebrow">Set new password</p>
          <h2>Reset password</h2>
          <p>Choose a new password with at least 6 characters.</p>
        </div>

        <PasswordInput
          id="password"
          label="New password"
          placeholder="Enter a new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          minLength={6}
          required
        />

        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update password"}
        </button>
      </form>
    </main>
  );
};

export default ResetPassword;
