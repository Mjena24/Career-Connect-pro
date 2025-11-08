// ================================
// 🧠 PROFILE PAGE SCRIPT
// ================================

const userData = JSON.parse(localStorage.getItem("user"));
const profileContainer = document.getElementById("profileContainer");
const logoutBtn = document.getElementById("logoutBtn");

// 🚪 Redirect to login if not logged in
if (!userData) {
  alert("⚠️ Please log in to view your profile!");
  window.location.href = "login.html";
} else {
  // 🎯 Show user data
  if (profileContainer) {
    profileContainer.innerHTML = `
      <h2>Welcome, ${userData.name}</h2>
      <p><strong>Email:</strong> ${userData.email}</p>
      <p><strong>Role:</strong> ${userData.role}</p>
      <p><strong>Token:</strong> <span class="small">${userData.token.slice(0, 20)}... (hidden)</span></p>
    `;
  }
}

// 🧹 Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
    alert("👋 Logged out successfully!");
    window.location.href = "login.html";
  });
}
