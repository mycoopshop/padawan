module.exports = {
  "Create/take/delete a questionnaire": function(browser) {
    browser.windowSize("current", "1200", "769"); // setting window size for this test
    browser.url("http://localhost:3000").waitForElementVisible("body", 2000);

    adminLogin(browser);

    // navigate to admin qnaire
    browser.waitForElementVisible("#nav-tools", 2000).click("#nav-tools");
    browser.verify.visible("#nav-qnaireList").click("#nav-qnaireList");

    createQnaire(browser);
    takeQnaire(browser);

    // navigate to admin qnaire again
    browser.click("#nav-tools");
    browser.verify.visible("#nav-qnaireList").click("#nav-qnaireList");

    deleteQnaire(browser);

    browser.end();
  }
};

function adminLogin(browser) {
  browser.verify
    .visible("#at-field-email")
    .setValue("#at-field-email", "admin@mydomain.com");
  browser.verify
    .visible("#at-field-password")
    .setValue("#at-field-password", "admin");
  browser.verify.visible("#at-btn").click("#at-btn");
}

function createQnaire(browser) {
  browser.verify
    .visible("#new-qnaire-title")
    .setValue("#new-qnaire-title", "This is a test qnaire run by nightwatch");
  browser.verify
    .visible("#new-qnaire-descr")
    .setValue(
      "#new-qnaire-descr",
      "This is a test description run by nightwatch"
    );
  browser.verify
    .visible("#create-qnaire")
    .click("#create-qnaire")
    .useXpath()
    .waitForElementVisible(
      "//span[text()='This is a test qnaire run by nightwatch']",
      1000
    )
    .click("//span[text()='This is a test qnaire run by nightwatch']")
    .useCss()
    .clearValue("#q-new-label");
  browser.verify.visible("#q-new-label").setValue("#q-new-label", "question 1");
  browser.verify
    .visible("#q-new-condition")
    .setValue("#q-new-condition", "condition for question 1");
  browser.verify
    .visible("#q-new-text")
    .setValue("#q-new-text", "Hello this is question 1");
  browser.verify.visible("#create-question").click("#create-question");
  browser.verify
    .visible("#q-question-1-label")
    .clearValue("#q-new-label")
    .setValue("#q-new-label", "question 2")
    .setValue("#q-new-condition", "condition for question 2")
    .setValue("#q-new-text", "Hello this is question 2")
    .click("#create-question");
  browser.verify.visible("#q-question-2-label");
}

function takeQnaire(browser) {
  browser
    .click("#nav-assessments")
    .useXpath()
    .waitForElementVisible(
      "//b[text()='This is a test qnaire run by nightwatch']",
      3000
    )
    .moveToElement(
      "//b[text()='This is a test qnaire run by nightwatch']",
      630,
      0
    )
    .mouseButtonClick(0);
  browser
    .waitForElementVisible("//div[text()='Hello this is question 1']", 3000)
    .useCss()
    .setValue("textarea", "This is nightwatch answer for question 1")
    .click("#continue")
    .useXpath()
    .waitForElementVisible("//div[text()='Hello this is question 2']", 3000)
    .useCss()
    .setValue("textarea", "This is nightwatch answer for question 2");
  browser.expect.element("#finish").to.be.visible;
  browser.click("#finish").useXpath();
  browser.expect
    .element("//h1[text()='Assessments']")
    .to.be.visible.before(1500);
  browser.useCss();
}

function deleteQnaire(browser) {
  browser
    .useXpath()
    .waitForElementVisible(
      "//span[text()='This is a test qnaire run by nightwatch']",
      3000
    )
    .moveToElement(
      "//span[text()='This is a test qnaire run by nightwatch']",
      1100,
      0
    )
    .mouseButtonClick(0)
    .waitForElementVisible(
      "//p[text()='Are you sure you want to delete this qnaire?']",
      3000
    )
    .useCss()
    .click("#delete")
    .useXpath();
  browser.assert.elementNotPresent(
    "//span[text()='This is a test qnaire run by nightwatch']"
  );
}
