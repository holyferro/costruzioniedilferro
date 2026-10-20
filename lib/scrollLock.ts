/** Locks page scroll and returns the unlock function. iOS-safe: position:fixed avoids the jump to the top
 * that overflow:hidden causes on Mobile Safari when the page is scrolled down. Header.tsx reads
 * `body.style.position === "fixed"` to ignore scroll events while locked.
 * Pass `false` to the unlock function to skip restoring the scroll position (e.g. after navigating). */
export function lockScroll() {
  const y = window.scrollY;
  const style = document.body.style;
  style.position = "fixed";
  style.top = `-${y}px`;
  style.width = "100%";
  return (restore = true) => {
    style.position = "";
    style.top = "";
    style.width = "";
    if (restore) window.scrollTo({ top: y, behavior: "instant" });
  };
}
