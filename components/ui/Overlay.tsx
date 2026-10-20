"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { lockScroll } from "@/lib/scrollLock";

/** Full-screen modal on a native <dialog>: the browser makes the page behind inert, moves focus into
 * the panel and gives it back on close. Esc and a click outside the panel call onClose; the parent
 * owns `open`. Page scroll is locked while open. Backdrop and panel transitions: `.overlay` in
 * globals.css. `className`/`style` style the panel. */
export function Overlay({
  open,
  onClose,
  label,
  className,
  style,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const unlock = lockScroll();
    return () => unlock();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className="overlay fixed inset-0 m-0 h-full max-h-none w-full max-w-none items-center justify-center border-0 bg-transparent p-3 open:flex sm:p-6"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      // The browser can still close it without a cancel event (repeated Esc): keep the parent in sync.
      onClose={() => open && onClose()}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={className} style={style}>
        {children}
      </div>
    </dialog>
  );
}
