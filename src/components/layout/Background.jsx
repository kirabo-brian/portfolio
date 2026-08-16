import { useEffect, useRef } from "react";

export default function Background() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const ensureVideoPlaying = () => {
      if (
        document.visibilityState === "visible" &&
        video.paused
      ) {
        video.play().catch(() => {});
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        ensureVideoPlaying();
      }
    };

    const handleWindowFocus = () => {
      ensureVideoPlaying();
    };

    ensureVideoPlaying();

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    window.addEventListener(
      "focus",
      handleWindowFocus
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      window.removeEventListener(
        "focus",
        handleWindowFocus
      );
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      >
        <source
          src="/videos/background_2.mp4"
          type="video/mp4"
        />
      </video>

      {/* Lighter overlay so the background remains visible */}
      <div
        className="
          absolute
          inset-0
          bg-black/25
          pointer-events-none
        "
      />

    </div>
  );
}