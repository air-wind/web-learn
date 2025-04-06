class MyPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync("MyPlugin", (compilation, callback) => {
      // Do something with the compilation
      console.log("The compilation is starting...");

      // Continue with the build process
      callback();
    });
  }
}

export { MyPlugin };
