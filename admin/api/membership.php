<?php
// membership.php (API)
// Handles volunteer membership registration from the React frontend.

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, X-Requested-With");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Method Not Allowed."]);
    exit;
}

require_once __DIR__ . '/../db.php';

if ($pdo === null) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection error."]);
    exit;
}

// Ensure memberships table exists
try {
    $pdo->exec("CREATE TABLE IF NOT EXISTS `memberships` (
        `id` INT AUTO_INCREMENT PRIMARY KEY,
        `member_id` VARCHAR(20) NOT NULL UNIQUE,
        `full_name` VARCHAR(100) NOT NULL,
        `email` VARCHAR(100) DEFAULT NULL,
        `phone` VARCHAR(20) NOT NULL,
        `age` TINYINT UNSIGNED NOT NULL,
        `district` VARCHAR(100) NOT NULL,
        `role` VARCHAR(100) NOT NULL,
        `motivation` TEXT DEFAULT NULL,
        `photo` VARCHAR(255) DEFAULT NULL,
        `status` ENUM('pending','approved','rejected') DEFAULT 'pending',
        `applied_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");
} catch (Exception $e) { /* already exists */ }

// Read fields from POST
$full_name  = trim($_POST['fullName']  ?? '');
$email      = trim($_POST['email']     ?? '');
$phone      = trim($_POST['phone']     ?? '');
$age        = intval($_POST['age']     ?? 0);
$district   = trim($_POST['district']  ?? '');
$role       = trim($_POST['role']      ?? '');
$motivation = trim($_POST['motivation'] ?? '');

// Validate required fields
if (!$full_name || !$phone || !$district || !$role) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Required fields missing."]);
    exit;
}

if (!preg_match('/^[6-9]\d{9}$/', $phone)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid phone number."]);
    exit;
}

if ($age < 15 || $age > 80) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Age must be between 15 and 80."]);
    exit;
}

// Handle photo upload
$photo_path = null;
if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $upload_dir = __DIR__ . '/../../public/uploads/members/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    $file_info  = pathinfo($_FILES['photo']['name']);
    $ext        = strtolower($file_info['extension'] ?? '');
    $allowed    = ['jpg', 'jpeg', 'png', 'webp'];

    if (!in_array($ext, $allowed)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Only JPG, PNG, or WEBP photos are allowed."]);
        exit;
    }

    // Max 4 MB
    if ($_FILES['photo']['size'] > 4 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Photo must be under 4 MB."]);
        exit;
    }

    $filename   = 'member_' . uniqid('', true) . '.' . $ext;
    $target     = $upload_dir . $filename;

    if (!move_uploaded_file($_FILES['photo']['tmp_name'], $target)) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Failed to save photo."]);
        exit;
    }

    $photo_path = '/uploads/members/' . $filename;
}

// Generate unique member ID: II-YEAR-RANDOM4
$member_id = 'II-' . date('Y') . '-' . strtoupper(substr(uniqid(), -4));

try {
    $stmt = $pdo->prepare("INSERT INTO memberships 
        (member_id, full_name, email, phone, age, district, role, motivation, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $member_id, $full_name, $email ?: null, $phone,
        $age, $district, $role, $motivation ?: null, $photo_path
    ]);

    echo json_encode([
        "success"   => true,
        "message"   => "Membership registered successfully.",
        "member_id" => $member_id,
        "photo"     => $photo_path,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
}
?>
