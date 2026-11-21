const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const formatRupiah = (amount) => "Rp" + amount.toLocaleString("id-ID");
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const CART_KEY = "leni_cart";
const WISHLIST_KEY = "leni_wish";

function loadFromStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

let cart = loadFromStorage(CART_KEY, {}); // { idProduk: jumlah }
const wishlist = loadFromStorage(WISHLIST_KEY, []); // [idProduk, ...]

function saveToStorage() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  } catch {
  }
}

const products = [
  {
    id: 1,
    name: "Pink Cloud Cleanser",
    category: "Facial Wash",
    price: 89000,
    size: "100 ml",
    shape: "tube",
    colorLight: "#F6C0CE",
    colorDark: "#D4748C",
    description: "Pembersih wajah berbusa lembut dengan aroma bunga yang menenangkan.",
    ingredients: "Glycerin, Rose Water, Amino Acid Surfactant, Panthenol",
    benefits: [
      "Membersihkan debu dan minyak",
      "Terasa lembut dan segar",
      "Tidak membuat kulit terasa kesat"
    ],
    usage: "Pijat lembut pada wajah basah selama 30 detik, bilas hingga bersih. Pagi dan malam."
  },
  {
    id: 2,
    name: "Matcha Dew Toner",
    category: "Toner",
    price: 99000,
    size: "150 ml",
    shape: "bottle",
    colorLight: "#C3D9B5",
    colorDark: "#9CBB90",
    description: "Toner ringan berbasis teh hijau untuk kulit terasa segar dan lembap.",
    ingredients: "Green Tea Extract, Hyaluronic Acid, Centella, Aloe Vera",
    benefits: [
      "Menyegarkan kulit",
      "Membantu menjaga kelembapan",
      "Menyiapkan kulit untuk langkah berikutnya"
    ],
    usage: "Tuang pada kapas atau telapak tangan, tepuk lembut ke wajah setelah cuci muka."
  },
  {
    id: 3,
    name: "Rose Glow Serum",
    category: "Face Serum",
    price: 149000,
    size: "30 ml",
    shape: "drop",
    colorLight: "#F6C0CE",
    colorDark: "#D4748C",
    description: "Serum bertekstur silky dengan aroma mawar untuk tampilan kulit glowing.",
    ingredients: "Niacinamide, Rose Extract, Hyaluronic Acid, Vitamin E",
    benefits: [
      "Tampilan kulit lebih cerah dan sehat",
      "Melembapkan ringan",
      "Tekstur cepat meresap"
    ],
    usage: "Teteskan 2–3 tetes, ratakan dan tepuk lembut. Gunakan malam hari."
  },
  {
    id: 4,
    name: "Cica Bloom Cream",
    category: "Moisturizer",
    price: 129000,
    size: "50 g",
    shape: "jar",
    colorLight: "#C3D9B5",
    colorDark: "#9CBB90",
    description: "Krim pelembap lembut dengan Centella untuk menenangkan kulit.",
    ingredients: "Centella Asiatica, Ceramide, Shea Butter, Squalane",
    benefits: [
      "Melembapkan hingga 24 jam",
      "Menenangkan kulit",
      "Tekstur tidak lengket"
    ],
    usage: "Ambil sebesar biji jagung, ratakan ke wajah dan leher pagi dan malam."
  },
  {
    id: 5,
    name: "Daily Veil SPF",
    category: "Sunscreen",
    price: 119000,
    size: "50 ml",
    shape: "tube",
    colorLight: "#F6C0CE",
    colorDark: "#9CBB90",
    description: "Sunscreen ringan SPF 50 PA++++ dengan hasil akhir dewy tanpa white cast.",
    ingredients: "Zinc Oxide, Niacinamide, Aloe Vera, Vitamin E",
    benefits: [
      "Melindungi dari sinar UV",
      "Ringan dan cepat meresap",
      "Cocok dipakai di bawah makeup"
    ],
    usage: "Oleskan dua ruas jari sebagai langkah terakhir pagi hari, ulangi tiap 3–4 jam."
  },
  {
    id: 6,
    name: "Glow Essentials Set",
    category: "Skincare Bundle",
    price: 379000,
    size: "4 produk",
    shape: "set",
    colorLight: "#F6C0CE",
    colorDark: "#D4748C",
    description: "Paket lengkap: cleanser, toner, serum, dan cream dalam satu kotak hadiah cantik.",
    ingredients: "Lihat bahan masing-masing produk dalam set",
    benefits: [
      "Rutinitas lengkap hemat",
      "Kemasan hadiah premium",
      "Cocok untuk pemula"
    ],
    usage: "Ikuti urutan: cleanser, toner, serum, cream."
  }
];

const ingredientHighlights = [
  "Rose Water + Panthenol",
  "Green Tea + Hyaluronic Acid",
  "Rose + Niacinamide",
  "Centella + Ceramide",
  "Zinc Oxide + Aloe",
  "Complete 4-Step Ritual"
];

const productBadges = {
  1: "Best Seller",
  2: "New",
  3: "Best Seller",
  5: "Best Seller",
  6: "Gift Set"
};

// Produk yang tampil di bagian "Best Sellers" (Rose Glow Serum, Pink Cloud Cleanser, Daily Veil SPF)
const bestSellers = [products[2], products[0], products[4]];

// `productId` menunjuk ke produk yang gambarnya dipakai di kartu artikel
const articles = [
  {
    title: "5 Basic Skincare Steps for Beginners",
    category: "Basics",
    productId: 1,
    excerpt: "Mulai dari cleanse, tone, treat, moisturize, dan protect. Lima langkah ini sudah cukup untuk dasar rutinitas yang rapi dan konsisten."
  },
  {
    title: "How to Build Your Skincare Routine",
    category: "Routine",
    productId: 4,
    excerpt: "Mulai dengan tiga produk dasar: pembersih, pelembap, dan sunscreen. Tambahkan produk baru satu per satu, beri jeda satu minggu."
  },
  {
    title: "Why Sunscreen Matters",
    category: "Protection",
    productId: 5,
    excerpt: "Sinar UV ada setiap hari, bahkan saat mendung. Sunscreen adalah langkah penting untuk menjaga tampilan kulit tetap sehat."
  },
  {
    title: "Tips for Healthy-Looking Skin",
    category: "Lifestyle",
    productId: 3,
    excerpt: "Tidur cukup, minum air, makan buah dan sayur, serta rutin mencuci wajah membantu kulit tampak lebih segar."
  }
];

const findProduct = (id) => products.find((product) => product.id === Number(id));

let artCounter = 0;

function renderProductImage(product) {
  return `<span class="leni_ph">${renderProductArt(product)}<img src="images/lenie-${product.id}.jpg" alt="${product.name}" loading="lazy" onerror="this.remove()"></span>`;
}

function accentColor(color) {
  return color === "#D4748C" ? "#9CBB90" : "#D4748C";
}

function glassShape(uid, x, y, width, height, radius, fill) {
  return (
    `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}"/>` +
    `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="url(#leni_s${uid})"/>` +
    `<rect x="${x + width * 0.12}" y="${y + height * 0.1}" width="${Math.max(3, width * 0.06)}" height="${height * 0.8}" rx="2" fill="#fff" opacity=".4"/>`
  );
}

function labelShape(product, centerX, centerY, width, height) {
  const nameWords = product.name.split(" ");
  const firstWord = nameWords[0];
  const otherWords = nameWords.slice(1).join(" ");

  const text = (y, size, fill, content, fontFamily) =>
    `<text x="${centerX}" y="${y}" text-anchor="middle" font-family="${fontFamily}" font-size="${size}" fill="${fill}">${content}</text>`;

  return (
    `<rect x="${centerX - width / 2}" y="${centerY - height / 2}" width="${width}" height="${height}" rx="5" fill="#fff" opacity=".95"/>` +
    text(centerY - height * 0.2, width * 0.17, "#51433F", "LENIÉ", "Georgia,serif") +
    `<line x1="${centerX - width * 0.22}" x2="${centerX + width * 0.22}" y1="${centerY - height * 0.09}" y2="${centerY - height * 0.09}" stroke="${product.colorDark}" stroke-width=".9"/>` +
    text(centerY + height * 0.1, width * 0.1, "#51433F", firstWord, "Poppins,sans-serif") +
    text(centerY + height * 0.25, width * 0.1, "#51433F", otherWords, "Poppins,sans-serif") +
    text(centerY + height * 0.4, width * 0.08, "#8a7a74", product.size, "Poppins,sans-serif")
  );
}

function packagingShape(uid, shape, product) {
  const mainColor = product.colorDark;
  const capColor = accentColor(mainColor);

  if (shape === "tube") {
    return (
      `<rect x="86" y="50" width="68" height="14" rx="3" fill="${mainColor}"/>` +
      glassShape(uid, 82, 60, 76, 120, 12, mainColor) +
      glassShape(uid, 94, 176, 52, 30, 7, capColor) +
      labelShape(product, 120, 118, 54, 72)
    );
  }

  if (shape === "bottle") {
    return (
      glassShape(uid, 104, 82, 32, 22, 3, "#fff") +
      glassShape(uid, 78, 98, 84, 108, 16, mainColor) +
      glassShape(uid, 98, 48, 44, 38, 6, capColor) +
      labelShape(product, 120, 152, 60, 76)
    );
  }

  if (shape === "drop") {
    return (
      glassShape(uid, 108, 52, 24, 46, 12, mainColor) +
      glassShape(uid, 100, 94, 40, 22, 3, capColor) +
      glassShape(uid, 86, 112, 68, 94, 14, mainColor) +
      labelShape(product, 120, 160, 52, 66)
    );
  }

  return (
    glassShape(uid, 58, 142, 124, 64, 16, mainColor) +
    glassShape(uid, 54, 112, 132, 34, 9, capColor) +
    labelShape(product, 120, 176, 66, 46)
  );
}

function scaledPackaging(uid, shape, product, centerX) {
  return `<g transform="translate(${centerX - 120 * 0.62} 78.3) scale(.62)">${packagingShape(uid, shape, product)}</g>`;
}

function giftSetShape(uid, product) {
  return (
    scaledPackaging(uid, "tube", products[0], 68) +
    scaledPackaging(uid, "jar", products[3], 172) +
    scaledPackaging(uid, "bottle", products[1], 120) +
    glassShape(uid, 40, 176, 160, 36, 8, "#fff") +
    `<rect x="112" y="176" width="16" height="36" fill="${product.colorDark}"/>` +
    `<circle cx="112" cy="174" r="8" fill="${product.colorDark}"/>` +
    `<circle cx="128" cy="174" r="8" fill="${product.colorDark}"/>` +
    `<circle cx="120" cy="175" r="4" fill="#fff"/>`
  );
}

function flowerShape() {
  return [0, 72, 144, 216, 288]
    .map((angle) => `<ellipse cx="0" cy="-9" rx="6" ry="9" fill="#D4748C" opacity=".6" transform="rotate(${angle})"/>`)
    .join("");
}

function renderProductArt(product) {
  artCounter += 1;
  const uid = product.id + "_" + artCounter;

  const packaging = product.shape === "set"
    ? giftSetShape(uid, product)
    : packagingShape(uid, product.shape, product);

  let shadowWidth = 50;
  if (product.shape === "set") shadowWidth = 84;
  else if (product.shape === "jar") shadowWidth = 66;

  const defs =
    `<defs>` +
    `<linearGradient id="leni_g${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${product.colorLight}"/><stop offset="1" stop-color="#FFF9F4"/></linearGradient>` +
    `<linearGradient id="leni_s${uid}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".2"/><stop offset=".3" stop-color="#fff" stop-opacity=".3"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>` +
    `<filter id="leni_f${uid}"><feGaussianBlur stdDeviation="3"/></filter>` +
    `</defs>`;

  const background =
    `<rect width="240" height="260" fill="url(#leni_g${uid})"/>` +
    `<circle cx="120" cy="120" r="88" fill="#fff" opacity=".35"/>` +
    `<path d="M22 214c-8-40 8-78 40-96 10 40-4 78-40 96z" fill="#9CBB90" opacity=".8"/>` +
    `<path d="M22 214c10-34 20-62 40-96" stroke="#fff" fill="none" opacity=".6"/>` +
    `<g transform="translate(204 100)">${flowerShape()}<circle r="4" fill="#FFF9F4"/></g>`;

  const podium =
    `<ellipse cx="120" cy="224" rx="102" ry="18" fill="#fff" opacity=".5"/>` +
    `<ellipse cx="120" cy="212" rx="90" ry="13" fill="#fff"/>` +
    `<ellipse cx="120" cy="209" rx="${shadowWidth}" ry="6" fill="#51433F" opacity=".3" filter="url(#leni_f${uid})"/>`;

  return `<svg viewBox="0 0 240 260" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${product.name}">${defs}${background}${podium}${packaging}</svg>`;
}


function renderProductCard(product) {
  const badge = productBadges[product.id];
  const isWished = wishlist.includes(product.id);

  return `
    <article class="leni_product-card">
      <button class="leni_heart ${isWished ? "leni_on" : ""}" data-wish="${product.id}" aria-label="Wishlist">♥</button>
      ${badge ? `<span class="leni_badge-tag">${badge}</span>` : ""}
      <a href="#leni_product-details" data-view="${product.id}">${renderProductImage(product)}</a>
      <span class="leni_cat">${product.category}</span>
      <h3><a href="#leni_product-details" data-view="${product.id}">${product.name}</a></h3>
      <p class="leni_ing">${ingredientHighlights[product.id - 1]}</p>
      <p class="leni_stars">★★★★★ <small>4.${8 + product.id % 2}</small></p>
      <p class="leni_price">${formatRupiah(product.price)} · ${product.size}</p>
      <button class="leni_btn leni_sm" data-add="${product.id}">Add to Cart</button>
    </article>`;
}

function renderProductGrid(list, container) {
  container.innerHTML = list.map(renderProductCard).join("");
}

const navLinks = [
  { href: "#leni_home", label: "Home" },
  { href: "#leni_about", label: "About" },
  { href: "#leni_products", label: "Products" },
  { href: "#leni_product-details", label: "Details" },
  { href: "#leni_routine", label: "Routine" },
  { href: "#leni_journal", label: "Journal" },
  { href: "#leni_contact", label: "Contact" }
];

function renderHeader() {
  const navItems = navLinks
    .map((link) => `<a href="${link.href}">${link.label}</a>`)
    .join("");

  $("#leni_hdr").innerHTML = `
    <div class="leni_announce">Gratis ongkir min. Rp250.000 · New: Rose Glow Serum 🌸</div>

    <header id="leni_header">
      <div class="leni_wrap leni_bar">
        <button class="leni_burger" id="leni_burger" aria-label="Menu">☰</button>
        <a class="leni_logo" href="#leni_home">LENIÉ</a>
        <div class="leni_icons">
          <button class="leni_icon" data-drawer="1" aria-label="Wishlist">♥<b id="leni_wcount">0</b></button>
          <button class="leni_icon" data-drawer="1" aria-label="Cart">🛒<b id="leni_count">0</b></button>
        </div>
      </div>
      <nav id="leni_nav" class="leni_navbar">${navItems}</nav>
    </header>

    <aside id="leni_drawer">
      <div class="leni_dhead">
        <h3>Keranjang</h3>
        <button data-drawer="0" aria-label="Tutup">✕</button>
      </div>
      <div id="leni_dbody"></div>
    </aside>

    <div id="leni_veil" data-drawer="0"></div>`;
}

function renderFooter() {
  $("#leni_ftr").innerHTML = `
    <footer id="leni_footer">
      <div class="leni_wrap leni_fcols">
        <div>
          <a class="leni_logo" href="#leni_home">LENIÉ</a>
          <p>A Little Care, A Lot of Glow.<br>Korean-inspired skincare untuk kulit yang disayang.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <a href="#leni_products">All Products</a>
          <a href="#leni_routine">Skincare Routine</a>
          <a href="#leni_journal">Beauty Journal</a>
        </div>
        <div>
          <h4>Brand</h4>
          <a href="#leni_home">Home</a>
          <a href="#leni_about">About Us</a>
          <a href="#leni_contact">Contact</a>
        </div>
        <div>
          <h4>Connect</h4>
          <a href="https://instagram.com/lenie.skincare" target="_blank" rel="noopener">Instagram</a>
          <a href="mailto:hello@lenie.id">hello@lenie.id</a>
        </div>
      </div>
      <p class="leni_copy">© 2026 LENIÉ. All rights reserved.</p>
    </footer>`;
}

// Notifikasi kecil di bawah layar
let toastTimer;

function showToast(message) {
  const toast = $("#leni_toast");
  toast.textContent = message;
  toast.classList.add("leni_show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("leni_show"), 1800);
}

function updateUI() {
  saveToStorage();

  const totalItems = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  $("#leni_count").textContent = totalItems;
  $("#leni_wcount").textContent = wishlist.length;

  $$(".leni_heart").forEach((heart) => {
    heart.classList.toggle("leni_on", wishlist.includes(Number(heart.dataset.wish)));
  });

  renderDrawer();
}

function renderDrawer() {
  let total = 0;

  const cartItems = Object.keys(cart)
    .map(Number)
    .map((id) => {
      const product = findProduct(id);
      const quantity = cart[id];
      total += product.price * quantity;

      return `
        <div class="leni_item">
          ${renderProductImage(product)}
          <div><b>${product.name}</b><br>${formatRupiah(product.price)}</div>
          <button data-qd="${id}:-1">−</button> ${quantity} <button data-qd="${id}:1">+</button>
          <button data-rm="${id}">✕</button>
        </div>`;
    })
    .join("");

  const wishlistItems = wishlist
    .map((id) => {
      const product = findProduct(id);

      return `
        <div class="leni_item">
          ${renderProductImage(product)}
          <div><b>${product.name}</b><br>${formatRupiah(product.price)}</div>
          <button data-add="${id}">+🛒</button>
          <button data-wish="${id}">✕</button>
        </div>`;
    })
    .join("");

  $("#leni_dbody").innerHTML = `
    <h3>Cart</h3>
    ${cartItems || "<p>Keranjang masih kosong.</p>"}
    <p class="leni_total">Total: ${formatRupiah(total)}</p>
    <button class="leni_btn" data-checkout="1">Checkout</button>

    <h3 class="leni_mt-24">Wishlist</h3>
    ${wishlistItems || "<p>Belum ada wishlist.</p>"}`;
}

function addToCart(id, quantity = 1) {
  cart[id] = (cart[id] || 0) + quantity;
}

function toggleWishlist(id) {
  const index = wishlist.indexOf(id);
  const wasWished = index > -1;

  if (wasWished) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(id);
  }

  updateUI();
  showToast(wasWished ? "Dihapus dari wishlist" : "Masuk wishlist ♥");
}

function changeCartQuantity(change) {
  const [id, step] = change.split(":");

  cart[id] += Number(step);
  if (cart[id] < 1) delete cart[id];

  updateUI();
}

function checkout() {
  if (!Object.keys(cart).length) {
    showToast("Keranjang masih kosong");
    return;
  }

  cart = {};
  updateUI();
  document.body.classList.remove("leni_show");
  showToast("Pesananmu berhasil dibuat, terima kasih! 🎀");
}

function initCatalog() {
  const searchInput = $("#leni_search");
  const categoryFilter = $("#leni_filter");
  const sortSelect = $("#leni_sort");

  const categories = [...new Set(products.map((product) => product.category))];
  categories.forEach((category) => categoryFilter.add(new Option(category, category)));

  function drawCatalog() {
    const keyword = searchInput.value.toLowerCase().trim();
    const category = categoryFilter.value;
    const sortOrder = sortSelect.value;

    const result = products.filter((product) => {
      const matchesCategory = !category || product.category === category;
      const matchesKeyword = (product.name + product.category).toLowerCase().includes(keyword);
      return matchesCategory && matchesKeyword;
    });

    if (sortOrder) {
      result.sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));
    }

    renderProductGrid(result, $("#leni_catalog"));
    $("#leni_empty").hidden = result.length > 0;
    updateUI();
  }

  [searchInput, categoryFilter, sortSelect].forEach((control) => {
    ["input", "change"].forEach((eventName) => control.addEventListener(eventName, drawCatalog));
  });

  drawCatalog();
}

function renderDetail(id) {
  const product = findProduct(id) || products[2];
  const badge = productBadges[product.id];

  $("#leni_detail").innerHTML = `
    <nav class="leni_crumb">
      <a href="#leni_home">Home</a> / <a href="#leni_products">Products</a> / ${product.name}
    </nav>

    <div class="leni_split leni_dt">
      <div class="leni_archwrap">
        <div class="leni_arch">${renderProductImage(product)}</div>
        ${badge ? `<span class="leni_badge leni_b2">${badge}</span>` : ""}
      </div>

      <div>
        <span class="leni_cat">${product.category}</span>
        <h3 class="leni_dname">${product.name}</h3>
        <p class="leni_stars">★★★★★ <small>4.${8 + product.id % 2} · 128 ulasan</small></p>
        <h3 class="leni_dprice">${formatRupiah(product.price)}</h3>
        <p>${product.description}</p>
        <p class="leni_mt-10"><b>Product Size:</b> ${product.size}</p>

        <div class="leni_meta">
          <label for="leni_qty">Qty</label>
          <input id="leni_qty" type="number" min="1" value="1">
          <button class="leni_btn" id="leni_addbtn" data-add="${product.id}">Add to Cart</button>
          <button class="leni_heart leni_heart-inline leni_on" data-wish="${product.id}">♥</button>
        </div>

        <details class="leni_acc" open>
          <summary>Ingredients</summary>
          <p>${product.ingredients}</p>
        </details>
        <details class="leni_acc">
          <summary>Product Benefits</summary>
          <ul>${product.benefits.map((benefit) => `<li>${benefit}</li>`).join("")}</ul>
        </details>
        <details class="leni_acc">
          <summary>How to Use</summary>
          <p>${product.usage}</p>
        </details>

        <div class="leni_trust">
          <span>🚚 Gratis ongkir min. Rp250.000</span>
          <span>🎁 Free sample</span>
          <span>↩️ Retur 7 hari</span>
        </div>
      </div>
    </div>`;
  const relatedProducts = products.filter((item) => item.id !== product.id).slice(0, 3);
  renderProductGrid(relatedProducts, $("#leni_related"));

  $("#leni_dchips").innerHTML = products
    .map((item) => `<button class="leni_chip ${item.id === product.id ? "leni_on" : ""}" data-view="${item.id}">${item.name}</button>`)
    .join("");

  updateUI();
}

function renderJournal(selectedCategory) {
  const visibleArticles = articles.filter((article) => !selectedCategory || article.category === selectedCategory);

  const categories = ["", ...articles.map((article) => article.category)];
  $("#leni_jchips").innerHTML = categories
    .map((category) => `<button class="leni_chip ${category === selectedCategory ? "leni_on" : ""}" data-jf="${category}">${category || "All"}</button>`)
    .join("");

  $("#leni_articles").innerHTML = visibleArticles
    .map((article) => {
      const index = articles.indexOf(article);
      const isFeatured = index === 0 && !selectedCategory;

      return `
        <article class="leni_article ${isFeatured ? "leni_feat" : ""}">
          ${renderProductImage(findProduct(article.productId))}
          <div>
            <span class="leni_cat">${article.category} · 4 min read</span>
            <h3>${article.title}</h3>
            <p class="leni_ing">${article.excerpt.slice(0, 70)}…</p>
            <p id="leni_ex${index}" hidden>${article.excerpt}</p>
            <button class="leni_btn leni_sm" data-read="${index}">Read More</button>
          </div>
        </article>`;
    })
    .join("");
}

function toggleArticle(button, index) {
  const fullText = $("#leni_ex" + index);
  fullText.hidden = !fullText.hidden;
  button.textContent = fullText.hidden ? "Read More" : "Show Less";
}

function handleClick(event) {
  const target = event.target.closest("button,a,[data-drawer]");
  if (!target) return;

  const data = target.dataset;

  if (target.id === "leni_burger") {
    $("#leni_nav").classList.toggle("leni_open");
  }

  if (data.drawer !== undefined) {
    document.body.classList.toggle("leni_show", data.drawer === "1");
    $("#leni_toast").classList.remove("leni_show");
  }

  if (data.add) {
    const quantity = target.id === "leni_addbtn"
      ? Math.max(1, parseInt($("#leni_qty").value) || 1)
      : 1;

    addToCart(data.add, quantity);
    updateUI();
    showToast("Ditambahkan ke keranjang 🛒");
  }

  if (data.wish) toggleWishlist(Number(data.wish));

  if (data.qd) changeCartQuantity(data.qd);

  if (data.rm) {
    delete cart[data.rm];
    updateUI();
  }

  if (data.checkout) {
    checkout();
    return;
  }

  if (data.view) renderDetail(Number(data.view));

  if (data.qz !== undefined) {
    quizAnswers.push(Number(data.qz));
    renderQuiz();
  }

  if (data.qr) {
    quizAnswers = [];
    renderQuiz();
  }

  if (data.addall) {
    data.addall.split(",").forEach((id) => addToCart(id));
    updateUI();
    showToast("Semua produk masuk keranjang 🛒");
  }

  if (target.id === "leni_top") {
    scrollTo({ top: 0, behavior: "smooth" });
  }

  if (data.jf !== undefined) renderJournal(data.jf);

  if (data.read) toggleArticle(target, data.read);

  if (target.classList.contains("leni_faq-q")) {
    target.parentElement.classList.toggle("leni_open");
  }

  scrollToAnchor(event, target);
}

function scrollToAnchor(event, link) {
  const href = link.getAttribute("href");
  const isInternalLink = link.tagName === "A" && href?.startsWith("#") && href.length > 1;
  if (!isInternalLink) return;

  const section = $(href);
  if (!section) return;

  event.preventDefault();
  $("#leni_nav").classList.remove("leni_open");
  section.scrollIntoView({ behavior: "smooth" });

  try {
    history.replaceState(null, "", href);
  } catch {
  }
}

function initNewsletterForm() {
  const form = $("#leni_news");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = $("#leni_newsmail").value.trim();
    const errorMessage = $("#leni_newserr");

    if (!isValidEmail(email)) {
      errorMessage.textContent = "Masukkan email yang valid.";
      return;
    }

    errorMessage.textContent = "";
    form.reset();
    showToast("Terima kasih sudah berlangganan! 💌");
  });
}

function initContactForm() {
  const form = $("#leni_cform");
  if (!form) return;

  // Aturan tiap kolom: [selector, fungsi pengecek, pesan error]
  const rules = [
    ["#leni_name", (value) => value.length >= 3, "Nama minimal 3 karakter"],
    ["#leni_email", isValidEmail, "Email tidak valid"],
    ["#leni_subject", (value) => value.length >= 3, "Subjek minimal 3 karakter"],
    ["#leni_cat", (value) => value !== "", "Pilih kategori pesan"],
    ["#leni_msg", (value) => value.length >= 10, "Pesan minimal 10 karakter"]
  ];

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isFormValid = true;

    rules.forEach(([selector, isValid, message]) => {
      const field = $(selector);
      const valid = isValid(field.value.trim());

      field.nextElementSibling.textContent = valid ? "" : message;
      if (!valid) isFormValid = false;
    });

    if (isFormValid) {
      form.reset();
      $("#leni_ok").hidden = false;
      showToast("Pesan terkirim ✅");
    } else {
      $("#leni_ok").hidden = true;
    }
  });
}

let sections = [];
let navAnchors = [];

// Menandai menu navigasi sesuai bagian yang sedang tampil
function updateActiveNav() {
  const scrollPosition = scrollY + 150;
  let currentId = sections[0].id;

  sections.forEach((section) => {
    if (section.offsetTop <= scrollPosition) currentId = section.id;
  });

  navAnchors.forEach((anchor) => {
    anchor.classList.toggle("leni_active", anchor.getAttribute("href") === "#" + currentId);
  });
}

function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - innerHeight;
  const percent = scrollableHeight > 0 ? (scrollY / scrollableHeight) * 100 : 0;

  $("#leni_progress").style.width = percent + "%";
  $("#leni_top").classList.toggle("leni_show", scrollY > 700);
}

function initScrollEffects() {
  sections = $$("#leni_main>section");
  navAnchors = $$("#leni_nav a");

  // Scroll spy dijalankan paling banyak sekali per frame
  let spyScheduled = false;

  addEventListener("scroll", () => {
    if (spyScheduled) return;

    spyScheduled = true;
    requestAnimationFrame(() => {
      updateActiveNav();
      spyScheduled = false;
    });
  });
  addEventListener("resize", updateActiveNav);

  updateActiveNav();
  if (location.hash.length > 1) {
    setTimeout(() => {
      try {
        $(location.hash).scrollIntoView();
      } catch {
      }
    }, 150);
  }
}

function initProgressBar() {
  document.body.insertAdjacentHTML(
    "beforeend",
    '<div id="leni_progress"></div><button id="leni_top" aria-label="Kembali ke atas">↑</button>'
  );

  addEventListener("scroll", updateScrollProgress);
  updateScrollProgress();
}


const quizQuestions = [
  { question: "Apa jenis kulitmu?", options: ["Normal", "Kering", "Berminyak", "Sensitif"] },
  { question: "Apa fokus perawatanmu?", options: ["Hidrasi", "Glow", "Perlindungan harian"] },
  { question: "Seberapa lengkap rutinitasmu?", options: ["Simpel (3 langkah)", "Lengkap (5 langkah)"] }
];

const quizAdvice = [
  "Pilih produk bertekstur ringan dan konsisten setiap hari.",
  "Fokus pada pelembap dan hidrasi berlapis.",
  "Pilih toner ringan dan hindari tekstur terlalu berat.",
  "Kenalkan produk satu per satu dan lakukan patch test."
];

let quizAnswers = [];

// Menentukan id produk rekomendasi dari jawaban quiz
function getRecommendedProductIds() {
  const [skinType, focus, routineLength] = quizAnswers;

  // Rutinitas lengkap = 5 produk, rutinitas simpel = cleanser, cream, sunscreen
  let ids = routineLength === 1 ? [1, 2, 3, 4, 5] : [1, 4, 5];

  if (focus === 0 && !ids.includes(2)) ids.push(2); // Hidrasi -> toner
  if (focus === 1 && !ids.includes(3)) ids.push(3); // Glow -> serum
  if (skinType === 3 && focus !== 1) ids = ids.filter((id) => id !== 3); // Kulit sensitif tanpa fokus glow -> tanpa serum

  return ids.sort((a, b) => a - b);
}

function renderQuiz() {
  const quiz = $("#leni_quiz");
  if (!quiz) return;

  // Masih ada pertanyaan yang belum dijawab
  if (quizAnswers.length < quizQuestions.length) {
    const current = quizQuestions[quizAnswers.length];
    const optionButtons = current.options
      .map((option, index) => `<button class="leni_chip" data-qz="${index}">${option}</button>`)
      .join("");

    quiz.innerHTML = `
      <p class="leni_stars">Pertanyaan ${quizAnswers.length + 1} dari ${quizQuestions.length}</p>
      <h3>${current.question}</h3>
      <div class="leni_chips leni_qchips">${optionButtons}</div>`;
    return;
  }

  // Semua pertanyaan sudah dijawab: tampilkan hasil
  const ids = getRecommendedProductIds();

  quiz.innerHTML = `
    <p class="leni_stars">Hasil untukmu</p>
    <h3>Rutinitas ${quizQuestions[0].options[quizAnswers[0]]} · ${quizQuestions[1].options[quizAnswers[1]]}</h3>
    <p>${quizAdvice[quizAnswers[0]]}</p>
    <div class="leni_grid" id="leni_qres"></div>
    <div class="leni_row leni_row-center">
      <button class="leni_btn" data-addall="${ids.join(",")}">Add All to Cart</button>
      <button class="leni_btn leni_ghost" data-qr="1">Ulangi Quiz</button>
    </div>`;

  renderProductGrid(ids.map(findProduct), $("#leni_qres"));
  updateUI();
}


function initRevealOnScroll() {
  if (!("IntersectionObserver" in window)) return;

  const elements = $$(
    ".leni_box,.leni_tile,.leni_step,.leni_vt,.leni_vm,.leni_frame,.leni_archwrap,.leni_stats,.leni_ugc a,.leni_pagehead .leni_wrap"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("leni_in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((element, index) => {
    element.classList.add("leni_rv");
    element.style.transitionDelay = (index % 4) * 70 + "ms";
    observer.observe(element);
  });
}


renderHeader();
renderFooter();

$$("[data-img]").forEach((element) => {
  element.innerHTML = renderProductImage(findProduct(element.dataset.img));
});

$$("[data-grid]").forEach((element) => {
  if (element.id === "leni_catalog") return;

  renderProductGrid(element.dataset.grid === "best" ? bestSellers : products, element);
});

initCatalog();
renderDetail(3);
renderJournal("");

document.addEventListener("click", handleClick);
initNewsletterForm();
initContactForm();

updateUI();
initScrollEffects();

renderQuiz();
initProgressBar();
initRevealOnScroll();
