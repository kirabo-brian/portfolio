
import { motion } from "framer-motion";
import { codingProjects } from "../../data/codingProjects";

export default function CodingProjectsView({
  onOpenProject,
}) {
  return (
    <div>
      {/* Header */}

      <div className="mb-8 md:mb-10">
        <p
          className="
            text-blue-400
            uppercase
            tracking-[0.25em]
            text-xs
            sm:text-sm
          "
        >
          Development Portfolio
        </p>

        <h3
          className="
            text-3xl
            sm:text-4xl
            md:text-5xl
            font-black
            mt-3
          "
        >
          Coding Projects
        </h3>

        <p
          className="
            text-gray-400
            mt-4
            max-w-3xl
            text-sm
            sm:text-base
            leading-relaxed
          "
        >
          Selected software and web development projects,
          including personal work, academic projects, and
          practical systems I have worked on.
        </p>
      </div>


      {/* Project Grid */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
          md:gap-6
        "
      >
        {codingProjects.map((project, index) => (
          <motion.article
            key={project.slug}

            initial={{
              opacity: 0,
              y: 25,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.4,
              delay: index * 0.08,
              ease: "easeOut",
            }}

            whileHover={{
              y: -6,
            }}

            className="
              group
              overflow-hidden
              rounded-xl
              md:rounded-2xl
              border
              border-gray-700
              bg-black/40
              backdrop-blur-sm
              hover:border-blue-500
              transition-colors
            "
          >

            {/* Cover */}

            <div
              className="
                relative
                h-48
                sm:h-56
                md:h-64
                overflow-hidden
                bg-black
              "
            >
              {project.cover ? (
                <img
                  src={project.cover}
                  alt={project.title}
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-105
                    transition-transform
                    duration-700
                  "
                />
              ) : (
                <div
                  className="
                    w-full
                    h-full
                    flex
                    items-center
                    justify-center
                    text-gray-600
                    bg-white/5
                  "
                >
                  No project cover
                </div>
              )}

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/80
                  via-black/10
                  to-transparent
                "
              />

              {/* Status */}

              <span
                className="
                  absolute
                  top-4
                  left-4
                  px-3
                  py-1.5
                  rounded-full
                  bg-black/70
                  border
                  border-gray-700
                  text-xs
                  text-gray-300
                  backdrop-blur-sm
                "
              >
                {project.status}
              </span>
            </div>


            {/* Content */}

            <div className="p-5 md:p-7">

              <p
                className="
                  text-blue-400
                  uppercase
                  tracking-[0.18em]
                  text-[10px]
                  sm:text-xs
                "
              >
                {project.role}
              </p>


              <h4
                className="
                  text-2xl
                  md:text-3xl
                  font-black
                  mt-2
                  leading-tight
                "
              >
                {project.title}
              </h4>


              <p
                className="
                  text-gray-400
                  text-sm
                  md:text-base
                  mt-4
                  leading-relaxed
                "
              >
                {project.shortDescription}
              </p>


              {/* Technologies */}

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                  mt-5
                "
              >
                {project.technologies
                  .slice(0, 5)
                  .map((technology) => (
                    <span
                      key={technology}
                      className="
                        px-3
                        py-1
                        rounded-full
                        border
                        border-gray-700
                        bg-white/5
                        text-gray-300
                        text-xs
                      "
                    >
                      {technology}
                    </span>
                  ))}

                {project.technologies.length > 5 && (
                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      border
                      border-gray-700
                      bg-white/5
                      text-gray-500
                      text-xs
                    "
                  >
                    +{project.technologies.length - 5}
                  </span>
                )}
              </div>


              {/* Screenshot Count */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  mt-6
                  pt-5
                  border-t
                  border-gray-800
                "
              >
                <span
                  className="
                    text-xs
                    sm:text-sm
                    text-gray-500
                  "
                >
                  {project.screenshots.length}{" "}
                  {project.screenshots.length === 1
                    ? "Screenshot"
                    : "Screenshots"}
                </span>


                <motion.button
                  type="button"

                  onClick={() =>
                    onOpenProject(project)
                  }

                  whileHover={{
                    x: 4,
                  }}

                  whileTap={{
                    scale: 0.97,
                  }}

                  className="
                    text-blue-400
                    text-sm
                    md:text-base
                    font-semibold
                  "
                >
                  View Project →
                </motion.button>
              </div>

            </div>

          </motion.article>
        ))}
      </div>


      {/* Empty State */}

      {codingProjects.length === 0 && (
        <div
          className="
            border
            border-gray-700
            rounded-xl
            bg-black/30
            p-10
            text-center
          "
        >
          <h4 className="text-xl font-bold">
            No coding projects yet
          </h4>

          <p className="text-gray-400 mt-3">
            Coding projects added to the project data file
            will appear here.
          </p>
        </div>
      )}
    </div>
  );
}