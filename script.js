document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function(event) {
            // Only clear the format if the value is fully numeric
            let value = event.target.value;
            if (value.match(/^\d+(\.\d+)?$/)) { // Check if the value is purely numeric
                event.target.value = value;
            } else {
                event.target.value = value.replace(/[\$, %]+/g, '').trim(); // Remove any formatting
            }
        });
        input.addEventListener('blur', formatInput); // Re-apply formatting on blur
    });

    document.getElementById('includeTaxes').addEventListener('change', calculate);
});

function formatInput(event) {
    const target = event.target;
    let value = parseFloat(target.value);
    if (isNaN(value)) return; // Do nothing if conversion fails

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
        updateCalculationsWithTaxes(amountFinanced, apr, termYears, annualIncome);
    } else {
        updateStandardCalculations(amountFinanced, apr, termYears);
    }
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
    document.getElementById('taxBenefits').innerText = 'Tax Bracket: ' + bracket;
}

function updateStandardCalculations(amountFinanced, apr, termYears) {
    const monthlyPayment = (amountFinanced * (apr / 100) / 12) / (1 - Math.pow(1 + (apr / 100) / 12, -termYears * 12));
    document.getElementById('financeDetails').innerText = 'Monthly Payment: $' + monthlyPayment.toFixed(2);
}

function updateCalculationsWithTaxes(amountFinanced, apr, termYears, annualIncome) {
    // Example calculation considering tax effects
    const monthlyPaymentWithTaxes = (amountFinanced * (apr / 100) / 12) / (1 - Math.pow(1 + (apr / 100) / 12, -termYears * 12)); // Simplified example
    document.getElementById('financeDetails').innerText = 'Monthly
Payment (with taxes): $' + monthlyPaymentWithTaxes.toFixed(2);
// Additional logic to calculate tax effects can be added here
}

function printResults() {
window.print();
}
