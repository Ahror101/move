// DOM Elements
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenuClose = document.getElementById("mobile-menu-close");
const mobileMenu = document.getElementById("mobile-menu");
const header = document.querySelector(".header");
const currentYearElements = document.querySelectorAll("#current-year");
const themeToggle = document.getElementById("theme-toggle");

// Set current year in footer
currentYearElements.forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Mobile Menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
}

// Header scroll effect
function handleScroll() {
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

// Theme toggle
function initTheme() {
  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "light") {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
  } else if (savedTheme === "dark" || prefersDark) {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
  }

  // Update theme toggle button
  updateThemeToggle();
}

function toggleTheme() {
  if (document.body.classList.contains("dark-theme")) {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  }

  // Update theme toggle button
  updateThemeToggle();
}

function updateThemeToggle() {
  if (!themeToggle) return;

  if (document.body.classList.contains("dark-theme")) {
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggle.title = "Switch to light mode";
  } else {
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = "Switch to dark mode";
  }
}

// Create movie card
function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";
  card.innerHTML = `
    <a href="movie-detail.html?id=${movie.id}">
      <div class="movie-card-poster">
        <img src="${movie.poster}" alt="${
    movie.title
  }" onerror="this.src='images/placeholder.jpg'">
        <div class="movie-card-overlay">
          <button class="btn btn-primary">
            <i class="fas fa-play"></i>
            Watch Now
          </button>
          <h3 class="text-white text-center mt-2">${movie.title}</h3>
          ${
            movie.genres
              ? `<p class="text-gray-300 text-xs text-center mt-1">${movie.genres
                  .slice(0, 2)
                  .join(", ")}</p>`
              : ""
          }
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

  // In a real app, this would make an API call to the server
  // For our demo, we'll use the local storage as our "database"
  let movies = JSON.parse(localStorage.getItem("movies"));

  // If no movies in localStorage, use default data
  if (!movies || !movies.length) {
    movies = [
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
        type: "movie",
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
        type: "movie",
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
        type: "movie",
      },
      {
        id: 4,
        title: "Interstellar",
        description:
          "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        poster: "https://via.placeholder.com/300x450",
        backdrop: "https://via.placeholder.com/1600x800",
        year: 2014,
        rating: 8.6,
        duration: "2h 49m",
        genres: ["Adventure", "Drama", "Sci-Fi"],
        popular: false,
        new: false,
        type: "movie",
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
        type: "movie",
      },
    ];

    // Save to localStorage
    localStorage.setItem("movies", JSON.stringify(movies));
  }

  let filteredMovies = [...movies];

  if (category === "popular") {
    filteredMovies = filteredMovies.filter((movie) => movie.popular);
  } else if (category === "new") {
    filteredMovies = filteredMovies.filter((movie) => movie.new);
  } else if (category === "top-rated") {
    filteredMovies = filteredMovies.sort((a, b) => b.rating - a.rating);
  }

  if (limit) {
    filteredMovies = filteredMovies.slice(0, limit);
  }

  filteredMovies.forEach((movie) => {
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
    // In a real app, this would make an API call to the server
    // For our demo, we'll use the local storage as our "database"
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    const movie = movies.find((m) => m.id.toString() === id) || movies[0];

    // Update movie details
    document.title = `${movie.title} - MovieNet`;
    document.getElementById("movie-title").textContent = movie.title;
    document.getElementById("movie-description").textContent =
      movie.description;
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
    movie.genres.forEach((genre) => {
      const genreTag = document.createElement("span");
      genreTag.className = "genre-tag";
      genreTag.textContent = genre;
      genresContainer.appendChild(genreTag);
    });

    // Load reactions
    loadMovieReactions(id);

    // Load comments
    loadMovieComments(id, movie);

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
    tabButtons.forEach((btn) => {
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

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
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

// Load movie reactions (likes/dislikes)
function loadMovieReactions(movieId) {
  const likeBtn = document.getElementById("like-btn");
  const dislikeBtn = document.getElementById("dislike-btn");
  const likeCount = document.getElementById("like-count");
  const dislikeCount = document.getElementById("dislike-count");

  if (!likeBtn || !dislikeBtn) return;

  // Get reactions from localStorage
  const reactions = JSON.parse(localStorage.getItem("movieReactions")) || {};
  const movieReactions = reactions[movieId] || { likes: 0, dislikes: 0 };

  // Update UI
  likeCount.textContent = movieReactions.likes;
  dislikeCount.textContent = movieReactions.dislikes;

  // Check if user has already reacted
  const userReactions = JSON.parse(localStorage.getItem("userReactions")) || {};
  const userReaction = userReactions[movieId];

  if (userReaction === "like") {
    likeBtn.classList.add("active");
  } else if (userReaction === "dislike") {
    dislikeBtn.classList.add("active");
  }

  // Add event listeners
  likeBtn.addEventListener("click", () => {
    // Check if user is logged in
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      alert("Please sign in to like this movie");
      return;
    }

    const userReactions =
      JSON.parse(localStorage.getItem("userReactions")) || {};
    const reactions = JSON.parse(localStorage.getItem("movieReactions")) || {};
    const movieReactions = reactions[movieId] || { likes: 0, dislikes: 0 };

    if (userReactions[movieId] === "like") {
      // User already liked, remove like
      userReactions[movieId] = null;
      movieReactions.likes--;
      likeBtn.classList.remove("active");
    } else {
      // Add like
      if (userReactions[movieId] === "dislike") {
        // Remove dislike first
        movieReactions.dislikes--;
        dislikeBtn.classList.remove("active");
      }

      userReactions[movieId] = "like";
      movieReactions.likes++;
      likeBtn.classList.add("active");
    }

    // Update localStorage
    reactions[movieId] = movieReactions;
    localStorage.setItem("userReactions", JSON.stringify(userReactions));
    localStorage.setItem("movieReactions", JSON.stringify(reactions));

    // Update UI
    likeCount.textContent = movieReactions.likes;
    dislikeCount.textContent = movieReactions.dislikes;
  });

  dislikeBtn.addEventListener("click", () => {
    // Check if user is logged in
    const sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      alert("Please sign in to dislike this movie");
      return;
    }

    const userReactions =
      JSON.parse(localStorage.getItem("userReactions")) || {};
    const reactions = JSON.parse(localStorage.getItem("movieReactions")) || {};
    const movieReactions = reactions[movieId] || { likes: 0, dislikes: 0 };

    if (userReactions[movieId] === "dislike") {
      // User already disliked, remove dislike
      userReactions[movieId] = null;
      movieReactions.dislikes--;
      dislikeBtn.classList.remove("active");
    } else {
      // Add dislike
      if (userReactions[movieId] === "like") {
        // Remove like first
        movieReactions.likes--;
        likeBtn.classList.remove("active");
      }

      userReactions[movieId] = "dislike";
      movieReactions.dislikes++;
      dislikeBtn.classList.add("active");
    }

    // Update localStorage
    reactions[movieId] = movieReactions;
    localStorage.setItem("userReactions", JSON.stringify(userReactions));
    localStorage.setItem("movieReactions", JSON.stringify(reactions));

    // Update UI
    likeCount.textContent = movieReactions.likes;
    dislikeCount.textContent = movieReactions.dislikes;
  });
}

// Load movie comments
function loadMovieComments(movieId, movie) {
  const commentsList = document.getElementById("comments-list");
  const commentForm = document.getElementById("comment-form");
  const commentInputForm = document.getElementById("comment-input-form");
  const authRequired = document.getElementById("auth-required");
  const noComments = document.getElementById("no-comments");

  if (!commentsList || !commentForm) return;

  // Check if user is logged in
  const sessionId = localStorage.getItem("sessionId");
  const user = sessionId ? getUserFromSession(sessionId) : null;

  if (user) {
    authRequired.style.display = "none";
    commentInputForm.style.display = "block";

    // Add event listener to comment form
    commentInputForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const commentInput = document.getElementById("comment-input");
      const commentText = commentInput.value.trim();

      if (!commentText) return;

      // Create new comment
      const comments = JSON.parse(localStorage.getItem("movieComments")) || {};
      const movieComments = comments[movieId] || [];

      const newComment = {
        id: Date.now(),
        userId: user.id,
        userName: user.name,
        text: commentText,
        date: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
      };

      movieComments.unshift(newComment);
      comments[movieId] = movieComments;

      // Save to localStorage
      localStorage.setItem("movieComments", JSON.stringify(comments));

      // Send notification to Telegram bot
      if (window.telegramBot && movie) {
        window.telegramBot.notifyNewComment(newComment, movie);
      }

      // Clear input
      commentInput.value = "";

      // Reload comments
      displayComments(movieId, commentsList, noComments);
    });
  } else {
    authRequired.style.display = "block";
    commentInputForm.style.display = "none";
  }

  // Display comments
  displayComments(movieId, commentsList, noComments);
}

// Display comments
function displayComments(movieId, commentsList, noComments) {
  // Get comments from localStorage
  const comments = JSON.parse(localStorage.getItem("movieComments")) || {};
  const movieComments = comments[movieId] || [];

  // Clear comments list
  commentsList.innerHTML = "";

  if (movieComments.length === 0) {
    noComments.style.display = "block";
    return;
  }

  noComments.style.display = "none";

  // Display comments
  movieComments.forEach((comment) => {
    const commentElement = document.createElement("div");
    commentElement.className = "comment";

    const date = new Date(comment.date);
    const formattedDate = `${date.toLocaleDateString()} at ${date.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )}`;

    commentElement.innerHTML = `
      <div class="comment-header">
        <div class="comment-user">${comment.userName}</div>
        <div class="comment-date">${formattedDate}</div>
      </div>
      <div class="comment-content">${comment.text}</div>
      <div class="comment-actions">
        <div class="comment-action" data-action="like" data-id="${comment.id}">
          <i class="fas fa-thumbs-up"></i>
          <span>${comment.likes}</span>
        </div>
        <div class="comment-action" data-action="dislike" data-id="${comment.id}">
          <i class="fas fa-thumbs-down"></i>
          <span>${comment.dislikes}</span>
        </div>
      </div>
    `;

    commentsList.appendChild(commentElement);
  });

  // Add event listeners to comment actions
  const commentActions = commentsList.querySelectorAll(".comment-action");
  commentActions.forEach((action) => {
    action.addEventListener("click", () => {
      // Check if user is logged in
      const sessionId = localStorage.getItem("sessionId");
      if (!sessionId) {
        alert("Please sign in to react to comments");
        return;
      }

      const actionType = action.dataset.action;
      const commentId = Number.parseInt(action.dataset.id);

      // Get comments from localStorage
      const comments = JSON.parse(localStorage.getItem("movieComments")) || {};
      const movieComments = comments[movieId] || [];

      // Find comment
      const comment = movieComments.find((c) => c.id === commentId);
      if (!comment) return;

      // Get user reactions
      const userCommentReactions =
        JSON.parse(localStorage.getItem("userCommentReactions")) || {};
      const userReaction = userCommentReactions[commentId];

      if (actionType === "like") {
        if (userReaction === "like") {
          // Remove like
          comment.likes--;
          userCommentReactions[commentId] = null;
        } else {
          // Add like
          if (userReaction === "dislike") {
            // Remove dislike first
            comment.dislikes--;
          }
          comment.likes++;
          userCommentReactions[commentId] = "like";
        }
      } else if (actionType === "dislike") {
        if (userReaction === "dislike") {
          // Remove dislike
          comment.dislikes--;
          userCommentReactions[commentId] = null;
        } else {
          // Add dislike
          if (userReaction === "like") {
            // Remove like first
            comment.likes--;
          }
          comment.dislikes++;
          userCommentReactions[commentId] = "dislike";
        }
      }

      // Save to localStorage
      localStorage.setItem("movieComments", JSON.stringify(comments));
      localStorage.setItem(
        "userCommentReactions",
        JSON.stringify(userCommentReactions)
      );

      // Update UI
      action.querySelector("span").textContent =
        actionType === "like" ? comment.likes : comment.dislikes;
    });
  });
}

// Function to retrieve user from session
function getUserFromSession(sessionId) {
  const sessions = JSON.parse(localStorage.getItem("sessions")) || {};
  const session = sessions[sessionId];

  if (!session || new Date(session.expires) < new Date()) {
    return null;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.id === session.userId);

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin || false,
  };
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Event listeners
  if (mobileMenuToggle)
    mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  if (mobileMenuClose)
    mobileMenuClose.addEventListener("click", toggleMobileMenu);
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
  window.addEventListener("scroll", handleScroll);

  // Initialize theme
  initTheme();

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
