<?php
// contact.php (API)
// PHP endpoint to save contact messages from the frontend to the database.

// Enable CORS so the React frontend (running on another port/domain locally) can access it
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// Ensure it's a POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "success" => false,
        "message" => "Method Not Allowed. Only POST requests are accepted."
    ]);
    exit;
}

require_once __DIR__ . '/../db.php';

// If $pdo is null, database hasn't been set up yet
if ($pdo === null) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database connection error. Admin setup required."
    ]);
    exit;
}

// Get raw POST data (in case it is sent as JSON)
$input_data = json_decode(file_get_contents("php://input"), true);

// Fallback to normal $_POST if JSON decode returned null
if ($input_data === null) {
    $input_data = $_POST;
}

$name = trim($input_data['name'] ?? '');
$email = trim($input_data['email'] ?? '');
$phone = trim($input_data['phone'] ?? '');
$subject = trim($input_data['subject'] ?? '');
$message = trim($input_data['message'] ?? '');

// Simple validations
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Required fields missing. Name, email, and message are mandatory."
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Invalid email address format."
    ]);
    exit;
}

try {
    // Insert into database
    $stmt = $pdo->prepare("INSERT INTO contacts (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$name, $email, $phone, $subject, $message]);
    
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Your message has been received successfully."
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Failed to save message to database: " . $e->getMessage()
    ]);
}
?>
