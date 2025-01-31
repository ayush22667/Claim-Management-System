class Policy {
  constructor(id, policyNumber, type, coverageAmount, startDate, endDate) {
    this.id = id;
    this.policyNumber = policyNumber.trim();
    this.type = type.trim();
    this.coverageAmount = parseFloat(coverageAmount);
    this.startDate = startDate;
    this.endDate = endDate;
  }
}

let policies = [];

module.exports = { Policy, policies };
