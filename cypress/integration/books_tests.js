describe("Log in", () => {
  it("Should successfully open the page", () => {
    cy.contains("Books list").should("be.visible");
  });

  it("Should successfully login", () => {
    cy.visit("/booksNode");
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать").should("be.visible");
  });

  it("Should not login with empty login", () => {
    cy.visit("/booksNode");
    cy.login(" ", "test")
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
    cy.get("#mail")
      .then(($el) => $el[0].validationMessage)
      .should("contain", "Заполните это поле.");
  });

  it("Should not login with empty password", () => {
    cy.visit("/booksNode");
    cy.contains("Log in").click();
    cy.get("#mail").type("test@test.com");
    cy.contains("Submit").click();
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });
});

describe("Favorite", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать").should("be.visible");
  });

  it("Should successfully create book", () => {
    cy.createNewBook("Harry Potter", "JR");
    cy.contains("Harry Potter").should("be.visible");
  });

  it("Should successfully add book to favorite", () => {
    cy.addBookToFavorite("Harry Potter 2", "JR");
    cy.contains("Delete from favorite").should("be.visible");
  });

  it("Should successfully delete book from favorite", () => {
    cy.addBookToFavorite("Harry Potter 3", "JR");
    cy.contains("Delete from favorite").should("be.visible");
  });
});
