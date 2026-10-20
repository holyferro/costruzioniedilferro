import { test } from "node:test";
import assert from "node:assert/strict";
import { H, inkAt, inkLowest, inkY } from "./inkSweep.ts";

test("the middle of the ink touches the image bottom when the section unsticks", () => {
  assert.ok(Math.abs(inkLowest(inkY(inkAt(1))) - H) < 0.5);
});

test("the render already covers the top of the image when the section sticks", () => {
  assert.ok(inkY(inkAt(0)) > 0);
});

test("the sweep runs from nothing to complete and never goes back", () => {
  assert.equal(inkAt(-Infinity), 0);
  assert.equal(inkAt(Infinity), 1); // prefers-reduced-motion
  let prev = -1;
  for (let p = -2; p <= 3; p += 0.01) {
    assert.ok(inkAt(p) >= prev);
    prev = inkAt(p);
  }
});
