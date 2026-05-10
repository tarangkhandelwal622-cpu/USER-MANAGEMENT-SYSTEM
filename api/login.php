<?php
// Handle user login
// This checks if the user exists and the password is correct

session_start();
header('Content-Type: application/json');
require_once __DIR__ . '/../db.php';

// Quick helper for responses
function sendResult($success, $msg, $data = []) {
    echo json_encode(array_merge(['success' => $success, 'error' => $msg], $data));
    exit;
}

function validationErrors(array $input): array
{
    $errors = [];
    $email = trim((string)($input['email'] ?? ''));
    $password = (string)($input['password'] ?? '');

    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Enter a valid email address.';
    }

    if ($password === '' || strlen($password) < 6) {
        $errors['password'] = 'Password must be at least 6 characters.';
    }

    return $errors;
}

try {
    // Read the input JSON
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        sendResult(false, 'Missing input data.');
    }

    $errors = validationErrors($input);
    if ($errors !== []) {
        respond([
            'success' => false,
            'error' => 'Please correct the highlighted fields.',
            'errors' => $errors,
        ]);
    }

    $email = trim((string)$input['email']);
    $password = (string)$input['password'];

    $pdo = getPDO();
    $statement = $pdo->prepare('SELECT id, name, email, password, role FROM users WHERE email = :email LIMIT 1');
    $statement->execute(['email' => $email]);
    $user = $statement->fetch();

    if (!$user || !password_verify($password, $user['password'])) {
        sendResult(false, 'Invalid login credentials.');
    }

    // Save user info in session
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['user_role'] = $user['role'];
    $_SESSION['user_email'] = $user['email'];

    sendResult(true, 'Welcome back!', ['role' => $user['role']]);

} catch (Exception $e) {
    sendResult(false, 'Login error: ' . $e->getMessage());
}
