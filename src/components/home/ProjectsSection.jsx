import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Logo Collection",

      category: "Brand Identity",

      description:
        "Custom logo concepts, brand marks, and visual identities created for different projects and clients.",

      tags: [
        "Logo Design",
        "Branding",
        "Visual Identity",
      ],

      galleryUrl:
        "/gallery?collection=logos",
    },

    {
      title: "Poster Design",

      category: "Graphic Design",

      description:
        "Event posters, promotional graphics, social media artwork, and marketing materials created for different visual campaigns.",

      tags: [
        "Posters",
        "Social Media",
        "Marketing",
      ],

      galleryUrl:
        "/gallery?collection=posters",
    },

    {
      title: "Branding",

      category: "Visual Systems",

      description:
        "Brand identity systems combining logos, color palettes, typography, mockups, and supporting visual materials.",

      tags: [
        "Identity",
        "Typography",
        "Mockups",
      ],

      galleryUrl:
        "/gallery?collection=branding",
    },

    {
      title: "YouTube Gaming Channel",

      category: "Content Creation",

      description:
        "Gameplay videos, edited gaming content, thumbnails, livestream highlights, and visual branding created for my gaming channel.",

      tags: [
        "Video Editing",
        "Gaming",
        "Thumbnails",
      ],

      galleryUrl:
        "/gallery?collection=youtube-gaming",

      externalUrl:
        "https://www.youtube.com/@rkbrian2k19",

      externalLabel:
        "YouTube Channel",
    },

    {
      title: "Portfolio Website",

      category: "Web Development",

      description:
        "A responsive personal portfolio built with React, Tailwind CSS, Framer Motion, and React Router to showcase my creative and technical work.",

      tags: [
        "React",
        "Tailwind CSS",
        "Frontend",
      ],

      /*
        This opens:

        Gallery
        → Coding Projects
        → Personal Portfolio Website
      */

      galleryUrl:
        "/gallery?collection=coding-projects&project=portfolio-website",
    },
  ];


  return (
    <motion.section
      id="projects"

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
        amount: 0.1,
      }}

      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}

      className="
        max-w-7xl
        mx-auto

        px-4
        sm:px-6
        md:px-10

        py-20
        md:py-24
      "
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col

          lg:flex-row
          lg:items-end
          lg:justify-between

          gap-6
          md:gap-8

          mb-10
          md:mb-14
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
            Selected Work
          </p>


          <h2
            className="
              text-4xl
              sm:text-5xl
              md:text-7xl

              font-black

              mt-4

              leading-none
            "
          >
            Previous

            <span className="text-blue-400">
              {" "}Work
            </span>
          </h2>


          <p
            className="
              text-gray-400

              mt-5

              max-w-2xl

              text-base
              sm:text-lg

              leading-relaxed
            "
          >
            A selection of creative and technical
            work spanning graphic design, branding,
            content creation, and web development.
          </p>

        </div>


        <Link
          to="/gallery"

          className="
            group

            inline-flex
            items-center

            gap-3

            text-blue-400

            font-semibold

            text-sm
            sm:text-base

            whitespace-nowrap
          "
        >
          Explore Full Gallery

          <span
            className="
              group-hover:translate-x-2

              transition-transform
              duration-300
            "
          >
            →
          </span>
        </Link>

      </div>


      {/* =====================================================
          PROJECT GRID
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-2

          gap-4
          md:gap-6
        "
      >

        {projects.map(
          (project, index) => (

            <motion.article
              key={project.title}

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
                delay:
                  index * 0.07,

                duration: 0.45,

                ease: "easeOut",
              }}

              whileHover={{
                y: -6,
              }}

              className="
                group
                relative

                overflow-hidden

                border
                border-gray-700

                bg-black/35

                backdrop-blur-sm

                rounded-xl
                md:rounded-2xl

                p-4
                sm:p-5
                md:p-8

                min-h-[220px]
                sm:min-h-[240px]
                md:min-h-[360px]

                flex
                flex-col

                hover:border-blue-500

                transition-colors
              "
            >

              {/* Hover Background */}

              <div
                className="
                  absolute
                  inset-0

                  bg-blue-500/0

                  group-hover:bg-blue-500/5

                  transition-colors
                  duration-300

                  pointer-events-none
                "
              />


              {/* =================================================
                  TOP
              ================================================= */}

              <div
                className="
                  relative
                  z-10

                  flex
                  justify-between
                  items-start

                  gap-3
                "
              >

                <div>

                  <p
                    className="
                      text-blue-400

                      uppercase

                      tracking-[0.18em]

                      text-[10px]
                      sm:text-xs
                    "
                  >
                    {project.category}
                  </p>


                  <h3
                    className="
                      text-lg
                      sm:text-xl
                      md:text-3xl

                      font-black

                      mt-2
                      md:mt-3

                      leading-tight

                      group-hover:text-blue-300

                      transition-colors
                    "
                  >
                    {project.title}
                  </h3>

                </div>


                <span
                  className="
                    hidden
                    md:block

                    text-4xl

                    font-black

                    text-gray-800

                    group-hover:text-blue-500/30

                    transition-colors
                  "
                >
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

              </div>


              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <p
                className="
                  relative
                  z-10

                  hidden
                  md:block

                  text-gray-400

                  mt-5

                  leading-relaxed

                  max-w-xl
                "
              >
                {project.description}
              </p>


              {/* =================================================
                  TAGS
              ================================================= */}

              <div
                className="
                  relative
                  z-10

                  flex
                  flex-wrap

                  gap-2

                  mt-5
                  md:mt-6
                "
              >

                {project.tags
                  .slice(0, 2)
                  .map((tag) => (

                    <span
                      key={tag}

                      className="
                        px-2.5
                        py-1

                        md:px-3
                        md:py-1.5

                        rounded-full

                        border
                        border-gray-700

                        bg-white/5

                        text-gray-300

                        text-[10px]
                        sm:text-xs
                      "
                    >
                      {tag}
                    </span>

                  ))}


                {project.tags[2] && (

                  <span
                    className="
                      hidden
                      md:inline-flex

                      px-3
                      py-1.5

                      rounded-full

                      border
                      border-gray-700

                      bg-white/5

                      text-gray-300

                      text-xs
                    "
                  >
                    {project.tags[2]}
                  </span>

                )}

              </div>


              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div
                className="
                  relative
                  z-10

                  mt-auto

                  pt-4
                  md:pt-5

                  border-t
                  border-gray-800

                  flex
                  flex-col

                  sm:flex-row

                  sm:items-center
                  sm:justify-between

                  gap-3
                "
              >

                <Link
                  to={project.galleryUrl}

                  className="
                    inline-flex
                    items-center

                    text-blue-400

                    text-xs
                    sm:text-sm
                    md:text-base

                    font-semibold

                    hover:text-blue-300

                    transition-colors
                  "
                >
                  {project.title ===
                  "Portfolio Website"
                    ? "View Project"
                    : "View Collection"}

                  <span
                    className="
                      ml-1

                      group-hover:translate-x-1

                      transition-transform
                    "
                  >
                    →
                  </span>
                </Link>


                {/* YouTube Channel Button */}

                {project.externalUrl && (

                  <a
                    href={
                      project.externalUrl
                    }

                    target="_blank"

                    rel="noopener noreferrer"

                    className="
                      inline-flex
                      items-center

                      gap-1.5

                      text-red-400

                      text-[10px]
                      sm:text-xs
                      md:text-sm

                      font-semibold

                      hover:text-red-300

                      transition-colors
                    "
                  >
                    ▶ {project.externalLabel}

                    <span>
                      ↗
                    </span>
                  </a>

                )}

              </div>

            </motion.article>

          )
        )}

      </div>


      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: 25,
        }}

        whileInView={{
          opacity: 1,
          y: 0,
        }}

        viewport={{
          once: true,
        }}

        transition={{
          duration: 0.5,
          delay: 0.25,
        }}

        className="
          mt-10
          md:mt-12

          border
          border-blue-500/50

          bg-blue-500/5

          backdrop-blur-sm

          rounded-xl
          md:rounded-2xl

          p-6
          md:p-10

          flex
          flex-col

          md:flex-row
          md:items-center
          md:justify-between

          gap-6
        "
      >

        <div>

          <p
            className="
              text-blue-400

              uppercase

              tracking-[0.25em]

              text-xs

              font-semibold
            "
          >
            Creative Archive
          </p>


          <h3
            className="
              text-xl
              sm:text-2xl
              md:text-3xl

              font-bold

              mt-3
            "
          >
            Want to see more?
          </h3>


          <p
            className="
              text-gray-400

              mt-3

              max-w-xl

              text-sm
              sm:text-base
            "
          >
            Explore the full gallery for design
            work, artwork, video projects, game
            development, and other creative
            experiments.
          </p>

        </div>


        <Link
          to="/gallery"

          className="
            inline-flex
            items-center
            justify-center

            px-6
            py-3

            border
            border-blue-500

            text-blue-300

            font-semibold

            hover:bg-blue-500
            hover:text-white
            hover:-translate-y-1

            transition-all

            whitespace-nowrap
          "
        >
          Open Gallery →
        </Link>

      </motion.div>

    </motion.section>
  );
}