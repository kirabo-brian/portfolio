import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  const isContactPage =
    location.pathname === "/contact";

  return (
    <footer
      className="
        border-t
        border-gray-800
        bg-black/30
        backdrop-blur-sm
      "
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          md:px-10
          py-12
          md:py-16
        "
      >

        {/* =====================================================
            LARGE CONTACT CTA

            Hide this on the Contact page because the visitor
            is already on the dedicated contact section.
        ===================================================== */}

        {!isContactPage && (

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-end
              lg:justify-between
              gap-8
              md:gap-10
              pb-10
              md:pb-12
              border-b
              border-gray-800
            "
          >

            <div>

              <p
                className="
                  text-blue-400
                  uppercase
                  tracking-[0.3em]
                  text-xs
                  sm:text-sm
                  font-semibold
                "
              >
                Let&apos;s Connect
              </p>


              <h2
                className="
                  text-3xl
                  sm:text-4xl
                  md:text-6xl
                  font-black
                  mt-4
                  leading-tight
                "
              >
                Have a project,
                <br />

                <span className="text-blue-400">
                  idea, or collaboration?
                </span>
              </h2>


              <p
                className="
                  text-gray-400
                  mt-5
                  max-w-xl
                  text-sm
                  sm:text-base
                  leading-relaxed
                "
              >
                Feel free to reach out about creative work,
                design, video editing, software projects,
                game development, or collaborations.
              </p>

            </div>


            <Link
              to="/contact"
              className="
                inline-flex
                items-center
                justify-center
                px-7
                md:px-8
                py-3
                md:py-4
                border-2
                border-blue-500
                text-blue-300
                font-bold
                hover:bg-blue-500
                hover:text-white
                hover:-translate-y-1
                transition-all
                whitespace-nowrap
              "
            >
              Start a Conversation →
            </Link>

          </div>

        )}


        {/* =====================================================
            MAIN FOOTER CONTENT
        ===================================================== */}

        <div
          className={`
            grid
            gap-10
            md:gap-12
            py-10
            md:py-12

            ${
              isContactPage
                ? "md:grid-cols-2"
                : "md:grid-cols-3"
            }
          `}
        >

          {/* =================================================
              BRAND
          ================================================= */}

          <div>

            <h3
              className="
                text-2xl
                md:text-3xl
                font-black
              "
            >
              PORT

              <span className="text-blue-400">
                FOLIO
              </span>
            </h3>


            <p
              className="
                text-gray-400
                mt-4
                max-w-sm
                text-sm
                sm:text-base
                leading-relaxed
              "
            >
              Creative design, development, video,
              game development, and ongoing exploration
              of digital experiences.
            </p>

          </div>


          {/* =================================================
              NAVIGATION
          ================================================= */}

          <div>

            <p
              className="
                text-blue-400
                uppercase
                tracking-[0.25em]
                text-xs
                font-semibold
                mb-5
              "
            >
              Navigation
            </p>


            <div className="flex flex-col gap-3">

              <Link
                to="/"
                className="
                  text-gray-300
                  hover:text-blue-400
                  transition-colors
                  w-fit
                "
              >
                Home
              </Link>


              <Link
                to="/gallery"
                className="
                  text-gray-300
                  hover:text-blue-400
                  transition-colors
                  w-fit
                "
              >
                Gallery
              </Link>


              <Link
                to="/contact"
                className="
                  text-gray-300
                  hover:text-blue-400
                  transition-colors
                  w-fit
                "
              >
                Contact
              </Link>

            </div>

          </div>


          {/* =================================================
              CONTACT LINKS

              Hide these on the Contact page because they are
              already displayed in the main Contact content.
          ================================================= */}

          {!isContactPage && (

            <div>

              <p
                className="
                  text-blue-400
                  uppercase
                  tracking-[0.25em]
                  text-xs
                  font-semibold
                  mb-5
                "
              >
                Contact
              </p>


              <div className="flex flex-col gap-3">

                <a
                  href="mailto:ssentababrian745@gmail.com"
                  className="
                    text-gray-300
                    hover:text-blue-400
                    transition-colors
                    break-all
                    w-fit
                  "
                >
                  ssentababrian745@gmail.com
                </a>


                <a
                  href="https://wa.me/256786485002"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    text-gray-300
                    hover:text-green-400
                    transition-colors
                    w-fit
                  "
                >
                  WhatsApp
                </a>


                <a
                  href="https://instagram.com/rkbrian7"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    text-gray-300
                    hover:text-pink-400
                    transition-colors
                    w-fit
                  "
                >
                  Instagram (@rkbrian7)
                </a>


                <span
                  className="
                    text-gray-300
                    w-fit
                  "
                >
                  Discord (@rkbrian9100)
                </span>

              </div>

            </div>

          )}

        </div>


        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-3
            md:gap-4
            pt-6
            border-t
            border-gray-800
          "
        >

          <p className="text-gray-500 text-xs sm:text-sm">
            © 2026 Kirabo Brian Ssentaba. All rights reserved.
          </p>


          <p className="text-gray-600 text-xs sm:text-sm">
            Designed & built with React + Tailwind CSS
          </p>

        </div>

      </motion.div>
    </footer>
  );
}