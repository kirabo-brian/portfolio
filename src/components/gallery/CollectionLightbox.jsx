import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CollectionLightbox({
  items,
  selectedIndex,
  setSelectedIndex,
}) {
  const [direction, setDirection] =
    useState(0);

  const isOpen =
    selectedIndex !== null;

  const currentItem =
    isOpen && items?.length > 0
      ? items[selectedIndex]
      : null;


  // =========================================================
  // PREVIOUS
  // =========================================================

  const previousItem = () => {
    if (!items?.length) return;

    setDirection(-1);

    setSelectedIndex(
      (selectedIndex - 1 + items.length) %
        items.length
    );
  };


  // =========================================================
  // NEXT
  // =========================================================

  const nextItem = () => {
    if (!items?.length) return;

    setDirection(1);

    setSelectedIndex(
      (selectedIndex + 1) %
        items.length
    );
  };


  // =========================================================
  // SWIPE
  // =========================================================

  const handleSwipe = (
    event,
    info
  ) => {
    if (items.length <= 1) return;

    const swipeDistance =
      info.offset.x;

    const swipeVelocity =
      info.velocity.x;

    const distanceThreshold = 70;

    const velocityThreshold = 500;


    // Swipe left → next

    if (
      swipeDistance < -distanceThreshold ||
      swipeVelocity < -velocityThreshold
    ) {
      nextItem();
      return;
    }


    // Swipe right → previous

    if (
      swipeDistance > distanceThreshold ||
      swipeVelocity > velocityThreshold
    ) {
      previousItem();
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
        items.length > 1
      ) {
        setDirection(-1);

        setSelectedIndex(
          (currentIndex) =>
            (
              currentIndex -
              1 +
              items.length
            ) %
            items.length
        );
      }


      if (
        event.key === "ArrowRight" &&
        items.length > 1
      ) {
        setDirection(1);

        setSelectedIndex(
          (currentIndex) =>
            (
              currentIndex +
              1
            ) %
            items.length
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
    items,
    setSelectedIndex,
  ]);


  // =========================================================
  // SLIDE ANIMATION
  // =========================================================

  const mediaVariants = {

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

      {isOpen && currentItem && (

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
            md:px-6

            pt-24
            pb-6

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
            className="
              relative

              w-full
              max-w-6xl

              flex
              flex-col
              items-center

              my-auto
            "

            initial={{
              scale: 0.95,
              opacity: 0,
              y: 20,
            }}

            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}

            exit={{
              scale: 0.95,
              opacity: 0,
              y: 15,
            }}

            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}

            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* =================================================
                CLOSE
            ================================================= */}

            <button
              onClick={() =>
                setSelectedIndex(null)
              }

              aria-label="Close media"

              className="
                absolute

                top-3
                right-3

                md:top-4
                md:right-4

                z-30

                w-12
                h-12

                rounded-full

                bg-black/75

                border
                border-gray-700

                flex
                items-center
                justify-center

                text-3xl

                hover:text-blue-400
                hover:border-blue-500
                hover:bg-blue-500/10

                transition-all
              "
            >
              ×
            </button>


            {/* =================================================
                PREVIOUS
            ================================================= */}

            {items.length > 1 && (

              <button
                onClick={previousItem}

                aria-label="Previous item"

                className="
                  absolute

                  left-2
                  md:left-5

                  top-1/2
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
                NEXT
            ================================================= */}

            {items.length > 1 && (

              <button
                onClick={nextItem}

                aria-label="Next item"

                className="
                  absolute

                  right-2
                  md:right-5

                  top-1/2
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
                MEDIA
            ================================================= */}

            <div
              className="
                relative

                w-full

                flex
                items-center
                justify-center

                overflow-hidden

                touch-pan-y
              "
            >

              <AnimatePresence
                mode="wait"
                custom={direction}
              >

                {/* IMAGE */}

                {currentItem.type ===
                  "image" && (

                  <motion.img
                    key={`image-${selectedIndex}`}

                    custom={direction}

                    variants={
                      mediaVariants
                    }

                    initial="enter"
                    animate="center"
                    exit="exit"

                    transition={{
                      duration: 0.28,
                      ease: "easeOut",
                    }}

                    drag={
                      items.length > 1
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

                    src={currentItem.src}

                    alt={
                      currentItem.title ||
                      `Gallery item ${
                        selectedIndex + 1
                      }`
                    }

                    className="
                      w-full

                      max-h-[65vh]

                      object-contain

                      rounded-xl

                      cursor-grab
                      active:cursor-grabbing

                      select-none
                    "
                  />

                )}


                {/* VIDEO */}

                {currentItem.type ===
                  "video" && (

                  <motion.div
                    key={`video-${selectedIndex}`}

                    custom={direction}

                    variants={
                      mediaVariants
                    }

                    initial="enter"
                    animate="center"
                    exit="exit"

                    transition={{
                      duration: 0.28,
                      ease: "easeOut",
                    }}

                    className="
                      w-full

                      flex
                      items-center
                      justify-center
                    "
                  >

                    <video
                      src={currentItem.src}

                      poster={
                        currentItem.poster
                      }

                      controls
                      autoPlay
                      playsInline
                      preload="metadata"

                      className="
                        w-full

                        max-h-[65vh]

                        object-contain

                        rounded-xl

                        bg-black
                      "
                    />

                  </motion.div>

                )}

              </AnimatePresence>

            </div>


            {/* =================================================
                MOBILE SWIPE HINT
            ================================================= */}

            {items.length > 1 && (

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

                <span>
                  ←
                </span>

                <span>
                  Swipe to navigate
                </span>

                <span>
                  →
                </span>

              </div>

            )}


            {/* =================================================
                CAPTION
            ================================================= */}

            <div
              className="
                text-center

                mt-4
                md:mt-6

                px-4
              "
            >

              {/* Media Type */}

              <p
                className={`
                  uppercase

                  tracking-[0.25em]

                  text-xs

                  ${
                    currentItem.youtubeUrl
                      ? "text-red-400"
                      : "text-blue-400"
                  }
                `}
              >
                {currentItem.youtubeUrl
                  ? "YouTube Content"
                  : currentItem.type ===
                      "video"
                    ? "Video"
                    : "Image"}
              </p>


              {/* Title */}

              {currentItem.title && (

                <h2
                  className="
                    text-2xl
                    md:text-3xl

                    font-bold

                    mt-3
                  "
                >
                  {currentItem.title}
                </h2>

              )}


              {/* Description */}

              {currentItem.description && (

                <p
                  className="
                    text-gray-400

                    mt-3

                    max-w-2xl
                    mx-auto

                    text-sm
                    md:text-base

                    leading-relaxed
                  "
                >
                  {currentItem.description}
                </p>

              )}


              {/* =================================================
                  WATCH ON YOUTUBE
              ================================================= */}

              {currentItem.youtubeUrl && (

                <motion.a
                  href={
                    currentItem.youtubeUrl
                  }

                  target="_blank"

                  rel="noopener noreferrer"

                  whileHover={{
                    y: -3,
                    scale: 1.02,
                  }}

                  whileTap={{
                    scale: 0.97,
                  }}

                  className="
                    inline-flex
                    items-center
                    justify-center

                    gap-2

                    mt-5

                    px-5
                    py-3

                    rounded-lg

                    bg-red-600

                    border
                    border-red-500

                    text-white

                    text-sm
                    md:text-base

                    font-semibold

                    hover:bg-red-500

                    transition-colors
                  "
                >
                  <span>
                    ▶
                  </span>

                  Watch on YouTube

                  <span>
                    ↗
                  </span>

                </motion.a>

              )}


              {/* Counter */}

              <p
                className="
                  text-blue-400

                  mt-4

                  font-medium
                "
              >
                {selectedIndex + 1}
                {" / "}
                {items.length}
              </p>


              {/* Desktop Hint */}

              <p
                className="
                  hidden
                  md:block

                  text-gray-500

                  text-sm

                  mt-2
                "
              >
                Use ← → to navigate · ESC to close
              </p>

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}