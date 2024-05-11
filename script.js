document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('calculateButton').addEventListener('click', function() {
        const amount = parseFloat(document.getElementById('amountFinanced').value);
        const apr = parseFloat(document.getElementById('apr').value);
        const term = parseInt(document.getElementById('termYears').value);
        const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value);
        const annualIncome = parseFloat(document.getElementById('annualIncome').value);

        const details = calculateFinancialDetails(amount, apr, term, rateOfReturn, annualIncome);
        displayResults(details);
        provideAdvice(details, amount);
    });
});

function calculateFinancialDetails(amount, apr, term, rateOfReturn, annualIncome) {
    const monthlyRate = apr / 100 / 12;
    const monthlyPayment = amount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -term * 12));
    const investmentReturnRate = rateOfReturn / 100 / 12;
    
    let currentBalance = amount;
    let totalInterestPaid = 0;
    let investmentBalance = 0;
    let results = [];

    for (let year = 1; year <= term; year++) {
        let interestPaidYearly = 0;
        for (let month = 1; month <= 12; month++) {
            let monthlyInterest = currentBalance * monthlyRate;
            interestPaidYearly += monthlyInterest;
            currentBalance -= (monthlyPayment - monthlyInterest);
            investmentBalance += monthlyPayment;
            investmentBalance *= (1 + investmentReturnRate);
        }
        totalInterestPaid += interestPaidYearly;
        results.push({
            year: year,
            investmentGrowth: investmentBalance,
            interestPaid: interestPaidYearly,
            endingBalance: currentBalance
        });
    }

    return results;
}

function displayResults(results) {
    const resultsBody = document.getElementById('resultsBody');
    resultsBody.innerHTML = '';  // Clear previous results
    results.forEach(result => {
        let row = `<tr>
            <td>${result.year}</td>
            <td>$${result.investmentGrowth.toFixed(2)}</td>
            <td>$${result.interestPaid.toFixed(2)}</td>
            <td>$${result.endingBalance.toFixed(2)}</td>
        </tr>`;
        resultsBody.innerHTML += row;
    });
}

function provideAdvice(results, initialAmount) {
    const lastResult = results[results.length - 1];
    const netGain = lastResult.investmentGrowth - (initialAmount + lastResult.interestPaid);
    const adviceElement = document.getElementById('summaryAdvice');
    if (netGain > 0) {
        adviceElement.textContent = "It makes more sense to finance the purchase. Potential gain by investing instead of paying cash: $" + netGain.toFixed(2);
    } else {
        adviceElement.textContent = "It makes more sense to pay cash. Potential loss by financing: $" + Math.abs(netGain).toFixed(2);
    }
}

function printResults() {
    window.print();
}
