// ============================
// WDD 131 – review.js
// Darlene Kalu
// ============================

// Dynamic footer content
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;

// Personalize the confirmation message using the product name saved by form.js
const productName = localStorage.getItem("lastProductName");

if (productName) {
  document.getElementById("confirmation-message").textContent =
    `Your review of the ${productName} has been submitted.`;
}

// Track how many reviews have been completed on this device
let reviewCount = parseInt(localStorage.getItem("reviewCount"), 10) || 0;
reviewCount++;
localStorage.setItem("reviewCount", reviewCount);

document.getElementById("review-count").textContent = reviewCount;
