import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("public app sources use current metadata and affiliate placements", async () => {
  const paths = [
    "app/layout.tsx",
    "app/levels/layout.tsx",
    "app/blog/layout.tsx",
    "app/download/layout.tsx",
    "app/about-us/layout.tsx",
    "app/contact-us/layout.tsx",
    "app/privacy-policy/layout.tsx",
    "app/terms-of-service/layout.tsx",
    "app/levels/page.tsx",
    "app/blog/page.tsx",
    "app/download/page.tsx",
    "app/about-us/page.tsx",
    "app/contact-us/page.tsx",
    "app/privacy-policy/page.tsx",
    "app/terms-of-service/page.tsx",
  ];
  const combined = (await Promise.all(paths.map(source))).join("\n");

  assert.doesNotMatch(combined, /July 2026/i);
  assert.doesNotMatch(combined, /@ColonyFlowGuide/);
  assert.doesNotMatch(combined, /GptAd/);
  assert.match(combined, /AffiliateAd/);
  assert.match(combined, /siteDescription/);
});

test("screenshot matching route excludes third-party site scripts", async () => {
  const [layout, scripts, finder] = await Promise.all([
    source("app/layout.tsx"),
    source("components/site-scripts.tsx"),
    source("app/find-level/page.tsx"),
  ]);

  assert.match(layout, /<SiteScripts\s*\/>/);
  assert.doesNotMatch(layout, /googletagmanager|adsbygoogle|AffiliateGlobalAds/);
  assert.match(scripts, /pathname\.startsWith\("\/find-level"\)/);
  assert.match(scripts, /return null/);
  assert.doesNotMatch(finder, /AffiliateAd/);
});

test("sitemap uses stable dates and publishes the screenshot finder", async () => {
  const sitemap = await source("app/sitemap.ts");

  assert.match(sitemap, /2026-10-30/);
  assert.match(sitemap, /find-level/);
  assert.doesNotMatch(sitemap, /lastModified:\s*new Date\(\)/);
});

test("levels page and footer expose the main guide routes", async () => {
  const [levels, footer, readme] = await Promise.all([
    source("app/levels/page.tsx"),
    source("components/footer.tsx"),
    source("README.md"),
  ]);

  assert.match(levels, /<h1/);
  assert.match(levels, /All Levels Walkthroughs/);
  assert.match(levels, /\/find-level\//);
  assert.match(footer, /\/find-level\//);
  assert.match(readme, /https:\/\/colonyflow\.org\/find-level\//);
  assert.doesNotMatch(readme, /Vercel|GitHub|new-game-site-launch-workflow/i);
});

test("level search inputs have stable labels, ids, and names", async () => {
  const [navbar, hero, dialog] = await Promise.all([
    source("components/layout/site-navbar.tsx"),
    source("components/home/hero-section.tsx"),
    source("components/level/level-search.tsx"),
  ]);
  const combined = `${navbar}\n${hero}\n${dialog}`;

  assert.match(combined, /site-level-search/);
  assert.match(combined, /hero-level-search/);
  assert.match(combined, /level-dialog-search/);
  assert.ok((combined.match(/name="level"/g) || []).length >= 3);
});

test("mobile navigation and secondary text meet the local accessibility contract", async () => {
  const [navbar, styles] = await Promise.all([
    source("components/layout/site-navbar.tsx"),
    source("app/globals.css"),
  ]);

  assert.match(navbar, /aria-label=\{mobileMenuOpen \? "Close navigation" : "Open navigation"\}/);
  assert.match(navbar, /aria-expanded=\{mobileMenuOpen\}/);
  assert.match(styles, /--muted-foreground:\s*30 8% 42%/);
  assert.match(styles, /--primary:\s*25 87% 34%/);
});
