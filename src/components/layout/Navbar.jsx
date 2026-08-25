

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0
        z-[200]

        w-full

        border-b
        border-gray-800

        bg-black/85
        backdrop-blur-xl
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          md:px-10
          h-20
          flex
          items-center
          justify-between
        "
      >
        {/* Brand */}

        <Link
          to="/"
          onClick={closeMenu}
          className="
            flex
            items-center
            gap-2
            min-w-0
          "
        >
          <span
            className="
              text-blue-400
              text-2xl
              sm:text-3xl
              flex-shrink-0
            "
          >
            ✦
          </span>

          <h1
            className="
              text-lg
              sm:text-xl
              md:text-2xl
              font-white
              font-semibold
              text-white
              truncate
            "
          >
            rkbrian2k19
          </h1>
        </Link>


        {/* Desktop Navigation */}

        <nav
          className="
            hidden
            md:flex
            items-center
            gap-8
          "
        >
          {links.map((link) => {
            const isActive =
              location.pathname === link.path;

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`
                  relative
                  py-2
                  transition-colors

                  ${
                    isActive
                      ? "text-blue-400"
                      : "text-white hover:text-blue-400"
                  }
                `}
              >
                {link.name}

                {isActive && (
                  <motion.span
                    layoutId="activeNavLink"
                    className="
                      absolute
                      left-0
                      right-0
                      -bottom-1
                      h-[2px]
                      bg-blue-400
                      rounded-full
                    "
                  />
                )}
              </Link>
            );
          })}
        </nav>


        {/* Mobile Menu Button */}

        <button
          type="button"
          onClick={() =>
            setMenuOpen((current) => !current)
          }
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="
            md:hidden
            w-11
            h-11
            rounded-lg
            border
            border-gray-700
            flex
            items-center
            justify-center
            text-white
            hover:border-blue-500
            hover:text-blue-400
            transition
          "
        >
          <div
            className="
              w-5
              flex
              flex-col
              gap-[5px]
            "
          >
            <span
              className={`
                block
                h-[2px]
                bg-current
                transition-all
                duration-300

                ${
                  menuOpen
                    ? "translate-y-[7px] rotate-45"
                    : ""
                }
              `}
            />

            <span
              className={`
                block
                h-[2px]
                bg-current
                transition-all
                duration-300

                ${
                  menuOpen
                    ? "opacity-0"
                    : ""
                }
              `}
            />

            <span
              className={`
                block
                h-[2px]
                bg-current
                transition-all
                duration-300

                ${
                  menuOpen
                    ? "-translate-y-[7px] -rotate-45"
                    : ""
                }
              `}
            />
          </div>
        </button>
      </div>


      {/* Mobile Navigation */}

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="
              md:hidden
              overflow-hidden
              border-t
              border-gray-800
              bg-black/95
              backdrop-blur-xl
            "
          >
            <div
              className="
                px-4
                sm:px-6
                py-4
                flex
                flex-col
                gap-2
              "
            >
              {links.map((link) => {
                const isActive =
                  location.pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={closeMenu}
                    className={`
                      px-4
                      py-3
                      rounded-lg
                      font-medium
                      transition-all

                      ${
                        isActive
                          ? "bg-blue-500/15 text-blue-400 border border-blue-500/40"
                          : "text-gray-200 hover:bg-white/5 hover:text-blue-400"
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}