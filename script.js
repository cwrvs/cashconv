function calculate() {
    const amountFinanced = parseFloat(document.getElementById('amountFinanced').value);
    const apr = parseFloat(document.getElementById('apr').value);
    const termYears = parseInt(document.getElementById('termYears').value);
    const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value);
    const annualIncome = parseFloat(document.getElementById('annualIncome').value);

    // Existing calculations for monthly payment, total cost of financing, etc.
    const monthlyInterestRate = apr / 100 / 12;
    const totalPayments = termYears * 12;
    const monthlyPayment = amountFinanced * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
    const totalCostOfFinance = monthlyPayment * totalPayments;

    // Assume investment grows annually at the given rate of return
    let currentInvestment = amountFinanced;
    let annualInvestmentGrowth = currentInvestment;
    for (let year = 1; year <= termYears; year++) {
        annualInvestmentGrowth *= (1 + rateOfReturn / 100);
    }

    // Simplified tax rate and tax savings calculation based on interest paid
    const totalInterestPaid = totalCostOfFinance - amountFinanced;
    const taxRate = (annualIncome > 100000) ? 0.32 : 0.24; // Adjust based on real tax brackets
    const taxSavings = totalInterestPaid * taxRate;

    // New calculations for net benefit or cost of financing vs. paying cash
    const netInvestmentValue = annualInvestmentGrowth - amountFinanced;  // Growth minus original amount
    const netCostOfFinancing = totalCostOfFinance - taxSavings;  // Total cost minus tax savings
    const benefitOfFinancing = netInvestmentValue - netCostOfFinancing;  // Net investment growth minus net financing cost

    // Display comparison results
    let comparisonOutput = `<h2>Comparison of Financing vs. Paying Cash</h2>`;
    comparisonOutput += `<p>Net Benefit of Investing the Cash: $${netInvestmentValue.toFixed(2)}</p>`;
    comparisonOutput += `<p>Net Cost of Financing after Tax Savings: $${netCostOfFinancing.toFixed(2)}</p>`;
    comparisonOutput += `<p>Overall Financial Benefit of Financing: $${benefitOfFinancing.toFixed(2)}</p>`;
    comparisonOutput += benefitOfFinancing > 0 ? `<p>It is financially beneficial to finance the RV.</p>` : `<p>It is financially beneficial to pay cash.</p>`;

    // Update HTML elements with results
    document.getElementById('financeDetails').innerHTML = financeOutput;
    document.getElementById('investmentResults').innerHTML = investmentOutput;
    document.getElementById('taxBenefits').innerHTML = taxOutput;
    document.getElementById('comparisonResults').innerHTML = comparisonOutput;  // Ensure this div exists in your HTML
}
