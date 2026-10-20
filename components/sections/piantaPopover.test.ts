import { test } from "node:test";
import assert from "node:assert/strict";
import { closed, nextPopover, type PopoverEvent } from "./piantaPopover.ts";

const run = (...events: PopoverEvent[]) => events.reduce(nextPopover, closed);

test("mouse: hover opens, leaving closes", () => {
  assert.deepEqual(run({ type: "hover", i: 1 }), { active: 1, pinned: false });
  assert.deepEqual(run({ type: "hover", i: 1 }, { type: "leaveTimeout" }), closed);
});

test("mouse: a click pins the card, leaving keeps it", () => {
  const s = run(
    { type: "hover", i: 1 },
    { type: "pick", i: 1, mouse: true },
    { type: "leaveTimeout" },
  );
  assert.deepEqual(s, { active: 1, pinned: true });
  // Moving the pointer back over the pinned card keeps it pinned.
  assert.deepEqual(nextPopover(s, { type: "hover", i: 1 }), { active: 1, pinned: true });
  // Hovering another marker unpins.
  assert.deepEqual(nextPopover(s, { type: "hover", i: 2 }), { active: 2, pinned: false });
});

test("touch and keyboard: tap toggles, tapping another switches", () => {
  const tap = (i: number): PopoverEvent => ({ type: "pick", i, mouse: false });
  assert.deepEqual(run(tap(0)), { active: 0, pinned: true });
  assert.deepEqual(run(tap(0), tap(0)), closed);
  assert.deepEqual(run(tap(0), tap(2)), { active: 2, pinned: true });
});

test("close always closes", () => {
  assert.deepEqual(run({ type: "pick", i: 1, mouse: true }, { type: "close" }), closed);
});
