/* ==========================================================================
   Roban Stores, Awka — products.js
   Renders the product catalogue, handles search/category filtering, and
   manages a localStorage-backed favorites list.
   ========================================================================== */

const products = [
  {
    id: 'bakery-01',
    name: 'Roban Sliced White Bread',
    category: 'Bakery',
    price: 1200,
    unit: '500g loaf',
    description: 'Soft, sliced white bread baked fresh daily at Roban Stores.',
    image: 'images/category-bakery.webp',
  },
  {
    id: 'bakery-02',
    name: 'Roban Sliced Brown Bread',
    category: 'Bakery',
    price: 1350,
    unit: '500g loaf',
    description: 'Wholemeal brown bread with a heartier bite, sliced and packed fresh.',
    image: 'images/category-bakery.webp',
  },
  {
    id: 'bakery-03',
    name: 'Roban Family Loaf',
    category: 'Bakery',
    price: 1800,
    unit: '800g loaf',
    description: 'Our largest loaf, baked to order for bigger households.',
    image: 'images/category-bakery.webp',
  },
  {
    id: 'produce-01',
    name: 'Fresh Tomatoes',
    category: 'Produce',
    price: 2500,
    unit: 'per basket',
    description: 'Ripe, locally sourced tomatoes selected for colour and firmness.',
    image: 'images/category-produce.webp',
  },
  {
    id: 'produce-02',
    name: 'Sweet Oranges',
    category: 'Produce',
    price: 1500,
    unit: 'per dozen',
    description: 'Juicy, sweet oranges packed a dozen at a time.',
    image: 'images/category-produce.webp',
  },
  {
    id: 'produce-03',
    name: 'Ripe Plantain',
    category: 'Produce',
    price: 2000,
    unit: 'per bunch',
    description: 'Golden ripe plantain, ready for frying or boiling the same day.',
    image: 'images/category-produce.webp',
  },
  {
    id: 'household-01',
    name: 'Sunlight Detergent Powder',
    category: 'Household',
    price: 2800,
    unit: '1kg pack',
    description: 'A trusted laundry powder for tough stains and everyday washing.',
    image: 'images/category-household.webp',
  },
  {
    id: 'household-02',
    name: 'Morning Fresh Dishwashing Liquid',
    category: 'Household',
    price: 1600,
    unit: '500ml bottle',
    description: 'Cuts through grease fast and is gentle on hands.',
    image: 'images/category-household.webp',
  },
  {
    id: 'household-03',
    name: 'Hypo Bleach',
    category: 'Household',
    price: 1200,
    unit: '1 litre bottle',
    description: 'A reliable household bleach for laundry and surface cleaning.',
    image: 'images/category-household.webp',
  },
  {
    id: 'provisions-01',
    name: 'Golden Penny Semovita',
    category: 'Provisions',
    price: 3200,
    unit: '2kg pack',
    description: 'A pantry staple for smooth, filling swallow.',
    image: 'images/category-provisions.webp',
  },
  {
    id: 'provisions-02',
    name: 'Titus Sardines',
    category: 'Provisions',
    price: 2400,
    unit: 'pack of 4 tins',
    description: 'Ready-to-eat sardines in tomato sauce, a quick protein option.',
    image: 'images/category-provisions.webp',
  },
  {
    id: 'provisions-03',
    name: 'Mama Gold Rice',
    category: 'Provisions',
    price: 8900,
    unit: '5kg bag',
    description: 'Long-grain parboiled rice, a household favourite for every pot size.',
    image: 'images/category-provisions.webp',
  },
];

const categories = ['All', ...new Set(products.map((product) => product.category))];

function formatPrice(amount) {
  const formatted = amount.toLocaleString('en-NG');
  return `₦${formatted}`;
}

function getFavorites() {
  const stored = localStorage.getItem('robanFavorites');
  return stored ? JSON.parse(stored) : [];
}

function saveFavorites(favoriteIds) {
  localStorage.setItem('robanFavorites', JSON.stringify(favoriteIds));
}

function toggleFavorite(productId) {
  const favorites = getFavorites();
  const alreadySaved = favorites.includes(productId);
  let updatedFavorites;

  if (alreadySaved) {
    updatedFavorites = favorites.filter((id) => id !== productId);
  } else {
    updatedFavorites = [...favorites, productId];
  }

  saveFavorites(updatedFavorites);
  return updatedFavorites;
}

function buildProductCard(product) {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(product.id);
  const heartSymbol = isFavorite ? '&#9829;' : '&#9825;';

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-image-wrap">
        <img src="${product.image}" alt="${product.name}" width="300" height="200" loading="lazy">
        <button type="button" class="favorite-btn" data-id="${product.id}" aria-pressed="${isFavorite}" aria-label="Save ${product.name} to favorites">${heartSymbol}</button>
      </div>
      <div class="product-body">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="description">${product.description}</p>
        <p class="product-price">${formatPrice(product.price)} <span class="unit">/ ${product.unit}</span></p>
      </div>
    </article>
  `;
}

function renderProducts(list) {
  const grid = document.querySelector('#productGrid');
  const emptyState = document.querySelector('#emptyState');
  const resultsCount = document.querySelector('#resultsCount');

  if (!grid) {
    return;
  }

  if (list.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
  } else {
    emptyState.classList.add('hidden');
    grid.innerHTML = list.map((product) => buildProductCard(product)).join('');
  }

  if (list.length === products.length) {
    resultsCount.textContent = `Showing all ${products.length} products`;
  } else {
    resultsCount.textContent = `Showing ${list.length} of ${products.length} products`;
  }
}

function getCurrentFilters() {
  const activeFilterBtn = document.querySelector('.filter-btn[aria-pressed="true"]');
  const searchInput = document.querySelector('#productSearch');
  const favoritesToggle = document.querySelector('#favoritesToggle');

  return {
    category: activeFilterBtn ? activeFilterBtn.dataset.category : 'All',
    query: searchInput ? searchInput.value.trim().toLowerCase() : '',
    favoritesOnly: favoritesToggle ? favoritesToggle.getAttribute('aria-pressed') === 'true' : false,
  };
}

function applyFilters() {
  const { category, query, favoritesOnly } = getCurrentFilters();
  const favorites = getFavorites();

  let filtered = products;

  if (category !== 'All') {
    filtered = filtered.filter((product) => product.category === category);
  }

  if (query) {
    filtered = filtered.filter((product) => product.name.toLowerCase().includes(query));
  }

  if (favoritesOnly) {
    filtered = filtered.filter((product) => favorites.includes(product.id));
  }

  renderProducts(filtered);
}

function buildFilterButtons() {
  const filterGroup = document.querySelector('#filterGroup');

  if (!filterGroup) {
    return;
  }

  filterGroup.innerHTML = categories
    .map((category, index) => {
      const isActive = index === 0;
      return `<button type="button" class="filter-btn" data-category="${category}" aria-pressed="${isActive}">${category}</button>`;
    })
    .join('');
}

function initFilterButtons() {
  const filterGroup = document.querySelector('#filterGroup');

  if (!filterGroup) {
    return;
  }

  filterGroup.addEventListener('click', (event) => {
    const clickedBtn = event.target.closest('.filter-btn');

    if (!clickedBtn) {
      return;
    }

    const allButtons = filterGroup.querySelectorAll('.filter-btn');
    allButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
    clickedBtn.setAttribute('aria-pressed', 'true');

    applyFilters();
  });
}

function initSearch() {
  const searchInput = document.querySelector('#productSearch');

  if (!searchInput) {
    return;
  }

  searchInput.addEventListener('input', () => {
    applyFilters();
  });
}

function initFavoritesToggle() {
  const toggleBtn = document.querySelector('#favoritesToggle');

  if (!toggleBtn) {
    return;
  }

  toggleBtn.addEventListener('click', () => {
    const isPressed = toggleBtn.getAttribute('aria-pressed') === 'true';
    const nextState = !isPressed;

    toggleBtn.setAttribute('aria-pressed', `${nextState}`);
    toggleBtn.innerHTML = nextState ? '&#9829; Showing favorites only' : '&#9825; Show favorites only';

    applyFilters();
  });
}

function initFavoriteButtons() {
  const grid = document.querySelector('#productGrid');

  if (!grid) {
    return;
  }

  grid.addEventListener('click', (event) => {
    const heartBtn = event.target.closest('.favorite-btn');

    if (!heartBtn) {
      return;
    }

    const productId = heartBtn.dataset.id;
    const updatedFavorites = toggleFavorite(productId);
    const isFavorite = updatedFavorites.includes(productId);

    heartBtn.setAttribute('aria-pressed', `${isFavorite}`);
    heartBtn.innerHTML = isFavorite ? '&#9829;' : '&#9825;';

    const favoritesToggle = document.querySelector('#favoritesToggle');
    if (favoritesToggle && favoritesToggle.getAttribute('aria-pressed') === 'true') {
      applyFilters();
    }
  });
}

function applyCategoryFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get('category');

  if (!requestedCategory || !categories.includes(requestedCategory)) {
    return;
  }

  const targetBtn = document.querySelector(`.filter-btn[data-category="${requestedCategory}"]`);

  if (targetBtn) {
    const allButtons = document.querySelectorAll('.filter-btn');
    allButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
    targetBtn.setAttribute('aria-pressed', 'true');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  buildFilterButtons();
  applyCategoryFromUrl();
  initFilterButtons();
  initSearch();
  initFavoritesToggle();
  initFavoriteButtons();
  applyFilters();
});
