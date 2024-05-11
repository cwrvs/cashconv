document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateButton').addEventListener('click', function() {
        const amount = parseFloat(document.getElementById('amountFinanced').value);
        const apr = parseFloat(document.getElementById('apr').value);
        const term = parseInt(document.getElementById('termYears').value);
        const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value);
        const annualIncome = parseFloat(document.getElementById('annualIncome').value);

        const details = calculateFinancialDetails(amount, apr, term, rateOfReturn, annualIncome);
        displayResults(details.monthlyPayment, details.totalPayments, details.investmentGrowth, details.taxSavings);
        drawGraph(amount, term, rateOfReturn);
        provideAdvice(details.monthlyPayment, details.totalPayments, details.investmentGrowth, details.taxSavings);
    });
});

function calculateFinancialDetails(amount, apr, term, rateOfReturn, annualIncome) {
    const monthlyRate = apr / 100 / 12;
    const monthlyPayment = amount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -term * 12));
    const totalPayments = monthlyPayment * term * 12;
    const investmentGrowth = amount * Math.pow(1 + rateOfReturn / 100 / 12, term * 12);
    const taxBracket = determineTaxBracket(annualIncome);
    const interestPaidOverTerm = totalPayments - amount;
    const taxSavings = interestPaidOverTerm * taxBracket / 100;

    return {
        monthlyPayment,
        totalPayments,
        investmentGrowth,
        taxSavings
    };
}

function determineTaxBracket(income) {
    if (income <= 9875) return 10;
    else if (income <= 40125) return 12;
    else if (income <= 85525) return 22;
    else if (income <= 163300) return 24;
    else if (income <= 207350) return 32;
    else if (income <= 518400) return 35;
    else return 37;
}

function displayResults(monthlyPayment, totalPayments, investmentGrowth, taxSavings) {
    const financeDetails = document.getElementById('financeDetails');
    financeDetails.innerHTML = `<strong>Monthly Payment:</strong> $${monthlyPayment.toFixed(2)}<br/>`;
    financeDetails.innerHTML += `<strong>Total Payments:</strong> $${totalPayments.toFixed(2)}<br/>`;
    financeDetails.innerHTML += `<strong>Potential Investment Growth:</strong> $${investmentGrowth.toFixed(2)}<br/>`;
    financeDetails.innerHTML += `<strong>Tax Savings on Interest:</strong> $${taxSavings.toFixed(2)}`;
}

function drawGraph(amount, term, rateOfReturn) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const labels = Array.from({length: term * 12}, (_, i) => i + 1);
    const data = labels.map(month => amount * Math.pow(1 + rateOfReturn / 100 / 12, month));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Investment Growth Over Time',
                data: data,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function provideAdvice(monthlyPayment, totalPayments, investmentGrowth, taxSavings) {
    const netCostIfFinanced = totalPayments - taxSavings;
    const message = investmentGrowth > netCostIfFinanced ?
        "It makes more sense to finance the purchase." :
        "It makes more sense to pay cash.";
    document.getElementById('advice').textContent = message;
}

function printResults() {
    window.print();
}
