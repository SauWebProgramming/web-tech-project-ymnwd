/* =======================
   DOM ELEMENTLERİ
======================= */
const mediaList = document.getElementById("mediaList");
const searchInput = document.getElementById("searchInput");
const yearFilter = document.getElementById("yearFilter");
const typeFilter = document.getElementById("typeFilter");

const listSection = document.getElementById("listSection");
const detailSection = document.getElementById("detailSection");
const detailContent = document.getElementById("detailContent");

const backBtn = document.getElementById("backBtn");
const favoritesBtn = document.getElementById("favoritesBtn");
const homeBtn = document.getElementById("homeBtn");
let currentView = "home";


/* =======================
   UYGULAMA DURUMU (STATE)
======================= */
let allMedia = []; // Tüm medya verileri
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

/* =======================
   VERİ ÇEKME (FETCH)
======================= */
const loadMedia = async () => {
  try {
    const response = await fetch("data/ghibli_films.json");
    const data = await response.json();

    // JSON dizi veya obje olabilir
    allMedia = Array.isArray(data) ? data : data.films;

    displayMedia(allMedia);
    populateYearFilter(allMedia);
    populateTypeFilter();
  } catch (error) {
    console.error("Veri yüklenirken hata oluştu:", error);
  }
};

/* =======================
   YIL FİLTRESİ DOLDURMA
======================= */
const populateYearFilter = (media) => {
  yearFilter.innerHTML = `<option value="">All Years</option>`;

  const years = [...new Set(media.map(item => item.year))]
    .filter(Boolean)
    .sort((a, b) => a - b);

  years.forEach(year => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  });
};

/* =======================
   TİP FİLTRESİ
======================= */
const populateTypeFilter = () => {
  typeFilter.innerHTML = `<option value="">All Categories</option>`;

  const categories = [...new Set(allMedia.map(item => item.category))]
    .filter(Boolean);

  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    typeFilter.appendChild(option);
  });
};


/* =======================
   MEDYA LİSTELEME
======================= */
const displayMedia = (media) => {
  mediaList.innerHTML = "";

  if (media.length === 0) {
    mediaList.innerHTML = `<p style="padding:1rem">No results found.</p>`;
    return;
  }

  media.forEach(item => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
  <img src="${item.poster_url}" alt="${item.title} poster" class="card-img" />

  <h3>${item.title}</h3>
  <p class="year">${item.year}</p>

  <div class="card-actions vertical">
    <button class="details-btn full-btn" data-id="${item.id}">
      Detaylara bak 🎬
    </button>

    <button class="fav-btn full-btn" data-id="${item.id}">
  ${favorites.includes(item.id) ? "Favoriden Çıkart ❌" : "Favoriye Ekle ⭐"}
</button>

  </div>
`;


    mediaList.appendChild(card);
  });

  // Detay butonları
  document.querySelectorAll(".details-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      showMediaDetail(btn.dataset.id);
    });
  });

  // Favori butonları
  document.querySelectorAll(".fav-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();

    const id = Number(btn.dataset.id);

    toggleFavorite(id);

    // تحديث النص حسب الحالة الجديدة
    btn.textContent = favorites.includes(id)
      ? "Favoriden Çıkart ❌"
      : "Favoriye Ekle ⭐";
  });
});

};


/* =======================
   DETAY GÖRÜNÜMÜ (SPA)
======================= */
const showMediaDetail = (id) => {
  const selected = allMedia.find(item => item.id == id);
  if (!selected) return;

  currentView = currentView === "favorites" ? "favorites" : "home";

  // Karakterleri <li> haline getir
  const charactersHTML = selected.characters && selected.characters.length
    ? selected.characters.map(char => `<li>${char}</li>`).join("")
    : "<li>No characters information.</li>";

  detailContent.innerHTML = `
    <img src="${selected.poster_url}" class="detail-img" />

    <h2>${selected.title}</h2>

    <p><strong>Year:</strong> ${selected.year}</p>
    <p><strong>⭐ Rating:</strong> ${selected.rating ?? "N/A"}</p>

    <p class="description">
      <strong>Story:</strong><br>
      ${selected.story ?? "No story available."}
    </p>

    <h3>🎭 Characters</h3>
    <ul class="character-list">
      ${charactersHTML}
    </ul>
  `;

  listSection.style.display = "none";
  detailSection.style.display = "block";
};


/* =======================
   FAVORİLER (LOCALSTORAGE)
======================= */
const toggleFavorite = (id) => {
  favorites = favorites.includes(id)
    ? favorites.filter(favId => favId !== id)
    : [...favorites, id];

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

/* =======================
   ARAMA + FİLTRELEME
======================= */
const applyFilters = () => {
  const searchText = searchInput.value.toLowerCase();
  const selectedYear = yearFilter.value;
  const selectedType = typeFilter.value;

  let filtered = allMedia;

  if (searchText) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchText)
    );
  }

  if (selectedYear) {
    filtered = filtered.filter(item => item.year == selectedYear);
  }

  if (selectedType) {
    filtered = filtered.filter(
      item => item.category && item.category === selectedType
    );
  }

  displayMedia(filtered);
  detailSection.style.display = "none";
  listSection.style.display = "block";
};



searchInput.addEventListener("input", applyFilters);
yearFilter.addEventListener("change", applyFilters);
typeFilter.addEventListener("change", applyFilters);

/* =======================
   NAVİGASYON
======================= */
backBtn.addEventListener("click", () => {
  detailSection.style.display = "none";
  listSection.style.display = "block";

  if (currentView === "favorites") {
    const favMedia = allMedia.filter(item =>
      favorites.includes(item.id)
    );
    displayMedia(favMedia);
  } else {
    displayMedia(allMedia);
  }
});


favoritesBtn.addEventListener("click", () => {
  currentView = "favorites";

  const favMedia = allMedia.filter(item =>
    favorites.includes(item.id)
  );

  displayMedia(favMedia);
  detailSection.style.display = "none";
  listSection.style.display = "block";
});


homeBtn.addEventListener("click", () => {
  currentView = "home";
  displayMedia(allMedia);
});




/* =======================
   UYGULAMAYI BAŞLAT
======================= */
loadMedia();
