import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../services/api";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { user, logout } = useAuth();

  // States for Modals
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // State for Password Change
  const [loading, setLoading] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });

  const handleLogout = () => {
    toast.dismiss();
    logout();
    toast.success("Logged out successfully", { id: "logout-toast" });
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    toast.dismiss();
    setLoading(true);

    try {
      await API.put("/auth/update-password", passwords);
      toast.success("Password updated successfully!", { id: "upd-pw" });
      setPasswords({ oldPassword: "", newPassword: "" });
      setShowPasswordModal(false); // Close modal on success
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update password", { id: "upd-pw" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <h1 style={styles.logo}>MERN Auth</h1>
          <button onClick={() => setShowLogoutModal(true)} style={styles.logoutBtn}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.mainContent}>
        <div style={styles.welcomeCard}>
          <div style={styles.avatar}>
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h2 style={styles.title}>Welcome, {user?.name || "User"}!</h2>
          <p style={styles.subtitle}>Manage your account and security settings.</p>

          <div style={styles.divider}></div>

          <div style={styles.actionSection}>
            <p style={styles.footerText}>Privacy & Security</p>
            <button
              onClick={() => setShowPasswordModal(true)}
              style={styles.textLinkBtn}
            >
              Change Password →
            </button>
          </div>
        </div>
      </main>

      {/* 1. Logout Confirmation Modal */}
      {showLogoutModal && (
        <div style={styles.modalOverlay} onClick={() => setShowLogoutModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Confirm Logout</h3>
            <p style={styles.modalText}>Are you sure you want to log out?</p>
            <div style={styles.modalActions}>
              <button onClick={() => setShowLogoutModal(false)} style={styles.cancelBtn}>Cancel</button>
              <button onClick={handleLogout} style={styles.confirmBtn}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Change Password Modal */}
      {showPasswordModal && (
        <div style={styles.modalOverlay} onClick={() => setShowPasswordModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>Update Password</h3>
            <p style={styles.modalText}>Enter your current and new password.</p>

            <form onSubmit={handleUpdatePassword} style={styles.modalForm}>
              <input
                type="password"
                placeholder="Current Password"
                style={styles.modalInput}
                value={passwords.oldPassword}
                onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                style={styles.modalInput}
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                required
                minLength={6}
              />
              <div style={styles.modalActions}>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  style={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={styles.confirmBtnPrimary}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Consistent Theme Styles
const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F3F4F6",
    fontFamily: "'Inter', sans-serif",
  },

  navbar: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #E5E7EB",
    padding: "0 20px",
    height: "64px",
    display: "flex",
    alignItems: "center",
  },

  navContent: {
    width: "100%",
    maxWidth: "1000px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#4F46E5",
    margin: 0,
  },

  logoutBtn: {
    backgroundColor: "transparent",
    color: "#EF4444",
    border: "1px solid #FEE2E2",
    padding: "8px 16px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
  },

  mainContent: {
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
  },

  welcomeCard: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    width: "100%",
    maxWidth: "500px",
    textAlign: "center",
  },

  avatar: {
    width: "60px",
    height: "60px",
    backgroundColor: "#EEF2FF",
    color: "#4F46E5",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    fontWeight: "600",
    margin: "0 auto 20px auto",
  },

  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#111827",
    margin: "0 0 10px 0",
  },

  subtitle: {
    fontSize: "16px",
    color: "#6B7280",
    margin: 0,
  },

  divider: {
    height: "1px",
    backgroundColor: "#F3F4F6",
    margin: "30px 0",
  },

  actionSection: {
    textAlign: "left",
  },

  footerText: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "8px",
  },

  link: {
    color: "#4F46E5",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
  },

  textLinkBtn: {
    background: "none",
    border: "none",
    color: "#4F46E5",
    padding: 0,
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
  },

  /* Modal Styles */
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  modalContent: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },

  modalTitle: {
    margin: "0 0 10px 0",
    fontSize: "20px",
    fontWeight: "600",
    color: "#111827",
  },

  modalText: {
    margin: "0 0 20px 0",
    fontSize: "14px",
    color: "#6B7280",
  },

  modalForm: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  modalInput: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    fontSize: "14px",
    outline: "none",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "10px",
  },

  cancelBtn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "1px solid #D1D5DB",
    backgroundColor: "white",
    cursor: "pointer",
    fontSize: "14px",
  },

  confirmBtn: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#EF4444",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
  },

  confirmBtnPrimary: {
    padding: "10px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4F46E5",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Dashboard;