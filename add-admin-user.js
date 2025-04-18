// This script will add a new admin user directly
// Run this in your browser console once to create the admin account

function addAdminUser() {
  // Get existing users
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if user already exists
  const existingUser = users.find((u) => u.email === "dadordev@gmail.com");

  if (existingUser) {
    // Update existing user to be admin
    existingUser.isAdmin = true;
    existingUser.name = "Sardor";
    existingUser.password = "dador12345";
    console.log("Existing user updated with admin privileges");
  } else {
    // Create new admin user
    const newAdmin = {
      id: Date.now(),
      name: "Sardor",
      email: "dadordev@gmail.com",
      phone: "",
      password: "dador12345", // In a real app, this should be hashed
      createdAt: new Date().toISOString(),
      isAdmin: true,
    };

    // Add to users array
    users.push(newAdmin);
    console.log("New admin user created");
  }

  // Save to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Create a session for immediate login
  const sessionId = Math.random().toString(36).substring(2, 15);
  const sessions = JSON.parse(localStorage.getItem("sessions")) || {};

  // Find the user ID
  const user = users.find((u) => u.email === "dadordev@gmail.com");

  sessions[sessionId] = {
    userId: user.id,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
  };

  localStorage.setItem("sessions", JSON.stringify(sessions));
  localStorage.setItem("sessionId", sessionId);

  console.log(
    "Admin user created and logged in. You can now access the admin panel."
  );

  // Redirect to admin panel
  window.location.href = "admin/index.html";
}

// Run the function
addAdminUser();
