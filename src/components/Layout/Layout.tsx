const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="wrap">
      <h1>2048</h1>
      {children}
    </div>
  );
};

export default Layout;
