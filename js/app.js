/* =======================
   DOM ELEMENTLERİ
   Sayfadaki HTML elemanlarını
   JavaScript ile kontrol edebilmek için
   değişkenlere atıyoruz
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
let currentView = "home"; // kullanıcının şu anda ana sayfada mı yoksa favoriler sayfasında mı olduğunu  takip etmek için kullanılır




/* ===========================
   UYGULAMA DURUMU (STATE)
   Uygulamanın temel verilerini
   ve durumunu saklar
=========================== */
let allMedia = []; // JSON dosyasından gelen tüm film verileri
let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // kullanıcının favori filmlerini localStorage üzerinden saklar




/* =============================
   VERİ ÇEKME (FETCH)
   Film verilerini JSON dosyasından
   asenkron olarak yükler
============================= */
const loadMedia = async () => {
  try {    
    const response = await fetch("data/ghibli_films.json"); // JSON dosyasını fetch ile alıyoruz
    const data = await response.json();    
    allMedia = Array.isArray(data) ? data : data.films; // JSON dizi veya obje olabilir
    displayMedia(allMedia); // İlk açılışta tüm filmleri listeliyoruz
    populateYearFilter(allMedia);  // Filtre seçeneklerini dolduruyoruz
    populateTypeFilter();
  }  

   catch (error) {
    console.error("Veri yüklenirken hata oluştu:", error); // Veri yüklenemezse konsola hata basar
  }
};




/* ================
   YIL FİLTRESİ
================ */
const populateYearFilter = (media) => {
  yearFilter.innerHTML = `<option value="">All Years</option>`;

    // Yılları tekrar etmeyecek şekilde alıyoruz, boş değerleri temizliyoruz ve küçükten büyüğe sıralıyoruz
  const years = [...new Set(media.map(item => item.year))]
    .filter(Boolean)
    .sort((a, b) => a - b);

    // Her yıl için bir option oluşturuluyor
  years.forEach(year => {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearFilter.appendChild(option);
  });
};




/* =====================
   KATEGORİ  FİLTRESİ
===================== */
const populateTypeFilter = () => {
  typeFilter.innerHTML = `<option value="">All Categories</option>`;

    // Tüm filmlerden category alanlarını alıyoruz, tekrar edenleri kaldırıyoruz
  const categories = [...new Set(allMedia.map(item => item.category))]
    .filter(Boolean);

    // Her kategori için select option eklenir
  categories.forEach(category => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    typeFilter.appendChild(option);
  });
};




/* =======================
   MEDYA LİSTELEME
   Filmleri kart yapısı
   halinde ekrana basar
======================= */
const displayMedia = (media) => {
  mediaList.innerHTML = ""; // Önce liste temizlenir

    // Eğer sonuç yoksa kullanıcıya mesaj gösterilir
  if (media.length === 0) {
    mediaList.innerHTML = `<p style="padding:1rem">No results found.</p>`;
    return;
  }

     // Her film için bir kart oluşturulur
  media.forEach(item => {
    const card = document.createElement("article");
    card.classList.add("card");

    // Kart içerikleri
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

    // Detay butonlarına tıklanınca ilgili filmin detay ekranı açılır
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

    btn.textContent = favorites.includes(id)
      ? "Favoriden Çıkart ❌"
      : "Favoriye Ekle ⭐";
  });
});

};




/* ===========================
   DETAY GÖRÜNÜMÜ (SPA)
   Sayfa yenilenmeden
   film detaylarını gösterir
=========================== */
const showMediaDetail = (id) => {
  const selected = allMedia.find(item => item.id == id); // Seçilen filmi ID’ye göre buluruz
  if (!selected) return;

  currentView = currentView === "favorites" ? "favorites" : "home"; // Geri dönüşte hangi sayfaya dönüleceğini takip eder
  
    // Karakter listesi varsa <li> olarak oluşturulur, yoksa bilgi mesajı gösterilir
  const charactersHTML = selected.characters && selected.characters.length
    ? selected.characters.map(char => `<li>${char}</li>`).join("")
    : "<li>No characters information.</li>";

    // Detay ekranının HTML içeriği
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

    // Liste gizlenir, detay ekranı gösterilir
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

    // Güncel favoriler localStorage’a kaydedilir
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

  // Başlığa göre arama
  if (searchText) {
    filtered = filtered.filter(item =>
      item.title.toLowerCase().includes(searchText)
    );
  }

  // Yıla göre filtreleme
  if (selectedYear) {
    filtered = filtered.filter(item => item.year == selectedYear);
  }

  // Kategoriye göre filtreleme
  if (selectedType) {
    filtered = filtered.filter(
      item => item.category && item.category === selectedType
    );
  }

  // Filtrelenmiş sonuçları ekrana bas
  displayMedia(filtered);

  // Detay ekranı kapatılır
  detailSection.style.display = "none";
  listSection.style.display = "block";
};

// Filtre inputları değiştikçe otomatik çalışır
searchInput.addEventListener("input", applyFilters);
yearFilter.addEventListener("change", applyFilters);
typeFilter.addEventListener("change", applyFilters);




/* =======================
   NAVİGASYON
   Home, Favorites ve Back
   butonlarının kontrolü
======================= */
backBtn.addEventListener("click", () => {
  detailSection.style.display = "none";
  listSection.style.display = "block";

  // Eğer favorilerden gelindiyse tekrar favorileri göster
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

  // Sadece favori filmler listelenir
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
   Sayfa açıldığında
   ilk verileri yükler
======================= */
loadMedia();