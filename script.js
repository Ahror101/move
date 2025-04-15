// Movie data
const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1600x800",
    year: 2024,
    rating: 8.7,
    duration: "2h 46m",
    genres: ["Sci-Fi", "Adventure", "Drama"],
    popular: true,
    new: true,
  },
  {
    id: 2,
    title: "Oppenheimer",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1600x800",
    year: 2023,
    rating: 8.5,
    duration: "3h 0m",
    genres: ["Biography", "Drama", "History"],
    popular: true,
    new: false,
  },
  {
    id: 3,
    title: "The Batman",
    description:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1600x800",
    year: 2022,
    rating: 7.8,
    duration: "2h 56m",
    genres: ["Action", "Crime", "Drama"],
    popular: true,
    new: false,
  },
  {
    id: 4,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1600x800",
    year: 2014,
    rating: 8.6,
    duration: "2h 49m",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    popular: false,
    new: false,
  },
  {
    id: 5,
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1600x800",
    year: 2010,
    rating: 8.8,
    duration: "2h 28m",
    genres: ["Action", "Adventure", "Sci-Fi"],
    popular: false,
    new: false,
  },
  {
    id: 6,
    title: "Gladiator II",
    description:
      "Years after witnessing the death of Emperor Commodus, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome.",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1600x800",
    year: 2024,
    rating: 8.2,
    duration: "2h 30m",
    genres: ["Action", "Adventure", "Drama"],
    popular: true,
    new: true,
  },
  {
    id: 7,
    title: "The Shawshank Redemption",
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1600x800",
    year: 1994,
    rating: 9.3,
    duration: "2h 22m",
    genres: ["Drama"],
    popular: false,
    new: false,
  },
  {
    id: 8,
    title: "Deadpool & Wolverine",
    description: "Deadpool teams up with Wolverine for an adventure that will change both of their lives forever.",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1600x800",
    year: 2024,
    rating: 8.4,
    duration: "2h 7m",
    genres: ["Action", "Comedy", "Sci-Fi"],
    popular: true,
    new: true,
  },
  {
    id: 9,
    title: "Parasite",
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1600x800",
    year: 2019,
    rating: 8.5,
    duration: "2h 12m",
    genres: ["Drama", "Thriller"],
    popular: false,
    new: false,
  },
  {
    id: 10,
    title: "The Godfather",
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    poster: "https://via.placeholder.com/300x450",
    backdrop: "https://via.placeholder.com/1600x800",
    year: 1972,
    rating: 9.2,
    duration: "2h 55m",
    genres: ["Crime", "Drama"],
    popular: false,
    new: false,
  },
];

// DOM Elements
const themeToggle = document.getElementById("theme-toggle");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const mobileMenu = document.getElementById("mobile-menu");
const header = document.querySelector(".header");
const currentYearElements = document.querySelectorAll("#current-year");

// Set current year in footer
currentYearElements.forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Theme Toggle
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark-theme");
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Mobile Menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
}

// Header scroll effect
function handleScroll() {
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Create movie card
function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <a href="movie-detail.html?id=${movie.id}">
      <div class="movie-card-poster">
        <img src="${movie.poster}" alt="${movie.title}">
        <div class="movie-card-overlay">
          <button class="btn btn-primary">
            <i class="fas fa-play"></i>
            Watch Now
          </button>
          <h3 class="text-white text-center mt-2">${movie.title}</h3>
          ${movie.genres ? `<p class="text-gray-300 text-xs text-center mt-1">${movie.genres.slice(0, 2).join(", ")}</p>` : ""}
        </div>
      </div>
      <div class="movie-card-info">
        <h3 class="movie-card-title">${movie.title}</h3>
        <div class="movie-card-meta">
          <span>${movie.year}</span>
          <div class="movie-card-rating">
            <i class="fas fa-star"></i>
            <span>${movie.rating}</span>
          </div>
        </div>
      </div>
    </a>
  `;
  return card;
}

// Load movies by category
function loadMovies(containerId, category, limit) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Clear loading skeletons
  container.innerHTML = "";

  let filteredMovies = [...movies];

  if (category === "popular") {
    filteredMovies = filteredMovies.filter(movie => movie.popular);
  } else if (category === "new") {
    filteredMovies = filteredMovies.filter(movie => movie.new);
  } else if (category === "top-rated") {
    filteredMovies = filteredMovies.filter(movie => movie.rating >= 8);
  }

  if (limit) {
    filteredMovies = filteredMovies.slice(0, limit);
  }

  filteredMovies.forEach(movie => {
    container.appendChild(createMovieCard(movie));
  });
}

// Load movie detail
function loadMovieDetail() {
  const movieDetailLoading = document.getElementById("movie-detail-loading");
  const movieDetail = document.getElementById("movie-detail");
  
  if (!movieDetailLoading || !movieDetail) return;

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    window.location.href = "index.html";
    return;
  }

  // Simulate loading
  setTimeout(() => {
    const movie = movies.find(m => m.id.toString() === id) || movies[0];
    
    // Update movie details
    document.title = `${movie.title} - MovieNet`;
    document.getElementById("movie-title").textContent = movie.title;
    document.getElementById("movie-description").textContent = movie.description;
    document.getElementById("movie-rating").textContent = `${movie.rating}/10`;
    document.getElementById("movie-duration").textContent = movie.duration;
    document.getElementById("movie-year").textContent = movie.year;
    document.getElementById("movie-backdrop-img").src = movie.backdrop;
    document.getElementById("movie-backdrop-img").alt = movie.title;
    document.getElementById("movie-poster-img").src = movie.poster;
    document.getElementById("movie-poster-img").alt = movie.title;

    // Add genres
    const genresContainer = document.getElementById("movie-genres");
    genresContainer.innerHTML = "";
    movie.genres.forEach(genre => {
      const genreTag = document.createElement("span");
      genreTag.className = "genre-tag";
      genreTag.textContent = genre;
      genresContainer.appendChild(genreTag);
    });

    // Hide loading, show content
    movieDetailLoading.style.display = "none";
    movieDetail.classList.add("active");
  }, 800);
}

// Handle tab switching on movies page
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const moviesGrid = document.getElementById("movies-grid");
  
  if (!tabButtons.length || !moviesGrid) return;

  // Check if there's a category in URL
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get("category");

  // Set active tab based on URL parameter
  if (categoryParam) {
    tabButtons.forEach(btn => {
      if (btn.dataset.category === categoryParam) {
        btn.classList.add("active");
        loadMovies("movies-grid", categoryParam);
      } else {
        btn.classList.remove("active");
      }
    });
  } else {
    // Default to "all" tab
    loadMovies("movies-grid", "all");
  }

  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const category = btn.dataset.category;
      
      // Clear and show loading state
      moviesGrid.innerHTML = "";
      for (let i = 0; i < 12; i++) {
        const skeleton = document.createElement("div");
        skeleton.className = "movie-card-skeleton";
        moviesGrid.appendChild(skeleton);
      }
      
      // Load movies with slight delay to show loading state
      setTimeout(() => {
        loadMovies("movies-grid", category);
      }, 500);
    });
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme
  initTheme();
  
  // Event listeners
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
  if (mobileMenuToggle) mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  if (mobileMenuClose) mobileMenuClose.addEventListener("click", toggleMobileMenu);
  window.addEventListener("scroll", handleScroll);
  
  // Initialize tabs
  initTabs();
  
  // Load movies for homepage
  loadMovies("popular-movies", "popular", 5);
  loadMovies("new-movies", "new", 5);
  loadMovies("top-rated-movies", "top-rated", 5);
  
  // Load movie detail if on detail page
  loadMovieDetail();
  
  // Trigger scroll handler on load
  handleScroll();
});