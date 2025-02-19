describe("Login Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("Should print username and password when form is submitted", () => {
    // Menangkap input username dan password
    cy.get('input[name="email"]').type("raditdaffa375@gmail.com");
    cy.get('input[name="password"]').type("Daffa2207");

    // Menyimpan data di dalam variabel
    const loginData = {
      email: "raditdaffa375@gmail.com",
      password: "Daffa2207",
    };

    // Mencetak data ke console dengan stub
    cy.window().then((win) => {
      cy.stub(win.console, "log").as("consoleLog");
    });

    cy.get(".login-btn").click();

    // Validasi bahwa console.log hanya dipanggil jika ada loginData
    cy.get("@consoleLog").should("be.calledWith", loginData);
  });

  it("should show validation errors for invalid data", () => {
    // Menghapus value dari input username dan password
    cy.get('input[name="email"]').clear();
    cy.get('input[name="password"]').clear();

    cy.get(".login-btn").click();

    // Cek pesan validasi apakah sesuai
    cy.get(".error-msg").should("contain", "Username is required");
    cy.get(".error-msg").should(
      "contain",
      "Password must be at least 6 characters long"
    );
  });
});
