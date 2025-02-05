describe("Claims Management System - Automation Tests", () => {
  
  //Test 1: Visit Home Page
  it("Should load the homepage successfully", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Claims Management System").should("be.visible");
  });

  //Test 2: Navigate to Signup Page
  it("Should navigate to the Signup page", () => {
    cy.visit("http://localhost:3000");
    cy.get("a[href='/signup']").click();
    cy.url().should("include", "/signup");
  });

  //Test 3: Signup with Valid Details
  it("Should successfully register a new user", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get("input[name='name']").type("Test User");
    cy.get("input[name='email']").type("testuser@example.com");
    cy.get("input[name='password']").type("password123");
    cy.get("input[name='confirmPassword']").type("password123");
    cy.get("button").contains("Sign Up").click();
    cy.contains("Registration successful! Redirecting...").should("be.visible");
  });

  //Test 4: Login with Valid Credentials
  it("Should login successfully", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[name='email']").type("testuser@example.com");
    cy.get("input[name='password']").type("password123");
    cy.get("button").contains("Login").click();
    cy.url().should("include", "/user-dashboard");
  });

  //Test 5: Check User Dashboard
  it("Should display user dashboard after login", () => {
    cy.visit("http://localhost:3000/user-dashboard");
    cy.contains("Your Policies").should("be.visible");
  });

  //Test 6: Logout Functionality
  it("Should log out the user successfully", () => {
    cy.visit("http://localhost:3000/user-dashboard");
    cy.get("button").contains("Logout").click();
    cy.url().should("include", "/login");
  });

  //Test 7: Submit a New Claim
  it("Should allow users to file a claim", () => {
    cy.visit("http://localhost:3000/file-claim");
    cy.get("input[name='policyId']").type("67a1a2395cf497f0dfa4db3b");
    cy.get("input[name='document']").type("https://example.com/document.pdf");
    cy.get("input[name='amount']").type("5000");
    cy.get("button").contains("Submit Claim").click();
    cy.contains("Claim submitted successfully!").should("be.visible");
  });

  // Test 8: Admin Login & Manage Claims
  it("Should allow an admin to login and manage claims", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("input[name='email']").type("admin@example.com");
    cy.get("input[name='password']").type("adminpassword");
    cy.get("button").contains("Login").click();
    cy.url().should("include", "/admin-dashboard");
    
    cy.visit("http://localhost:3000/admin/manage-claims");
    cy.contains("Manage Claims").should("be.visible");
  });

});
