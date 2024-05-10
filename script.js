function calculate() {
    const amountFinanced = parseFloat(document.getElementById('amountFinanced').value);
    const apr = parseFloat(document.getElementById('apr').value);
    const termYears = parseInt(document.getElementById('termYears').value);
    const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value);
    const incomeTaxRate = parseFloat(document.getElementById('incomeTaxRate').value);

    const monthlyInterestRate = apr / 100 / 12;
    const totalPayments = termYears * 12;
    const monthlyPayment = amountFinanced * monthlyInterestRate / (1 - (Math.pow(1 + monthlyInterestRate, -totalPayments)));

    const initialInvestment = amountFinanced; // Assuming paying cash means investing the full amount
    const futureValue = initialInvestment * Math.pow(1 + rateOfReturn / 100, termYears);

    let output = `Monthly Payment (if financed): $${monthlyPayment.toFixed(2)}<br>`;
    output += `Future Value of Investment: $${futureValue.toFixed(2)}`;

    document.getElementById('output').innerHTML = output;
}
