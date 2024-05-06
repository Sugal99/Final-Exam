import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
