class User {
  constructor(id, name, email, password, role) {
    this.id = id;
    this.name = name.trim();
    this.email = email.trim().toLowerCase();
    this.password = password.trim();
    this.role = role.trim().charAt(0).toUpperCase() + role.trim().slice(1).toLowerCase();
    this.policies = []; // Stores policy IDs purchased by the user
  }
}

let users = [];

module.exports = { User, users };
