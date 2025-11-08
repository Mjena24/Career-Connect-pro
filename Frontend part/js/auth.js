const API_BASE = "http://localhost:5001/api"; // ✅ Use port where your backend runs

// ===============================
// 🧾 REGISTER FORM
// ===============================
const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role") ? document.getElementById("role").value : "jobseeker";

    if (!name || !email || !password || !role) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("🎉 Registration successful! Please log in.");
        window.location.href = "login.html";
      } else {
        alert(`❌ ${data.message || "Registration failed. Try again!"}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("⚠️ Cannot connect to server. Check if backend is running on port 5001.");
    }
  });
}


// ===============================
// 🔐 LOGIN FORM
// ===============================
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("⚠️ Please enter both email and password.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Save token and user details
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: data.name,
          email: data.email,
          role: data.role,
        })
      );

      alert("✅ Login successful!");

      // ✅ Redirect based on role
      if (data.role === "employer") {
        window.location.href = "employer-dashboard.html";
      } else {
        window.location.href = "profile.html";
      }
    } else {
      alert(`❌ ${data.message || "Login failed. Check credentials."}`);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("⚠️ Server error. Please try again later.");
  }
});


// ===============================
// 🚪 LOGOUT BUTTON
// ===============================
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    alert("👋 Logged out successfully!");
    window.location.href = "login.html";
  });
}
