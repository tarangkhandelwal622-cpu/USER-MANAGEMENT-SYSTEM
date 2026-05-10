const loginForm = document.getElementById('loginForm');
const formMessage = document.getElementById('formMessage');
const submitButton = loginForm.querySelector('button[type="submit"]');

function setText(id, message) {
    document.getElementById(id).textContent = message;
}

function clearMessages() {
    setText('emailError', '');
    setText('passwordError', '');
    formMessage.textContent = '';
    formMessage.className = 'message';
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `message ${type}`;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm(data) {
    const errors = {};

    if (!isValidEmail(data.email)) {
        errors.email = 'Enter a valid email address.';
    }

    if (data.password.length < 6) {
        errors.password = 'Password must be at least 6 characters.';
    }

    return errors;
}

function displayFieldErrors(errors) {
    if (errors.email) {
        setText('emailError', errors.email);
    }

    if (errors.password) {
        setText('passwordError', errors.password);
    }
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearMessages();

    const data = {
        email: loginForm.email.value.trim(),
        password: loginForm.password.value,
    };

    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
        displayFieldErrors(errors);
        return;
    }

    submitButton.disabled = true;

    try {
        const response = await fetch('api/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!result.success) {
            displayFieldErrors(result.errors || {});
            showFormMessage(result.error || 'Login failed.', 'error');
            return;
        }

        showFormMessage(result.message || 'Login successful.', 'success');
        window.location.href = 'dashboard.html';
    } catch (error) {
        showFormMessage('Unable to process login. Please try again.', 'error');
    } finally {
        submitButton.disabled = false;
    }
});
