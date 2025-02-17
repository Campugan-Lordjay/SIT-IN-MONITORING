document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login").style.display = "block"; // Show login form first
    document.getElementById("register").style.display = "none"; // Hide register form
});

// Function to toggle between login and register forms
function toggleForms() {
    let loginForm = document.getElementById("login");
    let registerForm = document.getElementById("register");

    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    registerForm.style.display = registerForm.style.display === "none" ? "block" : "none";
}

// Function to register a new user
function register() {
    let idNo = document.getElementById("idNo").value.trim();
    let lastName = document.getElementById("lastName").value.trim();
    let firstName = document.getElementById("firstName").value.trim();
    let middleName = document.getElementById("middleName").value.trim();
    let course = document.getElementById("course").value.trim();
    let yearLevel = document.getElementById("yearLevel").value.trim();
    let email = document.getElementById("email").value.trim();
    let regUsername = document.getElementById("regUsername").value.trim();
    let regPassword = document.getElementById("regPassword").value.trim();

    // Validate required fields
    if (!idNo || !lastName || !firstName || !email || !regUsername || !regPassword) {
        alert("Please fill in all required fields.");
        return;
    }

    // Validate email format
    if (!validateEmail(email)) {
        alert("Invalid email format.");
        return;
    }

    // Validate password length
    if (regPassword.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check for duplicate ID Number or Username
    if (users.find(user => user.idNo === idNo)) {
        alert("ID Number already exists.");
        return;
    }

    if (users.find(user => user.regUsername === regUsername)) {
        alert("Username already exists.");
        return;
    }

    let newUser = { idNo, lastName, firstName, middleName, course, yearLevel, email, regUsername, regPassword };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! You can now log in.");
    toggleForms(); // Switch to login form after registration
}

// Function to log in
function login() {
    let logIdNo = document.getElementById("logIdNo").value.trim();
    let logPassword = document.getElementById("logPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(user => user.idNo === logIdNo && user.regPassword === logPassword);

    if (user) {
        alert(`Welcome, ${user.firstName} ${user.lastName}!`);
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Invalid ID Number or Password.");
    }
}

// Function to validate email format
function validateEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

