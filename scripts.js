// WhatsApp Form Submission
function sendToWhatsApp() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all fields before sending.");
        return;
    }

    const fullMessage = `Name: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0AMessage: ${encodeURIComponent(message)}`;
    const phoneNumber = "919149362770"; // Replace with your WhatsApp number

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${fullMessage}`;
    window.open(whatsappURL, "_blank");
}

// EMI Calculator
let emiText = "";

function calculateEMI() {
    const principal = parseFloat(document.getElementById("loanAmount").value);
    const annualRate = parseFloat(document.getElementById("interestRate").value);
    const years = parseFloat(document.getElementById("loanTenure").value);

    if (isNaN(principal) || isNaN(annualRate) || isNaN(years) || principal <= 0 || annualRate <= 0 || years <= 0) {
        alert("Please enter valid positive numbers for all fields.");
        return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                (Math.pow(1 + monthlyRate, months) - 1);

    const result = "Estimated Monthly EMI: ₹" + emi.toFixed(2);
    document.getElementById("emiResult").innerText = result;

    // Optional: store EMI text if needed for future use
    emiText = `Home Loan EMI Calculation\nLoan Amount: ₹${principal}\nInterest Rate: ${annualRate}%\nLoan Tenure: ${years} years\n${result}`;
}
