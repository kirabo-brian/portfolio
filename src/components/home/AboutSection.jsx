import { motion } from "framer-motion";

export default function AboutSection() {

  const skills = [
    "Graphic Design",
    "Branding",
    "Video Editing",
    "Illustration",
    "Unreal Engine",
    "Software Development",
  ];

  const stats = [
    {
      value: "4+",
      label: "Years Creating",
    },
    {
      value: "20+",
      label: "Creative Projects",
    },
    {
      value: "6",
      label: "Creative Fields",
    },
    {
      value: "Now",
      label: "Learning UE5 & C++",
    },
  ];

  return (
    <motion.section
      id="about"
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
        px-6
        md:px-10
        py-24
      "
    >

      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="max-w-4xl">

        <p
          className="
            text-blue-400
            uppercase
            tracking-[0.35em]
            text-sm
            font-semibold
          "
        >
          About Me
        </p>

        <h2
          className="
            text-5xl
            md:text-7xl
            font-black
            mt-4
            leading-[0.95]
          "
        >
          Designing.
          <br />

          <span className="text-blue-400">
            Developing.
          </span>

          <br />

          Creating.
        </h2>

        <p
          className="
            text-gray-300
            max-w-3xl
            mt-8
            text-lg
            leading-relaxed
          "
        >
          I enjoy combining creativity and technology
          to build meaningful digital experiences.
          My work spans graphic design, branding,
          video production, software development,
          and game development while I continue
          expanding my skills in Unreal Engine,
          Python, C++, and animation.
        </p>

        <p
          className="
            text-gray-400
            max-w-3xl
            mt-4
            leading-relaxed
          "
        >
          This portfolio brings together both my
          completed work and the projects I create
          while learning, experimenting, and developing
          new creative and technical skills.
        </p>

      </div>


      {/* =====================================================
          WHAT I DO
      ===================================================== */}

      <div className="mt-16">

        <div className="flex items-center gap-4 mb-8">

          <div className="w-10 h-[2px] bg-blue-500" />

          <h3
            className="
              text-2xl
              md:text-3xl
              font-bold
            "
          >
            What I Do
          </h3>

        </div>


        <div
          className="
            grid
            sm:grid-cols-2
            lg:grid-cols-3
            gap-4
          "
        >

          {skills.map((skill, index) => (

            <motion.div
              key={skill}

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
                delay: index * 0.06,
                duration: 0.4,
              }}

              whileHover={{
                y: -5,
              }}

              className="
                group
                border
                border-gray-700
                bg-black/35
                backdrop-blur-sm
                rounded-xl
                p-5
                flex
                items-center
                gap-4
                hover:border-blue-500
                transition-colors
              "
            >

              <span
                className="
                  w-9
                  h-9
                  rounded-full
                  border
                  border-blue-500
                  bg-blue-500/10
                  text-blue-400
                  flex
                  items-center
                  justify-center
                  text-sm
                  font-bold
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span
                className="
                  font-semibold
                  text-gray-200
                  group-hover:text-white
                  transition-colors
                "
              >
                {skill}
              </span>

            </motion.div>

          ))}

        </div>

      </div>


      {/* =====================================================
          EDUCATION
      ===================================================== */}

      <div className="mt-20">

        <div className="flex items-center gap-4 mb-8">

          <div className="w-10 h-[2px] bg-blue-500" />

          <h3
            className="
              text-2xl
              md:text-3xl
              font-bold
            "
          >
            Education
          </h3>

        </div>


        <div
          className="
            grid
            md:grid-cols-2
            gap-6
          "
        >

          {/* University */}

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="
              border
              border-gray-700
              bg-black/35
              backdrop-blur-sm
              rounded-xl
              p-7
              hover:border-blue-500
              transition-colors
            "
          >

            <p
              className="
                text-blue-400
                uppercase
                tracking-[0.2em]
                text-xs
              "
            >
              Current
            </p>

            <h4
              className="
                text-xl
                font-bold
                mt-3
              "
            >
              Bachelor of Science in Computer Science
            </h4>

            <p className="text-gray-400 mt-3">
              Makerere University
            </p>

          </motion.div>


          {/* Advanced Level */}

          <motion.div
            whileHover={{
              y: -5,
            }}
            className="
              border
              border-gray-700
              bg-black/35
              backdrop-blur-sm
              rounded-xl
              p-7
              hover:border-blue-500
              transition-colors
            "
          >

            <p
              className="
                text-blue-400
                uppercase
                tracking-[0.2em]
                text-xs
              "
            >
              Previous
            </p>

            <h4
              className="
                text-xl
                font-bold
                mt-3
              "
            >
              Advanced Level Education
            </h4>

            <p className="text-gray-400 mt-3">
              St. Mary's College Kisubi
            </p>

          </motion.div>

        </div>

      </div>


      {/* =====================================================
          STATS
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-4
          mt-20
        "
      >

        {stats.map((stat, index) => (

          <motion.div
            key={stat.label}

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
              delay: index * 0.08,
              duration: 0.4,
            }}

            className="
              border-t
              border-gray-700
              pt-6
            "
          >

            <p
              className="
                text-3xl
                md:text-4xl
                font-black
                text-blue-400
              "
            >
              {stat.value}
            </p>

            <p
              className="
                text-gray-400
                mt-2
                text-sm
              "
            >
              {stat.label}
            </p>

          </motion.div>

        ))}

      </div>

    </motion.section>
  );
}