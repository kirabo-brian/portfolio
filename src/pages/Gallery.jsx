import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Footer from "../components/layout/Footer";

import GalleryLightbox from "../components/gallery/GalleryLightbox";
import CollectionModal from "../components/gallery/CollectionModal";

import {
  featuredProjects,
  galleryCollections,
} from "../data/galleryData";


// =========================================================
// CREATE URL-FRIENDLY COLLECTION NAME
// =========================================================

function createSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}


export default function Gallery() {
  // =========================================================
  // FILTER STATE
  // =========================================================

  const [activeFilter, setActiveFilter] =
    useState("All");


  // =========================================================
  // URL / BROWSER HISTORY STATE
  // =========================================================

  const [searchParams, setSearchParams] =
    useSearchParams();


  // =========================================================
  // SELECTED COLLECTION FROM URL
  // =========================================================

  const collectionSlug =
    searchParams.get("collection");

  const selectedCollection =
    galleryCollections.find(
      (collection) =>
        createSlug(collection.title) ===
        collectionSlug
    ) || null;


  // =========================================================
  // SELECTED FEATURED PROJECT FROM URL
  // =========================================================

  const featuredParam =
    searchParams.get("featured");

  const parsedFeaturedIndex =
    featuredParam !== null
      ? Number.parseInt(
          featuredParam,
          10
        )
      : null;

  const selectedImage =
    Number.isInteger(
      parsedFeaturedIndex
    ) &&
    parsedFeaturedIndex >= 0 &&
    parsedFeaturedIndex <
      featuredProjects.length
      ? parsedFeaturedIndex
      : null;


  // =========================================================
  // OPEN COLLECTION
  // =========================================================
  //
  // IMPORTANT:
  //
  // Every time a collection is opened fresh,
  // remove old nested state such as:
  //
  // item
  // project
  // screenshot
  //
  // This prevents Coding Projects from reopening
  // inside an old project or screenshot.
  // =========================================================

  const openCollection = (
    collection
  ) => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.set(
      "collection",
      createSlug(
        collection.title
      )
    );

    // Close Featured Work
    nextParams.delete(
      "featured"
    );

    // Clear normal collection media
    nextParams.delete(
      "item"
    );

    // Clear Coding Project state
    nextParams.delete(
      "project"
    );

    nextParams.delete(
      "screenshot"
    );

    // Create browser-history entry
    setSearchParams(
      nextParams
    );
  };


  // =========================================================
  // CLOSE COLLECTION
  // =========================================================

  const closeCollection = () => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.delete(
      "collection"
    );

    nextParams.delete(
      "item"
    );

    nextParams.delete(
      "project"
    );

    nextParams.delete(
      "screenshot"
    );

    setSearchParams(
      nextParams,
      {
        replace: true,
      }
    );
  };


  // =========================================================
  // OPEN FEATURED PROJECT
  // =========================================================

  const openFeaturedProject = (
    index
  ) => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.set(
      "featured",
      String(index)
    );

    // Featured Work and Collection
    // should never be open together.
    nextParams.delete(
      "collection"
    );

    nextParams.delete(
      "item"
    );

    nextParams.delete(
      "project"
    );

    nextParams.delete(
      "screenshot"
    );

    setSearchParams(
      nextParams
    );
  };


  // =========================================================
  // CHANGE FEATURED PROJECT
  // =========================================================

  const changeFeaturedProject = (
    index
  ) => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.set(
      "featured",
      String(index)
    );

    nextParams.delete(
      "collection"
    );

    nextParams.delete(
      "item"
    );

    nextParams.delete(
      "project"
    );

    nextParams.delete(
      "screenshot"
    );

    setSearchParams(
      nextParams,
      {
        replace: true,
      }
    );
  };


  // =========================================================
  // OPEN COLLECTION FROM FEATURED WORK
  // =========================================================

  const openFeaturedCollection = (
    project
  ) => {
    if (!project?.collection) {
      return;
    }

    const targetCollection =
      galleryCollections.find(
        (collection) =>
          collection.folder ===
          project.collection
      );

    if (!targetCollection) {
      return;
    }

    const nextParams =
      new URLSearchParams(
        searchParams
      );

    // Close Featured Work
    nextParams.delete(
      "featured"
    );

    // Clear normal selected media
    nextParams.delete(
      "item"
    );

    // Clear old Coding Project state
    nextParams.delete(
      "project"
    );

    nextParams.delete(
      "screenshot"
    );

    // Open related collection
    nextParams.set(
      "collection",
      createSlug(
        targetCollection.title
      )
    );

    setSearchParams(
      nextParams
    );
  };


  // =========================================================
  // CLOSE FEATURED PROJECT
  // =========================================================

  const closeFeaturedProject = () => {
    const nextParams =
      new URLSearchParams(
        searchParams
      );

    nextParams.delete(
      "featured"
    );

    setSearchParams(
      nextParams,
      {
        replace: true,
      }
    );
  };


  // =========================================================
  // FILTERS
  // =========================================================

  const filters = [
    "All",
    "Design",
    "Art",
    "Video",
    "Development",
  ];

  const filteredCategories =
    activeFilter === "All"
      ? galleryCollections
      : galleryCollections.filter(
          (collection) =>
            collection.category ===
            activeFilter
        );


  return (
    <div className="min-h-screen text-white">

      {/* =====================================================
          HERO
      ===================================================== */}

      <motion.section
        initial={{
          opacity: 0,
          y: 30,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}

        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
          md:px-10

          pt-24
          sm:pt-28
          md:pt-32

          pb-14
          md:pb-16
        "
      >
        <p
          className="
            text-blue-400

            uppercase

            tracking-[0.3em]
            sm:tracking-[0.35em]

            text-xs
            sm:text-base
          "
        >
          CREATIVE ARCHIVE
        </p>


        <h1
          className="
            text-5xl
            sm:text-6xl
            md:text-8xl

            font-black

            mt-4
          "
        >
          Creative Gallery
        </h1>


        <p
          className="
            text-gray-300

            mt-6

            max-w-3xl

            text-base
            md:text-lg

            leading-relaxed
          "
        >
          A collection of artwork, branding projects,
          video production, game development experiments,
          and creative work created throughout my journey
          as a designer, content creator and aspiring
          game developer.
        </p>
      </motion.section>


      {/* =====================================================
          CURRENTLY LEARNING
      ===================================================== */}

      <motion.section
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
          amount: 0.2,
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

          mb-16
          md:mb-20
        "
      >
        <div
          className="
            border
            border-blue-500

            bg-blue-500/5

            backdrop-blur-sm

            rounded-xl

            p-5
            sm:p-6
            md:p-8
          "
        >
          <h2
            className="
              text-2xl
              md:text-3xl

              font-bold

              mb-5
              md:mb-6
            "
          >
            Currently Learning
          </h2>


          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2

              gap-3
              md:gap-4

              text-sm
              sm:text-base

              text-gray-300
            "
          >
            <div>
              ► Unreal Engine 5
            </div>

            <div>
              ► Python
            </div>

            <div>
              ► C++
            </div>

            <div>
              ► Game Design Principles
            </div>

            <div>
              ► Animation Workflows
            </div>
          </div>
        </div>
      </motion.section>


      {/* =====================================================
          FEATURED WORK
      ===================================================== */}

      <motion.section
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
          delay: 0.1,
          ease: "easeOut",
        }}

        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
          md:px-10

          mb-20
          md:mb-24
        "
      >

        {/* Featured Header */}

        <div className="mb-8 md:mb-10">

          <p
            className="
              text-blue-400

              uppercase
              tracking-[0.25em]

              text-xs
              sm:text-sm

              mb-2
            "
          >
            Highlights
          </p>


          <h2
            className="
              text-4xl
              md:text-5xl

              font-black
            "
          >
            Featured Work
          </h2>


          <p
            className="
              text-gray-400

              mt-4

              max-w-2xl

              text-sm
              sm:text-base
            "
          >
            A selection of projects and creative work that
            represent some of the areas I am most interested
            in developing and exploring.
          </p>
        </div>


        {/* Featured Cards */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3

            gap-4
            md:gap-6
          "
        >
          {featuredProjects.map(
            (project, index) => (

              <motion.div
                key={
                  project.title
                }

                onClick={() =>
                  openFeaturedProject(
                    index
                  )
                }

                whileHover={{
                  y: -6,
                }}

                transition={{
                  duration: 0.25,
                }}

                className="
                  group
                  relative

                  overflow-hidden

                  rounded-xl
                  md:rounded-2xl

                  border
                  border-gray-700

                  bg-black/45

                  backdrop-blur-md

                  hover:border-blue-500

                  cursor-pointer

                  grid
                  grid-cols-[120px_1fr]
                  sm:grid-cols-[160px_1fr]
                  md:block
                "
              >

                {/* Image */}

                <div
                  className="
                    relative

                    min-h-[180px]
                    md:h-72

                    overflow-hidden
                  "
                >
                  <img
                    src={
                      project.image
                    }

                    alt={
                      project.title
                    }

                    className="
                      absolute
                      inset-0

                      w-full
                      h-full

                      object-cover

                      group-hover:scale-110

                      transition-transform
                      duration-700
                    "
                  />


                  <div
                    className="
                      absolute
                      inset-0

                      bg-gradient-to-t
                      from-black
                      via-black/20
                      to-transparent
                    "
                  />


                  <span
                    className="
                      hidden
                      md:block

                      absolute

                      top-5
                      left-5

                      px-3
                      py-1

                      rounded-full

                      bg-blue-500

                      text-white

                      text-xs

                      font-bold

                      tracking-wider
                      uppercase
                    "
                  >
                    Featured
                  </span>


                  <span
                    className="
                      hidden
                      md:block

                      absolute

                      bottom-5
                      left-5

                      text-blue-300

                      text-sm

                      uppercase
                      tracking-[0.2em]
                    "
                  >
                    {
                      project.type
                    }
                  </span>

                </div>


                {/* Content */}

                <div
                  className="
                    p-4
                    sm:p-5
                    md:p-7

                    flex
                    flex-col
                  "
                >
                  <p
                    className="
                      md:hidden

                      text-blue-400

                      uppercase
                      tracking-[0.15em]

                      text-[10px]
                      sm:text-xs
                    "
                  >
                    {
                      project.type
                    }
                  </p>


                  <h3
                    className="
                      text-lg
                      sm:text-xl
                      md:text-2xl

                      font-bold

                      mt-1
                      md:mt-0
                    "
                  >
                    {
                      project.title
                    }
                  </h3>


                  <p
                    className="
                      hidden
                      md:block

                      text-gray-400

                      mt-3

                      leading-relaxed
                    "
                  >
                    {
                      project.description
                    }
                  </p>


                  <p
                    className="
                      md:hidden

                      text-gray-400

                      text-xs
                      sm:text-sm

                      mt-2

                      line-clamp-3
                    "
                  >
                    {
                      project.description
                    }
                  </p>


                  <div
                    className="
                      hidden
                      md:flex

                      flex-wrap

                      gap-2

                      mt-5
                    "
                  >
                    {project.tags.map(
                      (tag) => (

                        <span
                          key={tag}

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
                          {tag}
                        </span>

                      )
                    )}
                  </div>


                  <div
                    className="
                      mt-auto
                      pt-4

                      md:mt-7
                      md:pt-5

                      border-t
                      border-gray-800

                      flex
                      items-center
                      justify-between

                      gap-2
                    "
                  >
                    <span
                      className="
                        hidden
                        md:block

                        text-sm
                        text-gray-500
                      "
                    >
                      Showcase Project
                    </span>


                    <span
                      className="
                        text-blue-400

                        text-xs
                        sm:text-sm
                        md:text-base

                        font-semibold

                        group-hover:translate-x-1

                        transition-transform
                      "
                    >
                      View Project →
                    </span>
                  </div>
                </div>

              </motion.div>

            )
          )}
        </div>
      </motion.section>


      {/* =====================================================
          COLLECTIONS
      ===================================================== */}

      <motion.section
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
          amount: 0.1,
        }}

        transition={{
          duration: 0.7,
          delay: 0.1,
          ease: "easeOut",
        }}

        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
          md:px-10

          pb-20
          md:pb-24
        "
      >

        {/* Collections Header */}

        <div
          className="
            flex
            flex-wrap

            items-end
            justify-between

            gap-4

            mb-8
          "
        >
          <div>
            <p
              className="
                text-blue-400

                uppercase
                tracking-[0.25em]

                text-xs
                sm:text-sm

                mb-2
              "
            >
              Archive
            </p>


            <h2
              className="
                text-4xl
                md:text-5xl

                font-black
              "
            >
              Collections
            </h2>


            <p
              className="
                text-gray-400

                mt-4

                max-w-2xl

                text-sm
                sm:text-base
              "
            >
              Browse the archive by creative discipline
              and explore the work inside each collection.
            </p>
          </div>


          <p
            className="
              text-gray-400

              text-sm
              md:text-base
            "
          >
            {
              filteredCategories.length
            }{" "}

            {filteredCategories.length ===
            1
              ? "Collection"
              : "Collections"}
          </p>
        </div>


        {/* =================================================
            FILTER BUTTONS
        ================================================= */}

        <div
          className="
            flex
            flex-wrap

            gap-2
            sm:gap-3
            md:gap-4

            mb-8
            md:mb-10
          "
        >
          {filters.map(
            (filter) => (

              <button
                key={filter}

                type="button"

                onClick={() =>
                  setActiveFilter(
                    filter
                  )
                }

                className="
                  relative
                  overflow-hidden

                  px-4
                  sm:px-5
                  md:px-6

                  py-2

                  rounded-full

                  border
                  border-gray-700

                  hover:border-blue-500

                  transition-colors
                  duration-300

                  text-xs
                  sm:text-sm
                  md:text-base
                "
              >
                {activeFilter ===
                  filter && (

                  <motion.span
                    layoutId="activeGalleryFilter"

                    className="
                      absolute
                      inset-0

                      rounded-full

                      bg-blue-500/20

                      border
                      border-blue-500

                      shadow-[0_0_20px_rgba(59,130,246,0.15)]
                    "

                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />

                )}


                <span
                  className={`
                    relative
                    z-10

                    font-medium

                    transition-colors
                    duration-300

                    ${
                      activeFilter ===
                      filter
                        ? "text-blue-300"
                        : "text-gray-300"
                    }
                  `}
                >
                  {filter}
                </span>

              </button>

            )
          )}
        </div>


        {/* =================================================
            COLLECTION CARDS
        ================================================= */}

        <motion.div
          layout

          className="
            grid
            grid-cols-2
            md:grid-cols-2
            lg:grid-cols-3

            gap-4
            md:gap-6
          "
        >
          <AnimatePresence
            mode="popLayout"
          >
            {filteredCategories.map(
              (collection) => (

                <motion.div
                  layout

                  key={
                    collection.title
                  }

                  onClick={() =>
                    openCollection(
                      collection
                    )
                  }

                  initial={{
                    opacity: 0,
                    y: 20,
                    scale: 0.97,
                  }}

                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}

                  exit={{
                    opacity: 0,
                    y: -15,
                    scale: 0.97,
                  }}

                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}

                  className="
                    group

                    border
                    border-gray-700

                    rounded-xl

                    overflow-hidden

                    bg-black/40

                    backdrop-blur-sm

                    hover:border-blue-500

                    cursor-pointer
                  "
                >

                  {/* Cover */}

                  <div
                    className="
                      h-32
                      sm:h-40
                      md:h-56

                      overflow-hidden

                      relative
                    "
                  >

                    {/* ===============================================
                        VIDEO COVER

                        Only collections with a coverVideo property
                        will use this.

                        At the moment this should only be:
                        Coding Projects
                    =============================================== */}

                    {collection.coverVideo ? (

                      <video
                        src={collection.coverVideo}

                        poster={
                          collection.cover
                        }

                        autoPlay
                        muted
                        loop
                        playsInline

                        preload="metadata"

                        aria-label={
                          `${collection.title} animated cover`
                        }

                        className="
                          w-full
                          h-full

                          object-cover

                          group-hover:scale-110

                          transition-transform
                          duration-700

                          pointer-events-none
                        "
                      />

                    ) : (

                      /* =============================================
                        NORMAL IMAGE COVER
                      ============================================= */

                      <img
                        src={
                          collection.cover
                        }

                        alt={
                          collection.title
                        }

                        loading="lazy"
                        decoding="async"

                        className="
                          w-full
                          h-full

                          object-cover

                          group-hover:scale-110

                          transition-transform
                          duration-700
                        "
                      />

                    )}


                    {/* ===============================================
                        DARK GRADIENT
                    =============================================== */}

                    <div
                      className="
                        absolute
                        inset-0

                        bg-gradient-to-t
                        from-black/80
                        via-transparent
                        to-transparent

                        pointer-events-none
                      "
                    />


                    {/* ===============================================
                        CATEGORY BADGE
                    =============================================== */}

                    <span
                      className="
                        hidden
                        sm:block

                        absolute

                        top-3
                        right-3

                        px-2
                        py-1

                        md:px-3

                        rounded-full

                        bg-black/70

                        border
                        border-gray-700

                        text-[10px]
                        md:text-xs

                        text-gray-300

                        backdrop-blur-sm

                        pointer-events-none
                      "
                    >
                      {
                        collection.category
                      }
                    </span>

                  </div>


                  {/* Content */}

                  <div
                    className="
                      p-3
                      sm:p-4
                      md:p-6
                    "
                  >
                    <h3
                      className="
                        text-base
                        sm:text-lg
                        md:text-2xl

                        font-bold

                        leading-tight
                      "
                    >
                      {
                        collection.title
                      }
                    </h3>


                    <p
                      className="
                        hidden
                        sm:block

                        text-gray-400

                        text-xs
                        md:text-base

                        mt-1
                        md:mt-2
                      "
                    >
                      {
                        collection.subtitle
                      }
                    </p>


                    <div
                      className="
                        flex
                        items-center
                        justify-between

                        gap-2

                        mt-3
                        md:mt-5
                      "
                    >
                      <span
                        className="
                          text-[10px]
                          sm:text-xs
                          md:text-sm

                          text-gray-500
                        "
                      >
                        {
                          collection.items.length
                        }{" "}

                        {collection.items.length ===
                        1
                          ? "Item"
                          : "Items"}
                      </span>


                      <span
                        className="
                          text-blue-400

                          text-[10px]
                          sm:text-xs
                          md:text-base

                          group-hover:translate-x-1

                          transition-transform
                        "
                      >
                        <span className="hidden sm:inline">
                          View
                        </span>

                        {" "}→
                      </span>
                    </div>
                  </div>

                </motion.div>

              )
            )}
          </AnimatePresence>
        </motion.div>


        {/* =================================================
            NO FILTER RESULTS
        ================================================= */}

        <AnimatePresence>
          {filteredCategories.length ===
            0 && (

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              exit={{
                opacity: 0,
              }}

              className="
                border
                border-gray-700

                bg-black/40

                rounded-xl

                p-8
                md:p-10

                text-center

                mt-8
              "
            >
              <h3
                className="
                  text-xl
                  md:text-2xl

                  font-bold
                "
              >
                No collections found
              </h3>


              <p
                className="
                  text-gray-400

                  mt-3

                  text-sm
                  md:text-base
                "
              >
                There are currently no projects under this category.
              </p>
            </motion.div>

          )}
        </AnimatePresence>

      </motion.section>


      {/* =====================================================
          FEATURED WORK LIGHTBOX
      ===================================================== */}

      <GalleryLightbox
        images={
          featuredProjects
        }

        selectedIndex={
          selectedImage
        }

        setSelectedIndex={(
          index
        ) => {
          if (index === null) {
            closeFeaturedProject();
            return;
          }

          changeFeaturedProject(
            index
          );
        }}

        onOpenCollection={
          openFeaturedCollection
        }
      />


      {/* =====================================================
          COLLECTION MODAL
      ===================================================== */}

      <CollectionModal
        collection={
          selectedCollection
        }

        onClose={
          closeCollection
        }
      />


      <Footer />

    </div>
  );
}