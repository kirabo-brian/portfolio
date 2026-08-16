import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function CodingProjectModal({
  project,
  onClose,
  onOpenScreenshot,
  screenshotOpen = false,
}) {
  if (!project) return null;

  const hasCover = Boolean(project.cover);

  const modal = (
    <AnimatePresence>
      <motion.div
        className={`
          fixed
          inset-0
          z-[100]

          bg-black/95
          backdrop-blur-lg

          text-white

          ${
            screenshotOpen
              ? "overflow-hidden"
              : "overflow-y-auto"
          }

          overflow-x-hidden
        `}
        
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.25,
        }}
        onClick={onClose}
      >
        <div
          className="
            min-h-full

            flex
            items-start
            justify-center

            px-2
            sm:px-4
            md:px-8

            pt-24
            md:pt-28

            pb-5
            md:pb-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 15,
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
            className="
              relative

              w-full
              max-w-6xl

              rounded-xl
              md:rounded-2xl

              border
              border-blue-500

              bg-[#0b0b0b]

              shadow-2xl
            "
          >

            {/* =================================================
                HERO
            ================================================= */}

            <div
              className={`
                relative
                overflow-hidden

                rounded-t-xl
                md:rounded-t-2xl

                ${
                  hasCover
                    ? "h-[280px] sm:h-[320px] md:h-[340px]"
                    : "min-h-[220px] sm:min-h-[240px] md:min-h-[260px]"
                }
              `}
            >
              {hasCover ? (
                <img
                  src={project.cover}
                  alt={project.title}
                  className="
                    absolute
                    inset-0

                    w-full
                    h-full

                    object-cover

                    brightness-[0.45]
                  "
                />
              ) : (
                <div
                  className="
                    absolute
                    inset-0

                    bg-gradient-to-br
                    from-white/[0.04]
                    to-transparent
                  "
                />
              )}

              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-[#0b0b0b]
                  via-black/35
                  to-black/10
                "
              />

              {/* Close */}

              <motion.button
                type="button"
                onClick={onClose}
                whileHover={{
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                aria-label="Close project"
                className="
                  absolute

                  top-3
                  right-3

                  md:top-5
                  md:right-5

                  z-20

                  w-11
                  h-11

                  rounded-full

                  bg-black/80

                  border
                  border-gray-700

                  flex
                  items-center
                  justify-center

                  text-xl

                  hover:border-red-500
                  hover:bg-red-500/20

                  transition-colors
                "
              >
                ✕
              </motion.button>

              {/* Hero Text */}

              <div
                className="
                  absolute

                  left-5
                  right-5
                  bottom-5

                  sm:left-7
                  sm:right-7
                  sm:bottom-6

                  md:left-8
                  md:right-8
                  md:bottom-7
                "
              >
                <p
                  className="
                    text-blue-400

                    uppercase
                    tracking-[0.25em]

                    text-[10px]
                    sm:text-xs
                  "
                >
                  {project.status}
                </p>

                <h2
                  className="
                    text-3xl
                    sm:text-4xl
                    md:text-5xl

                    font-black

                    leading-[1.05]

                    mt-2

                    max-w-5xl
                  "
                >
                  {project.title}
                </h2>

                <p
                  className="
                    text-gray-300

                    text-sm
                    md:text-base

                    mt-3

                    max-w-3xl

                    leading-relaxed
                  "
                >
                  {project.shortDescription}
                </p>
              </div>
            </div>


            {/* =================================================
                BODY
            ================================================= */}

            <div
              className="
                p-5
                sm:p-6
                md:p-8
              "
            >

              {/* Overview */}

              <div
                className="
                  grid
                  grid-cols-1

                  lg:grid-cols-[1.45fr_0.85fr]

                  gap-6
                  lg:gap-8
                "
              >
                <div>
                  <p
                    className="
                      text-blue-400

                      uppercase
                      tracking-[0.25em]

                      text-xs
                    "
                  >
                    Project Overview
                  </p>

                  <h3
                    className="
                      text-2xl
                      md:text-3xl

                      font-black

                      mt-2
                    "
                  >
                    About the Project
                  </h3>

                  <p
                    className="
                      text-gray-400

                      mt-3

                      text-sm
                      md:text-base

                      leading-relaxed
                    "
                  >
                    {project.description}
                  </p>
                </div>


                {/* Project Information */}

                <div
                  className="
                    border
                    border-gray-700

                    rounded-xl

                    bg-black/40

                    p-4
                    md:p-5

                    self-start
                  "
                >
                  <p
                    className="
                      text-blue-400

                      uppercase
                      tracking-[0.2em]

                      text-xs

                      mb-4
                    "
                  >
                    Project Information
                  </p>

                  <div className="space-y-4">
                    <div>
                      <p
                        className="
                          text-gray-500
                          text-xs
                          uppercase
                        "
                      >
                        My Role
                      </p>

                      <p className="mt-1 font-semibold">
                        {project.role}
                      </p>
                    </div>

                    <div>
                      <p
                        className="
                          text-gray-500
                          text-xs
                          uppercase
                        "
                      >
                        Status
                      </p>

                      <p className="mt-1 font-semibold">
                        {project.status}
                      </p>
                    </div>

                    <div>
                      <p
                        className="
                          text-gray-500
                          text-xs
                          uppercase
                        "
                      >
                        Screenshots
                      </p>

                      <p className="mt-1 font-semibold">
                        {project.screenshots.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>


              {/* Technologies */}

              <div className="mt-8">
                <p
                  className="
                    text-blue-400
                    uppercase
                    tracking-[0.25em]
                    text-xs
                  "
                >
                  Technology Stack
                </p>

                <h3
                  className="
                    text-2xl
                    md:text-3xl
                    font-black
                    mt-2
                  "
                >
                  Technologies Used
                </h3>

                <div
                  className="
                    flex
                    flex-wrap
                    gap-2
                    mt-4
                  "
                >
                  {project.technologies.map(
                    (technology) => (
                      <span
                        key={technology}
                        className="
                          px-3
                          py-1.5

                          rounded-full

                          border
                          border-gray-700

                          bg-white/5

                          text-gray-300

                          text-xs
                          md:text-sm
                        "
                      >
                        {technology}
                      </span>
                    )
                  )}
                </div>
              </div>


              {/* =================================================
                  PROJECT LINKS
              ================================================= */}

              {(project.githubUrl ||
                project.demoUrl) && (

                <div className="mt-8">

                  {/* Section Label */}

                  <p
                    className="
                      text-blue-400
                      uppercase
                      tracking-[0.25em]
                      text-xs
                    "
                  >
                    Project Links
                  </p>


                  {/* Section Title */}

                  <h3
                    className="
                      text-2xl
                      md:text-3xl

                      font-black

                      mt-2
                    "
                  >
                    Explore the Project
                  </h3>


                  {/* Description */}

                  <p
                    className="
                      text-gray-400

                      text-sm
                      md:text-base

                      mt-3

                      max-w-2xl

                      leading-relaxed
                    "
                  >
                    View the project source code or explore
                    the live version where available.
                  </p>


                  {/* Links */}

                  <div
                    className="
                      flex
                      flex-col
                      sm:flex-row
                      sm:flex-wrap

                      gap-3

                      mt-5
                    "
                  >

                    {/* ===========================================
                        GITHUB REPOSITORY
                    =========================================== */}

                    {project.githubUrl &&
                      project.githubUrl !==
                        "YOUR_GITHUB_REPOSITORY_URL" &&
                      project.githubUrl !==
                        "YOUR_PORTFOLIO_GITHUB_URL" &&
                      project.githubUrl !==
                        "PASTE_YOUR_FLEET_MAINTENANCE_GITHUB_URL_HERE" &&
                      project.githubUrl !==
                        "PASTE_YOUR_PORTFOLIO_GITHUB_URL_HERE" && (

                        <motion.a
                          href={
                            project.githubUrl
                          }

                          target="_blank"

                          rel="noopener noreferrer"

                          onClick={(event) =>
                            event.stopPropagation()
                          }

                          whileHover={{
                            y: -2,
                          }}

                          whileTap={{
                            scale: 0.97,
                          }}

                          className="
                            inline-flex
                            items-center
                            justify-center

                            gap-2

                            px-5
                            py-3

                            rounded-lg

                            border
                            border-gray-600

                            bg-white/5

                            text-white

                            font-semibold

                            text-sm
                            md:text-base

                            hover:border-blue-500
                            hover:bg-blue-500/10
                            hover:text-blue-300

                            transition-colors
                          "
                        >

                          {/* GitHub Icon */}

                          <svg
                            viewBox="0 0 24 24"

                            aria-hidden="true"

                            className="
                              w-5
                              h-5

                              fill-current
                            "
                          >
                            <path
                              d="
                                M12 .7
                                C5.7 .7 .7 5.8 .7 12.1
                                c0 5 3.3 9.3 7.8 10.8
                                .6.1 .8-.3 .8-.6
                                v-2.2
                                c-3.2.7-3.9-1.4-3.9-1.4
                                -.5-1.3-1.2-1.6-1.2-1.6
                                -1-.7.1-.7.1-.7
                                1.1.1 1.7 1.2 1.7 1.2
                                1 1.7 2.6 1.2 3.2.9
                                .1-.7.4-1.2.7-1.5
                                -2.6-.3-5.3-1.3-5.3-5.7
                                0-1.3.5-2.4 1.2-3.2
                                -.1-.3-.5-1.6.1-3.2
                                0 0 1-.3 3.4 1.2
                                1-.3 2-.4 3-.4
                                1 0 2 .1 3 .4
                                2.4-1.5 3.4-1.2 3.4-1.2
                                .6 1.6.2 2.9.1 3.2
                                .8.8 1.2 1.9 1.2 3.2
                                0 4.4-2.7 5.4-5.3 5.7
                                .4.4.7 1 .7 2
                                v3
                                c0 .4.2.8.8.6
                                4.5-1.5 7.8-5.8 7.8-10.8
                                C23.3 5.8 18.3.7 12 .7z
                              "
                            />
                          </svg>

                          <span>
                            View Source on GitHub
                          </span>

                          <span
                            aria-hidden="true"
                            className="
                              text-gray-400
                            "
                          >
                            ↗
                          </span>

                        </motion.a>

                      )}


                    {/* ===========================================
                        LIVE PROJECT
                    =========================================== */}

                    {project.demoUrl && (

                      <motion.a
                        href={
                          project.demoUrl
                        }

                        target="_blank"

                        rel="noopener noreferrer"

                        onClick={(event) =>
                          event.stopPropagation()
                        }

                        whileHover={{
                          y: -2,
                        }}

                        whileTap={{
                          scale: 0.97,
                        }}

                        className="
                          inline-flex
                          items-center
                          justify-center

                          gap-2

                          px-5
                          py-3

                          rounded-lg

                          bg-blue-500

                          border
                          border-blue-500

                          text-white

                          font-semibold

                          text-sm
                          md:text-base

                          hover:bg-blue-400
                          hover:border-blue-400

                          transition-colors
                        "
                      >

                        <span>
                          View Live Project
                        </span>

                        <span
                          aria-hidden="true"
                        >
                          ↗
                        </span>

                      </motion.a>

                    )}

                  </div>

                </div>

              )}


              {/* Screenshots */}

              <div className="mt-8">
                <div
                  className="
                    flex
                    flex-col
                    sm:flex-row

                    sm:items-end
                    sm:justify-between

                    gap-2
                  "
                >
                  <div>
                    <p
                      className="
                        text-blue-400
                        uppercase
                        tracking-[0.25em]
                        text-xs
                      "
                    >
                      Interface Preview
                    </p>

                    <h3
                      className="
                        text-2xl
                        md:text-3xl
                        font-black
                        mt-2
                      "
                    >
                      Project Screenshots
                    </h3>
                  </div>

                  <p className="text-gray-500 text-sm">
                    {project.screenshots.length}{" "}
                    {project.screenshots.length === 1
                      ? "Screenshot"
                      : "Screenshots"}
                  </p>
                </div>


                {project.screenshots.length > 0 ? (
                  <div
                    className="
                      grid
                      grid-cols-2
                      md:grid-cols-3

                      gap-3
                      md:gap-4

                      mt-4
                    "
                  >
                    {project.screenshots.map(
                      (screenshot, index) => (
                        <motion.button
                          type="button"

                          key={`${screenshot.src}-${index}`}

                          onClick={() =>
                            onOpenScreenshot?.(
                              project,
                              index
                            )
                          }

                          whileHover={{
                            y: -4,
                          }}

                          className="
                            group
                            relative

                            overflow-hidden

                            rounded-xl

                            border
                            border-gray-700

                            bg-black

                            aspect-video

                            hover:border-blue-500

                            transition-colors
                          "
                        >
                          <img
                            src={screenshot.src}
                            alt={screenshot.title}
                            className="
                              w-full
                              h-full

                              object-cover

                              group-hover:scale-105

                              transition-transform
                              duration-500
                            "
                          />

                          <div
                            className="
                              absolute
                              inset-0

                              bg-gradient-to-t
                              from-black/90
                              to-transparent
                            "
                          />

                          <span
                            className="
                              absolute

                              bottom-3
                              left-3
                              right-3

                              text-left

                              text-xs
                              sm:text-sm

                              font-semibold
                            "
                          >
                            {screenshot.title}
                          </span>
                        </motion.button>
                      )
                    )}
                  </div>
                ) : (
                  <div
                    className="
                      mt-4
                      p-6

                      rounded-xl

                      border
                      border-gray-700

                      text-center
                      text-gray-400
                    "
                  >
                    No screenshots have been added yet.
                  </div>
                )}
              </div>


              {/* Bottom Close */}

              <div
                className="
                  mt-8
                  pt-5

                  border-t
                  border-gray-800

                  flex
                  justify-end
                "
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    px-5
                    py-2.5

                    rounded-lg

                    border
                    border-gray-700

                    text-gray-300

                    hover:border-blue-500
                    hover:text-blue-400

                    transition-colors
                  "
                >
                  Close Project
                </button>
              </div>

            </div>

          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(
    modal,
    document.body
  );
}