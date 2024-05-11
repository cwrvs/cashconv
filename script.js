document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateButton').addEventListener('click', function() {
        const amount = parseFloat(document.getElementById('amountFinanced').value);
        const apr = parseFloat(document.getElementById('apr').value);
        const term = parseInt(document.getElementById('termYears').value);
        const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value);
        const annualIncome = parseFloat(document.getElementById('annualIncome').value);

        const results = calculateFinancialDetails(amount, apr, term, rateOfReturn);
        displayResults(results);
        provideAdvice(amount, results);
    });
});

function calculateFinancialDetails(amount, apr, term, rateOfReturn) {
    const monthlyRate = apr / 100 / 12;
    const monthlyPayment = amount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -term * 12));
    let investmentBalance = amount; // Start with the initial amount if invested
    let totalInterestPaid = 0;

    let results = [];
    for (let year = 1; year <= term; year++) {
        let annualInterestPaid = 0;
        let monthlyInvestmentGrowth = investmentBalance;

        for (let month = 1; month <= 12; month++) {
            annualInterestPaid += monthlyPayment * monthlyRate;
            monthlyInvestmentGrowth *= (1 + rateOfReturn / 100 / 12);
        }

        investmentBalance = monthlyInvestmentGrowth;
        totalInterestPaid += annualInterestPaid;
        results.push({
            year: year,
            investmentGrowth: investmentBalance,
            interestPaid: annualInterestPaid,
            endingBalance: amount - (monthlyPayment * 12 * year)
        });
    }

    return results;
}

function displayResults(results) {
    const resultsBody = document.getElementById('resultsBody');
    resultsBody.innerHTML = ''; // Clear previous results
    results.forEach(result => {
        const row = `<tr>
            <td>${result.year}</td>
            <td>$${result.investmentGrowth.toFixed(2)}</td>
            <td>$${result.interestPaid.toFixed(2)}</td>
            <td>$${result.endingBalance.toFixed(2)}</td>
        </tr>`;
        resultsBody.innerHTML += row;
    });
}

function provideAdvice(initialAmount, results) {
    const lastResult = results[results.length - 1];
    const netGainFromInvesting = lastResult.investmentGrowth - initialAmount;
    const totalCostOfFinancing = results.reduce((acc, result) => acc + result.interestPaid, 0);
    const adviceElement = document.getElementById('summaryAdvice');
    const adviceText = netGainFromInvesting > totalCostOfFinancing ?
        "It makes more sense to finance the purchase. By investing the initial amount, you could gain an additional $" + (netGainFromInvesting - totalCostOfFinancing).toFixed(2) :
        "It makes more sense to pay cash. Financing would cost you an additional $" + (totalCostOfFinancing - netGainFromInvesting).toFixed(2);
    adviceElement.textContent = adviceText;
}
