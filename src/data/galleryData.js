// ============================================================
// AUTOMATIC GALLERY MEDIA SYSTEM
// ============================================================
//
// Supported images:
// jpg, jpeg, png, webp, gif
//
// Supported videos:
// mp4, webm
//
// BASIC WORKFLOW
//
// 1. Put media inside the correct folder.
//
// Example:
// src/assets/gallery/logos/logo1.jpg
//
// 2. The gallery automatically detects it.
//
// 3. cover.jpg / cover.png becomes the collection cover.
//
// 4. Videos are automatically detected.
//
// 5. Optional video poster:
//
// animation1.mp4
// animation1-poster.jpg
//
// The "-poster" image is used as the video's thumbnail
// but does NOT appear as a separate gallery image.
// ============================================================


const galleryMedia = import.meta.glob(
  "../assets/gallery/**/*.{jpg,jpeg,png,webp,gif,mp4,webm}",
  {
    eager: true,
    import: "default",
  }
);


// ============================================================
// SUPPORTED FILE TYPES
// ============================================================

const imageExtensions = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "gif",
];

const videoExtensions = [
  "mp4",
  "webm",
];


// ============================================================
// COLLECTION CONFIGURATION
// ============================================================
//
// You define each collection here.
// Individual media files do NOT need to be listed here.
// ============================================================

const collectionConfig = [
  {
    folder: "logos",
    title: "Logos",
    subtitle: "Brand Identity",
    category: "Design",
  },

  {
    folder: "branding",
    title: "Branding",
    subtitle: "Visual Systems",
    category: "Design",
  },

  {
    folder: "posters",
    title: "Posters",
    subtitle: "Print & Digital",
    category: "Design",
  },

  {
    folder: "graphics",
    title: "Graphics Design",
    subtitle: "Creative Projects",
    category: "Design",
  },

  {
    folder: "illustrations",
    title: "Illustrations",
    subtitle: "Vector Artwork",
    category: "Art",
  },

  {
    folder: "video",
    title: "Video Editing",
    subtitle: "Edited Content",
    category: "Video",
  },

  {
    folder: "youtube",
    title: "YouTube Gaming",
    subtitle: "Gaming Content",
    category: "Video",

    // Replace this with your actual channel URL
    channelUrl:
      "https://youtube.com/@rkbrian2k19?si=Y4CDKloWRgwq6FDp",
  },

  {
    folder: "digital",
    title: "Digital Art",
    subtitle: "Paintings & Concepts",
    category: "Art",
  },

  {
    folder: "hand-drawn",
    title: "Hand Drawn Art",
    subtitle: "Sketchbook Work",
    category: "Art",
  },

  {
    folder: "animation",
    title: "Animation",
    subtitle: "Motion & Animation",
    category: "Design",
  },

  {
    folder: "unreal-engine",
    title: "Unreal Engine",
    subtitle: "Game Development",
    category: "Development",
  },

  {
    folder: "coding",
    title: "Coding Projects",
    subtitle: "Software Development",
    category: "Development",
  },
];


// ============================================================
// OPTIONAL MEDIA INFORMATION
// ============================================================
//
// Key format:
//
// "folder/filename-without-extension"
//
// Example:
// "youtube/resident-evil-requiem-thumbnail"
//
// Supported optional metadata:
//
// title
// description
// youtubeUrl
// ============================================================

const mediaMetadata = {

  // ----------------------------------------------------------
  // ANIMATION EXAMPLE
  // ----------------------------------------------------------

  "animation/animation-test-final2": {
    title: "Character Motion Study",

    description:
      "An animation exercise exploring movement, timing and character motion.",
  },


  // ----------------------------------------------------------
  // YOUTUBE EXAMPLES
  // ----------------------------------------------------------
  //
  // Replace these filenames with the actual filenames
  // you place inside src/assets/gallery/youtube/
  //
  // Also replace the URLs with your real YouTube links.
  // ----------------------------------------------------------

   "youtube/resident-evil-requiem-thumbnail": {
      title: "Resident Evil Requiem or 9.....but I have Questions!!",
  
      description:
        "Really good looking game and amazing game mechanics. Hope you guys enjoy.",
  
      youtubeUrl:
        "https://youtu.be/Mpl_IjhVbz8?si=vQfKEpFdbFDWVORW",
    },

    "youtube/ghost-of-yotei-thumbnail": {
      title: "Ghost of Yōtei… Is the Perfect Sequel, Baby!",
    
      description:
        "Yo baby! I finally got my hands on Ghost of Yōtei, and you already know — we’re running this on hard mode. If it’s anything like Ghost of Tsushima, one of my favorite open-world games ever, then we’re in for something special. Join me as we explore the lands of Ezo and follow Atsu’s revenge journey!",
    
      youtubeUrl:
        "https://youtu.be/Sz4tUaNNIAU?si=pVHKFfwdKtPETHGx",
    },

    "youtube/doom-the-dark-ages-thumbnail": {
      title: "DOOM: The Dark Ages.... But You're the Villain!",
    
      description:
        "Yo, Doom: The Dark Ages is here baby, and you play as the villain! Anyways, help leave a like, sub, and check-out the other videos on the channel, PEACE!",
    
      youtubeUrl:
        "https://youtu.be/rK_StDEkCLE?si=A6lrRbtUiSLmjBro",
      },

  // "youtube/ghost-of-yotei-thumbnail": {
  //   title: "Ghost of Yotei",
  //
  //   description:
  //     "Gaming thumbnail created for my Ghost of Yotei content.",
  //
  //   youtubeUrl:
  //     "https://www.youtube.com/watch?v=YOUR_VIDEO_ID",
  // },


  // "youtube/gameplay-edit": {
  //   title: "Gameplay Editing Sample",
  //
  //   description:
  //     "A short gameplay edit demonstrating pacing, cuts, audio and transitions.",
  // },

};


// ============================================================
// HELPER — FILE EXTENSION
// ============================================================

function getExtension(path) {
  return path
    .split(".")
    .pop()
    .toLowerCase();
}


// ============================================================
// HELPER — FILE NAME WITHOUT EXTENSION
// ============================================================

function getFileName(path) {
  return path
    .split("/")
    .pop()
    .replace(/\.[^/.]+$/, "");
}


// ============================================================
// HELPER — FORMAT GENERATED TITLES
// ============================================================
//
// Example:
//
// unreal-engine-test2
//
// becomes:
//
// Unreal Engine Test 2
// ============================================================

function formatTitle(filename) {
  return filename
    .replace(/[-_]/g, " ")
    .replace(/([a-zA-Z])([0-9])/g, "$1 $2")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}


// ============================================================
// HELPER — NATURAL FILE SORTING
// ============================================================

function naturalSort(a, b) {
  return a.localeCompare(
    b,
    undefined,
    {
      numeric: true,
      sensitivity: "base",
    }
  );
}


// ============================================================
// HELPER — CHECK IF FILE BELONGS TO FOLDER
// ============================================================

function isInsideFolder(path, folder) {
  return path.includes(
    `/gallery/${folder}/`
  );
}


// ============================================================
// GET COLLECTION COVER
// ============================================================

function getCover(folder) {
  const coverEntry =
    Object.entries(galleryMedia).find(
      ([path]) => {

        if (!isInsideFolder(path, folder)) {
          return false;
        }

        return (
          getFileName(path).toLowerCase() ===
          "cover"
        );

      }
    );

  return coverEntry
    ? coverEntry[1]
    : null;
}

// ============================================================
// GET OPTIONAL COLLECTION COVER VIDEO
// ============================================================
//
// Example:
//
// src/assets/gallery/coding/cover-video.mp4
//
// Only collections that contain a file called:
// cover-video.mp4
// or
// cover-video.webm
//
// will receive a coverVideo property.
// ============================================================

function getCoverVideo(folder) {
  const videoEntry =
    Object.entries(galleryMedia).find(
      ([path]) => {

        if (!isInsideFolder(path, folder)) {
          return false;
        }

        const extension =
          getExtension(path);

        if (
          !videoExtensions.includes(extension)
        ) {
          return false;
        }

        return (
          getFileName(path).toLowerCase() ===
          "cover-video"
        );
      }
    );

  return videoEntry
    ? videoEntry[1]
    : null;
}

// ============================================================
// FIND OPTIONAL VIDEO POSTER
// ============================================================
//
// Example:
//
// gameplay-edit.mp4
// gameplay-edit-poster.jpg
//
// If no poster exists, use collection cover.
// ============================================================

function getVideoPoster(
  folder,
  videoFilename
) {
  const wantedPosterName =
    `${videoFilename}-poster`;

  const posterEntry =
    Object.entries(galleryMedia).find(
      ([path]) => {

        if (!isInsideFolder(path, folder)) {
          return false;
        }

        const extension =
          getExtension(path);

        if (
          !imageExtensions.includes(extension)
        ) {
          return false;
        }

        return (
          getFileName(path).toLowerCase() ===
          wantedPosterName.toLowerCase()
        );

      }
    );

  return posterEntry
    ? posterEntry[1]
    : getCover(folder);
}


// ============================================================
// GET OPTIONAL CUSTOM METADATA
// ============================================================

function getMetadata(
  folder,
  filename
) {
  return (
    mediaMetadata[
      `${folder}/${filename}`
    ] || {}
  );
}


// ============================================================
// GET COLLECTION ITEMS
// ============================================================

function getCollectionItems(folder) {
  return Object.entries(galleryMedia)

    // Only files inside this collection
    .filter(([path]) =>
      isInsideFolder(path, folder)
    )


    // Do not show collection covers as normal items
    .filter(([path]) => {

      const filename =
        getFileName(path).toLowerCase();

      return (
        filename !== "cover" &&
        filename !== "cover-video"
      );

    })


    // Do not show video posters as normal items
    .filter(([path]) => {

      const filename =
        getFileName(path).toLowerCase();

      return !filename.endsWith(
        "-poster"
      );

    })


    // Natural filename sorting
    .sort(([pathA], [pathB]) =>
      naturalSort(pathA, pathB)
    )


    // Convert media files to gallery item objects
    .map(([path, src]) => {

      const extension =
        getExtension(path);

      const filename =
        getFileName(path);

      const metadata =
        getMetadata(
          folder,
          filename
        );


      // ======================================================
      // VIDEO
      // ======================================================

      if (
        videoExtensions.includes(extension)
      ) {
        return {
          type: "video",

          src,

          poster:
            getVideoPoster(
              folder,
              filename
            ),

          title:
            metadata.title ||
            formatTitle(filename),

          description:
            metadata.description || "",

          // Optional direct YouTube video link
          youtubeUrl:
            metadata.youtubeUrl || null,
        };
      }


      // ======================================================
      // IMAGE
      // ======================================================

      if (
        imageExtensions.includes(extension)
      ) {
        return {
          type: "image",

          src,

          title:
            metadata.title ||
            formatTitle(filename),

          description:
            metadata.description || "",

          // Optional direct YouTube video link
          youtubeUrl:
            metadata.youtubeUrl || null,
        };
      }


      return null;

    })


    // Remove unsupported/null entries
    .filter(Boolean);
}


// ============================================================
// GENERATE GALLERY COLLECTIONS
// ============================================================

export const galleryCollections =
  collectionConfig.map(
    (collection) => ({
      ...collection,

      cover:
        getCover(collection.folder),

      coverVideo:
        getCoverVideo(
          collection.folder
        ),

      items:
        getCollectionItems(
          collection.folder
        ),
    })
  );


// ============================================================
// COLLECTION LOOKUP HELPER
// ============================================================

function findCollection(folder) {
  return galleryCollections.find(
    (collection) =>
      collection.folder === folder
  );
}


// ============================================================
// FEATURED PROJECTS
// ============================================================

export const featuredProjects = [

  {
    title:
      "Unreal Engine Journey",

    type:
      "Game Development",

    description:
      "Environments, mechanics, blueprints and experiments created while learning Unreal Engine 5.",

    image:
      findCollection(
        "unreal-engine"
      )?.cover,

    collection:
      "unreal-engine",

    tags: [
      "Unreal Engine 5",
      "Blueprints",
      "Lighting",
    ],
  },


  {
    title:
      "Logo Collection",

    type:
      "Brand Identity",

    description:
      "A collection of logos, branding concepts and visual identity projects.",

    image:
      findCollection(
        "logos"
      )?.cover,

    collection:
      "logos",

    tags: [
      "Logo Design",
      "Branding",
      "Identity",
    ],
  },


  {
    title:
      "YouTube Gaming",

    type:
      "Content Creation",

    description:
      "Gaming videos, livestream-style content and video editing projects.",

    image:
      findCollection(
        "youtube"
      )?.cover,

    collection:
      "youtube",

    tags: [
      "Editing",
      "Gaming",
      "Content",
    ],
  },

  
];