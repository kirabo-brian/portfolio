import { useEffect, useRef } from "react";
import { videoPreview } from "../../data/videoPreviews";

// Fetch decorative video only while visible on a desktop-sized viewport.
// Phones, data-saving connections and reduced-motion users keep the poster.
export default function PreviewVideo({ src, poster, className, ...props }) {
  const videoRef = useRef(null);
  const preview = videoPreview(src);

  useEffect(() => {
    const video = videoRef.current;
    if (!preview) return;
    const preference = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    const connection = navigator.connection;
    let visible = false;
    const syncPlayback = () => {
      const allowed = preference.matches && !connection?.saveData;
      if (allowed && visible && document.visibilityState === "visible") {
        if (!video.getAttribute("src")) video.src = preview;
        video.play().catch(() => {});
      } else {
        video.pause();
        if (!allowed && video.hasAttribute("src")) {
          video.removeAttribute("src");
          video.load();
        }
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    }, { threshold: 0.1 });
    observer.observe(video);
    preference.addEventListener("change", syncPlayback);
    connection?.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", syncPlayback);
      connection?.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [preview]);

  return <video ref={videoRef} poster={poster} muted loop playsInline preload="none" className={className} {...props} />;
}
