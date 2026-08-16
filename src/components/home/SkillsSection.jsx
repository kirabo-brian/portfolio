import { motion } from "framer-motion";

import photoshop from "../../assets/icons/photoshop.svg";
import illustrator from "../../assets/icons/illustrator.svg";
import krita from "../../assets/icons/krita.svg";
import harmony from "../../assets/icons/harmony.svg";
import davinci from "../../assets/icons/davinci.svg";
import unreal from "../../assets/icons/unreal.svg";
import python from "../../assets/icons/python.svg";
import cpp from "../../assets/icons/cpp.svg";

export default function SkillsSection() {
  const skills = [
    {
      name: "Photoshop",
      category: "Design",
      icon: photoshop,
    },
    {
      name: "Illustrator",
      category: "Design",
      icon: illustrator,
    },
    {
      name: "Krita",
      category: "Digital Art",
      icon: krita,
    },
    {
      name: "Toon Boom Harmony",
      category: "Animation",
      icon: harmony,
    },
    {
      name: "DaVinci Resolve",
      category: "Video Editing",
      icon: davinci,
    },
    {
      name: "Unreal Engine",
      category: "Game Development",
      icon: unreal,
    },
    {
      name: "Python",
      category: "Programming",
      icon: python,
    },
    {
      name: "C++",
      category: "Programming",
      icon: cpp,
    },
  ];

  return (
    <motion.section
      id="skills"
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
        amount: 0.15,
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
      {/* Section Header */}

      <div className="mb-10 md:mb-12">

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
          Tools & Skills
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
          Skills &
          <span className="text-blue-400">
            {" "}Tools
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
          A selection of the creative and technical tools
          I use while working on design, video, animation,
          programming, and game development projects.
        </p>

      </div>


      {/* Skills Grid */}

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-4
          md:gap-6
        "
      >

        {skills.map((skill, index) => (

          <motion.div
            key={skill.name}

            initial={{
              opacity: 0,
              y: 20,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            viewport={{
              once: true,
            }}

            transition={{
              delay: index * 0.05,
              duration: 0.4,
              ease: "easeOut",
            }}

            whileHover={{
              y: -6,
            }}

            className="
              group
              relative
              overflow-hidden
              rounded-xl
              md:rounded-2xl
              border
              border-gray-700
              bg-black/35
              backdrop-blur-sm

              p-4
              sm:p-5
              md:p-6

              min-h-[180px]
              sm:min-h-[200px]
              md:min-h-[300px]

              flex
              flex-col
              hover:border-blue-500
              transition-colors
            "
          >

            {/* Hover Glow */}

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


            {/* Category - Hidden on mobile */}

            <p
              className="
                relative
                z-10
                hidden
                md:block
                text-xs
                uppercase
                tracking-[0.2em]
                text-blue-400
              "
            >
              {skill.category}
            </p>


            {/* Icon */}

            <div
              className="
                relative
                z-10
                flex-1
                flex
                items-center
                justify-center
                py-4
                md:py-6
              "
            >
              <motion.img
                src={skill.icon}
                alt={skill.name}

                whileHover={{
                  scale: 1.08,
                  rotate: 2,
                }}

                transition={{
                  duration: 0.25,
                }}

                className="
                  w-16
                  h-16
                  sm:w-20
                  sm:h-20
                  md:w-28
                  md:h-28
                  lg:w-32
                  lg:h-32
                  object-contain
                  drop-shadow-xl
                "
              />
            </div>


            {/* Name */}

            <div
              className="
                relative
                z-10
                pt-4
                md:pt-5
                border-t
                border-gray-800
              "
            >
              <h3
                className="
                  text-sm
                  sm:text-base
                  md:text-lg
                  font-semibold
                  text-center
                  leading-tight
                  group-hover:text-blue-300
                  transition-colors
                "
              >
                {skill.name}
              </h3>

            </div>

          </motion.div>

        ))}

      </div>

    </motion.section>
  );
}