import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import whatsapp from "../assets/icons/whatsapp.svg";
import instagram from "../assets/icons/instagram.svg";
import discord from "../assets/icons/discord.svg";
import gmail from "../assets/icons/gmail.svg";
import location from "../assets/icons/location.svg";
import timer from "../assets/icons/timer.svg";

import { motion } from "framer-motion";


export default function Contact() {
  return (
    <div className="min-h-screen text-white relative isolate">

      <div className="relative z-10">

        <Navbar />

        <section
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            md:px-10
            pt-20
            sm:pt-24
            md:pt-32
            pb-16
            md:pb-20
          "
        >

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[1.1fr_1fr]
              gap-10
              lg:gap-16
              items-start
            "
          >

            {/* =====================================================
                LEFT SIDE
            ===================================================== */}

            <div>

              <p
                className="
                  text-blue-400
                  uppercase
                  tracking-[0.3em]
                  text-xs
                  sm:text-sm
                "
              >
                CONTACT TERMINAL
              </p>


              <motion.h1
                initial={{
                  opacity: 0,
                  y: 40,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                viewport={{
                  once: true,
                }}

                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                }}

                className="
                  text-4xl
                  sm:text-5xl
                  md:text-7xl
                  lg:text-8xl
                  font-black
                  mt-4
                  leading-[0.95]
                  break-words
                "
              >
                ESTABLISH
                <br />
                CONNECTION
              </motion.h1>


              {/* =================================================
                  SYSTEM LOG
              ================================================= */}

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
                }}

                transition={{
                  delay: 0.3,
                  duration: 0.7,
                  ease: "easeOut",
                }}

                className="
                  mt-8
                  md:mt-10
                  border-l-4
                  border-blue-500
                  bg-black/40
                  backdrop-blur-sm
                  p-5
                  md:p-6
                "
              >
                <h3
                  className="
                    text-blue-400
                    text-sm
                    md:text-base
                    font-bold
                    mb-3
                    md:mb-4
                  "
                >
                  SYSTEM LOG
                </h3>

                <p
                  className="
                    text-gray-300
                    text-sm
                    sm:text-base
                    leading-relaxed
                  "
                >
                  Welcome to my contact terminal.
                  Feel free to reach out regarding
                  graphic design, branding projects,
                  video editing, Unreal Engine,
                  software development, collaborations,
                  or creative opportunities.
                </p>
              </motion.div>


              {/* =================================================
                  CONTACT INFORMATION
              ================================================= */}

              <div className="mt-8 md:mt-10">

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -40,
                  }}

                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}

                  viewport={{
                    once: true,
                  }}

                  transition={{
                    delay: 0.45,
                    duration: 0.7,
                  }}

                  className="
                    border
                    border-gray-700
                    bg-black/40
                    backdrop-blur-sm
                    rounded-xl
                    md:rounded-2xl
                    p-5
                    sm:p-6
                    md:p-8
                  "
                >
                  <h3
                    className="
                      text-blue-400
                      text-lg
                      md:text-xl
                      font-bold
                      mb-6
                      md:mb-8
                    "
                  >
                    SYSTEM INFORMATION
                  </h3>


                  <div
                    className="
                      space-y-5
                      md:space-y-6
                    "
                  >

                    {/* Email */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}

                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}

                      viewport={{
                        once: true,
                      }}

                      transition={{
                        delay: 0.6,
                        duration: 0.4,
                      }}

                      className="
                        flex
                        items-start
                        gap-3
                        md:gap-4
                      "
                    >
                      <img
                        src={gmail}
                        alt="Email"
                        className="
                          w-8
                          h-8
                          sm:w-10
                          sm:h-10
                          md:w-12
                          md:h-12
                          object-contain
                          flex-shrink-0
                        "
                      />

                      <div className="min-w-0">
                        <h4 className="font-semibold">
                          Email
                        </h4>

                        <a
                          href="mailto:ssentababrian745@gmail.com"
                          className="
                            block
                            text-gray-400
                            hover:text-blue-400
                            transition
                            break-all
                            text-sm
                            sm:text-base
                            mt-1
                          "
                        >
                          ssentababrian745@gmail.com
                        </a>
                      </div>
                    </motion.div>


                    {/* Phone */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}

                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}

                      viewport={{
                        once: true,
                      }}

                      transition={{
                        delay: 0.7,
                        duration: 0.4,
                      }}

                      className="
                        flex
                        items-start
                        gap-3
                        md:gap-4
                      "
                    >
                      <img
                        src={whatsapp}
                        alt="WhatsApp"
                        className="
                          w-8
                          h-8
                          sm:w-10
                          sm:h-10
                          md:w-12
                          md:h-12
                          object-contain
                          flex-shrink-0
                        "
                      />

                      <div>
                        <h4 className="font-semibold">
                          Phone / WhatsApp
                        </h4>

                        <a
                          href="https://wa.me/256786485002"
                          target="_blank"
                          rel="noreferrer"
                          className="
                            text-gray-400
                            hover:text-green-400
                            transition
                            text-sm
                            sm:text-base
                            mt-1
                            inline-block
                          "
                        >
                          +256 786485002
                        </a>
                      </div>
                    </motion.div>


                    {/* Location */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}

                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}

                      viewport={{
                        once: true,
                      }}

                      transition={{
                        delay: 0.75,
                        duration: 0.4,
                      }}

                      className="
                        flex
                        items-start
                        gap-3
                        md:gap-4
                      "
                    >
                      <img
                        src={location}
                        alt="Location"
                        className="
                          w-8
                          h-8
                          sm:w-10
                          sm:h-10
                          md:w-12
                          md:h-12
                          object-contain
                          flex-shrink-0
                        "
                      />

                      <div>
                        <h4 className="font-semibold">
                          Location
                        </h4>

                        <p
                          className="
                            text-gray-400
                            text-sm
                            sm:text-base
                            mt-1
                          "
                        >
                          Kampala, Uganda
                        </p>
                      </div>
                    </motion.div>


                    {/* Response */}

                    <motion.div
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}

                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}

                      viewport={{
                        once: true,
                      }}

                      transition={{
                        delay: 0.8,
                        duration: 0.4,
                      }}

                      className="
                        flex
                        items-start
                        gap-3
                        md:gap-4
                      "
                    >
                      <img
                        src={timer}
                        alt="Timer"
                        className="
                          w-8
                          h-8
                          sm:w-10
                          sm:h-10
                          md:w-12
                          md:h-12
                          object-contain
                          flex-shrink-0
                        "
                      />

                      <div>
                        <h4 className="font-semibold">
                          Response Time
                        </h4>

                        <p
                          className="
                            text-gray-400
                            text-sm
                            sm:text-base
                            mt-1
                          "
                        >
                          Usually within 24 hours
                        </p>
                      </div>
                    </motion.div>

                  </div>

                </motion.div>


                {/* =================================================
                    CONNECT WITH ME
                ================================================= */}

                <div className="mt-8 md:mt-10">

                  <h3
                    className="
                      text-blue-400
                      text-sm
                      md:text-base
                      font-bold
                      mb-5
                      md:mb-6
                    "
                  >
                    CONNECT WITH ME
                  </h3>


                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-3
                      md:gap-4
                    "
                  >

                    {/* WhatsApp */}

                    <a
                      href="https://wa.me/256786485002"
                      target="_blank"
                      rel="noreferrer"

                      className="
                        group
                        border
                        border-gray-700
                        bg-black/40
                        backdrop-blur-sm
                        rounded-xl
                        p-4
                        sm:p-5
                        min-h-[110px]
                        sm:min-h-[125px]
                        md:min-h-[145px]
                        flex
                        items-center
                        justify-center
                        gap-4
                        md:gap-6
                        hover:border-green-500
                        hover:bg-green-500/10
                        hover:-translate-y-1
                        transition-all
                      "
                    >
                      <img
                        src={whatsapp}
                        alt="WhatsApp"
                        className="
                          w-10
                          h-10
                          sm:w-12
                          sm:h-12
                          md:w-14
                          md:h-14
                          object-contain
                          flex-shrink-0
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                      />

                      <span
                        className="
                          font-semibold
                          text-sm
                          sm:text-base
                          md:text-lg
                        "
                      >
                        WhatsApp
                      </span>
                    </a>


                    {/* Instagram */}

                    <a
                      href="https://instagram.com/rkbrian7"
                      target="_blank"
                      rel="noreferrer"

                      className="
                        group
                        border
                        border-gray-700
                        bg-black/40
                        backdrop-blur-sm
                        rounded-xl
                        p-4
                        sm:p-5
                        min-h-[110px]
                        sm:min-h-[125px]
                        md:min-h-[145px]
                        flex
                        items-center
                        justify-center
                        gap-4
                        md:gap-6
                        hover:border-pink-500
                        hover:bg-pink-500/10
                        hover:-translate-y-1
                        transition-all
                      "
                    >
                      <img
                        src={instagram}
                        alt="Instagram"
                        className="
                          w-10
                          h-10
                          sm:w-12
                          sm:h-12
                          md:w-14
                          md:h-14
                          object-contain
                          flex-shrink-0
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                      />

                      <span
                        className="
                          font-semibold
                          text-sm
                          sm:text-base
                          md:text-lg
                        "
                      >
                        Instagram
                      </span>
                    </a>


                    {/* Discord */}

                    <div
                      className="
                        group
                        border
                        border-gray-700
                        bg-black/40
                        backdrop-blur-sm
                        rounded-xl
                        p-4
                        sm:p-5
                        min-h-[110px]
                        sm:min-h-[125px]
                        md:min-h-[145px]
                        flex
                        items-center
                        justify-center
                        gap-4
                        md:gap-6
                        hover:border-indigo-500
                        hover:bg-indigo-500/10
                        hover:-translate-y-1
                        transition-all
                      "
                    >
                      <img
                        src={discord}
                        alt="Discord"
                        className="
                          w-10
                          h-10
                          sm:w-12
                          sm:h-12
                          md:w-14
                          md:h-14
                          object-contain
                          flex-shrink-0
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                      />

                      <span
                        className="
                          font-semibold
                          text-sm
                          sm:text-base
                          md:text-lg
                        "
                      >
                        Discord
                      </span>
                    </div>


                    {/* Gmail */}

                    <a
                      href="mailto:ssentababrian745@gmail.com"

                      className="
                        group
                        border
                        border-gray-700
                        bg-black/40
                        backdrop-blur-sm
                        rounded-xl
                        p-4
                        sm:p-5
                        min-h-[110px]
                        sm:min-h-[125px]
                        md:min-h-[145px]
                        flex
                        items-center
                        justify-center
                        gap-4
                        md:gap-6
                        hover:border-blue-500
                        hover:bg-blue-500/10
                        hover:-translate-y-1
                        transition-all
                      "
                    >
                      <img
                        src={gmail}
                        alt="Gmail"
                        className="
                          w-10
                          h-10
                          sm:w-12
                          sm:h-12
                          md:w-14
                          md:h-14
                          object-contain
                          flex-shrink-0
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                      />

                      <span
                        className="
                          font-semibold
                          text-sm
                          sm:text-base
                          md:text-lg
                        "
                      >
                        Gmail
                      </span>
                    </a>

                  </div>

                </div>


                {/* =================================================
                    AVAILABLE FOR
                ================================================= */}

                <div className="mt-8 md:mt-10">

                  <h3
                    className="
                      text-blue-400
                      text-sm
                      md:text-base
                      font-bold
                      mb-4
                    "
                  >
                    AVAILABLE FOR
                  </h3>


                  <div
                    className="
                      flex
                      flex-wrap
                      gap-2
                      md:gap-3
                    "
                  >

                    {[
                      "Graphic Design",
                      "Branding",
                      "Illustration",
                      "Video Editing",
                      "Unreal Engine",
                      "Software Development",
                      "Creative Collaborations",
                    ].map((item) => (

                      <span
                        key={item}

                        className="
                          px-3
                          py-1.5
                          md:px-4
                          md:py-2
                          rounded-full
                          border
                          border-gray-700
                          bg-black/40
                          text-gray-300
                          text-xs
                          sm:text-sm
                          md:text-base
                          hover:border-blue-500
                          transition
                        "
                      >
                        {item}
                      </span>

                    ))}

                  </div>

                </div>

              </div>

            </div>


            {/* =====================================================
                RIGHT SIDE — CONTACT FORM
            ===================================================== */}

            <div
              className="
                border-2
                border-white
                bg-black/60
                backdrop-blur-md
                overflow-hidden
                shadow-[6px_6px_0px_#3b82f6]
                md:shadow-[8px_8px_0px_#3b82f6]
              "
            >

              {/* Terminal Header */}

              <motion.div
                initial={{
                  opacity: 0,
                }}

                whileInView={{
                  opacity: 1,
                }}

                viewport={{
                  once: true,
                }}

                transition={{
                  delay: 0.4,
                  duration: 0.8,
                }}

                className="
                  bg-white
                  text-black
                  px-4
                  sm:px-5
                  md:px-6
                  py-3
                  flex
                  justify-between
                  items-center
                "
              >
                <span
                  className="
                    font-bold
                    text-sm
                    sm:text-base
                  "
                >
                  CONTACT_INTERFACE
                </span>

                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-black" />
                  <div className="w-3 h-3 rounded-full bg-black/50" />
                  <div className="w-3 h-3 rounded-full bg-black/20" />
                </div>
              </motion.div>


              {/* Form */}

              <form
                className="
                  p-5
                  sm:p-6
                  md:p-8
                  space-y-6
                  md:space-y-8
                "
              >

                <div>
                  <label
                    className="
                      block
                      mb-2
                      text-blue-400
                      text-sm
                      md:text-base
                    "
                  >
                    NAME
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"

                    className="
                      w-full
                      bg-transparent
                      border-b-2
                      border-gray-600
                      p-3
                      outline-none
                      focus:border-blue-500
                      text-sm
                      sm:text-base
                    "
                  />
                </div>


                <div>
                  <label
                    className="
                      block
                      mb-2
                      text-blue-400
                      text-sm
                      md:text-base
                    "
                  >
                    EMAIL
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"

                    className="
                      w-full
                      bg-transparent
                      border-b-2
                      border-gray-600
                      p-3
                      outline-none
                      focus:border-blue-500
                      text-sm
                      sm:text-base
                    "
                  />
                </div>


                <div>
                  <label
                    className="
                      block
                      mb-2
                      text-blue-400
                      text-sm
                      md:text-base
                    "
                  >
                    MESSAGE
                  </label>

                  <textarea
                    rows="5"
                    placeholder="Type your message..."

                    className="
                      w-full
                      min-h-[150px]
                      md:min-h-[220px]
                      bg-black/50
                      border
                      border-gray-700
                      p-4
                      outline-none
                      focus:border-blue-500
                      text-sm
                      sm:text-base
                      resize-y
                    "
                  />
                </div>


                {/* Bottom Row */}

                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      sm:text-sm
                      text-gray-400
                    "
                  >
                    <span
                      className="
                        w-2
                        h-2
                        bg-blue-500
                        rounded-full
                        animate-pulse
                        flex-shrink-0
                      "
                    />

                    SIGNAL STRENGTH: 98%
                  </div>


                  <button
                    type="submit"

                    className="
                      w-full
                      sm:w-auto
                      border-2
                      border-white
                      px-6
                      md:px-8
                      py-3
                      font-bold
                      text-sm
                      md:text-base
                      hover:bg-blue-500
                      hover:border-blue-500
                      transition
                    "
                  >
                    SEND MESSAGE
                  </button>

                </div>

              </form>

            </div>

          </div>

        </section>

        <Footer />

      </div>

    </div>
  );
}