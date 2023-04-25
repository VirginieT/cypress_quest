const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'n6mb5x',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
