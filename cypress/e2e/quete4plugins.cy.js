//! Capture du résultat du test visible dans fixtures/captureFilebin.png


import 'cypress-downloadfile/lib/downloadFileCommand';
import 'cypress-file-upload';

describe("File download test from filebin.net", () => {
  beforeEach(() => {
    cy.visit("https://filebin.net/");
  });

  it("Download a file successfully", () => {
    cy.get("#fileField").attachFile("gold.png");
    cy.contains("It contains 1 uploaded file").should("be.visible");
    cy.contains("Download files").click();
    cy.contains("Zip")
      .invoke("attr", "href")
      .then((downloadLink) => {
        const absulteLink = "https://filebin.net/" + downloadLink;
        cy.log(absulteLink);
        cy.downloadFile(
          absulteLink,
          "mydownloads/zipFiles",
          "downloadedFromCypress.zip"
        );
        cy.readFile("mydownloads/zipFiles/downloadedFromCypress.zip");
      });
  });

  it("Upload a PNG file successfully", () => {
    const fileName = "gold.png";
    cy.fixture(fileName).then(fileContent => {
      cy.get("#fileField").attachFile({
        fileContent: fileContent,
        fileName: fileName,
        mimeType: "image/png"
      });
      cy.contains(fileName).should("be.visible");
    });
  });

});


