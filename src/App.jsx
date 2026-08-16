import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Background from "./components/layout/Background";
import ScrollToTop from "./components/layout/ScrollToTop";

import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={location}
        key={location.pathname}
      >
        <Route
          path="/"
          element={
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            >
              <Home />
            </motion.div>
          }
        />

        <Route
          path="/gallery"
          element={
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
            >
              <Gallery />
            </motion.div>
          }
        />

        <Route
          path="/contact"
          element={
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <Contact />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>

      <ScrollToTop />

      <div className="relative min-h-screen isolate">

        {/* Persistent Background */}
        <div className="fixed inset-0 z-0">
          <Background />
        </div>

        {/* Page Content */}
        <div className="relative z-10">
          <AnimatedRoutes />
        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;