/* =======================
   DOM ELEMENTS
======================= */
const mediaList = document.getElementById("mediaList");
const searchInput = document.getElementById("searchInput");
const listSection = document.getElementById("listSection");
const detailSection = document.getElementById("detailSection");
const detailContent = document.getElementById("detailContent");
const backBtn = document.getElementById("backBtn");
const favoritesBtn = document.getElementById("favoritesBtn");
const homeBtn = document.getElementById("homeBtn");

/* =======================
   STATE
======================= */
let allBooks = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

/* =======================
   FETCH DATA
======================= */
const loadBooks = async () => {
  try {
    const response = await fetch("data/books.json");
    const books = await response.json();

    allBooks = books;
    displayBooks(books);
  } catch (error) {
    console.error("Veri yüklenirken hata oluştu:", error);
  }
};

/* =======================
   DISPLAY BOOKS
======================= */
const displayBooks = (books) => {
  mediaList.innerHTML = "";

  books.forEach((book) => {
    const card = document.createElement("article");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author || "Unknown"}</p>
      <p><strong>Year:</strong> ${book.year}</p>

      <button class="details-btn" data-id="${book.id}">
        Details
      </button>

      <button class="fav-btn" data-id="${book.id}">
        ${favorites.includes(book.id) ? "⭐" : "☆"}
      </button>
    `;

    mediaList.appendChild(card);
  });

  /* Details buttons */
  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bookId = btn.getAttribute("data-id");
      showBookDetail(bookId);
    });
  });

  /* Favorite buttons */
  document.querySelectorAll(".fav-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const bookId = Number(btn.getAttribute("data-id"));
      toggleFavorite(bookId);
      btn.textContent = favorites.includes(bookId) ? "⭐" : "☆";
    });
  });
};

/* =======================
   BOOK DETAIL (SPA)
======================= */
const showBookDetail = (id) => {
  const selectedBook = allBooks.find(
    (book) => book.id === Number(id)
  );

  if (!selectedBook) return;

  detailContent.innerHTML = `
    <h2>${selectedBook.title}</h2>
    <p><strong>Author:</strong> ${selectedBook.author}</p>
    <p><strong>Year:</strong> ${selectedBook.year}</p>
    <p><strong>Category:</strong> ${selectedBook.category}</p>
    <p>${selectedBook.description}</p>
  `;

  listSection.style.display = "none";
  detailSection.style.display = "block";
};

/* =======================
   FAVORITES (localStorage)
======================= */
const toggleFavorite = (id) => {
  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id);
  } else {
    favorites.push(id);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
};

/* =======================
   SEARCH
======================= */
searchInput.addEventListener("input", () => {
  const searchText = searchInput.value.toLowerCase();

  const filteredBooks = allBooks.filter((book) =>
    book.title.toLowerCase().includes(searchText)
  );

  displayBooks(filteredBooks);
  detailSection.style.display = "none";
  listSection.style.display = "block";
});

/* =======================
   NAVIGATION
======================= */
backBtn.addEventListener("click", () => {
  detailSection.style.display = "none";
  listSection.style.display = "block";
});

favoritesBtn.addEventListener("click", () => {
  const favoriteBooks = allBooks.filter((book) =>
    favorites.includes(book.id)
  );

  displayBooks(favoriteBooks);
  detailSection.style.display = "none";
  listSection.style.display = "block";
});

homeBtn.addEventListener("click", () => {
  displayBooks(allBooks);
  detailSection.style.display = "none";
  listSection.style.display = "block";
});

/* =======================
   START APP
======================= */
loadBooks();
