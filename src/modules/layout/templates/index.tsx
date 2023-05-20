import Footer from "@modules/layout/templates/footer";
import Nav from "@modules/layout/templates/nav";
import React from "react";

const Layout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1">{children}</main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
