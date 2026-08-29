// Automatically lists every supported video in src/videos/ so the video
// section always matches what's on disk. Add or remove a file in that
// folder and rebuild — nothing here needs to be edited.
const fs = require("fs");
const path = require("path");

const VIDEOS_DIR = path.join(__dirname, "..", "videos");
const SUPPORTED = { ".mp4": "video/mp4", ".webm": "video/webm" };

module.exports = () => {
  if (!fs.existsSync(VIDEOS_DIR)) return [];

  return fs
    .readdirSync(VIDEOS_DIR)
    .filter((file) => SUPPORTED[path.extname(file).toLowerCase()])
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((file) => ({
      src: `/videos/${file}`,
      type: SUPPORTED[path.extname(file).toLowerCase()],
    }));
};
