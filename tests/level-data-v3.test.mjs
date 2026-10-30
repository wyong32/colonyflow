import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const levels = JSON.parse(fs.readFileSync("data/levels.json", "utf8"));

test("level records remain ordered, unique, and limited to source rows", () => {
  assert.equal(levels.length, 193);
  const ids = levels.map((level) => Number(level.id));
  assert.deepEqual(ids, [...ids].sort((a, b) => a - b));
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(Math.max(...ids), 196);
  assert.deepEqual(
    Array.from({ length: 196 }, (_, index) => index + 1).filter((id) => !ids.includes(id)),
    [80, 97, 121],
  );
});

test("first twenty levels expose workflow v3 assets and video metadata", () => {
  const pilot = levels.filter((level) => Number(level.id) <= 20);
  assert.equal(pilot.length, 20);
  for (const level of pilot) {
    assert.equal(level.coverImage, `/levels/${level.id}/cover.webp`);
    assert.ok(Array.isArray(level.guideImages) && level.guideImages.length >= 3);
    assert.match(level.videoUploadDate || "", /^\d{4}-\d{2}-\d{2}T/);
    assert.match(level.videoDurationIso || "", /^PT/);
  }
});
