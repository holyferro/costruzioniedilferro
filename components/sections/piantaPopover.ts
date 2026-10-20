// Which floor-plan card is open, as pure transitions. Mouse: hover opens a card, leaving closes it
// after a short delay, a click pins it so leaving no longer closes it. Touch and keyboard: tap or
// Enter toggles. No React, no DOM: `node --test` loads it.

export type PopoverState = { active: number | null; pinned: boolean };

export type PopoverEvent =
  | { type: "hover"; i: number }
  /** The close delay after the pointer left a trigger or the card ran out. */
  | { type: "leaveTimeout" }
  | { type: "pick"; i: number; mouse: boolean }
  | { type: "close" };

export const closed: PopoverState = { active: null, pinned: false };

export function nextPopover(s: PopoverState, e: PopoverEvent): PopoverState {
  switch (e.type) {
    case "hover":
      return { active: e.i, pinned: e.i === s.active && s.pinned };
    case "leaveTimeout":
      return s.pinned ? s : closed;
    case "pick":
      return !e.mouse && s.active === e.i ? closed : { active: e.i, pinned: true };
    case "close":
      return closed;
  }
}
