import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import ScrollToTop from "../components/ScrollToTop";
import ScrollToTopButton from "../components/ScrollToTopButton";
import FloatingActionButton from "../components/FloatingActionButton";
import PageTransition from "../components/PageTransition";

const MainLayout: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <AnimatePresence mode="wait">
        <PageTransition key={location.pathname}>
          <main className="min-h-screen">
            <Outlet />
          </main>
        </PageTransition>
      </AnimatePresence>
      <SiteFooter />
      <ScrollToTopButton />
      <FloatingActionButton />
    </>
  );
};

export default MainLayout;
