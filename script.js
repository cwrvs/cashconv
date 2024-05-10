<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Loan Comparison Calculator</title>
</head>
<body>
  <h1>Loan Comparison Calculator</h1>
  <form onsubmit="event.preventDefault(); calculateLoanComparison()">
    <div>
      <label for="amountFinanced">Loan Amount:</label>
      <input type="number" id="amountFinanced" required>
    </div>
    <div>
      <label for="apr">APR (Annual Percentage Rate):</label>
      <input type="number" id="apr" required>
    </div>
    <div>
      <label for="termYears">Loan Term (Years):</label>
      <input type="number" id="termYears" required>
    </div>
    <div>
      <label for="rateOfReturn">Rate of Return on Investment (%):</label>
      <input type="number" id="rateOfReturn" required>
    </div>
    <div>
      <label for="annualIncome">Annual Income:</label>
      <input type="number" id="annualIncome" required>
    </div>
    <div>
      <label for="factorTaxCheckbox">Factor in Tax Savings?</label>
      <input type="checkbox" id="factorTaxCheckbox" checked>
    </div>
    <button type="submit">Calculate</button>
  </form>
  <div id="financeDetails"></div>
  <div id="investmentResults"></div>
  <div id="taxBenefits"></div>
  <div id="comparisonResults"></div>
  <script>
    function calculateTaxRate(annualIncome, taxRateCheckbox) {
      // ... JavaScript function from previous response ...
    }

    function calculateLoanComparison() {
      // ... JavaScript function from previous response ...
    }
  </script>
</body>
</html>
