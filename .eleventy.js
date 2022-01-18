const yaml = require("js-yaml");
const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("html-minifier");

const ascendingByOrderNumber = (a, b) => a.data.order - b.data.order
const descendingByDate = (a, b) => {
  const d1 = DateTime.fromJSDate(a.date)
  const d2 = DateTime.fromJSDate(b.date)
  console.log('plop', a.date)
  if (d2 < d1) {
    console.log('d2 < d1', d2, d1)
    return -1
  }
  if (d2 > d1) {
    console.log('d2 > d1', d2, d1)
    return 1
  }
  console.log('d2 == d1', d2, d1)
  return 0
}

module.exports = function (eleventyConfig) {
  // Disable automatic use of your .gitignore
  eleventyConfig.setUseGitIgnore(false);

  // Merge data instead of overriding
  eleventyConfig.setDataDeepMerge(true);

  // human readable date
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // Syntax Highlighting for Code blocks
  eleventyConfig.addPlugin(syntaxHighlight);

  // To Support .yaml Extension in _data
  // You may remove this if you can use JSON
  eleventyConfig.addDataExtension("yaml", (contents) =>
    yaml.safeLoad(contents)
  );

  // Copy Static Files to /_Site
  eleventyConfig.addPassthroughCopy({
    "./src/admin/config.yml": "./admin/config.yml",
    "./node_modules/alpinejs/dist/cdn.min.js": "./static/js/alpine.js",
    "./node_modules/prismjs/themes/prism-tomorrow.css":
      "./static/css/prism-tomorrow.css",
  });

  // Copy Image Folder to /_site
  eleventyConfig.addPassthroughCopy("./src/static/img");

  // Copy favicon to route of /_site
  eleventyConfig.addPassthroughCopy("./src/favicon.ico");

  // Minify HTML
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addCollection("latestPosts", function(collectionApi) {
    return collectionApi
        .getFilteredByTag('post')
        .sort(descendingByDate)
        .filter((item, index) => index < 3)
  })

  eleventyConfig.addCollection("condicionesSorted", function(collectionApi) {
    return collectionApi
        .getFilteredByTag('condiciones')
        .sort(ascendingByOrderNumber)
  })

  eleventyConfig.addCollection("segurosSorted", function(collectionApi) {
    return collectionApi
      .getFilteredByTag('seguros')
      .sort(ascendingByOrderNumber)
  })

  eleventyConfig.addCollection("segurosSortedForFooter", function(collectionApi) {
    return collectionApi
        .getFilteredByTag('seguros')
        .sort((a,b) => a.data.footerOrder - b.data.footerOrder)
  })

  eleventyConfig.addCollection("pagesSorted", function(collectionApi) {
    return collectionApi
        .getFilteredByTag('pages')
        .sort(ascendingByOrderNumber)
  })

  eleventyConfig.addCollection("segurosAsCards", function(collectionApi) {
    return collectionApi
      .getFilteredByTag('seguros')
      .sort(ascendingByOrderNumber)
      .map(servicio => ({
        image: servicio.data.previewImage,
        imageAlt: servicio.data.previewImageAlt,
        title: servicio.data.title,
        description: servicio.data.previewDescription,
      }))
  })

  eleventyConfig.addCollection("segurosAsFeatures", function(collectionApi) {
    return collectionApi
      .getFilteredByTag('seguros')
      .sort(ascendingByOrderNumber)
      .map(servicio => ({
        iconName: servicio.data.iconName,
        name: servicio.data.title,
        description: servicio.data.previewDescription,
      }))
  })

  // Let Eleventy transform HTML files as nunjucks
  // So that we can use .html instead of .njk
  return {
    dir: {
      input: "src",
    },
    htmlTemplateEngine: "njk",
  };
};
