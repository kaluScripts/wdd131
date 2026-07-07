// Dynamic footer content
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;

// Responsive hamburger menu
const hamburgerBtn = document.getElementById("hamburger-btn");
const hamburgerIcon = document.getElementById("hamburger-icon");
const navMenu = document.getElementById("nav-menu");

hamburgerBtn.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("show");
  hamburgerBtn.setAttribute("aria-expanded", isOpen);
  hamburgerIcon.innerHTML = isOpen ? "&#10005;" : "&#9776;";
});
