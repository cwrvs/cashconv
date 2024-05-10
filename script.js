function calculate() {
  const amountFinanced = parseFloat(document.getElementById('amountFinanced').value);
  const apr = parseFloat(document.getElementById('apr').value);
  const termYears = parseInt(document.getElementById('termYears').value);
  const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value);
  const annualIncome = parseFloat(document.getElementById('annualIncome').value);
  const considerTaxWriteOff = document.getElementById('taxWriteOff').checked;

  if (isNaN(amountFinanced) || isNaN(apr) || isNaN(termYears) || isNaN(rateOfReturn) || isNaN(annualIncome)) {
    alert("Please fill all fields with valid numbers.");
    return;
  }

  const monthlyInterestRate = apr / 100 / 12;
  const totalPayments = termYears * 12;
  const monthlyPayment = amountFinanced * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
  const totalCostOfFinance = monthlyPayment * totalPayments;
  const totalInterestPaid = considerTaxWriteOff ? totalCostOfFinance - amountFinanced : 0;

  let taxRate;
  if (annualIncome <= 9975) {
    taxRate = 0.10;
  } else if (annualIncome <= 40525) {
    taxRate = 0.12;
  } else if (annualIncome <= 86575) {
    taxRate = 0.22;
  } else if (annualIncome <= 170050) {
    taxRate = 0.24;
  } else if (annualIncome <= 215950) {
    taxRate = 0.32;
  } else if (annualIncome <= 539900) {
    taxRate = 0.35;
  } else {
    taxRate = 0.37;
  }

  const taxSavings = considerTaxWriteOff ? totalInterestPaid * taxRate : 0;

  let financeOutput = `<h2>Finance Details</h2>`;
  financeOutput += `<p>Monthly Payment: $${monthlyPayment.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;
  financeOutput += `<p>Total Payment Over ${termYears} Years: $${totalCostOfFinance.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;
  financeOutput += considerTaxWriteOff ? `<p>Total Interest Paid (Tax Deductible): $${totalInterestPaid.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>` : '';

  let currentInvestment = amountFinanced;
  let investmentOutput = `<h2>Investment Growth</h2><table><tr><th>Year</th><th>Value</th></tr>`;
  for (let year = 1; year <= termYears; year++) {
    currentInvestment *= 1 + rateOfReturn / 100;
    investmentOutput += `<tr><td>${year}</td><td>$${currentInvestment.toLocaleString('en-US', {maximumFractionDigits: 2})}</td></tr>`;
  }
  investmentOutput += `</table>`;

  let taxOutput = `<h2>Tax Benefits (**Considered in Calculations**): ${considerTaxWriteOff ? 'Yes' : 'No'}</h2>`;
  taxOutput += considerTaxWriteOff ? `<p>Estimated Tax Savings from Interest Deduction: $${taxSavings.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>` : '';

  const netInvestmentValue = currentInvestment - amountFinanced;
  const netCostOfFinancing = considerTaxWriteOff ? totalCostOfFinance - taxSavings : totalCostOfFinance;
  const benefitOfFinancing = netInvestmentValue - netCostOfFinancing;

  let comparisonOutput = `<h2>Comparison of Financing vs. Paying Cash</h2>`;
  comparisonOutput += `<p>Net Benefit of Investing the Cash: $${netInvestmentValue.toLocaleString('en-US
  comparisonOutput += '<p>Net Benefit of Investing the Cash: $' + netInvestmentValue.toLocaleString('en-US', {maximumFractionDigits: 2}) + '</p>';
  comparisonOutput += '<p>Net Cost of Financing after Tax Savings: $' + netCostOfFinancing.toLocaleString('en-US', {maximumFractionDigits: 2}) + '</p>';
  comparisonOutput += '<p>Overall Financial Benefit of Choosing to Finance: $' + benefitOfFinancing.toLocaleString('en-US', {maximumFractionDigits: 2}) + '</p>';
  updateResults(financeOutput, investmentOutput, taxOutput, comparisonOutput);
}

function updateResults(financeOutput, investmentOutput, taxOutput, comparisonOutput) {
  const financeDetails = document.getElementById('financeDetails');
  financeDetails.innerHTML = financeOutput;

  const investmentResults = document.getElementById('investmentResults');
  investmentResults.innerHTML = investmentOutput;

  const taxBenefits = document.getElementById('taxBenefits');
  taxBenefits.innerHTML = taxOutput;

  const comparisonResults = document.getElementById('comparisonResults');
  comparisonResults.innerHTML = comparisonOutput;

  document.getElementById('results').classList.remove('hidden'); // Make sure to define CSS class 'hidden' as { display: none; }
}

function printResults() {
  window.print();
}

document.getElementById('calculatorForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting in the traditional way
  calculate();
});
