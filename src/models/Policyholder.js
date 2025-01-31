class Policyholder {
  constructor(id, name, email, policies) {
    this.id = id;
    this.name = name.trim();
    this.email = email.trim().toLowerCase();
    this.policies = policies; // Array of policy IDs owned by the user
  }
}

let policyholders = [];

module.exports = { Policyholder, policyholders };
