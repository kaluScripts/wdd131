// ============================
// WDD 131 – form.js
// Darlene Kalu
// ============================

// Dynamic footer content
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;

// ---------- Product data ----------
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Populate the Product Name select with options from the array
const productSelect = document.getElementById("product");

products.forEach((product) => {
  const option = document.createElement("option");
  option.value = product.id;
  option.textContent = product.name;
  productSelect.appendChild(option);
});

// Save the human-readable product name so review.html can greet the user by product
const reviewForm = document.getElementById("review-form");

reviewForm.addEventListener("submit", () => {
  const selectedOption = productSelect.options[productSelect.selectedIndex];
  localStorage.setItem("lastProductName", selectedOption.textContent);
});
