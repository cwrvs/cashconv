function calculate() {
    const amountFinanced = parseFloat(document.getElementById('amountFinanced').value);
    const apr = parseFloat(document.getElementById('apr').value);
    const termYears = parseInt(document.getElementById('termYears').value);
    const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value);

    const monthlyInterestRate = apr / 100 / 12;
    const totalPayments = termYears * 12;
    const monthlyPayment = amountFinanced * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));
    const totalCostOfFinance = monthlyPayment * totalPayments;

    let financeOutput = `<h2>Finance Details</h2>`;
    financeOutput += `<p>Monthly Payment: $${monthlyPayment.toFixed(2)}</p>`;
    financeOutput += `<p>Total Payment Over ${termYears} Years: $${totalCostOfFinance.toFixed(2)}</p>`;

    let investmentOutput = `<h2>Investment Growth</h2>`;
    investmentOutput += `<table><tr><th>Year</th><th>Investment Value</th></tr>`;

    let currentInvestment = amountFinanced;
    for (let year = 1; year <= termYears; year++) {
        currentInvestment *= (1 + rateOfReturn / 100);
        investmentOutput += `<tr><td>${year}</td><td>$${currentInvestment.toFixed(2)}</td></tr>`;
    }
    investmentOutput += `</table>`;

    document.getElementById('financeDetails').innerHTML = financeOutput;
    document.getElementById('investmentResults').innerHTML = investmentOutput;
}
