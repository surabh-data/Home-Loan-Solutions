const SITE_URL = "https://surabh-data.github.io/Home-Loan-Solutions/";
const WHATSAPP_NUMBER = "919149362770";

const indianNumber = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0
});

function formatINR(value) {
    return `Rs. ${indianNumber.format(Math.round(value))}`;
}

function getValue(id) {
    return document.getElementById(id).value.trim();
}

function calculateEMI(event) {
    event.preventDefault();

    const principal = Number(getValue("loanAmount"));
    const annualRate = Number(getValue("interestRate"));
    const years = Number(getValue("loanTenure"));
    const result = document.getElementById("emiResult");

    if (!principal || principal <= 0 || annualRate <= 0 || !years || years <= 0) {
        result.hidden = false;
        result.innerHTML = "<span>Please enter valid positive values for amount, rate, and tenure.</span>";
        return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayable = emi * months;
    const totalInterest = totalPayable - principal;

    result.hidden = false;
    result.innerHTML = `
        <span>Estimated monthly EMI</span>
        <strong>${formatINR(emi)}</strong>
        <small>Total interest: ${formatINR(totalInterest)}</small>
        <small>Total payable (${months} months): ${formatINR(totalPayable)}</small>
    `;
}

function sendToWhatsApp(event) {
    event.preventDefault();

    const name = getValue("name");
    const phone = getValue("phone");
    const email = getValue("email");
    const loanPurpose = getValue("loanPurpose");
    const message = getValue("message");

    if (!name || !phone || !email || !loanPurpose || !message) {
        alert("Please fill in all fields before sending.");
        return;
    }

    const text = [
        "Hello Home Loan Solutions,",
        "",
        "I would like a free home loan consultation.",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Loan purpose: ${loanPurpose}`,
        `Query: ${message}`,
        "",
        `Website: ${SITE_URL}`
    ].join("\n");

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
}

function setupNavigation() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");

    if (!toggle || !nav) {
        return;
    }

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

function initializeSite() {
    if (document.documentElement.dataset.siteReady === "true") {
        return;
    }

    document.documentElement.dataset.siteReady = "true";
    document.getElementById("currentYear").textContent = String(new Date().getFullYear());
    document.getElementById("emiForm").addEventListener("submit", calculateEMI);
    document.getElementById("calculateEmiButton").addEventListener("click", calculateEMI);
    document.getElementById("consultationForm").addEventListener("submit", sendToWhatsApp);
    document.getElementById("sendConsultationButton").addEventListener("click", sendToWhatsApp);
    setupNavigation();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeSite);
} else {
    initializeSite();
}
