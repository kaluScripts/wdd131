// ============================
// WDD 131 – filtered-temples.js
// Darlene Kalu
// ============================

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

// ---------- Temple data ----------
// The original seven temples provided for the assignment, plus four more added below.
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // -- Four additional temples added by Darlene --
  {
    templeName: "St. George Utah",
    location: "St. George, Utah, United States",
    dedicated: "1877, April, 6",
    area: 143969,
    imageUrl:
    "https://commons.wikimedia.org/wiki/Special:FilePath/St._George_Utah_Temple.jpg?width=400"
  },
  {
    templeName: "London England",
    location: "Newchapel, Surrey, England",
    dedicated: "1958, September, 7",
    area: 42775,
    imageUrl:
    "https://commons.wikimedia.org/wiki/Special:FilePath/London_England_Temple.jpg?width=400"
  },
  {
    templeName: "Tokyo Japan",
    location: "Tokyo, Japan",
    dedicated: "1980, October, 27",
    area: 53997,
    imageUrl:
    "https://churchofjesuschristtemples.org/assets/img/temples/tokyo-japan-temple/tokyo-japan-temple-1925.jpg?width=400"
  },
  {
    templeName: "Freiberg Germany",
    location: "Freiberg, Saxony, Germany",
    dedicated: "1985, June, 29",
    area: 21500,
    imageUrl:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Freiberg_Tempel.JPG?width=400"
  }
];

// ---------- Card rendering ----------
const cardContainer = document.getElementById("temple-cards");

function createTempleCard(temple) {
  const card = document.createElement("div");
  card.className = "temple-card";

  card.innerHTML = `
    <h2>${temple.templeName}</h2>
    <div class="temple-details">
      <p><span class="detail-label">Location:</span> ${temple.location}</p>
      <p><span class="detail-label">Dedicated:</span> ${temple.dedicated}</p>
      <p><span class="detail-label">Size:</span> ${temple.area.toLocaleString()} sq ft</p>
    </div>
    <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy" width="400" height="250">
  `;

  return card;
}

function renderTemples(templeList) {
  cardContainer.innerHTML = "";
  templeList.forEach((temple) => {
    cardContainer.appendChild(createTempleCard(temple));
  });
}

// ---------- Filtering ----------
function getDedicationYear(dedicated) {
  return parseInt(dedicated.split(",")[0], 10);
}

const filters = {
  all: () => temples,
  old: () => temples.filter((temple) => getDedicationYear(temple.dedicated) < 1900),
  new: () => temples.filter((temple) => getDedicationYear(temple.dedicated) > 2000),
  large: () => temples.filter((temple) => temple.area > 90000),
  small: () => temples.filter((temple) => temple.area < 10000)
};

const filterLinks = document.querySelectorAll(".filter-link");

filterLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const filterName = link.dataset.filter;
    renderTemples(filters[filterName]());

    filterLinks.forEach((otherLink) => otherLink.classList.remove("active"));
    link.classList.add("active");

    // Close the mobile menu after a selection is made
    navMenu.classList.remove("show");
    hamburgerBtn.setAttribute("aria-expanded", false);
    hamburgerIcon.innerHTML = "&#9776;";
  });
});

// Initial render: show all temples
renderTemples(filters.all());
