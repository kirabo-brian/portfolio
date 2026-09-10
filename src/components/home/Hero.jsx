import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import profile from "../../assets/profile.jpg";


export default function Hero() {
  return (
    <section
      className="
        relative
        min-h-[90vh]

        max-w-7xl
        mx-auto

        px-4
        sm:px-6
        md:px-10

        pt-32
        sm:pt-32

        pb-16
        md:pb-20

        grid
        lg:grid-cols-[0.9fr_1.1fr]

        gap-10
        sm:gap-12
        lg:gap-20

        items-center

        overflow-x-hidden
        lg:overflow-visible
      "
    >

      {/* =====================================================
          PROFILE IMAGE
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: -40,
          scale: 0.95,
        }}

        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}

        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}

        className="
          relative

          w-[calc(100%_-_3rem)]
          sm:w-[calc(100%_-_2rem)]
          lg:w-full
          max-w-[min(18rem,36svh)]
          sm:max-w-md

          mx-auto
          lg:mx-0
        "
      >

        {/* Blue Accent Layer */}

        <motion.div
          animate={{
            rotate: [3, 5, 3],
            y: [0, -6, 0],
          }}

          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}

          className="
            absolute

            -inset-2
            sm:-inset-4

            bg-blue-500

            rotate-3

            rounded-sm
          "
        />


        {/* Soft Glow */}

        <div
          className="
            absolute

            -inset-5
            sm:-inset-10

            bg-blue-500/20

            blur-3xl

            rounded-full

            pointer-events-none
          "
        />


        {/* Profile Image */}

        <motion.img
          src={profile}

          alt="Brian"

          whileHover={{
            y: -8,
            rotate: -1,
          }}

          transition={{
            duration: 0.3,
          }}

          className="
            relative
            z-10

            w-full

            border-4
            border-white

            shadow-2xl

            object-cover
          "
        />


        {/* Floating Label */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.8,
            duration: 0.5,
          }}

          className="
            absolute

            -bottom-4
            sm:-bottom-5

            right-2
            sm:right-4
            md:-right-6

            z-20

            px-3
            sm:px-5

            py-2
            sm:py-3

            bg-black/80

            backdrop-blur-md

            border
            border-blue-500

            text-blue-300

            text-[10px]
            sm:text-sm

            font-semibold

            tracking-wide

            whitespace-nowrap
          "
        >
          DESIGN • CODE • CREATE
        </motion.div>

      </motion.div>


      {/* =====================================================
          HERO CONTENT
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          x: 40,
        }}

        animate={{
          opacity: 1,
          x: 0,
        }}

        transition={{
          duration: 0.8,
          delay: 0.15,
          ease: "easeOut",
        }}

        className="
          min-w-0
        "
      >

        {/* Eyebrow */}

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.4,
            duration: 0.5,
          }}

          className="
            text-blue-400

            uppercase

            tracking-[0.25em]
            sm:tracking-[0.35em]

            text-xs
            sm:text-sm

            font-semibold

            mb-4
            sm:mb-5
          "
        >
          Creative Developer
        </motion.p>


        {/* Main Heading */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 30,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.5,
            duration: 0.7,
            ease: "easeOut",
          }}

          className="
            text-[3.4rem]
            xs:text-6xl
            sm:text-8xl
            md:text-[8.5rem]

            font-black

            uppercase

            leading-[0.82]

            tracking-tight

            max-w-full
          "
        >

          <span
            className="
              block
              text-white
            "
          >
            PORT
          </span>


          <span
            className="
              block

              ml-4
              sm:ml-8
              md:ml-14

              text-blue-400
            "
          >
            FOLIO
          </span>

        </motion.h1>


        {/* Name */}

        <motion.h2
          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.65,
            duration: 0.5,
          }}

          className="
            text-xl
            sm:text-2xl
            md:text-3xl

            mt-7
            sm:mt-8

            text-white

            font-semibold
          "
        >
          I'm Kirabo Brian Ssentaba
        </motion.h2>


        {/* Role Badge */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.75,
            duration: 0.5,
          }}

          className="
            inline-block

            max-w-full

            mt-5

            px-3
            sm:px-4

            py-2

            bg-blue-500/15

            border
            border-blue-500

            rounded-full

            text-blue-300

            text-xs
            sm:text-sm
            md:text-base

            leading-relaxed
          "
        >
          Creative Designer • Video Editor • Learning Game Development
        </motion.div>


        {/* Description */}

        <motion.p
          initial={{
            opacity: 0,
            y: 15,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.85,
            duration: 0.5,
          }}

          className="
            text-gray-300

            mt-6

            max-w-xl

            text-base
            sm:text-lg

            leading-relaxed
          "
        >
          I create visual identities, graphics, video content,
          and interactive experiences while continuing to develop
          my skills in software development, Unreal Engine,
          animation, Python, and C++.
        </motion.p>


        {/* Buttons */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.95,
            duration: 0.5,
          }}

          className="
            flex
            flex-col
            sm:flex-row
            sm:flex-wrap

            gap-3
            sm:gap-4

            mt-8
            sm:mt-9
          "
        >

          <Link
            to="/gallery"

            className="
              w-full
              sm:w-auto

              text-center

              px-6
              sm:px-8

              py-3
              sm:py-4

              border-2
              border-white

              font-bold

              bg-white
              text-black

              hover:bg-blue-500
              hover:border-blue-500
              hover:text-white

              hover:-translate-y-1

              transition-all
              duration-300
            "
          >
            View My Work
          </Link>


          <Link
            to="/contact"

            className="
              w-full
              sm:w-auto

              text-center

              px-6
              sm:px-8

              py-3
              sm:py-4

              border-2
              border-blue-500

              text-blue-400

              font-bold

              hover:bg-blue-500
              hover:text-white

              hover:-translate-y-1

              transition-all
              duration-300
            "
          >
            Contact Me
          </Link>

        </motion.div>


        {/* Small Status Line */}

        <motion.div
          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            delay: 1.15,
            duration: 0.6,
          }}

          className="
            flex

            items-start
            sm:items-center

            gap-3

            mt-7
            sm:mt-8

            text-xs
            sm:text-sm

            text-gray-500

            max-w-full
          "
        >

          <span
            className="
              w-2
              h-2

              mt-1
              sm:mt-0

              rounded-full

              bg-blue-400

              animate-pulse

              flex-shrink-0
            "
          />

          <span>
            Exploring design, development and interactive media
          </span>

        </motion.div>

      </motion.div>


      {/* =====================================================
          SCROLL INDICATOR
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        transition={{
          delay: 1.4,
          duration: 0.6,
        }}

        className="
          hidden
          lg:flex

          absolute

          bottom-8
          left-1/2
          -translate-x-1/2

          flex-col

          items-center

          gap-2

          text-gray-500

          text-xs

          uppercase

          tracking-[0.25em]
        "
      >

        <span>
          Scroll
        </span>


        <motion.span
          animate={{
            y: [0, 7, 0],
          }}

          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}

          className="
            text-blue-400
            text-xl
          "
        >
          ↓
        </motion.span>

      </motion.div>

    </section>
  );
}
