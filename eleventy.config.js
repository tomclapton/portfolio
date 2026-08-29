const Image = require("@11ty/eleventy-img");
const path = require("path");

module.exports = function (eleventyConfig) {
  // ---- Static passthroughs -------------------------------------------
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/videos": "videos" });
  eleventyConfig.addPassthroughCopy({ "src/favicon": "/" });
  eleventyConfig.addWatchTarget("src/css");
  eleventyConfig.addWatchTarget("src/js");
  eleventyConfig.addWatchTarget("src/photos");
  eleventyConfig.addWatchTarget("src/videos");

  // ---- Responsive photo shortcode ---------------------------------------
  // Generates WebP + JPEG at a few widths for every gallery thumbnail,
  // plus a larger set for the lightbox, with lazy loading built in.
  eleventyConfig.addNunjucksAsyncShortcode(
    "photo",
    async function (src, alt, sizes, widths) {
      const inputPath = path.join("src", src);
      const metadata = await Image(inputPath, {
        widths: [...widths, null],
        formats: ["webp", "jpeg"],
        outputDir: "dist/images/optimized",
        urlPath: "/images/optimized/",
        filenameFormat: function (id, srcPath, width, format) {
          const name = path
            .basename(srcPath, path.extname(srcPath))
            .replace(/[^a-z0-9-]/gi, "-");
          return `${name}-${width}w.${format}`;
        },
      });

      return Image.generateHTML(
        metadata,
        { alt, sizes, loading: "lazy", decoding: "async" },
        { whitespaceMode: "inline" }
      );
    }
  );

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
  };
};
