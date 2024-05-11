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

  // Calculate monthly interest rate
  const monthlyInterestRate = apr / 100 / 12;

  // Calculate total number of payments
  const totalPayments = termYears * 12;

  // Calculate monthly payment using the loan formula
  const monthlyPayment = amountFinanced * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

  // Calculate total cost of financing (sum of all monthly payments)
  const totalCostOfFinance = monthlyPayment * totalPayments;

  // Calculate total interest paid (total cost - amount financed)
  const totalInterestPaid = totalCostOfFinance - amountFinanced;

  // Calculate estimated tax rate based on annual income
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
  }

  // Calculate tax savings from interest deduction (tax rate * total interest)
  const taxSavings = totalInterestPaid * taxRate;

  // **Results Section with Math**

  let financeOutput = `<h2>Finance Details</h2>`;
  financeOutput += `<p>Monthly Payment: $${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>`; // Monthly Payment

  // Total Payment Over Years = Monthly Payment * Total Payments
  financeOutput += `<p>Total Payment Over ${termYears} Years: $${totalCostOfFinance.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>`;

  // Total Interest Paid = Total Cost of Finance - Amount Financed
  financeOutput += `<p>Total Interest Paid: $${totalInterestPaid.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>`;

  let investmentOutput = `<h2>Investment Growth</h4><table><tr><th>Year</th><th>Value</th></tr>`;
  let currentInvestment = amountFinanced;
  for (let year = 1; year <= termYears; year++) {
    currentInvestment *= 1 + rateOfReturn / 100;
    investmentOutput += `<tr><td><span class="math-inline">\{year\}</td\><td\></span>${currentInvestment.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td></tr>`;
  }
  investmentOutput += `</table>`;

  let taxOutput = `<h2>Tax Benefits</h2>`;
  taxOutput += `<p>Estimated Tax Savings from Interest Deduction: $${taxSavings.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>`;  // Tax Savings

  // Net Investment Value = Investment Growth (Final Year) - Amount Financed
  const netInvestmentValue = currentInvestment - amountFinanced;

  // Net Cost of Financing = Total Cost of Finance - Tax Savings
  const netCostOfFinancing = totalCostOfFinance - taxSavings;

  // Benefit of Financing = Net Investment Value - Net Cost of Financing
  const benefitOfFinancing = netInvestmentValue - netCostOfFinancing;

  let comparisonOutput = `<h2>Comparison of Financing vs. Paying Cash</h2>`;
  comparisonOutput += `<p>Net Benefit of Investing
