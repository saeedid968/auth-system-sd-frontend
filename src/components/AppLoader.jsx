const AppLoader = ({ message = "Preparing your workspace" }) => {
  return (
    <div className="app-loader" role="status" aria-live="polite">
      <div className="loader-mark">
        <span />
      </div>
      <p>{message}</p>
    </div>
  );
};

export default AppLoader;
