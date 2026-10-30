import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const guides = JSON.parse(fs.readFileSync("data/level-guides.json", "utf8"));

test("verified Level 1 guide is specific and omits internal production labels", () => {
  const guide = guides["1"];
  assert.ok(guide, "expected a verified Level 1 guide");
  assert.match(guide.quickAnswer, /orange 14/i);
  assert.match(guide.quickAnswer, /yellow 15/i);
  assert.ok(guide.steps.length >= 5);

  const publishedCopy = JSON.stringify(guide);
  for (const forbidden of [
    "frame-verified",
    "video analysis",
    "video checkpoint",
    "verified tap order",
    "source transparency",
    "how this guide was verified",
    "00:05",
    "00:12",
    "00:17",
  ]) {
    assert.doesNotMatch(publishedCopy, new RegExp(forbidden, "i"));
  }
});
