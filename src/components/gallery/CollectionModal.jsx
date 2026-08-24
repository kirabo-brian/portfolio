
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import CollectionLightbox from "./CollectionLightbox";
import CodingProjectsView from "./CodingProjectsView";
import CodingProjectModal from "./CodingProjectModal";
import CodingScreenshotLightbox from "./CodingScreenshotLightbox";

import { codingProjects } from "../../data/codingProjects";


export default function CollectionModal({
  collection,
  onClose,
}) {
  const [searchParams, setSearchParams] =
    useSearchParams();


  // =========================================================
  // COLLECTION TYPE
  // =========================================================

  const isCodingCollection =
    collection?.folder === "coding";


// =========================================================
// LOCK MAIN GALLERY PAGE
// =========================================================
//
// While a collection is open:
//
// Main Gallery page = locked
// CollectionModal    = owns the scrollbar
//
// This prevents the browser page and collection
// from producing two separate scrollbars.
// =========================================================

useEffect(() => {
  if (!collection) return;

  const previousBodyOverflow =
    document.body.style.overflow;

  const previousHtmlOverflow =
    document.documentElement.style.overflow;


  document.body.style.overflow =
    "hidden";

  document.documentElement.style.overflow =
    "hidden";


  return () => {
    document.body.style.overflow =
      previousBodyOverflow;

    document.documentElement.style.overflow =
      previousHtmlOverflow;
  };
}, [collection]);


  // =========================================================
  // NORMAL COLLECTION ITEM
  // =========================================================

  const itemParam =
    searchParams.get("item");

  const parsedItemIndex =
    itemParam !== null
      ? Number.parseInt(
          itemParam,
          10
        )
      : null;

  const selectedItemIndex =
    Number.isInteger(
      parsedItemIndex
    ) &&
    parsedItemIndex >= 0 &&
    parsedItemIndex <
      (collection?.items.length || 0)
      ? parsedItemIndex
      : null;


  // =========================================================
  // CODING PROJECT
  // =========================================================

  const projectSlug =
    searchParams.get("project");

  const selectedCodingProject =
    isCodingCollection
      ? codingProjects.find(
          (project) =>
            project.slug ===
            projectSlug
        ) || null
      : null;


  // =========================================================
  // CODING SCREENSHOT
  // =========================================================

  const screenshotParam =
    searchParams.get(
      "screenshot"
    );

  const parsedScreenshotIndex =
    screenshotParam !== null
      ? Number.parseInt(
          screenshotParam,
          10
        )
      : null;

  const selectedScreenshotIndex =
    selectedCodingProject &&
    Number.isInteger(
      parsedScreenshotIndex
    ) &&
    parsedScreenshotIndex >= 0 &&
    parsedScreenshotIndex <
      selectedCodingProject
        .screenshots.length
      ? parsedScreenshotIndex
      : null;

  const screenshotOpen =
    selectedScreenshotIndex !== null;


  // =========================================================
  // NORMAL ITEM — OPEN
  // =========================================================

  const openItem = (index) => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.set(
      "item",
      String(index)
    );

    setSearchParams(nextParams);
  };


  // =========================================================
  // NORMAL ITEM — CHANGE
  // =========================================================

  const changeItem = (index) => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.set(
      "item",
      String(index)
    );

    setSearchParams(
      nextParams,
      {
        replace: true,
      }
    );
  };


  // =========================================================
  // NORMAL ITEM — CLOSE
  // =========================================================

  const closeItem = () => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.delete("item");

    setSearchParams(
      nextParams,
      {
        replace: true,
      }
    );
  };


  // =========================================================
  // CODING PROJECT — OPEN
  // =========================================================

  const openCodingProject = (
    project
  ) => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.set(
      "project",
      project.slug
    );

    nextParams.delete("item");
    nextParams.delete(
      "screenshot"
    );

    /*
      No replace:true here.

      This creates:
      Collection → Project

      Browser Back therefore returns
      to the collection.
    */
    setSearchParams(nextParams);
  };


  // =========================================================
  // CODING PROJECT — CLOSE
  // =========================================================

  const closeCodingProject = () => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.delete("project");
    nextParams.delete(
      "screenshot"
    );

    /*
      X / outside click should return
      exactly one visual level:

      Project → Coding Projects
    */
    setSearchParams(
      nextParams,
      {
        replace: true,
      }
    );
  };


  // =========================================================
  // CODING SCREENSHOT — OPEN
  // =========================================================

  const openCodingScreenshot = (
    project,
    index
  ) => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.set(
      "project",
      project.slug
    );

    nextParams.set(
      "screenshot",
      String(index)
    );

    /*
      Creates:
      Project → Screenshot

      Browser Back therefore returns
      to Project.
    */
    setSearchParams(nextParams);
  };


  // =========================================================
  // CODING SCREENSHOT — CHANGE
  // =========================================================

  const changeCodingScreenshot = (
    index
  ) => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.set(
      "screenshot",
      String(index)
    );

    /*
      Moving between screenshots should
      NOT create a new history entry.
    */
    setSearchParams(
      nextParams,
      {
        replace: true,
      }
    );
  };


  // =========================================================
  // CODING SCREENSHOT — CLOSE
  // =========================================================

  const closeCodingScreenshot = () => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.delete(
      "screenshot"
    );

    /*
      Screenshot → Project only.
    */
    setSearchParams(
      nextParams,
      {
        replace: true,
      }
    );
  };


  // =========================================================
  // SAFE COLLECTION BACKDROP CLICK
  // =========================================================

  const handleCollectionBackdropClick =
    (event) => {
      /*
        React Portal events can still
        bubble through the React tree.

        Only close the collection if the
        actual collection backdrop itself
        was clicked.
      */

      if (
        event.target ===
        event.currentTarget
      ) {
        onClose();
      }
    };


  // =========================================================
  // COLLECTION COUNT
  // =========================================================

  const collectionCount =
    isCodingCollection
      ? codingProjects.length
      : collection?.items.length || 0;

  const collectionCountLabel =
    isCodingCollection
      ? collectionCount === 1
        ? "Project"
        : "Projects"
      : collectionCount === 1
        ? "Item"
        : "Items";


  // =========================================================
  // RENDER
  // =========================================================

  return (
    <AnimatePresence>

      {collection && (

        <motion.div
          className={`
            fixed
            inset-0
            z-40

            bg-black/90
            backdrop-blur-md

            ${

              selectedCodingProject ||
              selectedItemIndex !== null

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

          onClick={
            handleCollectionBackdropClick
          }
        >

          {/* =================================================
              COLLECTION PAGE WRAPPER
          ================================================= */}

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

            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <motion.div
              className="
                relative

                w-full
                max-w-7xl

                rounded-xl
                md:rounded-2xl

                border
                border-blue-500

                bg-[#0b0b0b]

                p-3
                sm:p-5
                md:p-8

                shadow-2xl

                text-white
              "

              initial={{
                opacity: 0,
                scale: 0.96,
                y: 25,
              }}

              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
                scale: 0.96,
                y: 20,
              }}

              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}

              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* =============================================
                  HERO
              ============================================= */}

              <div
                className="
                  relative

                  mb-6
                  sm:mb-8

                  overflow-hidden

                  rounded-xl
                "
              >

                {collection.coverVideo ? (

                  <motion.video
                    src={collection.coverVideo}

                    poster={collection.cover}

                    autoPlay
                    muted
                    loop
                    playsInline

                    preload="metadata"

                    initial={{
                      scale: 1.06,
                    }}

                    animate={{
                      scale: 1,
                    }}

                    transition={{
                      duration: 0.7,
                    }}

                    className="
                      w-full

                      h-56
                      sm:h-64
                      md:h-72

                      object-cover

                      brightness-50

                      pointer-events-none
                    "
                  />

                ) : collection.cover ? (

                  <motion.img
                    src={collection.cover}
                    alt={collection.title}

                    initial={{
                      scale: 1.06,
                    }}

                    animate={{
                      scale: 1,
                    }}

                    transition={{
                      duration: 0.7,
                    }}

                    className="
                      w-full

                      h-56
                      sm:h-64
                      md:h-72

                      object-cover

                      brightness-50
                    "
                  />

                ) : (

                  <div
                    className="
                      w-full

                      h-56
                      sm:h-64
                      md:h-72

                      bg-white/5
                    "
                  />

                )}


                {/* Gradient */}

                <div
                  className="
                    absolute
                    inset-0

                    bg-gradient-to-t
                    from-[#0b0b0b]
                    via-black/30
                    to-transparent
                  "
                />


                {/* Close Collection */}

                <motion.button
                  type="button"

                  onClick={(event) => {
                    event.stopPropagation();
                    onClose();
                  }}

                  whileHover={{
                    scale: 1.08,
                  }}

                  whileTap={{
                    scale: 0.92,
                  }}

                  aria-label="Close collection"

                  className="
                    absolute

                    top-3
                    right-3

                    md:top-5
                    md:right-5

                    z-10

                    w-11
                    h-11

                    rounded-full

                    bg-black/75

                    border
                    border-gray-700

                    flex
                    items-center
                    justify-center

                    text-white
                    text-xl

                    hover:border-red-500
                    hover:bg-red-500/20

                    transition-colors
                  "
                >
                  ✕
                </motion.button>


                {/* Hero Content */}

                <div
                  className="
                    absolute

                    left-4
                    right-4
                    bottom-4

                    sm:left-6
                    sm:bottom-6

                    md:left-8
                    md:bottom-8
                  "
                >

                  <p
                    className="
                      uppercase
                      tracking-[0.25em]

                      text-blue-400

                      text-xs
                      md:text-sm
                    "
                  >
                    {isCodingCollection
                      ? "Development Collection"
                      : "Collection"}
                  </p>


                  <h2
                    className="
                      text-3xl
                      sm:text-4xl
                      md:text-5xl

                      font-black

                      text-white

                      mt-2
                    "
                  >
                    {collection.title}
                  </h2>


                  <p
                    className="
                      text-gray-300

                      text-sm
                      sm:text-base

                      mt-1
                    "
                  >
                    {collection.subtitle}
                  </p>


                  <div
                    className="
                      flex
                      flex-wrap

                      gap-2

                      mt-4
                    "
                  >

                    <span
                      className="
                        px-3
                        py-1.5

                        rounded-full

                        bg-blue-500/20

                        border
                        border-blue-500/40

                        text-blue-300

                        text-xs
                        sm:text-sm
                      "
                    >
                      {collection.category}
                    </span>


                    <span
                      className="
                        px-3
                        py-1.5

                        rounded-full

                        bg-white/10

                        border
                        border-white/10

                        text-gray-300

                        text-xs
                        sm:text-sm
                      "
                    >
                      {collectionCount}{" "}
                      {collectionCountLabel}
                    </span>

                  </div>

                </div>

              </div>


              {/* =============================================
                  YOUTUBE CTA
              ============================================= */}

              {collection.channelUrl &&
                collection.channelUrl !==
                  "YOUR_YOUTUBE_CHANNEL_URL" && (

                  <div
                    className="
                      mb-6

                      p-4
                      sm:p-5

                      rounded-xl

                      border
                      border-red-500/40

                      bg-red-500/5

                      flex
                      flex-col
                      sm:flex-row

                      sm:items-center
                      sm:justify-between

                      gap-4
                    "
                  >

                    <div>

                      <p
                        className="
                          text-red-400

                          uppercase
                          tracking-[0.2em]

                          text-xs

                          font-semibold
                        "
                      >
                        YouTube Gaming
                      </p>


                      <h3
                        className="
                          text-lg
                          sm:text-xl

                          font-bold
                          text-white

                          mt-1
                        "
                      >
                        Watch more gaming content
                      </h3>


                      <p
                        className="
                          text-gray-400

                          text-sm

                          mt-1
                        "
                      >
                        Visit the channel for full
                        gameplay, edited videos and
                        gaming content.
                      </p>

                    </div>


                    <a
                      href={
                        collection.channelUrl
                      }

                      target="_blank"

                      rel="noopener noreferrer"

                      onClick={(event) =>
                        event.stopPropagation()
                      }

                      className="
                        inline-flex
                        items-center
                        justify-center

                        gap-2

                        px-5
                        py-3

                        rounded-lg

                        bg-red-600

                        text-white

                        font-semibold

                        hover:bg-red-500

                        transition-colors
                      "
                    >
                      ▶ Visit YouTube Channel ↗
                    </a>

                  </div>

                )}


              {/* =============================================
                  CODING OR NORMAL COLLECTION
              ============================================= */}

              {isCodingCollection ? (

                <CodingProjectsView
                  onOpenProject={
                    openCodingProject
                  }
                />

              ) : (

                <>

                  <div
                    className="
                      grid

                      grid-cols-2

                      lg:grid-cols-3
                      xl:grid-cols-4

                      gap-3
                      sm:gap-4
                      md:gap-6
                    "
                  >

                    {collection.items.map(
                      (item, index) => (

                        <motion.div
                          key={`${item.src}-${index}`}

                          whileHover={{
                            y: -5,
                          }}

                          onClick={(event) => {
                            event.stopPropagation();
                            openItem(index);
                          }}

                          className="
                            group
                            relative

                            cursor-pointer

                            overflow-hidden

                            rounded-xl

                            border
                            border-gray-700

                            bg-black

                            aspect-square

                            hover:border-blue-500

                            transition-colors
                          "
                        >

                          {/* Image */}

                          {item.type ===
                            "image" && (

                            <img
                          src={item.src}
                          alt={
                            item.title ||
                            collection.title
                          }

                          loading="lazy"
                          decoding="async"

                          className="
                            w-full
                            h-full
                            object-cover
                            group-hover:scale-105
                            transition-transform
                            duration-500
                          "
                        />

                          )}


                          {/* Video */}

                          {item.type ===
                            "video" && (

                            <video
                              src={item.src}
                              poster={item.poster}

                              muted
                              loop
                              autoPlay
                              playsInline

                              className="
                                w-full
                                h-full

                                object-cover

                                group-hover:scale-105

                                transition-transform
                                duration-500
                              "
                            />

                          )}


                          {/* Badge */}

                          <span
                            className="
                              absolute

                              top-2
                              left-2

                              px-3
                              py-1

                              rounded-full

                              bg-black/75

                              border
                              border-gray-700

                              text-[10px]
                              text-gray-300

                              uppercase
                            "
                          >
                            {item.youtubeUrl
                              ? "YouTube"
                              : item.type}
                          </span>


                          {/* Hover */}

                          <div
                            className="
                              absolute
                              inset-0

                              bg-black/60

                              opacity-0
                              group-hover:opacity-100

                              transition-opacity

                              flex
                              items-center
                              justify-center
                            "
                          >
                            <span
                              className="
                                text-lg
                                sm:text-xl

                                text-white

                                font-semibold
                              "
                            >
                              {item.type ===
                              "video"
                                ? "▶ Play"
                                : "🔍 View"}
                            </span>
                          </div>

                        </motion.div>

                      )
                    )}

                  </div>


                  {/* Empty */}

                  {collection.items.length ===
                    0 && (

                    <div
                      className="
                        p-8

                        rounded-xl

                        border
                        border-gray-700

                        text-center
                        text-gray-400
                      "
                    >
                      No media yet.
                    </div>

                  )}

                </>

              )}

                </motion.div>

              </div>

              {/* =================================================
              NORMAL COLLECTION LIGHTBOX
          ================================================= */}

          {!isCodingCollection && (

            <CollectionLightbox
              items={
                collection.items
              }

              selectedIndex={
                selectedItemIndex
              }

              setSelectedIndex={(
                index
              ) => {

                if (
                  index === null
                ) {
                  closeItem();
                  return;
                }

                changeItem(
                  index
                );
              }}
            />

          )}


          {/* =================================================
              CODING PROJECT
          ================================================= */}

          <CodingProjectModal
            project={
              selectedCodingProject
            }

            onClose={
              closeCodingProject
            }

            onOpenScreenshot={
              openCodingScreenshot
            }

            screenshotOpen={
              screenshotOpen
            }
          />


          {/* =================================================
              CODING SCREENSHOT
          ================================================= */}

          <CodingScreenshotLightbox
            project={
              selectedCodingProject
            }

            selectedIndex={
              selectedScreenshotIndex
            }

            setSelectedIndex={(
              index
            ) => {

              if (
                index === null
              ) {
                closeCodingScreenshot();
                return;
              }

              changeCodingScreenshot(
                index
              );
            }}
          />

        </motion.div>

      )}

    </AnimatePresence>
  );
}