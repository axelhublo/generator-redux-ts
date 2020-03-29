const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    this.argument("fileName", { type: String, required: true });
    this.argument("state", { type: String, required: true });
    this.argument("types", { type: Array, required: true });
    this.argument("actionTypesPath", {
      type: String,
      required: false,
      default: "../types/auth.types"
    });
    this.argument("storeTypesPath", {
      type: String,
      required: false,
      default: "../store.types"
    });
    this.options.state = this.options.state
      .split("/")
      .map(e => e.split(":"))
      .reduce((p, c) => {
        p[c[0]] = c[1];
        return p;
      }, {});
    if (this.options.types.length !== Object.keys(this.options.state).length) {
      this.log("Types number should match state keys number");
    }
  }

  writing() {
    const types = this.options.types;
    const fileName = this.options.fileName;
    const state = this.options.state;
    const name = `${fileName[0].toUpperCase()}${fileName.slice(
      1,
      fileName.length
    )}`;
    const actionTypesPath = this.options.actionTypesPath;
    const storeTypesPath = this.options.storeTypesPath;
    // Types template file
    this.fs.copyTpl(
      this.templatePath("name.types.ts"),
      this.destinationPath(`src/store/types/${fileName}.types.ts`),
      {
        name,
        types: types
          .map(
            (e, i, arr) => `\t${e} = "${e}"${i !== arr.length - 1 ? "," : ""}`
          )
          .join("\n")
      }
    );
    // Reducer template file
    this.fs.copyTpl(
      this.templatePath("name.reducer.ts"),
      this.destinationPath(`src/store/reducers/${fileName}.reducer.ts`),
      {
        name,
        fileName,
        storeTypesPath,
        state,
        types
      }
    );
    // Actions template file
    this.fs.copyTpl(
      this.templatePath("name.actions.ts"),
      this.destinationPath(`src/store/actions/${fileName}.actions.ts`),
      {
        actionTypesPath,
        storeTypesPath,
        types,
        name,
        state
      }
    );
  }
};
