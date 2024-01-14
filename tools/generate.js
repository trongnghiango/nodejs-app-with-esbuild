// eslint-disable-next-line node/no-unpublished-require
const { generateTemplateFiles } = require("generate-template-files");

generateTemplateFiles([
  {
    option: "Create Moduler",
    defaultCase: "(camelCase)",
    entry: {
      folderPath: "./tools/templates",
    },
    stringReplacers: ["__controller__", "__service__", "__model__"],
    output: {
      path: "./src/api/v1",
      pathAndFileNameDefaultCase: "(lowerCase)",
      // overwrite: true,
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
  {
    option: "Create Controller",
    defaultCase: "(camelCase)",
    entry: {
      folderPath: "./tools/templates/controllers",
    },
    stringReplacers: ["__controller__"],
    output: {
      path: "./src/api/v1/controllers",
      pathAndFileNameDefaultCase: "(lowerCase)",
      // overwrite: true,
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
  {
    option: "Create Service",
    defaultCase: "(camelCase)",
    entry: {
      folderPath: "./tools/templates/services",
    },
    stringReplacers: ["__service__"],
    output: {
      path: "./src/api/v1/services",
      pathAndFileNameDefaultCase: "(lowerCase)",
      overwrite: true,
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
  {
    option: "Create Model",
    defaultCase: "(camelCase)",
    entry: {
      folderPath: "./tools/templates/",
    },
    stringReplacers: ["__model__"],
    output: {
      path: "./src/api/v1/models",
      pathAndFileNameDefaultCase: "(lowerCase)",
      overwrite: true,
    },
    onComplete: (results) => {
      console.log(`results`, results);
    },
  },
]);
