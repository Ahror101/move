// DOM Elements
const adminDashboard = document.getElementById("admin-dashboard");
const moviesTableBody = document.getElementById("movies-table-body");
const addMovieBtn = document.getElementById("add-movie-btn");
const movieModal = document.getElementById("movie-modal");
const movieModalTitle = document.getElementById("movie-modal-title");
const movieModalClose = document.getElementById("movie-modal-close");
const movieForm = document.getElementById("movie-form");
const movieCancel = document.getElementById("movie-cancel");
const movieId = document.getElementById("movie-id");
const movieTitle = document.getElementById("movie-title");
const movieYear = document.getElementById("movie-year");
const movieRating = document.getElementById("movie-rating");
const movieDuration = document.getElementById("movie-duration");
const movieType = document.getElementById("movie-type");
const movieDescription = document.getElementById("movie-description");
const genreCheckboxes = document.getElementById("genre-checkboxes");
const moviePoster = document.getElementById("movie-poster");
const movieBackdrop = document.getElementById("movie-backdrop");
const posterPreview = document.getElementById("poster-preview");
const backdropPreview = document.getElementById("backdrop-preview");
const adminSearch = document.getElementById("admin-search");
const searchBtn = document.getElementById("search-btn");

// Available genres
const availableGenres = [
  "Боевик",
  "Драма",
  "Комедия",
  "Фантастика",
  "Ужасы",
  "Триллер",
  "Приключения",
  "Романтика",
  "Детектив",
  "Криминал",
  "Семейный",
  "Исторический",
  "Военный",
  "Биография",
  "Документальный",
  "Мультфильм",
  "Мюзикл",
];

// Initialize form elements
function initFormElements() {
  // Populate years dropdown (from 1950 to current year)
  const currentYear = new Date().getFullYear();
  const yearSelect = document.getElementById("movie-year");

  if (yearSelect) {
    yearSelect.innerHTML = "";
    for (let year = currentYear; year >= 1950; year--) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    }
  }

  // Populate genre checkboxes
  if (genreCheckboxes) {
    genreCheckboxes.innerHTML = "";
    availableGenres.forEach((genre) => {
      const checkboxContainer = document.createElement("div");
      checkboxContainer.className = "genre-checkbox";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `genre-${genre}`;
      checkbox.value = genre;

      const label = document.createElement("label");
      label.htmlFor = `genre-${genre}`;
      label.textContent = genre;

      checkboxContainer.appendChild(checkbox);
      checkboxContainer.appendChild(label);
      genreCheckboxes.appendChild(checkboxContainer);
    });
  }
}

// Check if user is admin
function checkAdminAccess() {
  const sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    // Not logged in, redirect to login
    window.location.href = "../signin.html";
    return false;
  }

  // Get user from session
  const sessions = JSON.parse(localStorage.getItem("sessions")) || {};
  const session = sessions[sessionId];

  if (!session || new Date(session.expires) < new Date()) {
    // Session expired, redirect to login
    localStorage.removeItem("sessionId");
    window.location.href = "../signin.html";
    return false;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.id === session.userId);

  if (!user || !user.isAdmin) {
    // Not an admin, redirect to home
    window.location.href = "../index.html";
    return false;
  }

  return true;
}

// Load movies
function loadMovies() {
  if (!moviesTableBody) return;

  // Clear table
  moviesTableBody.innerHTML = "";

  // Get movies from localStorage
  const movies = JSON.parse(localStorage.getItem("movies")) || [];

  // Sort movies by ID
  movies.sort((a, b) => b.id - a.id);

  // Add movies to table
  movies.forEach((movie) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${movie.id}</td>
      <td class="movie-poster-cell">
        <img src="${movie.poster}" alt="${
      movie.title
    }" onerror="this.src='../images/placeholder.jpg'">
      </td>
      <td>${movie.title}</td>
      <td>${movie.year}</td>
      <td>${movie.rating}</td>
      <td>${movie.genres.join(", ")}</td>
      <td class="actions-cell">
        <button class="action-btn edit-btn" data-id="${
          movie.id
        }" title="Таҳрирлаш">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn delete-btn" data-id="${
          movie.id
        }" title="Ўчириш">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

    moviesTableBody.appendChild(row);
  });

  // Add event listeners to edit and delete buttons
  addMovieActionListeners();
}

// Add movie action listeners
function addMovieActionListeners() {
  // Edit buttons
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const movieId = button.dataset.id;
      editMovie(movieId);
    });
  });

  // Delete buttons
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const movieId = button.dataset.id;
      deleteMovie(movieId);
    });
  });
}

// Edit movie
function editMovie(id) {
  // Get movies from localStorage
  const movies = JSON.parse(localStorage.getItem("movies")) || [];
  const movie = movies.find((m) => m.id.toString() === id);

  if (!movie) return;

  // Update modal title
  movieModalTitle.textContent = "Кинони таҳрирлаш";

  // Set form values
  movieId.value = movie.id;
  movieTitle.value = movie.title;

  // Set year
  if (movieYear.querySelector(`option[value="${movie.year}"]`)) {
    movieYear.value = movie.year;
  } else {
    // If year doesn't exist in dropdown, add it
    const option = document.createElement("option");
    option.value = movie.year;
    option.textContent = movie.year;
    movieYear.appendChild(option);
    movieYear.value = movie.year;
  }

  // Set rating
  if (movieRating.querySelector(`option[value="${movie.rating}"]`)) {
    movieRating.value = movie.rating;
  }

  // Set duration
  if (movieDuration.querySelector(`option[value="${movie.duration}"]`)) {
    movieDuration.value = movie.duration;
  }

  // Set movie type
  if (movie.type && movieType.querySelector(`option[value="${movie.type}"]`)) {
    movieType.value = movie.type;
  } else {
    movieType.value = "movie"; // Default to movie if not set
  }

  movieDescription.value = movie.description;

  // Set genre checkboxes
  const genreCheckboxes = document.querySelectorAll(
    '#genre-checkboxes input[type="checkbox"]'
  );
  genreCheckboxes.forEach((checkbox) => {
    checkbox.checked = movie.genres.includes(checkbox.value);
  });

  // Set image previews
  if (movie.poster) {
    posterPreview.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">`;
    posterPreview.classList.add("has-image");
  } else {
    posterPreview.innerHTML = "";
    posterPreview.classList.remove("has-image");
  }

  if (movie.backdrop) {
    backdropPreview.innerHTML = `<img src="${movie.backdrop}" alt="${movie.title}">`;
    backdropPreview.classList.add("has-image");
  } else {
    backdropPreview.innerHTML = "";
    backdropPreview.classList.remove("has-image");
  }

  // Show modal
  movieModal.classList.add("active");
}

// Delete movie
function deleteMovie(id) {
  if (confirm("Ҳақиқатан ҳам бу кинони ўчирмоқчимисиз?")) {
    // Get movies from localStorage
    let movies = JSON.parse(localStorage.getItem("movies")) || [];

    // Remove movie
    movies = movies.filter((movie) => movie.id.toString() !== id);

    // Save to localStorage
    localStorage.setItem("movies", JSON.stringify(movies));

    // Reload movies
    loadMovies();
  }
}

// Handle add movie button
function handleAddMovie() {
  if (!addMovieBtn) return;

  addMovieBtn.addEventListener("click", () => {
    // Reset form
    movieForm.reset();
    movieId.value = "";
    posterPreview.innerHTML = "";
    posterPreview.classList.remove("has-image");
    backdropPreview.innerHTML = "";
    backdropPreview.classList.remove("has-image");

    // Uncheck all genre checkboxes
    const genreCheckboxes = document.querySelectorAll(
      '#genre-checkboxes input[type="checkbox"]'
    );
    genreCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Update modal title
    movieModalTitle.textContent = "Янги кино қўшиш";

    // Show modal
    movieModal.classList.add("active");
  });
}

// Handle movie modal close
function handleMovieModalClose() {
  if (!movieModalClose) return;

  movieModalClose.addEventListener("click", () => {
    movieModal.classList.remove("active");
  });

  if (movieCancel) {
    movieCancel.addEventListener("click", (e) => {
      e.preventDefault();
      movieModal.classList.remove("active");
    });
  }
}

// Handle movie form submission
function handleMovieForm() {
  if (!movieForm) return;

  // Handle image previews
  moviePoster.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        posterPreview.innerHTML = `<img src="${e.target.result}" alt="Poster Preview">`;
        posterPreview.classList.add("has-image");
      };
      reader.readAsDataURL(file);
    }
  });

  movieBackdrop.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        backdropPreview.innerHTML = `<img src="${e.target.result}" alt="Backdrop Preview">`;
        backdropPreview.classList.add("has-image");
      };
      reader.readAsDataURL(file);
    }
  });

  // Handle form submission
  movieForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form values
    const id = movieId.value ? Number.parseInt(movieId.value) : Date.now();
    const title = movieTitle.value;
    const year = Number.parseInt(movieYear.value);
    const rating = Number.parseFloat(movieRating.value);
    const duration = movieDuration.value;
    const type = movieType.value;
    const description = movieDescription.value;

    // Get selected genres
    const selectedGenres = [];
    const genreCheckboxes = document.querySelectorAll(
      '#genre-checkboxes input[type="checkbox"]:checked'
    );
    genreCheckboxes.forEach((checkbox) => {
      selectedGenres.push(checkbox.value);
    });

    // Validate at least one genre is selected
    if (selectedGenres.length === 0) {
      alert("Илтимос, камида битта жанр танланг");
      return;
    }

    // Get movies from localStorage
    const movies = JSON.parse(localStorage.getItem("movies")) || [];

    // Check if editing or adding
    const existingMovieIndex = movies.findIndex((m) => m.id === id);

    // Create movie object
    const movie = {
      id,
      title,
      description,
      year,
      rating,
      duration,
      type,
      genres: selectedGenres,
      likes:
        existingMovieIndex !== -1 ? movies[existingMovieIndex].likes || 0 : 0,
      dislikes:
        existingMovieIndex !== -1
          ? movies[existingMovieIndex].dislikes || 0
          : 0,
      comments:
        existingMovieIndex !== -1
          ? movies[existingMovieIndex].comments || []
          : [],
      popular: true, // Set as popular by default
      new: year >= new Date().getFullYear() - 1, // Set as new if it's from current or last year
    };

    // Handle poster image
    if (moviePoster.files.length > 0) {
      const posterFile = moviePoster.files[0];
      const posterReader = new FileReader();
      posterReader.onload = (e) => {
        movie.poster = e.target.result;

        // Handle backdrop image
        if (movieBackdrop.files.length > 0) {
          const backdropFile = movieBackdrop.files[0];
          const backdropReader = new FileReader();
          backdropReader.onload = (e) => {
            movie.backdrop = e.target.result;
            saveMovie(movie, movies, existingMovieIndex);
          };
          backdropReader.readAsDataURL(backdropFile);
        } else {
          // Use poster as backdrop if no backdrop provided
          movie.backdrop = movie.poster;
          saveMovie(movie, movies, existingMovieIndex);
        }
      };
      posterReader.readAsDataURL(posterFile);
    } else if (existingMovieIndex !== -1) {
      // Keep existing images if editing and no new images provided
      movie.poster = movies[existingMovieIndex].poster;
      movie.backdrop = movies[existingMovieIndex].backdrop;
      saveMovie(movie, movies, existingMovieIndex);
    } else {
      // Use placeholder if no poster provided for new movie
      movie.poster = "https://via.placeholder.com/300x450";
      movie.backdrop = "https://via.placeholder.com/1600x800";
      saveMovie(movie, movies, existingMovieIndex);
    }
  });
}

// Save movie
function saveMovie(movie, movies, existingMovieIndex) {
  if (existingMovieIndex !== -1) {
    // Update existing movie
    movies[existingMovieIndex] = movie;
  } else {
    // Add new movie
    movies.push(movie);
  }

  // Save to localStorage
  localStorage.setItem("movies", JSON.stringify(movies));

  // Close modal
  movieModal.classList.remove("active");

  // Reload movies
  loadMovies();

  // Alert success
  alert("Кино муваффақиятли сақланди!");

  // Send notification to Telegram bot
  if (window.telegramBot) {
    const action = existingMovieIndex !== -1 ? "updated" : "added";
    window.telegramBot.notifyMovieAction(movie, action);
  }
}

// Add search functionality
function initSearch() {
  if (!searchBtn || !adminSearch) return;

  searchBtn.addEventListener("click", performSearch);
  adminSearch.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      performSearch();
    }
  });
}

function performSearch() {
  const searchTerm = adminSearch.value.trim().toLowerCase();

  if (!searchTerm) {
    loadMovies(); // If search is empty, load all movies
    return;
  }

  // Get movies from localStorage
  const movies = JSON.parse(localStorage.getItem("movies")) || [];

  // Filter movies by search term
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm) ||
      (movie.description &&
        movie.description.toLowerCase().includes(searchTerm)) ||
      (movie.genres &&
        movie.genres.some((genre) => genre.toLowerCase().includes(searchTerm)))
  );

  // Clear table
  moviesTableBody.innerHTML = "";

  if (filteredMovies.length === 0) {
    moviesTableBody.innerHTML = `
      <tr>
        <td colspan="7" class="text-center py-4">Қидирув бўйича ҳеч нарса топилмади</td>
      </tr>
    `;
    return;
  }

  // Sort movies by ID
  filteredMovies.sort((a, b) => b.id - a.id);

  // Add movies to table
  filteredMovies.forEach((movie) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${movie.id}</td>
      <td class="movie-poster-cell">
        <img src="${movie.poster}" alt="${
      movie.title
    }" onerror="this.src='../images/placeholder.jpg'">
      </td>
      <td>${movie.title}</td>
      <td>${movie.year}</td>
      <td>${movie.rating}</td>
      <td>${movie.genres.join(", ")}</td>
      <td class="actions-cell">
        <button class="action-btn edit-btn" data-id="${
          movie.id
        }" title="Таҳрирлаш">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn delete-btn" data-id="${
          movie.id
        }" title="Ўчириш">
          <i class="fas fa-trash"></i>
        </button>
      </td>
    `;

    moviesTableBody.appendChild(row);
  });

  // Add event listeners to edit and delete buttons
  addMovieActionListeners();
}

// Improve file input handling
function improveFileInputs() {
  // Add better visual feedback for file inputs
  moviePoster.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        posterPreview.innerHTML = `<img src="${e.target.result}" alt="Poster Preview">`;
        posterPreview.classList.add("has-image");
      };
      reader.readAsDataURL(file);
    } else {
      posterPreview.innerHTML = "";
      posterPreview.classList.remove("has-image");
    }
  });

  movieBackdrop.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        backdropPreview.innerHTML = `<img src="${e.target.result}" alt="Backdrop Preview">`;
        backdropPreview.classList.add("has-image");
      };
      reader.readAsDataURL(file);
    } else {
      backdropPreview.innerHTML = "";
      backdropPreview.classList.remove("has-image");
    }
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Initialize form elements
  initFormElements();

  // Check if user has admin access
  if (!checkAdminAccess()) return;

  // Load movies
  loadMovies();

  // Initialize search
  initSearch();

  // Improve file inputs
  improveFileInputs();

  // Handle add movie button
  handleAddMovie();

  // Handle movie modal close
  handleMovieModalClose();

  // Handle movie form
  handleMovieForm();
});
