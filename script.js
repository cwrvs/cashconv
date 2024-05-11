document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('amountFinanced').addEventListener('blur', formatInput);
    document.getElementById('apr').addEventListener('blur', formatInput);
    document.getElementById('termYears').addEventListener('blur', formatInput);
    document.getElementById('rateOfReturn').addEventListener('blur', formatInput);
    document.getElementById('annualIncome').addEventListener('blur', formatInput);
    document.getElementById('includeTaxes').addEventListener('change', calculate);
});

function formatInput(event) {
    const target = event.target;
    const value = parseFloat(target.value);
    if (isNaN(value)) return; // Stop if the value isn't a number

    if (target.id === 'amountFinanced' || target.id === 'annualIncome') {
        target.value = value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    } else if (target.id === 'apr' || target.id === 'rateOfReturn') {
        target.value = value.toFixed(2) + '%';
    }
}

function calculate() {
    const amountFinanced = parseFloat(document.getElementById('amountFinanced').value.replace(/[^\d.-]/g, ''));
    const apr = parseFloat(document.getElementById('apr').value.replace(/[^\d.-]/g, ''));
    const termYears = parseInt(document.getElementById('termYears').value);
    const rateOfReturn = parseFloat(document.getElementById('rateOfReturn').value.replace(/[^\d.-]/g, ''));
    const annualIncome = parseFloat(document.getElementById('annualIncome').value.replace(/[^\d.-]/g, ''));

    updateTaxBracket(annualIncome);

    if (document.getElementById('includeTaxes').checked) {
        // Perform calculations considering taxes
        updateCalculationsWithTaxes(amountFinanced, apr, termYears);
    } else {
        // Perform standard calculations
        updateStandardCalculations(amountFinanced, apr, termYears);
    }
}

function updateTaxBracket(annualIncome) {
    let bracket;
    // Define tax brackets here
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
    document.getElementById('taxBenefits').innerText = 'Tax Bracket: ' + bracket;
}

function updateStandardCalculations(amountFinanced, apr, termYears) {
    const monthlyPayment = (amountFinanced * apr / 100 / 12) / (1 - Math.pow(1 + apr / 100 / 12, -termYears * 12));
    document.getElementById('financeDetails').innerText = 'Monthly Payment: $' + monthlyPayment.toFixed(2);
}

function updateCalculationsWithTaxes(amountFinanced, apr, termYears) {
    // Placeholder for tax-inclusive calculation logic
    const monthlyPaymentWithTaxes = (amountFinanced * apr / 100 / 12) / (1 - Math.pow(1 + apr / 100 / 12, -termYears * 12)); // Simplified example
    document.getElementById('financeDetails').innerText = 'Monthly Payment (with taxes): $' + monthlyPaymentWithTaxes.toFixed(2);
}
