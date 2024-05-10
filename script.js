function calculate() {
    const amountFinanced = parseFloat(document.getElementById('amountFinanced').value);
    const apr = parseFloat(document.getElementById('apr').value);
    const termYears = parseInt(document.getElementById('termYears').value);
    const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value);
    const annualIncome = parseFloat(document.getElementById('annualIncome').value);

    // Calculate the monthly payment and total payment over the term
    const monthlyInterestRate = apr / 100 / 12;
    const totalPayments = termYears * 12;
    const monthlyPayment = amountFinanced * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
    const totalCostOfFinance = monthlyPayment * totalPayments;

    // Calculate the potential investment value if the same amount is invested
    let currentInvestment = amountFinanced;
    let annualInvestmentGrowth = currentInvestment;
    for (let year = 1; year <= termYears; year++) {
        annualInvestmentGrowth *= (1 + rateOfReturn / 100);
    }

    // Calculate tax benefits from the interest deduction
    const totalInterestPaid = totalCostOfFinance - amountFinanced;
    const taxRate = (annualIncome > 100000) ? 0.32 : 0.24; // Simplified tax rate calculation
    const taxSavings = totalInterestPaid * taxRate;

    // Display finance details
    let financeOutput = `<h2>Finance Details</h2>`;
    financeOutput += `<p>Monthly Payment: $${monthlyPayment.toFixed(2)}</p>`;
    financeOutput += `<p>Total Payment Over ${termYears} Years: $${totalCostOfFinance.toFixed(2)}</p>`;
    financeOutput += `<p>Total Interest Paid: $${totalInterestPaid.toFixed(2)}</p>`;

    // Display investment results
    let investmentOutput = `<h2>Investment Growth</h2>`;
    investmentOutput += `<p>Investment Value after ${termYears} years: $${annualInvestmentGrowth.toFixed(2)}</p>`;

    // Display tax benefits
    let taxOutput = `<h2>Tax Benefits</h2>`;
    taxOutput += `<p>Estimated Tax Savings from Interest Deduction: $${taxSavings.toFixed(2)}</p>`;

    // Append all results
    document.getElementById('financeDetails').innerHTML = financeOutput;
    document.getElementById('investmentResults').innerHTML = investmentOutput;
    document.getElementById('taxBenefits').innerHTML = taxOutput;
}
