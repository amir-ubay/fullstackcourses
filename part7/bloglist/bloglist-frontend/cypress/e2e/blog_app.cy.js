describe("Blog App", () => {
  context("Exercise 5.17 - Check Login Form", () => {
    beforeEach(function () {
      cy.visit("http://localhost:5173/");
    });

    it("Login form is shown", () => {
      cy.get("#login-form").within(() => {
        cy.get("h2")
          .should("be.visible")
          .should("contain", "Log in to application");
      });

      cy.get("#username-input")
        .should("be.visible")
        .should("contain", "username")
        .within(() => {
          cy.get("input#username").should("be.visible");
        });

      cy.get("#password-input")
        .should("be.visible")
        .should("contain", "password")
        .within(() => {
          cy.get("input#password").should("be.visible");
        });

      cy.get("button#login-button").should("be.visible");
    });
  });

  context("Exerise 5.18 - Login Scenario", () => {
    beforeEach(function () {
      cy.request("POST", "localhost:3003/api/testing/reset-data");
      const alphaUser = {
        username: "alpha",
        name: "Alpha User",
        password: "alpha",
      };
      cy.request("POST", "http://localhost:3003/api/users", alphaUser);
      cy.visit("http://localhost:5173/");
    });

    it("Login succeeds with correct credentials", () => {
      cy.get("#login-form").within(() => {
        cy.get("input#username").type("alpha");
        cy.get("input#password").type("alpha");
        cy.get("button#login-button").click();
      });

      cy.get("#login-form").should("not.exist");

      cy.get("p").contains("Alpha User").should("be.visible");
    });

    it("Login fails with wrong credentials", () => {
      cy.get("#login-form").within(() => {
        cy.get("input#username").type("alpha");
        cy.get("input#password").type("wrong");
        cy.get("button#login-button").click();
      });

      cy.get("#notification.error")
        .contains("Wrong username or password")
        .should("be.visible");
    });
  });

  context("Exercise 5.19 - When Login", () => {
    beforeEach(function () {
      cy.request("POST", "localhost:3003/api/testing/reset-data");
      const alphaUser = {
        username: "alpha",
        name: "Alpha User",
        password: "alpha",
      };
      cy.request("POST", "http://localhost:3003/api/users", alphaUser);
      cy.visit("http://localhost:5173/");
      // LOGIN
      cy.get("#login-form").within(() => {
        cy.get("input#username").type("alpha");
        cy.get("input#password").type("alpha");
        cy.get("button#login-button").click();
      });

      cy.get("#login-form").should("not.exist");
    });

    it("A blog can be created", () => {
      cy.get("button").contains("new blog").should("be.visible").click();

      cy.get("#title").should("be.visible").type("Your blog title");

      cy.get("#author").should("be.visible").type("Your blog author");

      cy.get("#url").should("be.visible").type("Your blog URL");

      cy.get('button[type="submit"]').should("be.visible").click();

      cy.get("#notification.success")
        .contains("A new blog Your blog title by Your blog author added")
        .should("be.visible");

      cy.get(".blogItem").contains("Your blog title").should("be.visible");

      cy.get(".blogItem").contains("Your blog author").should("be.visible");
    });
  });

  context("Exercise 5.20 - Like Blog", () => {
    beforeEach(function () {
      cy.request("POST", "localhost:3003/api/testing/reset-data");
      const alphaUser = {
        username: "alpha",
        name: "Alpha User",
        password: "alpha",
      };
      cy.request("POST", "http://localhost:3003/api/users", alphaUser);
      cy.visit("http://localhost:5173/");
      // LOGIN
      cy.get("#login-form").within(() => {
        cy.get("input#username").type("alpha");
        cy.get("input#password").type("alpha");
        cy.get("button#login-button").click();
      });

      cy.get("#login-form").should("not.exist");

      // Create Blog
      cy.get("button").contains("new blog").should("be.visible").click();

      cy.get("#title").should("be.visible").type("Your blog title");

      cy.get("#author").should("be.visible").type("Your blog author");

      cy.get("#url").should("be.visible").type("Your blog URL");

      cy.get('button[type="submit"]').should("be.visible").click();

      cy.get("#notification.success")
        .contains("A new blog Your blog title by Your blog author added")
        .should("be.visible");

      cy.get(".blogItem").contains("Your blog title").should("be.visible");

      cy.get(".blogItem").contains("Your blog author").should("be.visible");
    });

    it("A blog can be liked", () => {
      cy.get('.blogItem[blog-data="Your blog title"]')
        .find("button")
        .contains("View")
        .click();

      cy.get('.blogItem[blog-data="Your blog title"]')
        .find("button")
        .contains("like")
        .click();

      cy.get('.blogItem[blog-data="Your blog title"]').within(() => {
        cy.get('[test-data="blog-likes"]').should("contain", "1");
      });
    });
  });

  context("Exercise 5.21 - Delete Blog", () => {
    beforeEach(function () {
      cy.request("POST", "localhost:3003/api/testing/reset-data");
      const alphaUser = {
        username: "alpha",
        name: "Alpha User",
        password: "alpha",
      };
      cy.request("POST", "http://localhost:3003/api/users", alphaUser);
      cy.visit("http://localhost:5173/");
      // LOGIN
      cy.get("#login-form").within(() => {
        cy.get("input#username").type("alpha");
        cy.get("input#password").type("alpha");
        cy.get("button#login-button").click();
      });

      cy.get("#login-form").should("not.exist");

      // Create Blog
      cy.get("button").contains("new blog").should("be.visible").click();

      cy.get("#title").should("be.visible").type("Your blog title");

      cy.get("#author").should("be.visible").type("Your blog author");

      cy.get("#url").should("be.visible").type("Your blog URL");

      cy.get('button[type="submit"]').should("be.visible").click();

      cy.get("#notification.success")
        .contains("A new blog Your blog title by Your blog author added")
        .should("be.visible");

      cy.get(".blogItem").contains("Your blog title").should("be.visible");

      cy.get(".blogItem").contains("Your blog author").should("be.visible");
    });

    it("A blog can be deleted", () => {
      cy.get('.blogItem[blog-data="Your blog title"]')
        .find("button")
        .contains("View")
        .click();

      cy.get('.blogItem[blog-data="Your blog title"]')
        .find("button")
        .contains("Remove")
        .click();

      cy.get('.blogItem[blog-data="Your blog title"]').should("not.exist");
    });
  });

  context("Exercise 5.22 - Only creator can delete", () => {
    beforeEach(function () {
      cy.request("POST", "localhost:3003/api/testing/reset-data");
      const alphaUser = {
        username: "alpha",
        name: "Alpha User",
        password: "alpha",
      };
      const betaUser = {
        username: "beta",
        name: "Beta User",
        password: "beta",
      };
      cy.request("POST", "http://localhost:3003/api/users", alphaUser);
      cy.request("POST", "http://localhost:3003/api/users", betaUser);
      cy.visit("http://localhost:5173/");
      // LOGIN
      cy.get("#login-form").within(() => {
        cy.get("input#username").type("alpha");
        cy.get("input#password").type("alpha");
        cy.get("button#login-button").click();
      });

      cy.get("#login-form").should("not.exist");

      // Create Blog
      cy.get("button").contains("new blog").should("be.visible").click();

      cy.get("#title").should("be.visible").type("Your blog title");

      cy.get("#author").should("be.visible").type("Your blog author");

      cy.get("#url").should("be.visible").type("Your blog URL");

      cy.get('button[type="submit"]').should("be.visible").click();

      cy.get("#notification.success")
        .contains("A new blog Your blog title by Your blog author added")
        .should("be.visible");

      cy.get(".blogItem").contains("Your blog title").should("be.visible");

      cy.get(".blogItem").contains("Your blog author").should("be.visible");

      // Logout
      cy.get("button").contains("logout").click();

      cy.get("#login-form").should("be.visible");

      cy.clearCookies();
      cy.clearLocalStorage();
      cy.reload();

      // Login as Beta User
      cy.get("#login-form").within(() => {
        cy.get("input#username").type("beta");
        cy.get("input#password").type("beta");
        cy.get("button#login-button").click();
      });

      cy.get("#login-form").should("not.exist");
    });

    it("A blog cannot be deleted by different creator", () => {
      cy.intercept("DELETE", "/api/blogs/*").as("deleteBlog");

      cy.get('.blogItem[blog-data="Your blog title"]')
        .find("button")
        .contains("View")
        .click();

      cy.get('.blogItem[blog-data="Your blog title"]')
        .find("button")
        .contains("Remove")
        .click();

      cy.wait("@deleteBlog").then((interception) => {
        expect(interception.response.statusCode).to.eq(401);
      });
    });
  });

  context("Exercise 5.23 - Blog Sort", () => {
    beforeEach(function () {
      cy.request("POST", "localhost:3003/api/testing/reset-data");
      const alphaUser = {
        username: "alpha",
        name: "Alpha User",
        password: "alpha",
      };
      const betaUser = {
        username: "beta",
        name: "Beta User",
        password: "beta",
      };
      cy.request("POST", "http://localhost:3003/api/users", alphaUser);
      cy.request("POST", "http://localhost:3003/api/users", betaUser);
      cy.visit("http://localhost:5173/");
      // LOGIN
      cy.get("#login-form").within(() => {
        cy.get("input#username").type("alpha");
        cy.get("input#password").type("alpha");
        cy.get("button#login-button").click();
      });

      cy.get("#login-form").should("not.exist");

      // Create Blog
      cy.createNewBlog("Beta blog", "Beta blog author", "www.beta.com");
      cy.createNewBlog("Alpha blog", "Alpha blog author", "www.alpha.com");
    });

    it("Blogs are ordered by likes", () => {
      cy.likeBlog("Alpha blog");
      cy.wait(1000);
      cy.likeBlog("Beta blog");
      cy.wait(1000);
      cy.likeBlog("Alpha blog");
      cy.wait(1000);

      cy.get(".blogItem").eq(0).should("contain", "Alpha blog");

      cy.get(".blogItem").eq(1).should("contain", "Beta blog");
    });
  });
});
