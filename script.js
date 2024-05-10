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

    let investmentOutput = `<h2>Investment Growth</h2
