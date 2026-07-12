let data = [];
const categoriesRoot = document.getElementById("categories");
const categoryTemplate = document.getElementById("categoryTemplate");
const itemTemplate = document.getElementById("itemTemplate");
const statusEl = document.getElementById("status");
const searchEl = document.getElementById("adminSearch");

function slugify(text) {
  return String(text || "kategori")
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i").replace(/ş/g, "s").replace(/ğ/g, "g")
    .replace(/ü/g, "u").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `kategori-${Date.now()}`;
}

function setStatus(message, error = false) {
  statusEl.textContent = message;
  statusEl.style.color = error ? "#b53a3a" : "#2f6f4d";
  clearTimeout(setStatus.timer);
  setStatus.timer = setTimeout(() => statusEl.textContent = "", 3500);
}

async function loadFromServer() {
  try {
    const response = await fetch(`menu.json?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error();
    data = await response.json();
    render();
    setStatus("Mevcut menu.json başarıyla yüklendi.");
  } catch {
    setStatus("menu.json yüklenemedi. Paneli GitHub Pages üzerinden açın veya dosya içe aktarın.", true);
  }
}

function render() {
  categoriesRoot.innerHTML = "";
  const term = searchEl.value.trim().toLocaleLowerCase("tr-TR");

  data.forEach((category, categoryIndex) => {
    const matchesCategory = `${category.title} ${category.subtitle}`.toLocaleLowerCase("tr-TR").includes(term);
    const visibleItems = (category.items || []).map((item, index) => ({item,index}))
      .filter(({item}) => matchesCategory || `${item.name} ${item.description} ${item.badge}`.toLocaleLowerCase("tr-TR").includes(term));

    if (term && !matchesCategory && visibleItems.length === 0) return;

    const node = categoryTemplate.content.cloneNode(true);
    const card = node.querySelector(".category-card");
    const title = node.querySelector(".category-title");
    const subtitle = node.querySelector(".category-subtitle");
    const itemsRoot = node.querySelector(".items");

    title.value = category.title || "";
    subtitle.value = category.subtitle || "";

    title.addEventListener("input", e => {
      category.title = e.target.value;
      category.id = slugify(e.target.value);
    });
    subtitle.addEventListener("input", e => category.subtitle = e.target.value);

    node.querySelector(".delete-category").onclick = () => {
      if (confirm(`"${category.title}" kategorisi silinsin mi?`)) {
        data.splice(categoryIndex, 1); render();
      }
    };
    node.querySelector(".move-up").onclick = () => move(data, categoryIndex, categoryIndex - 1);
    node.querySelector(".move-down").onclick = () => move(data, categoryIndex, categoryIndex + 1);
    node.querySelector(".add-item-btn").onclick = () => {
      category.items.push({name:"Yeni Ürün",description:"",price:"0 TL",badge:""});
      render();
      setStatus("Yeni ürün eklendi.");
    };

    visibleItems.forEach(({item, index:itemIndex}) => {
      const itemNode = itemTemplate.content.cloneNode(true);
      itemNode.querySelector(".item-name").value = item.name || "";
      itemNode.querySelector(".item-price").value = item.price || "";
      itemNode.querySelector(".item-description").value = item.description || "";
      itemNode.querySelector(".item-badge").value = item.badge || "";

      itemNode.querySelector(".item-name").oninput = e => item.name = e.target.value;
      itemNode.querySelector(".item-price").oninput = e => item.price = e.target.value;
      itemNode.querySelector(".item-description").oninput = e => item.description = e.target.value;
      itemNode.querySelector(".item-badge").oninput = e => item.badge = e.target.value;

      itemNode.querySelector(".delete-item").onclick = () => {
        if (confirm(`"${item.name}" ürünü silinsin mi?`)) {
          category.items.splice(itemIndex, 1); render();
        }
      };
      itemNode.querySelector(".item-up").onclick = () => move(category.items, itemIndex, itemIndex - 1);
      itemNode.querySelector(".item-down").onclick = () => move(category.items, itemIndex, itemIndex + 1);

      itemsRoot.appendChild(itemNode);
    });

    categoriesRoot.appendChild(node);
  });
}

function move(array, from, to) {
  if (to < 0 || to >= array.length) return;
  [array[from], array[to]] = [array[to], array[from]];
  render();
}

document.getElementById("addCategoryBtn").onclick = () => {
  data.push({
    id: `yeni-kategori-${Date.now()}`,
    title: "Yeni Kategori",
    subtitle: "Kategori açıklaması",
    items: []
  });
  render();
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
};

document.getElementById("downloadBtn").onclick = () => {
  const cleaned = data.map(category => ({
    id: slugify(category.title),
    title: category.title.trim(),
    subtitle: (category.subtitle || "").trim(),
    items: (category.items || []).map(item => ({
      name: (item.name || "").trim(),
      description: (item.description || "").trim(),
      price: (item.price || "").trim(),
      badge: (item.badge || "").trim()
    }))
  }));

  const blob = new Blob([JSON.stringify(cleaned, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "menu.json";
  link.click();
  URL.revokeObjectURL(url);
  setStatus("Güncel menu.json indirildi.");
};

document.getElementById("importBtn").onclick = () => document.getElementById("fileInput").click();
document.getElementById("fileInput").onchange = async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    data = JSON.parse(await file.text());
    render();
    setStatus("Dosya başarıyla içe aktarıldı.");
  } catch {
    setStatus("Seçilen JSON dosyası geçerli değil.", true);
  }
};

document.getElementById("loadServerBtn").onclick = loadFromServer;
searchEl.oninput = render;
loadFromServer();