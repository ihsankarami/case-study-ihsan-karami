const Layout = ({ children }) => {
  return (
    <>
      <div>
        <main style={{ marginTop: "125px" }} className="px-5">
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
