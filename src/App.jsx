import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  AnimatePresence,
  motion,
  MotionConfig,
} from "framer-motion";

import Background from "./components/layout/Background";
import Navbar from "./components/layout/Navbar";
import ScrollToTop from "./components/layout/ScrollToTop";

import Home from "./pages/Home";
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes
        location={location}
        key={location.pathname}
      >

        {/* HOME */}

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
                duration: 0.18,
                ease: "easeOut",
              }}
            >
              <Home />
            </motion.div>
          }
        />


        {/* GALLERY */}

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
                duration: 0.18,
                ease: "easeOut",
              }}
            >
              <Gallery />
            </motion.div>
          }
        />


        {/* CONTACT */}

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
                duration: 0.18,
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
    <MotionConfig reducedMotion="user">
    <BrowserRouter>

      <ScrollToTop />

      <div
        className="
          relative
          min-h-screen
        "
      >

        {/* ============================================
            PERSISTENT BACKGROUND
        ============================================ */}

        <div
          className="
            fixed
            inset-0
            z-0
          "
        >
          <Background />
        </div>


        {/* ============================================
            PERSISTENT NAVBAR
        ============================================ */}
        
        <Navbar />


        {/* ============================================
            PAGE CONTENT
        ============================================ */}

        <div
          className="
            relative
            z-10
          "
        >
          <Suspense fallback={<div role="status" className="min-h-screen px-6 pt-32 text-gray-300">Loading page…</div>}>
            <AnimatedRoutes />
          </Suspense>
        </div>

      </div>

    </BrowserRouter>
    </MotionConfig>
  );
}


export default App;
