
// ============================================================
// CODING PROJECTS DATA
// ============================================================
//
// Each project can have:
//
// slug
// title
// shortDescription
// description
// role
// status
// technologies
// githubUrl
// demoUrl
// cover
// screenshots
//
// We will later connect this file to a special Coding Projects
// view inside the Gallery.
// ============================================================


// ============================================================
// AUTOMATIC CODING PROJECT MEDIA
// ============================================================
//
// Folder structure:
//
// src/assets/gallery/coding/
// ├── cover.jpg
// ├── fleet-maintenance/
// │   ├── cover.jpg
// │   ├── dashboard.jpg
// │   ├── vehicles.jpg
// │   └── service-requests.jpg
// │
// └── portfolio-website/
//     ├── cover.jpg
//     ├── home.jpg
//     ├── gallery.jpg
//     └── mobile.jpg
//
// ============================================================

const codingMedia = import.meta.glob(
  "../assets/gallery/coding/**/*.{jpg,jpeg,png,webp,gif}",
  {
    eager: true,
    import: "default",
  }
);


// ============================================================
// HELPERS
// ============================================================

function getFileName(path) {
  return path
    .split("/")
    .pop()
    .replace(/\.[^/.]+$/, "");
}


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
// GET PROJECT COVER
// ============================================================

function getProjectCover(folder) {
  const entry =
    Object.entries(codingMedia).find(
      ([path]) => {

        const isCorrectFolder =
          path.includes(
            `/coding/${folder}/`
          );

        const isCover =
          getFileName(path)
            .toLowerCase() === "cover";

        return (
          isCorrectFolder &&
          isCover
        );
      }
    );

  return entry
    ? entry[1]
    : null;
}


// ============================================================
// GET PROJECT SCREENSHOTS
// ============================================================

function getProjectScreenshots(folder) {
  return Object.entries(codingMedia)

    .filter(([path]) =>
      path.includes(
        `/coding/${folder}/`
      )
    )

    .filter(([path]) =>
      getFileName(path)
        .toLowerCase() !== "cover"
    )

    .sort(([pathA], [pathB]) =>
      naturalSort(pathA, pathB)
    )

    .map(([path, src]) => ({
      src,

      title:
        getFileName(path)
          .replace(/[-_]/g, " ")
          .replace(
            /\b\w/g,
            (letter) =>
              letter.toUpperCase()
          ),
    }));
}


// ============================================================
// CODING PROJECTS
// ============================================================

export const codingProjects = [

  // ----------------------------------------------------------
  // FLEET MAINTENANCE SYSTEM
  // ----------------------------------------------------------

  {
  slug:
    "fleet-maintenance",

  title:
    "Fleet Maintenance & Service Bay System",

  shortDescription:
    "A web-based system for managing vehicle maintenance, service requests, job cards, technicians, parts, and workshop operations.",

  description:
    "A digital fleet maintenance and service bay management system designed to replace paper-based workshop tracking and improve the management of vehicle servicing, job cards, technicians, parts, consumables, inspections, and related fleet operations.",

  role:
    "Full-Stack Development",

  status:
    "Development Project",

  technologies: [
    "JavaScript",
    "HTML",
    "CSS",
    "Node.js",
    "Express",
    "PostgreSQL",
  ],

  githubUrl:
    "https://github.com/kirabo-brian/fmsms-system.git",

  demoUrl:
    null,

  cover:
    getProjectCover(
      "fleet-maintenance"
    ),

  screenshots:
    getProjectScreenshots(
      "fleet-maintenance"
    ),
},


  // ----------------------------------------------------------
  // PORTFOLIO WEBSITE
  // ----------------------------------------------------------

  {
  slug:
    "portfolio-website",

  title:
    "Personal Portfolio Website",

  shortDescription:
    "A responsive creative portfolio built to showcase design work, video editing, coding projects, animation, and game development work.",

  description:
    "A responsive portfolio website built to bring together my creative and technical work in one place. The project includes a dynamic Gallery system, collection filtering, image and video lightboxes, mobile swipe navigation, responsive layouts, browser-history navigation, and reusable React components.",

  role:
    "Design & Frontend Development",

  status:
    "Personal Project",

  technologies: [
    "React",
    "Vite",
    "Tailwind CSS",
    "Framer Motion",
    "React Router",
    "JavaScript",
  ],

  githubUrl:
    "PASTE_YOUR_PORTFOLIO_GITHUB_URL_HERE",

  demoUrl:
    null,

  cover:
    getProjectCover(
      "portfolio-website"
    ),

  screenshots:
    getProjectScreenshots(
      "portfolio-website"
    ),
  },

];