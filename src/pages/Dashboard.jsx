import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import API from "../services/api";
import toast from "react-hot-toast";
import PasswordInput from "../components/PasswordInput";

const Dashboard = () => {
  const { user, logout, isCheckingAuth } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  const handleLogout = async () => {
    toast.dismiss();
    setLoggingOut(true);

    try {
      await logout();
      toast.success("Logged out successfully", { id: "logout-toast" });
    } catch {
      toast.error("Logout failed. Please try again.", { id: "logout-toast" });
    } finally {
      setLoggingOut(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords((current) => ({
      ...current,
      [e.target.name]: e.target.value
    }));
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswords({ oldPassword: "", newPassword: "" });
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);

    try {
      await API.put("/auth/update-password", passwords);
      toast.success("Password updated successfully!", { id: "upd-pw" });
      closePasswordModal();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password", { id: "upd-pw" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="dashboard-page">
      <nav className="topbar">
        <div className="topbar-inner">
          <div className="brand-mini">
            <span>MA</span>
            <strong>MERN Auth</strong>
          </div>

          <button className="danger-ghost-btn" onClick={() => setShowLogoutModal(true)}>
            Logout
          </button>
        </div>
      </nav>

      <section className="dashboard-shell">
        <div className="welcome-panel">
          <div className="profile-row">
            <div className="avatar">{initials}</div>
            <div>
              <p className="eyebrow">{isCheckingAuth ? "Syncing session" : "Signed in"}</p>
              <h1>Welcome, {user?.name || "User"}</h1>
              <p>{user?.email}</p>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span>Role</span>
              <strong>{user?.role || "user"}</strong>
            </div>
            <div className="stat-card">
              <span>Session</span>
              <strong>{isCheckingAuth ? "Checking" : "Active"}</strong>
            </div>
          </div>
        </div>

        <div className="settings-panel">
          <div>
            <p className="eyebrow">Security</p>
            <h2>Account settings</h2>
            <p>Keep your password fresh and manage your session from one place.</p>
          </div>

          <button className="secondary-btn" onClick={() => setShowPasswordModal(true)}>
            Change password
          </button>
        </div>
      </section>

      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <section className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Confirm logout</h2>
            <p>Are you sure you want to end this session?</p>
            <div className="modal-actions">
              <button className="secondary-btn" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="danger-btn" onClick={handleLogout} disabled={loggingOut}>
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </section>
        </div>
      )}

      {showPasswordModal && (
        <div className="modal-overlay" onClick={closePasswordModal}>
          <section className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h2>Update password</h2>
            <p>Enter your current password and choose a new one.</p>

            <form className="modal-form" onSubmit={handleUpdatePassword}>
              <PasswordInput
                id="oldPassword"
                name="oldPassword"
                label="Current password"
                placeholder="Current password"
                value={passwords.oldPassword}
                onChange={handlePasswordChange}
                autoComplete="current-password"
                required
              />

              <PasswordInput
                id="newPassword"
                name="newPassword"
                label="New password"
                placeholder="New password"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                autoComplete="new-password"
                minLength={6}
                required
              />

              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={closePasswordModal}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn compact-btn" disabled={loading}>
                  {loading ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
