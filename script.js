function calculate() {
    const amountFinanced = parseFloat(document.getElementById('amountFinanced').value);
    const apr = parseFloat(document.getElementById('apr').value);
    const termYears = parseInt(document.getElementById('termYears').value);
    const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value);
    const annualIncome = parseFloat(document.getElementById('annualIncome').value);

    if (isNaN(amountFinanced) || isNaN(apr) || isNaN(termYears) || isNaN(rateOfReturn) || isNaN(annualIncome)) {
        alert("Please fill all fields with valid numbers.");
        return;
    }

    const monthlyInterestRate = apr / 100 / 12;
    const totalPayments = termYears * 12;
    const monthlyPayment = amountFinanced * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
    const totalCostOfFinance = monthlyPayment * totalPayments;
    const totalInterestPaid = totalCostOfFinance - amountFinanced;

    let taxRate;
    if (annualIncome <= 9875) {
        taxRate = 0.10;
    } else if (annualIncome <= 40125) {
        taxRate = 0.12;
    } else if (annualIncome <= 85525) {
        taxRate = 0.22;
    } else if (annualIncome <= 163300) {
        taxRate = 0.24;
    } else if (annualIncome <= 207350) {
        taxRate = 0.32;
    } else if (annualIncome <= 518400) {
        taxRate = 0.35;
    } else {
        taxRate = 0.37;
Here's the code refactored to incorporate marginal tax rates and a checkbox to factor in tax savings:
function calculateTaxRate(annualIncome, taxRateCheckbox) {
  const taxBrackets = [
    { lowerBound: 0, upperBound: 9875, taxRate: 0.10 },
    { lowerBound: 9876, upperBound: 40125, taxRate: 0.12 },
    { lowerBound: 40126, upperBound: 85525, taxRate: 0.22 },
    { lowerBound: 85526, upperBound: 163300, taxRate: 0.24 },
    { lowerBound: 163301, upperBound: 207350, taxRate: 0.32 },
    { lowerBound: 207351, upperBound: 518400, taxRate: 0.35 },
    { lowerBound: 518401, upperBound: Infinity, taxRate: 0.37 },
  ];
  if (!taxRateCheckbox.checked) {
    return 0; // No tax savings if checkbox is unchecked
  }
  for (const bracket of taxBrackets) {
    if (annualIncome <= bracket.upperBound) {
      return bracket.taxRate;
    }
  }
}
    const taxSavings = totalInterestPaid * taxRate;

    let financeOutput = `<h2>Finance Details</h2>`;
    financeOutput += `<p>Monthly Payment: $${monthlyPayment.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;
    financeOutput += `<p>Total Payment Over ${termYears} Years: $${totalCostOfFinance.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;
    financeOutput += `<p>Total Interest Paid: $${totalInterestPaid.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;

    let currentInvestment = amountFinanced;
    let investmentOutput = `<h2>Investment Growth</h2><table><tr><th>Year</th><th>Value</th></tr>`;
    for (let year = 1; year <= termYears; year++) {
        currentInvestment *= 1 + rateOfReturn / 100;
        investmentOutput += `<tr><td>${year}</td><td>$${currentInvestment.toLocaleString('en-US', {maximumFractionDigits: 2})}</td></tr>`;
    }
    investmentOutput += `</table>`;

    let taxOutput = `<h2>Tax Benefits</h2>`;
    taxOutput += `<p>Estimated Tax Savings from Interest Deduction: $${taxSavings.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;

    const netInvestmentValue = currentInvestment - amountFinanced;
    const netCostOfFinancing = totalCostOfFinance - taxSavings;
    const benefitOfFinancing = netInvestmentValue - netCostOfFinancing;
function calculateLoanComparison() {
  // ... existing code ...
    let comparisonOutput = `<h2>Comparison of Financing vs. Paying Cash</h2>`;
    comparisonOutput += `<p>Net Benefit of Investing the Cash: $${netInvestmentValue.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;
    comparisonOutput += `<p>Net Cost of Financing after Tax Savings: $${netCostOfFinancing.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;
    comparisonOutput += `<p>Overall Financial Benefit of Financing: $${benefitOfFinancing.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;
    comparisonOutput += benefitOfFinancing > 0 ? `<p>It is financially beneficial to finance the RV.</p>` : `<p>It is financially beneficial to pay cash.</p>`;
  const taxRate = calculateTaxRate(annualIncome, document.getElementById('factorTaxCheckbox'));
    document.getElementById('financeDetails').innerHTML = financeOutput;
    document.getElementById('investmentResults').innerHTML = investmentOutput;
    document.getElementById('taxBenefits').innerHTML = taxOutput;
    document.getElementById('comparisonResults').innerHTML = comparisonOutput;
  // ... rest of the code using taxRate ...
}
function printResults() {
    window.print();
}
