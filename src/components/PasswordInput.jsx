import { useState } from "react";

const EyeIcon = ({ hidden }) => (
  <svg
    aria-hidden="true"
    className="password-icon"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    {hidden ? (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.58 10.58A2 2 0 0012 14a2 2 0 001.42-.58" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.88 4.24A9.83 9.83 0 0112 4c5.33 0 8.54 4.57 9.5 6.18a2.17 2.17 0 010 2.14 16.2 16.2 0 01-2.1 2.8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.1 6.1a16.1 16.1 0 00-3.6 4.08 2.17 2.17 0 000 2.14C3.46 13.93 6.67 18.5 12 18.5a9.68 9.68 0 004.04-.86" />
      </>
    ) : (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 10.18a2.17 2.17 0 000 2.14C3.46 13.93 6.67 18.5 12 18.5s8.54-4.57 9.5-6.18a2.17 2.17 0 000-2.14C20.54 8.57 17.33 4 12 4S3.46 8.57 2.5 10.18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
      </>
    )}
  </svg>
);

const PasswordInput = ({ label, className = "", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`field ${className}`}>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <div className="password-field">
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className="input password-input"
        />
        <button
          type="button"
          className="password-toggle"
          aria-label={showPassword ? "Hide password" : "Show password"}
          title={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((value) => !value)}
        >
          <EyeIcon hidden={!showPassword} />
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
