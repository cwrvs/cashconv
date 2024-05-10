function calculate() {
    const amountFinanced = parseFloat(document.getElementById('amountFinanced').value);
    const apr = parseFloat(document.getElementById('apr').value);
    const termYears = parseInt(document.getElementById('termYears').value);
    const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value);
    const annualIncome = parseFloat(document.getElementById('annualIncome').value);

    // Existing calculations...

    // Simplified tax rate and tax savings calculation based on interest paid
    let taxRate;
    if (annualIncome <= 9875) {
        taxRate = 0.10;
    } else
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

    const monthlyInterestRate = apr / 100 / 12;
    const totalPayments = termYears * 12;
    const monthlyPayment = amountFinanced * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
    const totalCostOfFinance = monthlyPayment * totalPayments;
    const totalInterestPaid = totalCostOfFinance - amountFinanced;
    const taxSavings = totalInterestPaid * taxRate;

    // Display results for financing details
    let financeOutput = `<h2>Finance Details</h2>`;
    financeOutput += `<p>Monthly Payment: $${monthlyPayment.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;
    financeOutput += `<p>Total Payment Over ${termYears} Years: $${totalCostOfFinance.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;
    financeOutput += `<p>Total Interest Paid: $${totalInterestPaid.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;

    // Calculate investment growth
    let currentInvestment = amountFinanced;
    let investmentOutput = `<h2>Investment Growth</h2><table><tr><th>Year</th><th>Value</th></tr>`;
    for (let year = 1; year <= termYears; year++) {
        currentInvestment *= 1 + rateOfReturn / 100;
        investmentOutput += `<tr><td>${year}</td><td>$${currentInvestment.toLocaleString('en-US', {maximumFractionDigits: 2})}</td></tr>`;
    }
    investmentOutput += `</table>`;

    // Display tax benefits
    let taxOutput = `<h2>Tax Benefits</h2>`;
    taxOutput += `<p>Estimated Tax Savings from Interest Deduction: $${taxSavings.toLocaleString('en-US', {maximumFractionDigits: 2})}</p>`;

    // Calculate and display comparison of financing vs. paying cash
    const netInvestmentValue = currentInvestment - amountFinanced;  // Growth minus original amount
    const netCostOfFinancing = totalCostOfFinance - taxSavings;  // Total cost minus tax savings
    const benefitOfFinancing = netInvestmentValue - netCostOfFinancing;  // Net investment growth minus net financing cost

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

function printResults() {
    window.print();
}
