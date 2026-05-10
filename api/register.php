<?php
// Handle user registration
// This script takes JSON input and saves it to the database

header('Content-Type: application/json');
require_once __DIR__ . '/../db.php';

// Simple helper function for JSON responses
function sendResponse($success, $message, $extra = []) {
    $response = ['success' => $success];
    if ($success) {
        $response['message'] = $message;
    } else {
        $response['error'] = $message;
    }
    echo json_encode(array_merge($response, $extra));
    exit;
}

function validationErrors(array $input): array
{
    $errors = [];
    $name = trim((string)($input['name'] ?? ''));
    $email = trim((string)($input['email'] ?? ''));
    $password = (string)($input['password'] ?? '');
    $role = trim((string)($input['role'] ?? ''));

    if ($name === '' || strlen($name) < 2) {
        $errors['name'] = 'Name must be at least 2 characters.';
    }

    if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Enter a valid email address.';
    }

    if ($password === '' || strlen($password) < 6) {
        $errors['password'] = 'Password must be at least 6 characters.';
    }

    if (!in_array($role, ['admin', 'user'], true)) {
        $errors['role'] = 'Role must be either admin or user.';
    }

    return $errors;
}

try {
    // Get the JSON data from the request body
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        sendResponse(false, 'Invalid input data.');
    }

    $errors = validationErrors($input);
    if ($errors !== []) {
        sendResponse(false, 'Please correct the highlighted fields.', ['errors' => $errors]);
    }

    $name = trim((string)$input['name']);
    $email = trim((string)$input['email']);
    $password = (string)$input['password'];
    $role = trim((string)$input['role']);

    $pdo = getPDO();
    $pdo->beginTransaction();

    $emailCheck = $pdo->prepare('SELECT id FROM users WHERE email = :email LIMIT 1');
    $emailCheck->execute(['email' => $email]);

    if ($emailCheck->fetch()) {
        $pdo->rollBack();
        sendResponse(false, 'Email already registered');
    }

    if ($role === 'admin') {
        $adminCheck = $pdo->prepare("SELECT id FROM users WHERE role = 'admin' LIMIT 1 FOR UPDATE");
        $adminCheck->execute();

        if ($adminCheck->fetch()) {
            $pdo->rollBack();
            sendResponse(false, 'An admin already exists. Only one admin is allowed.');
        }
    }

    $insert = $pdo->prepare(
        'INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, :role)'
    );
    $insert->execute([
        'name' => $name,
        'email' => $email,
        'password' => password_hash($password, PASSWORD_DEFAULT),
        'role' => $role,
    ]);

    $pdo->commit();
    // 5. Send success response!
    sendResponse(true, 'User registered successfully!');

} catch (Exception $e) {
    // If anything goes wrong, roll back and show error
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }

    // Check for duplicate entry error directly from MySQL
    if (strpos($e->getMessage(), 'Duplicate entry') !== false) {
        sendResponse(false, 'Email already registered');
    }

    sendResponse(false, 'Registration error: ' . $e->getMessage());
}
