<?php

declare(strict_types=1);

session_start();
ini_set('display_errors', '0');
error_reporting(E_ALL);
header('Content-Type: application/json');

require_once __DIR__ . '/../db.php';

function respond(array $payload): void
{
    echo json_encode($payload);
    exit;
}

try {
    if (!isset($_SESSION['user_id'])) {
        respond(['success' => false, 'error' => 'Please log in to view users.']);
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        respond(['success' => false, 'error' => 'Invalid request method.']);
    }

    $pdo = getPDO();
    $statement = $pdo->prepare('SELECT id, name, email, role FROM users ORDER BY id ASC');
    $statement->execute();

    respond([
        'success' => true,
        'users' => $statement->fetchAll(),
    ]);
} catch (Throwable $exception) {
    respond(['success' => false, 'error' => 'A server error occurred. Please try again later.']);
}
