const registerForm = document.getElementById('registerForm');
const formMessage = document.getElementById('formMessage');
const submitButton = registerForm.querySelector('button[type="submit"]');

function setText(id, message) {
    document.getElementById(id).textContent = message;
}

function clearMessages() {
    setText('nameError', '');
    setText('emailError', '');
    setText('passwordError', '');
    setText('roleError', '');
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

    if (data.name.length < 2) {
        errors.name = 'Name must be at least 2 characters.';
    }

    if (!isValidEmail(data.email)) {
        errors.email = 'Enter a valid email address.';
    }

    if (data.password.length < 6) {
        errors.password = 'Password must be at least 6 characters.';
    }

    if (!['admin', 'user'].includes(data.role)) {
        errors.role = 'Role must be either admin or user.';
    }

    return errors;
}

function displayFieldErrors(errors) {
    if (errors.name) {
        setText('nameError', errors.name);
    }

    if (errors.email) {
        setText('emailError', errors.email);
    }

    if (errors.password) {
        setText('passwordError', errors.password);
    }

    if (errors.role) {
        setText('roleError', errors.role);
    }
}

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearMessages();

    const data = {
        name: registerForm.name.value.trim(),
        email: registerForm.email.value.trim(),
        password: registerForm.password.value,
        role: registerForm.role.value,
    };

    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
        displayFieldErrors(errors);
        return;
    }

    submitButton.disabled = true;

    try {
        const response = await fetch('api/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!result.success) {
            displayFieldErrors(result.errors || {});
            showFormMessage(result.error || 'Registration failed.', 'error');
            return;
        }

        registerForm.reset();
        showFormMessage(result.message || 'Registration successful.', 'success');
    } catch (error) {
        showFormMessage('Unable to complete registration. Please try again.', 'error');
    } finally {
        submitButton.disabled = false;
    }
});
