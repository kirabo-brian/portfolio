import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import pages from "../../data/pageMetadata.json";

export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const page = pages[pathname.replace(/\/$/, "") || "/"] || pages["/"];
    document.title = page.title;
    for (const [selector, content] of [
      ['meta[name="description"]', page.description],
      ['meta[property="og:title"]', page.title],
      ['meta[property="og:description"]', page.description],
      ['meta[name="twitter:title"]', page.title],
      ['meta[name="twitter:description"]', page.description],
    ]) document.querySelector(selector)?.setAttribute("content", content);
  }, [pathname]);
  return null;
}
