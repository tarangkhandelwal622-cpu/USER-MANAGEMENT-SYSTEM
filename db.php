<?php
// Database connection setup
// I'm using PDO because it's more secure against SQL injection

function getPDO(): PDO
{
    $host = 'localhost';
    $database = 'user_management';
    $username = 'root';
    $password = ''; // Default XAMPP password is empty
    $charset = 'utf8mb4';

    try {
        $dsn = "mysql:host={$host};dbname={$database};charset={$charset}";
        return new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException $e) {
        // Just a simple error log for now
        die("Connection failed: " . $e->getMessage());
    }
}
