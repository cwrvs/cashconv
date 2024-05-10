function calculate() {
    const amountFinanced = parseFloat(document.getElementById('amountFinanced').value);
    const apr = parseFloat(document.getElementById('apr').value);
    const termYears = parseInt(document.getElementById('termYears').value);
    const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value);

    let output = `<table><tr><th>Year</th><th>Investment Value</th></tr>`;

    let currentInvestment = amountFinanced;
    for (let year = 1; year <= 20; year++) {  // Assuming a maximum of 20 years for display
        currentInvestment *= (1 + rateOfReturn / 100);
        output += `<tr${year === termYears ? ' class="highlight"' : ''}><td>${year}</td><td>$${currentInvestment.toFixed(2)}</td></tr>`;
    }
    output += `</table>`;
    document.getElementById('output').innerHTML = output;
}
