function customLoader(source) {
  console.log("Custom loader called");
  return source.replace(/console\.log/g, "console.warn");
}
exports.default = customLoader;
