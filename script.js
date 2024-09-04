document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const showRegisterLink = document.getElementById('show-register');
    const showLoginLink = document.getElementById('show-login');
    const loginError = document.getElementById('login-error');
    const registerError = document.getElementById('register-error');
    
    // Toggle between login and register forms
    showRegisterLink.addEventListener('click', () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    showLoginLink.addEventListener('click', () => {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    // Handle login form submission
    document.getElementById('login').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        if (!username || !password) {
            loginError.textContent = 'Please fill in all fields.';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            loginError.textContent = '';
            alert('Login successful');
        } else {
            loginError.textContent = 'Invalid username or password.';
        }
    });

    // Handle register form submission
    document.getElementById('register').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const whatsapp = document.getElementById('register-whatsapp').value;

        if (!username || !password || !whatsapp) {
            registerError.textContent = 'Please fill in all fields.';
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(u => u.username === username);

        if (userExists) {
            registerError.textContent = 'Username already exists.';
        } else {
            users.push({ username, password, whatsapp });
            localStorage.setItem('users', JSON.stringify(users));
            registerError.textContent = '';
            alert('Registration successful');
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        }
    });
});
