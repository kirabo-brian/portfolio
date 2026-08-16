import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function CodingScreenshotLightbox({
  project,
  selectedIndex,
  setSelectedIndex,
}) {
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const screenshots =
    project?.screenshots || [];

  const isOpen =
    project &&
    selectedIndex !== null &&
    selectedIndex >= 0 &&
    selectedIndex < screenshots.length;

  const currentScreenshot =
    isOpen
      ? screenshots[selectedIndex]
      : null;


  // =========================================================
  // NAVIGATION
  // =========================================================

  const previousScreenshot = () => {
    if (screenshots.length <= 1) return;

    const nextIndex =
      selectedIndex === 0
        ? screenshots.length - 1
        : selectedIndex - 1;

    setSelectedIndex(nextIndex);
  };


  const nextScreenshot = () => {
    if (screenshots.length <= 1) return;

    const nextIndex =
      selectedIndex === screenshots.length - 1
        ? 0
        : selectedIndex + 1;

    setSelectedIndex(nextIndex);
  };


  // =========================================================
  // KEYBOARD
  // =========================================================

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setSelectedIndex(null);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousScreenshot();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextScreenshot();
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
    screenshots.length,
  ]);


  // =========================================================
  // MOBILE SWIPE
  // =========================================================

  const handleTouchStart = (event) => {
    touchStartX.current =
      event.targetTouches[0].clientX;

    touchEndX.current = null;
  };


  const handleTouchMove = (event) => {
    touchEndX.current =
      event.targetTouches[0].clientX;
  };


  const handleTouchEnd = () => {
    if (
      touchStartX.current === null ||
      touchEndX.current === null
    ) {
      return;
    }

    const distance =
      touchStartX.current -
      touchEndX.current;

    const threshold = 50;

    // Swipe left → next
    if (distance > threshold) {
      nextScreenshot();
    }

    // Swipe right → previous
    if (distance < -threshold) {
      previousScreenshot();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };


  // =========================================================
  // BACKDROP CLOSE
  // =========================================================

  const handleBackdropClick = (event) => {
    /*
      React portal events can still bubble through
      the React component tree.

      This stops the click here so it does NOT reach:
      - CodingProjectModal
      - CollectionModal
      - Gallery
    */

    event.stopPropagation();

    /*
      Only close if the user clicked the backdrop itself,
      not the screenshot, caption, arrows, or buttons.
    */

    if (
      event.target === event.currentTarget
    ) {
      setSelectedIndex(null);
    }
  };


  // =========================================================
  // NOTHING TO RENDER
  // =========================================================

  if (!isOpen || !currentScreenshot) {
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
          z-[120]

          bg-black/95
          backdrop-blur-lg

          text-white

          overflow-hidden
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

        onClick={
          handleBackdropClick
        }
      >

        {/* ===================================================
            VIEWPORT
        =================================================== */}

        <div
          className="
            relative

            w-full
            h-full

            flex
            items-center
            justify-center

            px-3
            sm:px-5
            md:px-16

            pt-24
            md:pt-28

            pb-4
          "

          onClick={
            handleBackdropClick
          }
        >

          {/* =================================================
              CLOSE BUTTON
          ================================================= */}

          <motion.button
            type="button"

            onClick={(event) => {
              event.stopPropagation();
              setSelectedIndex(null);
            }}

            whileHover={{
              scale: 1.08,
            }}

            whileTap={{
              scale: 0.92,
            }}

            aria-label="Close screenshot"

            className="
              fixed

              top-24
              right-4

              sm:right-5

              md:top-28
              md:right-8

              z-[140]

              w-11
              h-11

              md:w-12
              md:h-12

              rounded-full

              bg-black/85

              border
              border-gray-600

              flex
              items-center
              justify-center

              text-white
              text-xl

              shadow-xl

              hover:border-red-500
              hover:bg-red-500/20

              transition-all
            "
          >
            ✕
          </motion.button>


          {/* =================================================
              PREVIOUS BUTTON
          ================================================= */}

          {screenshots.length > 1 && (
            <motion.button
              type="button"

              onClick={(event) => {
                event.stopPropagation();
                previousScreenshot();
              }}

              whileHover={{
                scale: 1.08,
              }}

              whileTap={{
                scale: 0.92,
              }}

              aria-label="Previous screenshot"

              className="
                fixed

                left-3
                sm:left-5
                md:left-8

                top-1/2
                -translate-y-1/2

                z-[140]

                w-11
                h-11

                sm:w-12
                sm:h-12

                rounded-full

                bg-black/85

                border
                border-gray-600

                flex
                items-center
                justify-center

                text-white
                text-3xl

                shadow-xl

                hover:border-blue-500
                hover:text-blue-400
                hover:bg-blue-500/10

                transition-all
              "
            >
              ‹
            </motion.button>
          )}


          {/* =================================================
              NEXT BUTTON
          ================================================= */}

          {screenshots.length > 1 && (
            <motion.button
              type="button"

              onClick={(event) => {
                event.stopPropagation();
                nextScreenshot();
              }}

              whileHover={{
                scale: 1.08,
              }}

              whileTap={{
                scale: 0.92,
              }}

              aria-label="Next screenshot"

              className="
                fixed

                right-3
                sm:right-5
                md:right-8

                top-1/2
                -translate-y-1/2

                z-[140]

                w-11
                h-11

                sm:w-12
                sm:h-12

                rounded-full

                bg-black/85

                border
                border-gray-600

                flex
                items-center
                justify-center

                text-white
                text-3xl

                shadow-xl

                hover:border-blue-500
                hover:text-blue-400
                hover:bg-blue-500/10

                transition-all
              "
            >
              ›
            </motion.button>
          )}


          {/* =================================================
              MEDIA + CAPTION
          ================================================= */}

          <motion.div
            key={selectedIndex}

            initial={{
              opacity: 0,
              scale: 0.97,
            }}

            animate={{
              opacity: 1,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              scale: 0.97,
            }}

            transition={{
              duration: 0.22,
            }}

            onClick={(event) =>
              event.stopPropagation()
            }

            onTouchStart={
              handleTouchStart
            }

            onTouchMove={
              handleTouchMove
            }

            onTouchEnd={
              handleTouchEnd
            }

            className="
              relative

              w-full
              h-full

              max-w-[1400px]

              flex
              flex-col
              items-center

              min-h-0
            "
          >

            {/* IMAGE AREA */}

            <div
              className="
                w-full

                flex-1
                min-h-0

                flex
                items-center
                justify-center
              "
            >
              <img
                src={
                  currentScreenshot.src
                }

                alt={
                  currentScreenshot.title ||
                  `${project.title} screenshot`
                }

                draggable="false"

                className="
                  max-w-full
                  max-h-full

                  object-contain

                  rounded-xl

                  select-none
                "
              />
            </div>


            {/* =================================================
                INFORMATION
            ================================================= */}

            <div
              className="
                flex-none

                text-center

                mt-3

                px-4
              "
            >
              <p
                className="
                  text-blue-400

                  uppercase
                  tracking-[0.25em]

                  text-[10px]
                  md:text-xs
                "
              >
                Project Screenshot
              </p>


              <h3
                className="
                  text-lg
                  sm:text-xl
                  md:text-2xl

                  font-black
                  text-white

                  mt-1
                "
              >
                {currentScreenshot.title ||
                  project.title}
              </h3>


              <p
                className="
                  text-gray-500

                  text-xs

                  mt-1
                "
              >
                {selectedIndex + 1} /{" "}
                {screenshots.length}
              </p>


              {screenshots.length > 1 && (
                <p
                  className="
                    text-gray-600

                    text-[10px]
                    sm:text-xs

                    mt-1
                  "
                >
                  Swipe or use ← → to navigate
                </p>
              )}
            </div>

          </motion.div>

        </div>

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