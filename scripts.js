// WhatsApp Form
function sendToWhatsApp() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    var fullMessage = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    var phoneNumber = "919149362770"; // Replace with your WhatsApp number

    window.open(`https://wa.me/${phoneNumber}?text=${fullMessage}`, "_blank");
}

// EMI Calculator
let emiText = "";

function calculateEMI() {
    const principal = parseFloat(document.getElementById("loanAmount").value);
    const annualRate = parseFloat(document.getElementById("interestRate").value);
    const years = parseFloat(document.getElementById("loanTenure").value);

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                (Math.pow(1 + monthlyRate, months) - 1);

    const result = "Estimated Monthly EMI: ₹" + emi.toFixed(2);
    document.getElementById("emiResult").innerText = result;

    emiText = `Home Loan EMI Calculation\n\nLoan Amount: ₹${principal}\nInterest Rate: ${annualRate}%\nLoan Tenure: ${years} years\n\n${result}`;
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text(emiText, 20, 30);
    doc.save("EMI_Calculation.pdf");
}
