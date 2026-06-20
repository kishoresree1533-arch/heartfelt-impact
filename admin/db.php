<?php
// db.php
// Database configuration and connection setup using PDO

$host = 'localhost';
$user = 'root';
$pass = ''; // Default XAMPP password is empty
$dbname = 'Iraithuligal';

try {
    // Try to connect directly to the database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ]);
} catch (PDOException $e) {
    // If the database doesn't exist yet, we will capture it so setup.php can handle creation
    $pdo = null;
    $db_connection_error = $e->getMessage();
}
?>
