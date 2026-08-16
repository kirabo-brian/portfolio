import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function GalleryLightbox({
  images,
  selectedIndex,
  setSelectedIndex,
  onOpenCollection,
}) {
  const [direction, setDirection] = useState(0);

  const isOpen =
    selectedIndex !== null;

  const currentProject =
    isOpen && images?.length > 0
      ? images[selectedIndex]
      : null;


  // =========================================================
  // PREVIOUS PROJECT
  // =========================================================

  const previousProject = () => {
    if (!images?.length) return;

    setDirection(-1);

    setSelectedIndex(
      (selectedIndex - 1 + images.length) %
        images.length
    );
  };


  // =========================================================
  // NEXT PROJECT
  // =========================================================

  const nextProject = () => {
    if (!images?.length) return;

    setDirection(1);

    setSelectedIndex(
      (selectedIndex + 1) %
        images.length
    );
  };


  // =========================================================
  // SWIPE
  // =========================================================

  const handleSwipe = (
    event,
    info
  ) => {
    if (images.length <= 1) return;

    const distance =
      info.offset.x;

    const velocity =
      info.velocity.x;

    const distanceThreshold = 70;
    const velocityThreshold = 500;


    // Swipe LEFT → next

    if (
      distance < -distanceThreshold ||
      velocity < -velocityThreshold
    ) {
      nextProject();
      return;
    }


    // Swipe RIGHT → previous

    if (
      distance > distanceThreshold ||
      velocity > velocityThreshold
    ) {
      previousProject();
    }
  };


  // =========================================================
  // KEYBOARD + SCROLL LOCK
  // =========================================================

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {

      if (event.key === "Escape") {
        setSelectedIndex(null);
      }


      if (
        event.key === "ArrowLeft" &&
        images.length > 1
      ) {
        setDirection(-1);

        setSelectedIndex(
          (currentIndex) =>
            (
              currentIndex -
              1 +
              images.length
            ) %
            images.length
        );
      }


      if (
        event.key === "ArrowRight" &&
        images.length > 1
      ) {
        setDirection(1);

        setSelectedIndex(
          (currentIndex) =>
            (
              currentIndex +
              1
            ) %
            images.length
        );
      }
    };


    document.body.style.overflow =
      "hidden";


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {
      document.body.style.overflow =
        "";

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  }, [
    isOpen,
    images,
    setSelectedIndex,
  ]);


  // =========================================================
  // SLIDE ANIMATION
  // =========================================================

  const projectVariants = {

    enter: (direction) => ({
      opacity: 0,

      x:
        direction > 0
          ? 100
          : direction < 0
            ? -100
            : 0,

      scale: 0.98,
    }),


    center: {
      opacity: 1,
      x: 0,
      scale: 1,
    },


    exit: (direction) => ({
      opacity: 0,

      x:
        direction > 0
          ? -100
          : direction < 0
            ? 100
            : 0,

      scale: 0.98,
    }),

  };


  return (
    <AnimatePresence>

      {isOpen && currentProject && (

        <motion.div
          className="
            fixed
            inset-0
            z-[60]

            bg-black/95
            backdrop-blur-md

            flex
            items-center
            justify-center

            px-4
            sm:px-5
            md:px-8

            pt-24
            sm:pt-24
            md:pt-28

            pb-6
            md:pb-8

            overflow-y-auto
          "

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

          onClick={() =>
            setSelectedIndex(null)
          }
        >

          <motion.div
            initial={{
              scale: 0.94,
              opacity: 0,
              y: 25,
            }}

            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}

            exit={{
              scale: 0.94,
              opacity: 0,
              y: 20,
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
              max-w-6xl
              w-full
              my-auto
            "
          >

            {/* =================================================
                CLOSE BUTTON
            ================================================= */}

            <button
              onClick={() =>
                setSelectedIndex(null)
              }

              aria-label="Close featured project"

              className="
                absolute

                top-3
                right-3

                md:top-4
                md:right-4

                z-30

                w-11
                h-11

                md:w-12
                md:h-12

                rounded-full

                bg-black/75

                border
                border-gray-700

                flex
                items-center
                justify-center

                text-2xl
                md:text-3xl

                hover:text-blue-400
                hover:border-blue-500
                hover:bg-blue-500/10

                transition-all
              "
            >
              ×
            </button>


            {/* =================================================
                PREVIOUS BUTTON
            ================================================= */}

            {images.length > 1 && (

              <button
                onClick={previousProject}

                aria-label="Previous project"

                className="
                  absolute

                  left-2
                  md:left-5

                  top-[38%]
                  md:top-[40%]

                  -translate-y-1/2

                  z-30

                  w-11
                  h-11

                  md:w-12
                  md:h-12

                  rounded-full

                  bg-black/75

                  border
                  border-gray-700

                  flex
                  items-center
                  justify-center

                  text-3xl
                  md:text-4xl

                  hover:text-blue-400
                  hover:border-blue-500
                  hover:bg-blue-500/10

                  transition-all
                "
              >
                ‹
              </button>

            )}


            {/* =================================================
                NEXT BUTTON
            ================================================= */}

            {images.length > 1 && (

              <button
                onClick={nextProject}

                aria-label="Next project"

                className="
                  absolute

                  right-2
                  md:right-5

                  top-[38%]
                  md:top-[40%]

                  -translate-y-1/2

                  z-30

                  w-11
                  h-11

                  md:w-12
                  md:h-12

                  rounded-full

                  bg-black/75

                  border
                  border-gray-700

                  flex
                  items-center
                  justify-center

                  text-3xl
                  md:text-4xl

                  hover:text-blue-400
                  hover:border-blue-500
                  hover:bg-blue-500/10

                  transition-all
                "
              >
                ›
              </button>

            )}


            {/* =================================================
                SWIPEABLE PROJECT IMAGE
            ================================================= */}

            <div
              className="
                relative
                overflow-hidden

                rounded-xl
                md:rounded-2xl

                border
                border-gray-800

                bg-black

                flex
                items-center
                justify-center

                touch-pan-y
              "
            >

              <AnimatePresence
                mode="wait"
                custom={direction}
              >

                <motion.img
                  key={selectedIndex}

                  custom={direction}

                  variants={
                    projectVariants
                  }

                  initial="enter"
                  animate="center"
                  exit="exit"

                  transition={{
                    duration: 0.28,
                    ease: "easeOut",
                  }}


                  // Swipe support

                  drag={
                    images.length > 1
                      ? "x"
                      : false
                  }

                  dragConstraints={{
                    left: 0,
                    right: 0,
                  }}

                  dragElastic={0.2}

                  onDragEnd={
                    handleSwipe
                  }


                  src={
                    currentProject.image
                  }

                  alt={
                    currentProject.title
                  }

                  className="
                    w-full

                    max-h-[55vh]
                    sm:max-h-[60vh]
                    md:max-h-[62vh]

                    object-contain

                    cursor-grab
                    active:cursor-grabbing

                    select-none
                  "
                />

              </AnimatePresence>


              <div
                className="
                  absolute
                  inset-0

                  bg-gradient-to-t
                  from-black/35
                  via-transparent
                  to-transparent

                  pointer-events-none
                "
              />

            </div>


            {/* =================================================
                MOBILE SWIPE HINT
            ================================================= */}

            {images.length > 1 && (

              <div
                className="
                  md:hidden

                  flex
                  items-center
                  justify-center

                  gap-3

                  mt-4

                  text-xs
                  text-gray-500
                "
              >

                <span>←</span>

                <span>
                  Swipe to navigate
                </span>

                <span>→</span>

              </div>

            )}


            {/* =================================================
                DETAILS
            ================================================= */}

            <motion.div
              key={`details-${selectedIndex}`}

              initial={{
                opacity: 0,
                y: 15,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.3,
              }}

              className="
                mt-5
                md:mt-7

                text-center

                px-3
                sm:px-4
              "
            >

              <p
                className="
                  text-blue-400

                  uppercase

                  tracking-[0.3em]

                  text-[10px]
                  sm:text-xs
                  md:text-sm
                "
              >
                Featured Work
              </p>


              {/* Project Type */}

              {currentProject.type && (

                <p
                  className="
                    text-gray-500

                    uppercase

                    tracking-[0.2em]

                    text-[10px]
                    sm:text-xs

                    mt-2
                  "
                >
                  {currentProject.type}
                </p>

              )}


              {/* Project Title */}

              <h2
                className="
                  text-2xl
                  sm:text-3xl
                  md:text-5xl

                  font-black

                  mt-2
                  md:mt-3
                "
              >
                {currentProject.title}
              </h2>


              {/* Description */}

              <p
                className="
                  text-gray-400

                  mt-3
                  md:mt-5

                  max-w-3xl
                  mx-auto

                  text-sm
                  md:text-base

                  leading-relaxed
                "
              >
                {currentProject.description}
              </p>


              {/* =================================================
                  TAGS
              ================================================= */}

              {currentProject.tags &&
                currentProject.tags.length > 0 && (

                  <div
                    className="
                      flex
                      flex-wrap
                      justify-center

                      gap-2

                      mt-4
                      md:mt-6
                    "
                  >

                    {currentProject.tags.map(
                      (tag) => (

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

                      )
                    )}

                  </div>

                )}


              {/* =================================================
                  VIEW FULL COLLECTION BUTTON
              ================================================= */}

              {currentProject.collection &&
                onOpenCollection && (

                  <div
                    className="
                      flex
                      justify-center

                      mt-5
                      md:mt-7
                    "
                  >

                    <motion.button
                      type="button"

                      onClick={() =>
                        onOpenCollection(
                          currentProject
                        )
                      }

                      whileHover={{
                        y: -3,
                        scale: 1.02,
                      }}

                      whileTap={{
                        scale: 0.97,
                      }}

                      className="
                        group

                        inline-flex
                        items-center
                        justify-center

                        gap-3

                        px-5
                        py-3

                        md:px-7
                        md:py-3.5

                        rounded-lg

                        border
                        border-blue-500

                        bg-blue-500/10

                        text-blue-300

                        text-sm
                        md:text-base

                        font-semibold

                        hover:bg-blue-500
                        hover:text-white

                        transition-colors
                      "
                    >
                      View Full Collection

                      <span
                        className="
                          group-hover:translate-x-1
                          transition-transform
                        "
                      >
                        →
                      </span>

                    </motion.button>

                  </div>

                )}


              {/* =================================================
                  COUNTER
              ================================================= */}

              <p
                className="
                  text-blue-400

                  font-medium

                  mt-4
                  md:mt-6

                  text-sm
                "
              >
                {selectedIndex + 1}
                {" / "}
                {images.length}
              </p>


              {/* Desktop Hint */}

              <p
                className="
                  hidden
                  md:block

                  text-gray-600

                  text-xs

                  mt-2
                "
              >
                Use ← → to navigate · ESC to close
              </p>

            </motion.div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}