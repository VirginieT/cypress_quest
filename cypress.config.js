const { defineConfig } = require("cypress");
const { downloadFile } = require("cypress-downloadfile/lib/addPlugin");

module.exports = defineConfig({
  projectId: 'n6mb5x',
  e2e: {
    setupNodeEvents(on, config) {
      on("task", { downloadFile });
    },
  },
});
