import PreviewVideo from "../media/PreviewVideo";

export default function Background() {
  return (
    <div aria-hidden="true" className="fixed inset-0 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#172554,transparent_65%)]" />

      <PreviewVideo
        src="/videos/background_2.mp4"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

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
