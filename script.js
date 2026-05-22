const BASE_URL = "http://localhost:5000";


// ================= REGISTER =================

async function register() {

    const username =
    document.getElementById("registerUsername").value.trim();

    const email =
    document.getElementById("registerEmail").value.trim();

    const password =
    document.getElementById("registerPassword").value;

    const confirmPassword =
    document.getElementById("confirmPassword").value;

    const error =
    document.getElementById("registerError");

    error.innerText = "";

    if (!username || !email || !password || !confirmPassword) {

        error.innerText = "Please fill all fields";
        return;
    }

    const emailPattern =
    /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!email.match(emailPattern)) {

        error.innerText = "Invalid email format";
        return;
    }

    if (password.length < 6) {

        error.innerText =
        "Password must contain at least 6 characters";

        return;
    }

    if (password !== confirmPassword) {

        error.innerText =
        "Passwords do not match";

        return;
    }

    try {

        const response = await fetch(
            `${BASE_URL}/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Registration Successful");

            window.location.href = "login.html";

        } else {

            error.innerText = data.message;
        }

    } catch (err) {

        error.innerText =
        "Server error. Please try again.";

        console.log(err);
    }
}


// ================= LOGIN =================

async function login() {

    const username =
    document.getElementById("loginUsername").value.trim();

    const password =
    document.getElementById("loginPassword").value;

    const error =
    document.getElementById("loginError");

    error.innerText = "";

    if (!username || !password) {

        error.innerText =
        "Username and password are required";

        return;
    }

    try {

        const response = await fetch(
            `${BASE_URL}/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                credentials: "include",

                body: JSON.stringify({
                    username,
                    password
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            window.location.href =
            "dashboard.html";

        } else {

            error.innerText =
            "Invalid username or password";
        }

    } catch (err) {

        error.innerText =
        "Unable to connect to server";

        console.log(err);
    }
}


// ================= DASHBOARD =================

async function loadDashboard() {

    try {

        const response = await fetch(
            `${BASE_URL}/dashboard`,
            {
                credentials: "include"
            }
        );

        if (!response.ok) {

            window.location.href =
            "login.html";

            return;
        }

        const data = await response.json();

        document.getElementById("welcome").innerText =
        `Welcome, ${data.username}!`;

        document.getElementById("role").innerText =
        data.role;

        document.getElementById("createdAt").innerText =
        data.created_at;

    } catch (err) {

        console.log(err);

        alert("Error loading dashboard");
    }
}


// ================= LOGOUT =================

async function logout() {

    try {

        await fetch(
            `${BASE_URL}/logout`,
            {
                method: "GET",
                credentials: "include"
            }
        );

        window.location.href =
        "login.html";

    } catch (err) {

        console.log(err);

        alert("Logout failed");
    }
}


// ================= PASSWORD STRENGTH =================

function checkPasswordStrength() {

    const password =
    document.getElementById("registerPassword").value;

    const strength =
    document.getElementById("passwordStrength");

    if (password.length < 6) {

        strength.innerText =
        "Weak Password";

        strength.style.color = "red";

    } else if (password.length < 10) {

        strength.innerText =
        "Medium Password";

        strength.style.color = "orange";

    } else {

        strength.innerText =
        "Strong Password";

        strength.style.color = "green";
    }
}


// ================= AUTO LOAD DASHBOARD =================

loadDashboard();