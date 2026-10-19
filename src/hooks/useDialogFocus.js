import { useEffect, useRef } from "react";

const dialogs = [];
let originalRootInert = false;
const topDialog = () => [...dialogs].sort((a, b) => b.priority - a.priority)[0];
const focusable = element => [...element.querySelectorAll('button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])')]
  .filter(node => !node.disabled && !node.closest('[inert]') && node.getClientRects().length);

function syncLayers() {
  const top = topDialog();
  for (const entry of dialogs) {
    entry.element.inert = entry !== top;
    entry.element.setAttribute("aria-modal", String(entry === top));
  }
  const root = document.getElementById("root");
  if (root) root.inert = dialogs.length ? true : originalRootInert;
}

export default function useDialogFocus(open, onClose, priority) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open || !ref.current) return;
    const element = ref.current;
    const previousFocus = document.activeElement;
    if (!dialogs.length) originalRootInert = document.getElementById("root")?.inert || false;
    const entry = { element, priority };
    dialogs.push(entry);
    syncLayers();
    const frame = requestAnimationFrame(() => {
      if (topDialog() === entry) (focusable(element)[0] || element).focus({ preventScroll: true });
    });
    const keydown = event => {
      if (topDialog() !== entry) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeRef.current();
      } else if (event.key === "Tab") {
        const controls = focusable(element);
        const first = controls[0] || element;
        const last = controls.at(-1) || element;
        if (!element.contains(document.activeElement) || document.activeElement === element || !controls.length ||
            (event.shiftKey && document.activeElement === first) ||
            (!event.shiftKey && document.activeElement === last)) {
          event.preventDefault();
          (event.shiftKey ? last : first).focus();
        }
      }
    };
    window.addEventListener("keydown", keydown, true);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("keydown", keydown, true);
      dialogs.splice(dialogs.indexOf(entry), 1);
      element.inert = true;
      syncLayers();
      requestAnimationFrame(() => {
        const top = topDialog();
        if (previousFocus?.isConnected && !previousFocus.closest('[inert]') &&
            (!top || top.element.contains(previousFocus))) {
          previousFocus.focus({ preventScroll: true });
        } else if (top) (focusable(top.element)[0] || top.element).focus({ preventScroll: true });
      });
    };
  }, [open, priority]);
  return ref;
}
