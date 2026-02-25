import React from "react";
import { Outlet } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ScrollToTop from "../components/ScrollToTop";
import ScrollToTopButton from "../components/ScrollToTopButton";
import FloatingActionButton from "../components/FloatingActionButton";

const MainLayout: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollToTopButton />
      <FloatingActionButton />
    </>
  );
};

export default MainLayout;