describe("Mengunjungi halaman Login", () => {
  it("Mengunjungi halaman Login", () => {
    cy.visit("/login"); //Mengunjungi Halaman login

      // Menangkap input username dan password
      cy.get('input[name="username"]').type("raditdaffa375@gmail.com");
      cy.get('input[name="password"]').type("Daffa2207");


      // Menyimpan data di dalam variabel
      const loginData = { username: "raditdaffa375@gmail.com", password: "Daffa2207" };

      // Mencetak data ke console dengan stub
      cy.window().then((win) => {
        cy.stub(win.console, "log").as("consoleLog");
      });

      cy.get("button").click();

      cy.visit("/Dashboard/admin");
   
  });
});
