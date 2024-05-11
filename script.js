function calculate() {
  const amountFinanced = parseFloat(document.getElementById('amountFinanced').value);
  const apr = parseFloat(document.getElementById('apr').value);
  const termYears = parseInt(document.getElementById('termYears').value);
  const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value);
  const annualIncome = parseFloat(document.getElementById('annualIncome').value);
  const includeTaxes = document.getElementById('includeTaxes').checked;

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

  let taxSavings = 0;
  let effectiveTaxRate = 0;
  if (includeTaxes) {
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
    taxSavings = totalInterestPaid * taxRate;
    effectiveTaxRate = taxRate * 100; // Convert tax rate to percentage
  }

  // Calculate net investment value
  const currentInvestment = calculateInvestmentGrowth(amountFinanced, rateOfReturn, termYears);
  const netInvestmentValue = currentInvestment - amountFinanced;

  // Calculate net cost of financing
  const netCostOfFinancing = totalCostOfFinance - taxSavings;

  // Calculate benefit of financing
  const benefitOfFinancing = netInvestmentValue - netCostOfFinancing;

  // **Results Section with Math**

  let financeOutput = `<h2>Finance Details</h2>`;
  financeOutput += `<p>Monthly Payment: $${monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>`; // Monthly Payment
  financeOutput += `<p>Total Payment Over ${termYears} Years: $${totalCostOfFinance.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>`; // Total Payment Over Years
  financeOutput += `<p>Total Interest Paid: $${totalInterestPaid.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>`; // Total Interest Paid

  let investmentOutput = `<h2>Investment Growth</h2><table><tr><th>Year</th><th>Value</th></tr>`;
  let currentInvestmentTable = amountFinanced;
  for (let year = 1; year <= termYears; year++) {
    currentInvestmentTable *= 1 + rateOfReturn / 100;
    investmentOutput += `<tr><td>${year}</td><td>$${currentInvestmentTable.toLocaleString('en-US', { maximumFractionDigits: 2 })}</td></tr>`;
  }
  investmentOutput += `</table>`;

  let taxOutput = `<h2>Tax Benefits</h2>`;
  if (includeTaxes) {
    taxOutput += `<p>Effective Tax Rate: ${effectiveTaxRate.toFixed(2)}%</p>`; // Display effective tax rate
    taxOutput += `<p>Estimated Tax Savings from Interest Deduction: $${taxSavings.toLocaleString('en-US', { maximumFractionDigits: 2 })}</p>`;  // Tax Savings
  } else {
    taxOutput += `<p>Tax savings not included in calculations.</p>`;
  }

  let comparisonOutput = `<h2>Comparison of Financing vs. Paying Cash</h2>`;
  comparisonOutput += `<p>When you finance your RV purchase:</p>`;
  comparisonOutput += `<ul>`;
  comparisonOutput += `<li>You pay a monthly payment of $${monthlyPayment.toFixed(2)} for ${termYears} years.</li>`;
  comparisonOutput += `<li>You pay a total of $${totalCostOfFinance.toLocaleString('en-US', { maximumFractionDigits: 2 })}, including $${totalInterestPaid.toLocaleString('en-US', { maximumFractionDigits: 2 })} in interest.</li>`;
  if (includeTaxes) {
    comparisonOutput += `<li>You potentially save money on taxes by deducting $${taxSavings.toLocaleString('en-US', { maximumFractionDigits: 2 })} in interest, based on an effective tax rate of ${effectiveTaxRate.toFixed(2)}%.</li>`;
  }
  comparisonOutput += `<li>Your investment grows to $${currentInvestment.toLocaleString('en-US', { maximumFractionDigits: 2 })} over ${termYears} years.</li>`;
  comparisonOutput += `<li>By financing, your net benefit compared to paying cash is $${benefitOfFinancing.toLocaleString('en-US', { maximumFractionDigits: 2 })}.</li>`;
  comparisonOutput += `</ul>`;

  // Display the results
  document.getElementById('financeOutput').innerHTML = financeOutput;
  document.getElementById('investmentOutput').innerHTML = investmentOutput;
  document.getElementById('taxOutput').innerHTML = taxOutput;
  document.getElementById('comparisonOutput').innerHTML = comparisonOutput;
}

function toggleTaxes() {
  // Function to toggle tax calculations based on checkbox state
  calculate();
}

function calculateInvestmentGrowth(principal, rateOfReturn, years) {
  // Function to calculate investment growth over time
  let investment = principal;
  for (let i = 0; i < years; i++) {
    investment *= 1 + rateOfReturn / 100;
  }
  return investment;
}
