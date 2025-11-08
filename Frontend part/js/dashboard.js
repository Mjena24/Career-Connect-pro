const API_BASE = "http://localhost:5001/api";
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token || !user) {
  alert("Please login first!");
  window.location.href = "login.html";
}

// 🧠 Fetch profile data from MongoDB
async function loadProfile() {
  try {
    const res = await fetch(`${API_BASE}/profile/me`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    if (!res.ok) throw new Error("Failed to fetch profile");

    const data = await res.json();

    // Update dashboard
    document.getElementById("profileName").innerText = user.name;
    document.getElementById("profileEmail").innerText = user.email;
    document.getElementById("profileTitle").innerText = data.title || "—";
    document.getElementById("profileLocation").innerText = data.location || "—";
    document.getElementById("bio").innerText = data.bio || "No bio added yet.";
    document.getElementById("experience").innerText = data.experience || "Not specified.";
    document.getElementById("skills").innerText = data.skills || "—";
    document.getElementById("linkedin").innerText = data.linkedin || "—";
    document.getElementById("linkedin").href = data.linkedin || "#";
    document.getElementById("portfolio").innerText = data.portfolio || "—";
    document.getElementById("portfolio").href = data.portfolio || "#";
  } catch (err) {
    console.error(err);
    alert("Error loading profile data!");
  }
}

function logoutUser() {
  localStorage.clear();
  alert("You have been logged out!");
  window.location.href = "login.html";
}

// Load profile on page load
window.addEventListener("load", loadProfile);
