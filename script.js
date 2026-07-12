const menuData = [
  {
    id: "makarnalar",
    title: "Makarnalar",
    subtitle: "Taze ve doyurucu",
    items: [
      {
        name: "Penne Arrabiata",
        description: "Acı biber, zeytinyağı, fesleğen, karabiber, toz kırmızıbiber, domates.",
        price: "250 TL",
        badge: "Acılı"
      },
      {
        name: "Penne Napoliten",
        description: "Domates, fesleğen, sarımsak, kekik, karabiber, parmesan peyniri.",
        price: "275 TL"
      },
      {
        name: "Penne Körili",
        description: "Krema, köri, mantar, biber.",
        price: "250 TL"
      },
      {
        name: "Fusilli Pesto",
        description: "Fesleğen, zeytinyağı, çam fıstığı, ceviz, toz parmesan, kekik, sarımsak.",
        price: "350 TL",
        badge: "Şefin önerisi"
      },
      {
        name: "Fusilli Limon Soslu",
        description: "Krema, sarımsak, zeytinyağı, limon suyu, zest.",
        price: "375 TL"
      },
      {
        name: "Fettuccini Alfredo",
        description: "Krema, mantar, zeytinyağı, tereyağı, karabiber.",
        price: "350 TL"
      },
      {
        name: "Ravioli Kremalı",
        description: "Krema, karabiber, parmesan peyniri.",
        price: "400 TL"
      },
      {
        name: "Ek Parmesan Peyniri",
        description: "Ekstra parmesan peyniri.",
        price: "80 TL"
      }
    ]
  },
  {
    id: "tavuklar",
    title: "Tavuk Soteler",
    subtitle: "Sıcak ve lezzetli",
    items: [
      {
        name: "BBQ Soslu Tavuk",
        description: "BBQ sos, mantar, kırmızı biber, yeşil biber, kekik, pul biber.",
        price: "275 TL"
      },
      {
        name: "Soya Soslu Tavuk",
        description: "Soya sos, mantar, kırmızı biber, yeşil biber, pul biber.",
        price: "275 TL"
      },
      {
        name: "Körili Tavuk",
        description: "Köri, mantar, kırmızı biber, yeşil biber, kekik, pul biber.",
        price: "275 TL"
      }
    ]
  },
  {
    id: "menuler",
    title: "Menüler",
    subtitle: "Avantajlı kombinler",
    items: [
      {
        name: "BBQ Tavuk & Körili Makarna & İçecek Menü",
        description: "BBQ soslu tavuk, körili makarna ve seçili içecek.",
        price: "450 TL",
        badge: "Avantajlı"
      },
      {
        name: "Soya Soslu Tavuk & Arrabiata Makarna & İçecek Menü",
        description: "Soya soslu tavuk, arrabiata makarna ve seçili içecek.",
        price: "450 TL",
        badge: "Avantajlı"
      },
      {
        name: "Körili Tavuk & Napoliten Makarna & İçecek Menü",
        description: "Körili tavuk, napoliten makarna ve seçili içecek.",
        price: "450 TL",
        badge: "Avantajlı"
      }
    ]
  },
  {
    id: "kahvalti",
    title: "Kahvaltı Çeşitleri",
    subtitle: "Güne lezzetle başlayın",
    items: [
      {
        name: "Tek Kişilik Kahvaltı Tabağı",
        description: "Yumurta, peynir, reçel, bal, kakao kreması, yeşil zeytin, siyah zeytin.",
        price: "200 TL"
      },
      {
        name: "İki Kişilik Kahvaltı Tabağı",
        description: "Yumurta, peynir, reçel, bal, kakao kreması, yeşil zeytin, siyah zeytin.",
        price: "350 TL"
      },
      {
        name: "Sebzeli Omlet",
        description: "Mantar, yeşil biber, kırmızı biber.",
        price: "225 TL"
      },
      {
        name: "Peynirli Omlet",
        description: "Beyaz peynir, kaşar peyniri.",
        price: "225 TL"
      },
      {
        name: "Patates Kızartması",
        description: "Sıcak servis edilir.",
        price: "175 TL"
      }
    ]
  },
  {
    id: "tatlilar",
    title: "Tatlılar",
    subtitle: "Tatlı bir final",
    items: [
      {
        name: "Magnolia",
        description: "Günlük hazırlanır.",
        price: "175 TL"
      },
      {
        name: "Cheesecake",
        description: "Günlük çeşit için servis personeline danışınız.",
        price: "200 TL"
      }
    ]
  },
  {
    id: "icecekler",
    title: "İçecekler",
    subtitle: "Soğuk ve ferahlatıcı",
    items: [
      { name: "Cola 330 mL", description: "Soğuk servis edilir.", price: "60 TL" },
      { name: "Ice Tea Limon 330 mL", description: "Soğuk servis edilir.", price: "60 TL" },
      { name: "Ice Tea Şeftali 330 mL", description: "Soğuk servis edilir.", price: "60 TL" },
      { name: "Meyve Suyu 330 mL", description: "Mevcut çeşitler için servis personeline danışınız.", price: "65 TL" },
      { name: "Gazoz 200 mL", description: "Soğuk servis edilir.", price: "60 TL" },
      { name: "Sade Maden Suyu 20 cl", description: "Soğuk servis edilir.", price: "40 TL" },
      { name: "Meyveli Maden Suyu 200 mL", description: "Soğuk servis edilir.", price: "50 TL" }
    ]
  }
];

const menuRoot = document.getElementById("menuRoot");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-chip");
const themeToggle = document.getElementById("themeToggle");
const backToTop = document.getElementById("backToTop");

let selectedCategory = "all";
let searchTerm = "";

function normalizeText(value) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function renderMenu() {
  menuRoot.innerHTML = "";
  let visibleItemCount = 0;

  const normalizedSearch = normalizeText(searchTerm.trim());

  menuData.forEach((category) => {
    if (selectedCategory !== "all" && category.id !== selectedCategory) {
      return;
    }

    const filteredItems = category.items.filter((item) => {
      const combined = normalizeText(`${item.name} ${item.description}`);
      return combined.includes(normalizedSearch);
    });

    if (!filteredItems.length) {
      return;
    }

    visibleItemCount += filteredItems.length;

    const categorySection = document.createElement("section");
    categorySection.className = "menu-category fade-in";
    categorySection.id = category.id;

    categorySection.innerHTML = `
      <div class="menu-category__header">
        <h3>${category.title}</h3>
        <span>${category.subtitle}</span>
      </div>
      <div class="menu-grid">
        ${filteredItems
          .map(
            (item) => `
              <article class="menu-item">
                <div class="menu-item__content">
                  <h4>${item.name}</h4>
                  <p>${item.description}</p>
                  ${item.badge ? `<span class="menu-item__badge">${item.badge}</span>` : ""}
                </div>
                <div class="menu-item__price">${item.price}</div>
              </article>
            `
          )
          .join("")}
      </div>
    `;

    menuRoot.appendChild(categorySection);
  });

  emptyState.hidden = visibleItemCount !== 0;
}

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    selectedCategory = button.dataset.category;
    renderMenu();

    document.getElementById("menu").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

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

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("year").textContent = new Date().getFullYear();

renderMenu();
