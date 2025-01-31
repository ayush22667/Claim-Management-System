class Claim {
  constructor(id, policyId, userId, claimNumber, amount, status, dateFiled) {
    this.id = id;
    this.policyId = policyId;
    this.userId = userId;
    this.claimNumber = claimNumber.trim();
    this.amount = parseFloat(amount);
    this.status = status.trim();
    this.dateFiled = dateFiled;
  }
}

let claims = [];

module.exports = { Claim, claims };
