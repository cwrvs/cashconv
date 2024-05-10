function calculateResults() {
    var P = parseFloat(document.getElementById('amountFinanced').value); // principal
    var r = parseFloat(document.getElementById('apr').value) / 100; // annual interest rate
    var n = parseInt(document.getElementById('termYears').value); // term in years
    var taxRate = parseFloat(document.getElementById('taxRate').value) / 100; // tax rate

    // Compound interest for investment
    var compoundInterest = P * Math.pow((1 + r), n);

    // Monthly payments for financed amount
    var monthlyRate = r / 12; // monthly interest rate
    var months = n * 12; // total number of payments
    var monthlyPayment = (P * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

    // Total payments made
    var totalPayments = monthlyPayment * months;
    
    // Total interest paid
    var totalInterest = totalPayments - P;

    // Investment growth assuming S&P 500 average returns
    var investmentGrowth = compoundInterest; // Simplified for example

    // Display the results
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<h2>Results</h2>
                            <p>Total Compound Interest on Investment: $${compoundInterest.toFixed(2)}</p>
                            <p>Monthly Payment: $${monthlyPayment.toFixed(2)}</p>
                            <p>Total Interest Paid on Loan: $${totalInterest.toFixed(2)}</p>
                            <p>Total Payments: $${totalPayments.toFixed(2)}</p>
                            <p>Investment Growth: $${investmentGrowth.toFixed(2)}</p>`;
}
