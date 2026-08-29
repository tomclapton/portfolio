// Automatically lists every supported image in src/photos/ so the gallery
// always matches what's on disk. Add or remove a file in that folder and
// rebuild — nothing here needs to be edited.
const fs = require("fs");
const path = require("path");

const PHOTOS_DIR = path.join(__dirname, "..", "photos");
const SUPPORTED = [".jpg", ".jpeg", ".png", ".webp"];

module.exports = () => {
  if (!fs.existsSync(PHOTOS_DIR)) return [];

  return fs
    .readdirSync(PHOTOS_DIR)
    .filter((file) => SUPPORTED.includes(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((file) => ({
      // path relative to src/, used by the responsive-image shortcode
      src: `photos/${file}`,
      alt: "Portfolio photograph",
    }));
};
