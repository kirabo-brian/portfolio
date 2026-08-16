import { motion } from "framer-motion";

export default function LearningSection() {
  const learning = [
    {
      title: "Unreal Engine",
      shortTitle: "Unreal Engine",
      focus:
        "Learning environment creation, Blueprints, game mechanics, lighting, and interactive systems.",
      status: "Active Focus",
      progress: 70,
    },
    {
      title: "Python",
      shortTitle: "Python",
      focus:
        "Improving programming fundamentals, problem solving, automation, and project development.",
      status: "Developing",
      progress: 60,
    },
    {
      title: "C++",
      shortTitle: "C++",
      focus:
        "Building stronger programming foundations and gradually applying them to game development.",
      status: "Learning",
      progress: 45,
    },
  ];

  return (
    <motion.section
      id="learning"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
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
      {/* Header */}

      <div className="mb-10 md:mb-12">

        <p className="
          text-blue-400
          uppercase
          tracking-[0.3em]
          text-xs
          sm:text-sm
          font-semibold
        ">
          Growth Path
        </p>

        <h2 className="
          text-4xl
          sm:text-5xl
          md:text-7xl
          font-black
          mt-4
          leading-none
        ">
          Currently
          <span className="text-blue-400">
            {" "}Learning
          </span>
        </h2>

        <p className="
          text-gray-400
          mt-5
          max-w-2xl
          text-base
          sm:text-lg
          leading-relaxed
        ">
          Technologies and creative disciplines I am
          actively developing as I continue building
          technical and creative experience.
        </p>

      </div>


      {/* Learning Grid */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-4
        md:gap-6
      ">

        {learning.map((item, index) => (

          <motion.div
            key={item.title}

            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

            transition={{
              delay: index * 0.07,
              duration: 0.4,
            }}

            whileHover={{ y: -6 }}

            className="
              group
              border
              border-gray-700
              bg-black/35
              backdrop-blur-sm
              rounded-xl
              md:rounded-2xl
              p-5
              md:p-7
              hover:border-blue-500
              transition-colors
            "
          >

            {/* Mobile top row */}

            <div className="
              flex
              items-start
              justify-between
              gap-3
            ">

              <div>

                <p className="
                  text-blue-400
                  text-xs
                  tracking-[0.2em]
                  font-semibold
                ">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="
                  text-xl
                  md:text-3xl
                  font-black
                  mt-2
                  group-hover:text-blue-300
                  transition-colors
                ">
                  {item.shortTitle}
                </h3>

              </div>


              {/* Status */}

              <span className="
                px-2.5
                py-1
                md:px-3
                md:py-1.5
                rounded-full
                border
                border-blue-500/40
                bg-blue-500/10
                text-blue-300
                text-[10px]
                md:text-xs
                whitespace-nowrap
              ">
                {item.status}
              </span>

            </div>


            {/* Description — desktop/tablet only */}

            <p className="
              hidden
              sm:block
              text-gray-400
              mt-4
              leading-relaxed
              text-sm
              md:text-base
            ">
              {item.focus}
            </p>


            {/* Progress */}

            <div className="mt-5 md:mt-8">

              <div className="
                flex
                justify-between
                text-xs
                md:text-sm
                mb-2
              ">

                <span className="text-gray-500">
                  Progress
                </span>

                <span className="text-blue-400 font-semibold">
                  {item.progress}%
                </span>

              </div>


              <div className="
                w-full
                h-1.5
                md:h-2
                bg-gray-800
                rounded-full
                overflow-hidden
              ">

                <motion.div
                  initial={{ width: 0 }}

                  whileInView={{
                    width: `${item.progress}%`,
                  }}

                  viewport={{ once: true }}

                  transition={{
                    duration: 1,
                    delay: 0.2 + index * 0.1,
                  }}

                  className="
                    h-full
                    bg-blue-500
                    rounded-full
                  "
                />

              </div>

            </div>

          </motion.div>

        ))}

      </div>


      {/* Bottom Note */}

      <div className="
        mt-8
        md:mt-10
        border-l-4
        border-blue-500
        bg-blue-500/5
        backdrop-blur-sm
        p-5
        md:p-6
      ">

        <p className="
          text-gray-300
          text-sm
          md:text-base
          leading-relaxed
        ">
          I treat learning as part of the portfolio itself.
          Some projects are finished pieces, while others
          document experimentation and skill development.
        </p>

      </div>

    </motion.section>
  );
}