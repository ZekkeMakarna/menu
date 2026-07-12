const menuRoot = document.getElementById("menuRoot");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const themeToggle = document.getElementById("themeToggle");
const backToTop = document.getElementById("backToTop");
const categoryButtonsRoot = document.getElementById("categoryButtons");

let menuData = [];
let selectedCategory = "all";
let searchTerm = "";

function normalizeText(value) {
  return String(value || "")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

async function loadMenu() {
  try {
    const response = await fetch(`menu.json?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("menu.json yüklenemedi");
    menuData = await response.json();
    renderCategoryButtons();
    renderMenu();
  } catch (error) {
    menuRoot.innerHTML = `
      <div class="empty-state">
        <span>⚠️</span>
        <h3>Menü yüklenemedi</h3>
        <p>menu.json dosyasının GitHub ana dizininde olduğundan emin olun.</p>
      </div>`;
  }
}

function renderCategoryButtons() {
  categoryButtonsRoot.innerHTML = `
    <button class="category-chip active" data-category="all">Tümü</button>
    ${menuData.map(category => `
      <button class="category-chip" data-category="${category.id}">
        ${category.title}
      </button>
    `).join("")}
  `;

  categoryButtonsRoot.querySelectorAll(".category-chip").forEach((button) => {
    button.addEventListener("click", () => {
      categoryButtonsRoot.querySelectorAll(".category-chip").forEach((item) =>
        item.classList.remove("active")
      );
      button.classList.add("active");
      selectedCategory = button.dataset.category;
      renderMenu();
      document.getElementById("menu").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function renderMenu() {
  menuRoot.innerHTML = "";
  let visibleItemCount = 0;
  const normalizedSearch = normalizeText(searchTerm.trim());

  menuData.forEach((category) => {
    if (selectedCategory !== "all" && category.id !== selectedCategory) return;

    const filteredItems = (category.items || []).filter((item) => {
      const combined = normalizeText(`${item.name} ${item.description} ${item.badge}`);
      return combined.includes(normalizedSearch);
    });

    if (!filteredItems.length) return;
    visibleItemCount += filteredItems.length;

    const categorySection = document.createElement("section");
    categorySection.className = "menu-category fade-in";
    categorySection.id = category.id;

    categorySection.innerHTML = `
      <div class="menu-category__header">
        <h3>${escapeHtml(category.title)}</h3>
        <span>${escapeHtml(category.subtitle || "")}</span>
      </div>
      <div class="menu-grid">
        ${filteredItems.map((item) => `
          <article class="menu-item">
            <div class="menu-item__content">
              <h4>${escapeHtml(item.name)}</h4>
              <p>${escapeHtml(item.description || "")}</p>
              ${item.badge ? `<span class="menu-item__badge">${escapeHtml(item.badge)}</span>` : ""}
            </div>
            <div class="menu-item__price">${escapeHtml(item.price)}</div>
          </article>
        `).join("")}
      </div>`;

    menuRoot.appendChild(categorySection);
  });

  emptyState.hidden = visibleItemCount !== 0;
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value;
  renderMenu();
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.querySelector(".theme-toggle__icon").textContent = isLight ? "☀" : "☾";
  localStorage.setItem("zekke-theme", isLight ? "light" : "dark");
});

if (localStorage.getItem("zekke-theme") === "light") {
  document.body.classList.add("light");
  themeToggle.querySelector(".theme-toggle__icon").textContent = "☀";
}

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 600);
});

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.getElementById("year").textContent = new Date().getFullYear();

loadMenu();