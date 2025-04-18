// Telegram Bot Integration
const TELEGRAM_BOT_TOKEN = "8047707531:AAEgv-clGcuqvU-xRhOTUqBmRolKY8_rUKI"; // Replace with your actual bot token
const TELEGRAM_CHAT_ID = "8064650615"; // Replace with your actual chat ID

/**
 * Send a message to the Telegram bot
 * @param {string} message - The message to send
 * @returns {Promise} - The fetch promise
 */
async function sendTelegramMessage(message) {
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    })

    const data = await response.json()

    if (!data.ok) {
      console.error("Failed to send Telegram message:", data.description)
    }

    return data
  } catch (error) {
    console.error("Error sending Telegram message:", error)
  }
}

/**
 * Notify about a new user signup
 * @param {Object} user - The user object
 */
function notifyNewSignup(user) {
  const message = `
<b>🎬 New User Registration on MovieNet!</b>

<b>Name:</b> ${user.name}
<b>Email:</b> ${user.email}
<b>Phone:</b> ${user.phone || "Not provided"}
<b>Time:</b> ${new Date().toLocaleString()}
`

  sendTelegramMessage(message)
}

/**
 * Notify about a new comment
 * @param {Object} comment - The comment object
 * @param {Object} movie - The movie object
 */
function notifyNewComment(comment, movie) {
  const message = `
<b>🎬 New Comment on MovieNet!</b>

<b>Movie:</b> ${movie.title}
<b>User:</b> ${comment.userName}
<b>Comment:</b> ${comment.text}
<b>Time:</b> ${new Date().toLocaleString()}
`

  sendTelegramMessage(message)
}

/**
 * Notify about a movie action (add/update)
 * @param {Object} movie - The movie object
 * @param {string} action - The action (added/updated)
 */
function notifyMovieAction(movie, action) {
  const message = `
<b>🎬 Movie ${action.charAt(0).toUpperCase() + action.slice(1)} on MovieNet!</b>

<b>Title:</b> ${movie.title}
<b>Year:</b> ${movie.year}
<b>Rating:</b> ${movie.rating}
<b>Type:</b> ${movie.type || "Movie"}
<b>Genres:</b> ${movie.genres.join(", ")}
<b>Time:</b> ${new Date().toLocaleString()}
`

  sendTelegramMessage(message)
}

// Export functions for use in other files
window.telegramBot = {
  notifyNewSignup,
  notifyNewComment,
  notifyMovieAction,
}
