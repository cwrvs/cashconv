function calculate() {
    const amountFinanced = parseFloat(document.getElementById('amountFinanced').value);
    const apr = parseFloat(document.getElementById('apr').value);
    const termYears = parseInt(document.getElementById('termYears').value);
    const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value);
    const annualIncome = parseFloat(document.getElementById('annualIncome').value);

    const monthlyInterestRate = apr / 100 / 12;
    const totalPayments = termYears * 12;
    const monthlyPayment = amountFinanced * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
    const totalCostOfFinance = monthlyPayment * totalPayments;

    let financeOutput = `<h2>Finance Details</h2>`;
    financeOutput += `<p>Monthly Payment: $${monthlyPayment.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;
    financeOutput += `<p>Total Payment Over ${termYears} Years: $${totalCostOfFinance.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;
    financeOutput += `<p>Total Interest Paid: $${(totalCostOfFinance - amountFinanced).toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;

    let currentInvestment = amountFinanced;
    let investmentOutput = `<h2>Investment Growth</h2><table><tr><th>Year</th><th>Value</th></tr>`;
    for (let year = 1; year <= termYears; year++) {
        currentInvestment *= (1 + rateOfReturn / 100);
        investmentOutput += `<tr><td>${year}</td><td>$${currentInvestment.toLocaleString('en-US', {maximumFractionDigits: 2})}</td></tr>`;
    }
    investmentOutput += `</table>`;

    const totalInterestPaid = totalCostOfFinance - amountFinanced;
    const taxRate = (annualIncome > 100000) ? 0.32 : 0.24;
    const taxSavings = totalInterestPaid * taxRate;
    let taxOutput = `<h2>Tax Benefits</h2>`;
    taxOutput += `<p>Estimated Tax Savings from Interest Deduction: $${taxSavings.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;

    const netInvestmentValue = currentInvestment - amountFinanced;
    const netCostOfFinancing = totalCostOfFinance - taxSavings;
    const benefitOfFinancing = netInvestmentValue - netCostOfFinancing;
    let comparisonOutput = `<h2>Comparison of Financing vs. Paying Cash</h2>`;
    comparisonOutput += `<p>Net Benefit of Investing the Cash: $${netInvestmentValue.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;
    comparisonOutput += `<p>Net Cost of Financing after Tax Savings: $${netCostOfFinancing.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;
    comparisonOutput += `<p>Overall Financial Benefit of Financing: $${benefitOfFinancing.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;
    comparisonOutput += benefitOfFinancing > 0 ? `<p>It is financially beneficial to finance the RV.</p>` : `<p>It is financially beneficial to pay cash.</p>`;

    document.getElementById('financeDetails').innerHTML = financeOutput;
    document.getElementById('investmentResults').innerHTML = investmentOutput;
    document.getElementById('taxBenefits').innerHTML = taxOutput;
    document.getElementById('comparisonResults').innerHTML = comparisonOutput;
}
