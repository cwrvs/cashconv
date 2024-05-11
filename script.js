document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.getElementById('calculateButton');
    calculateButton.addEventListener('click', calculate);
    addFocusAndBlurHandlers();
});

function calculate() {
    console.log("Calculation function triggered"); // Debug message
    const amountFinanced = parseFloat(document.getElementById('amountFinanced').value.replace(/[^\d.-]/g, ''));
    const apr = parseFloat(document.getElementById('apr').value.replace(/[^\d.-]/g, ''));
    const termYears = parseInt(document.getElementById('termYears').value);
    const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value.replace(/[^\d.-]/g, ''));
    const annualIncome = parseFloat(document.getElementById('annualIncome').value.replace(/[^\d.-]/g, ''));

    if (isNaN(amountFinanced) || isNaN(apr) || isNaN(termYears) || isNaN(rateOfReturn) || isNaN(annualIncome)) {
        alert("Please enter valid numbers in all fields.");
        return;
    }

    const monthlyPayment = calculateMonthlyPayment(amountFinanced, apr, termYears);
    const investmentGrowth = calculateInvestmentGrowth(amountFinanced, rateOfReturn, termYears);
    
    displayResults(monthlyPayment, investmentGrowth);
    updateTaxBracket(annualIncome);
}

function calculateMonthlyPayment(principal, annualRate, years) {
    const monthlyRate = annualRate / 100 / 12;
    const payments = years * 12;
    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -payments));
}

function calculateInvestmentGrowth(principal, annualRate, years) {
    const monthlyRate = annualRate / 100 / 12;
    const payments = years * 12;
    return principal * Math.pow(1 + monthlyRate, payments);
}

function displayResults(monthlyPayment, investmentGrowth) {
    const financeDetails = document.getElementById('financeDetails');
    financeDetails.innerHTML = `<strong>Monthly Payment:</strong> $${monthlyPayment.toFixed(2)}<br/>`;
    financeDetails.innerHTML += `<strong>Investment Value if Cash Invested:</strong> $${investmentGrowth.toFixed(2)}`;
}

function updateTaxBracket(annualIncome) {
    let bracket;
    if (annualIncome <= 9875) {
        bracket = '10%';
    } else if (annualIncome <= 40125) {
        bracket = '12%';
    } else if (annualIncome <= 85525) {
        bracket = '22%';
    } else if (annualIncome <= 163300) {
        bracket = '24%';
    } else if (annualIncome <= 207350) {
        bracket = '32%';
    } else if (annualIncome <= 518400) {
        bracket = '35%';
    } else {
        bracket = '37%';
    }
    document.getElementById('taxBenefits').innerText = `Tax Bracket: ${bracket}`;
}
