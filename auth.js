// DOM Elements
const authButtons = document.getElementById("auth-buttons");
const mobileAuthButtons = document.getElementById("mobile-auth-buttons");
const signinForm = document.getElementById("signin-form");
const signupForm = document.getElementById("signup-form");
const authMessage = document.getElementById("auth-message");

// Initialize auth state
function initAuth() {
  const sessionId = localStorage.getItem("sessionId");

  if (sessionId) {
    // Check if session is valid
    const user = getUserFromSession(sessionId);
    if (user) {
      updateAuthUI(user);
    } else {
      // Session expired or invalid
      localStorage.removeItem("sessionId");
    }
  }
}

// Get user from session
function getUserFromSession(sessionId) {
  // In a real app, this would make an API call to the server
  // For our demo, we'll use the local storage as our "database"
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

// Update the admin link path to point to the admin folder
function updateAuthUI(user) {
  if (!authButtons) return;

  if (user) {
    // User is logged in
    let adminLink = "";
    if (user.isAdmin) {
      adminLink = `
        <a href="admin/index.html" class="user-dropdown-item">
          <i class="fas fa-cogs"></i>
          <span>Admin Panel</span>
        </a>
      `;
    }

    authButtons.innerHTML = `
      <div class="user-menu">
        <button class="user-button" id="user-button">
          <div class="user-avatar">${user.name.charAt(0)}</div>
          <span>${user.name}</span>
          <i class="fas fa-chevron-down"></i>
        </button>
        <div class="user-dropdown" id="user-dropdown">
          <a href="#" class="user-dropdown-item">
            <i class="fas fa-user"></i>
            <span>Profile</span>
          </a>
          <a href="#" class="user-dropdown-item">
            <i class="fas fa-heart"></i>
            <span>Watchlist</span>
          </a>
          ${adminLink}
          <a href="#" class="user-dropdown-item">
            <i class="fas fa-cog"></i>
            <span>Settings</span>
          </a>
          <div class="user-dropdown-divider"></div>
          <a href="#" class="user-dropdown-item" id="logout-button">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </div>
      </div>
    `;

    // Update mobile menu
    if (mobileAuthButtons) {
      mobileAuthButtons.innerHTML = `
        <div class="user-info">
          <div class="user-avatar">${user.name.charAt(0)}</div>
          <span>${user.name}</span>
        </div>
        <a href="#" class="btn btn-outline" id="mobile-logout-button">Logout</a>
      `;

      // Add event listener to mobile logout button
      const mobileLogoutButton = document.getElementById(
        "mobile-logout-button"
      );
      if (mobileLogoutButton) {
        mobileLogoutButton.addEventListener("click", (e) => {
          e.preventDefault();
          logout();
        });
      }
    }

    // Add event listeners
    const userButton = document.getElementById("user-button");
    const userDropdown = document.getElementById("user-dropdown");
    const logoutButton = document.getElementById("logout-button");

    if (userButton && userDropdown) {
      userButton.addEventListener("click", () => {
        userDropdown.classList.toggle("active");
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (
          !userButton.contains(e.target) &&
          !userDropdown.contains(e.target)
        ) {
          userDropdown.classList.remove("active");
        }
      });
    }

    if (logoutButton) {
      logoutButton.addEventListener("click", (e) => {
        e.preventDefault();
        logout();
      });
    }
  } else {
    // User is not logged in
    authButtons.innerHTML = `
      <a href="signin.html" class="btn btn-primary">Sign In</a>
    `;

    // Update mobile menu
    if (mobileAuthButtons) {
      mobileAuthButtons.innerHTML = `
        <a href="signin.html" class="btn btn-primary mobile-sign-in">Sign In</a>
      `;
    }
  }
}

// Logout function
function logout() {
  const sessionId = localStorage.getItem("sessionId");

  if (sessionId) {
    // In a real app, this would make an API call to the server
    // For our demo, we'll just remove from local storage
    const sessions = JSON.parse(localStorage.getItem("sessions")) || {};
    delete sessions[sessionId];
    localStorage.setItem("sessions", JSON.stringify(sessions));
    localStorage.removeItem("sessionId");
  }

  // Redirect to home page
  window.location.href = "index.html";
}

// Handle sign in form
function handleSignIn() {
  if (!signinForm) return;

  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // In a real app, this would make an API call to the server
    // For our demo, we'll use the local storage as our "database"
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Login successful
      const sessionId = Math.random().toString(36).substring(2, 15);
      const sessions = JSON.parse(localStorage.getItem("sessions")) || {};

      sessions[sessionId] = {
        userId: user.id,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      };

      localStorage.setItem("sessions", JSON.stringify(sessions));
      localStorage.setItem("sessionId", sessionId);

      // Show success message
      showAuthMessage("Login successful! Redirecting...", "success");

      // Redirect to home page
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } else {
      // Login failed
      showAuthMessage("Invalid email or password", "error");
    }
  });
}

// Handle sign up form
function handleSignUp() {
  if (!signupForm) return;

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validate passwords match
    if (password !== confirmPassword) {
      showAuthMessage("Passwords do not match", "error");
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      // User already exists
      showAuthMessage("Email already registered", "error");
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      phone: phone,
      password: password, // In a real app, this should be hashed
      createdAt: new Date().toISOString(),
      isAdmin: email === "admin@example.com" || email === "dadordev@gmail.com", // Make these emails admin users
    };

    // Add new user to users array
    users.push(newUser);

    // Save users to localStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Send notification to Telegram bot
    if (window.telegramBot) {
      window.telegramBot.notifyNewSignup(newUser);
    }

    // Show success message
    showAuthMessage(
      "Registration successful! Redirecting to sign in page...",
      "success"
    );

    // Redirect to sign in page instead of automatically logging in
    setTimeout(() => {
      window.location.href = "signin.html";
    }, 1500);
  });
}

// Show auth message
function showAuthMessage(message, type) {
  if (!authMessage) return;

  authMessage.textContent = message;
  authMessage.className = `auth-message ${type}`;

  // Clear message after 5 seconds if it's an error
  if (type === "error") {
    setTimeout(() => {
      authMessage.textContent = "";
      authMessage.className = "auth-message";
    }, 5000);
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  // Initialize auth
  initAuth();

  // Handle sign in form
  handleSignIn();

  // Handle sign up form
  handleSignUp();
});
