const withPlugins = require("next-compose-plugins");
const withSvg = require("next-plugin-svgr");

module.exports = withPlugins([withSvg], { future: { webpack5: true } });
