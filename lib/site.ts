export const SITE_URL = "https://colonyflow.org";
export const SITE_NAME = "ColonyFlow.org";
export const GAME_NAME = "Colony Flow";
export const GAME_DEVELOPER = "ABI GLOBAL LTD.";
export const APP_STORE_URL = "https://apps.apple.com/mo/app/colony-flow/id6779167923";
export const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.abi.colony.flow";
export const DOWNLOAD_COUNT = "100K+";
export const RATING_VALUE = "4.5";
export const RATING_COUNT = "100000";
export const OG_IMAGE = "/Colony-Flow.jpg";

export const gameDescription =
  "Colony Flow is a relaxing ant colony puzzle game where worker ants carry colorful cubes, follow trails, match color holes, and reveal beautiful pixel art.";

export const gameKeywords = [
  "Colony Flow",
  "Colony Flow walkthrough",
  "Colony Flow level guide",
  "Colony Flow solution",
  "Colony Flow tips",
  "ant colony puzzle",
  "color sorting puzzle",
  "pixel art puzzle",
  "ABI GLOBAL LTD.",
];

export function canonical(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const withSlash = cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
  return `${SITE_URL}${withSlash}`;
}
