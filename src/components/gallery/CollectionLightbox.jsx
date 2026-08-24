import {
  useEffect,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import { createPortal } from "react-dom";


export default function CollectionLightbox({
  items,
  selectedIndex,
  setSelectedIndex,
}) {
  const [direction, setDirection] =
    useState(0);


  // =========================================================
  // OPEN STATE
  // =========================================================

  const isOpen =
    selectedIndex !== null &&
    selectedIndex >= 0 &&
    selectedIndex <
      (items?.length || 0);


  const currentItem =
    isOpen && items?.length > 0
      ? items[selectedIndex]
      : null;


  // =========================================================
  // PREVIOUS
  // =========================================================

  const previousItem = () => {
    if (!items?.length) {
      return;
    }

    setDirection(-1);

    const nextIndex =
      selectedIndex === 0
        ? items.length - 1
        : selectedIndex - 1;

    setSelectedIndex(
      nextIndex
    );
  };


  // =========================================================
  // NEXT
  // =========================================================

  const nextItem = () => {
    if (!items?.length) {
      return;
    }

    setDirection(1);

    const nextIndex =
      selectedIndex ===
      items.length - 1
        ? 0
        : selectedIndex + 1;

    setSelectedIndex(
      nextIndex
    );
  };


  // =========================================================
  // SWIPE
  // =========================================================

  const handleSwipe = (
    event,
    info
  ) => {
    if (
      !items?.length ||
      items.length <= 1
    ) {
      return;
    }

    const swipeDistance =
      info.offset.x;

    const swipeVelocity =
      info.velocity.x;

    const distanceThreshold = 70;
    const velocityThreshold = 500;


    // Swipe left → next

    if (
      swipeDistance <
        -distanceThreshold ||
      swipeVelocity <
        -velocityThreshold
    ) {
      nextItem();
      return;
    }


    // Swipe right → previous

    if (
      swipeDistance >
        distanceThreshold ||
      swipeVelocity >
        velocityThreshold
    ) {
      previousItem();
    }
  };


  // =========================================================
  // KEYBOARD
  // =========================================================
  //
  // CollectionModal.jsx owns scroll locking.
  //
  // This component only handles:
  //
  // ESC
  // LEFT
  // RIGHT
  //
  // =========================================================

  useEffect(() => {
    if (!isOpen) {
      return;
    }


    const handleKeyDown = (
      event
    ) => {

      // ESC

      if (
        event.key === "Escape"
      ) {
        event.preventDefault();

        setSelectedIndex(null);

        return;
      }


      // LEFT

      if (
        event.key ===
          "ArrowLeft" &&
        items.length > 1
      ) {
        event.preventDefault();

        setDirection(-1);

        const nextIndex =
          selectedIndex === 0
            ? items.length - 1
            : selectedIndex - 1;

        setSelectedIndex(
          nextIndex
        );

        return;
      }


      // RIGHT

      if (
        event.key ===
          "ArrowRight" &&
        items.length > 1
      ) {
        event.preventDefault();

        setDirection(1);

        const nextIndex =
          selectedIndex ===
            items.length - 1
            ? 0
            : selectedIndex + 1;

        setSelectedIndex(
          nextIndex
        );
      }
    };


    window.addEventListener(
      "keydown",
      handleKeyDown
    );


    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  }, [
    isOpen,
    selectedIndex,
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


  // =========================================================
  // CLOSED
  // =========================================================

  if (
    !isOpen ||
    !currentItem
  ) {
    return null;
  }


  // =========================================================
  // LIGHTBOX
  // =========================================================

  const lightbox = (

    <AnimatePresence>

      <motion.div
        className="
          fixed
          inset-0

          z-[80]

          bg-black/95
          backdrop-blur-md

          flex
          items-center
          justify-center

          px-4
          md:px-6

          pt-24
          pb-4

          overflow-hidden
          overscroll-none
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
          duration: 0.2,
        }}

        onClick={() =>
          setSelectedIndex(null)
        }
      >

        <motion.div
          className="
            relative

            w-full
            h-full

            max-w-6xl

            flex
            flex-col
            items-center

            min-h-0
          "

          initial={{
            scale: 0.97,
            opacity: 0,
          }}

          animate={{
            scale: 1,
            opacity: 1,
          }}

          exit={{
            scale: 0.97,
            opacity: 0,
          }}

          transition={{
            duration: 0.2,
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
            type="button"

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

              text-white
              text-2xl

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
              type="button"

              onClick={
                previousItem
              }

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

                text-white
                text-3xl

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
              type="button"

              onClick={
                nextItem
              }

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

                text-white
                text-3xl

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
              MEDIA AREA
          ================================================= */}

          <div
            className="
              relative

              w-full

              flex-1
              min-h-0

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

                  custom={
                    direction
                  }

                  variants={
                    mediaVariants
                  }

                  initial="enter"
                  animate="center"
                  exit="exit"

                  transition={{
                    duration: 0.22,
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

                  dragElastic={
                    0.15
                  }

                  onDragEnd={
                    handleSwipe
                  }

                  src={
                    currentItem.src
                  }

                  alt={
                    currentItem.title ||
                    `Gallery item ${
                      selectedIndex + 1
                    }`
                  }

                  draggable="false"

                  className="
                    max-w-full
                    max-h-full

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

                  custom={
                    direction
                  }

                  variants={
                    mediaVariants
                  }

                  initial="enter"
                  animate="center"
                  exit="exit"

                  transition={{
                    duration: 0.22,
                    ease: "easeOut",
                  }}

                  className="
                    w-full
                    h-full

                    flex
                    items-center
                    justify-center
                  "
                >

                  <video
                    src={
                      currentItem.src
                    }

                    poster={
                      currentItem.poster
                    }

                    controls
                    autoPlay
                    playsInline

                    preload="metadata"

                    onClick={(event) =>
                      event.stopPropagation()
                    }

                    className="
                      max-w-full
                      max-h-full

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
              CAPTION / INFORMATION
          ================================================= */}

          <div
            className="
              flex-none

              text-center

              mt-3

              px-4
            "
          >

            {/* Media Type */}

            <p
              className={`
                uppercase

                tracking-[0.25em]

                text-[10px]
                md:text-xs

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
                  text-xl
                  sm:text-2xl
                  md:text-3xl

                  font-bold

                  text-white

                  mt-1
                "
              >
                {
                  currentItem.title
                }
              </h2>

            )}


            {/* Description */}

            {currentItem.description && (

              <p
                className="
                  text-gray-400

                  mt-2

                  max-w-2xl
                  mx-auto

                  text-xs
                  sm:text-sm
                  md:text-base

                  leading-relaxed
                "
              >
                {
                  currentItem.description
                }
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

                  mt-3

                  px-4
                  py-2

                  rounded-lg

                  bg-red-600

                  border
                  border-red-500

                  text-white

                  text-xs
                  sm:text-sm

                  font-semibold

                  hover:bg-red-500

                  transition-colors
                "
              >
                ▶ Watch on YouTube ↗
              </motion.a>

            )}


            {/* Counter */}

            <p
              className="
                text-blue-400

                mt-2

                text-sm

                font-medium
              "
            >
              {selectedIndex + 1}
              {" / "}
              {items.length}
            </p>


            {/* Desktop Hint */}

            {items.length > 1 && (

              <p
                className="
                  hidden
                  md:block

                  text-gray-500

                  text-xs

                  mt-1
                "
              >
                Use ← → to navigate · ESC to close
              </p>

            )}


            {/* Mobile Hint */}

            {items.length > 1 && (

              <p
                className="
                  md:hidden

                  text-gray-500

                  text-[10px]

                  mt-1
                "
              >
                Swipe to navigate
              </p>

            )}

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );


  // =========================================================
  // PORTAL
  // =========================================================

  return createPortal(
    lightbox,
    document.body
  );
}