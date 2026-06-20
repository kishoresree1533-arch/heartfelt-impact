<?php
// dashboard.php
// Premium Admin Dashboard for Heartfelt Impact

session_start();
require_once __DIR__ . '/db.php';

// Verify login
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

$success_msg = '';
$error_msg = '';

// Active tab
$tab = $_GET['tab'] ?? 'dashboard';
$allowed_tabs = ['dashboard', 'messages', 'gallery', 'donations', 'testimonials', 'awards', 'memberships'];
if (!in_index($tab, $allowed_tabs)) {
    $tab = 'dashboard';
}

function in_index($val, $arr) {
    return in_array($val, $arr);
}

// Check database connection
if ($pdo === null) {
    die("Database connection failed. Please run setup.php first.");
}

// Helper to handle image uploads
function handle_file_upload($file_post) {
    if (!isset($file_post) || $file_post['error'] !== UPLOAD_ERR_OK) {
        return null;
    }
    
    $public_upload_dir = __DIR__ . '/../public/uploads/';
    if (!is_dir($public_upload_dir)) {
        mkdir($public_upload_dir, 0777, true);
    }
    
    $file_info = pathinfo($file_post['name']);
    $extension = strtolower($file_info['extension'] ?? '');
    
    $allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
    if (!in_array($extension, $allowed_extensions)) {
        return null;
    }
    
    $new_filename = uniqid('img_', true) . '.' . $extension;
    $target_public_file = $public_upload_dir . $new_filename;
    
    if (move_uploaded_file($file_post['tmp_name'], $target_public_file)) {
        // Also check if dist/ exists and copy to dist/uploads/
        $dist_upload_dir = __DIR__ . '/../dist/uploads/';
        if (is_dir(__DIR__ . '/../dist/')) {
            if (!is_dir($dist_upload_dir)) {
                mkdir($dist_upload_dir, 0777, true);
            }
            copy($target_public_file, $dist_upload_dir . $new_filename);
        }
        
        return '/uploads/' . $new_filename;
    }
    
    return null;
}

// Helper to get local preview URL for admin dashboard
function get_preview_url($src) {
    if (filter_var($src, FILTER_VALIDATE_URL)) {
        return $src;
    }
    
    if (strpos($src, '/uploads/') === 0) {
        if (is_dir(__DIR__ . '/../dist/uploads/')) {
            return '../dist' . $src;
        }
        return '../public' . $src;
    }
    
    if (strpos($src, 'src/') === 0) {
        return '../' . $src;
    }
    
    return $src;
}

// Process CRUD Actions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'] ?? '';
    
    // --- 1. Gallery CRUD ---
    if ($action === 'add_gallery') {
        $src = '';
        if (isset($_FILES['src_file']) && $_FILES['src_file']['error'] === UPLOAD_ERR_OK) {
            $uploaded = handle_file_upload($_FILES['src_file']);
            if ($uploaded) {
                $src = $uploaded;
            }
        }
        if (empty($src)) {
            $src = trim($_POST['src'] ?? '');
        }
        
        $span = trim($_POST['span'] ?? '');
        $delay = floatval($_POST['delay'] ?? 0);
        if ($src) {
            $stmt = $pdo->prepare("INSERT INTO gallery_images (src, span, delay) VALUES (?, ?, ?)");
            $stmt->execute([$src, $span, $delay]);
            $success_msg = "Gallery image added successfully.";
        } else {
            $error_msg = "Please upload an image or provide an image URL/path.";
        }
    } elseif ($action === 'edit_gallery') {
        $id = intval($_POST['id'] ?? 0);
        $src = '';
        if (isset($_FILES['src_file']) && $_FILES['src_file']['error'] === UPLOAD_ERR_OK) {
            $uploaded = handle_file_upload($_FILES['src_file']);
            if ($uploaded) {
                $src = $uploaded;
            }
        }
        if (empty($src)) {
            $src = trim($_POST['src'] ?? '');
        }
        
        $span = trim($_POST['span'] ?? '');
        $delay = floatval($_POST['delay'] ?? 0);
        if ($id && $src) {
            $stmt = $pdo->prepare("UPDATE gallery_images SET src = ?, span = ?, delay = ? WHERE id = ?");
            $stmt->execute([$src, $span, $delay, $id]);
            $success_msg = "Gallery image updated successfully.";
        } else {
            $error_msg = "Failed to update gallery image. Source is empty.";
        }
    } elseif ($action === 'delete_gallery') {
        $id = intval($_POST['id'] ?? 0);
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM gallery_images WHERE id = ?");
            $stmt->execute([$id]);
            $success_msg = "Gallery image deleted.";
        }
    }
    
    // --- 2. Donations CRUD ---
    elseif ($action === 'edit_donation') {
        $id = intval($_POST['id'] ?? 0);
        $title = trim($_POST['title'] ?? '');
        $desc = trim($_POST['desc'] ?? '');
        
        $image = '';
        if (isset($_FILES['image_file']) && $_FILES['image_file']['error'] === UPLOAD_ERR_OK) {
            $uploaded = handle_file_upload($_FILES['image_file']);
            if ($uploaded) {
                $image = $uploaded;
            }
        }
        if (empty($image)) {
            $image = trim($_POST['image'] ?? '');
        }
        
        $tag = trim($_POST['tag'] ?? '');
        $tagColor = trim($_POST['tagColor'] ?? '');
        $accentBorder = trim($_POST['accentBorder'] ?? '');
        $stat = trim($_POST['stat'] ?? '');
        $statLabel = trim($_POST['statLabel'] ?? '');
        if ($id && $title) {
            $stmt = $pdo->prepare("UPDATE donation_categories SET title = ?, `desc` = ?, image = ?, tag = ?, tagColor = ?, accentBorder = ?, stat = ?, statLabel = ? WHERE id = ?");
            $stmt->execute([$title, $desc, $image, $tag, $tagColor, $accentBorder, $stat, $statLabel, $id]);
            $success_msg = "Donation cause updated.";
        } else {
            $error_msg = "Title is required.";
        }
    }
    
    // --- 3. Testimonials CRUD ---
    elseif ($action === 'add_testimonial') {
        $quote = trim($_POST['quote'] ?? '');
        $name = trim($_POST['name'] ?? '');
        $role = trim($_POST['role'] ?? '');
        if ($quote && $name) {
            $stmt = $pdo->prepare("INSERT INTO testimonials (quote, name, role) VALUES (?, ?, ?)");
            $stmt->execute([$quote, $name, $role]);
            $success_msg = "Testimonial added successfully.";
        } else {
            $error_msg = "Quote and Name are required.";
        }
    } elseif ($action === 'edit_testimonial') {
        $id = intval($_POST['id'] ?? 0);
        $quote = trim($_POST['quote'] ?? '');
        $name = trim($_POST['name'] ?? '');
        $role = trim($_POST['role'] ?? '');
        if ($id && $quote && $name) {
            $stmt = $pdo->prepare("UPDATE testimonials SET quote = ?, name = ?, role = ? WHERE id = ?");
            $stmt->execute([$quote, $name, $role, $id]);
            $success_msg = "Testimonial updated.";
        }
    } elseif ($action === 'delete_testimonial') {
        $id = intval($_POST['id'] ?? 0);
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
            $stmt->execute([$id]);
            $success_msg = "Testimonial deleted.";
        }
    }
    
    // --- 4. Awards CRUD ---
    elseif ($action === 'add_award') {
        $icon = trim($_POST['icon'] ?? 'Trophy');
        $from_org = trim($_POST['from_org'] ?? '');
        $title = trim($_POST['title'] ?? '');
        $year = trim($_POST['year'] ?? '');
        if ($from_org && $title && $year) {
            $stmt = $pdo->prepare("INSERT INTO awards (icon, from_org, title, year) VALUES (?, ?, ?, ?)");
            $stmt->execute([$icon, $from_org, $title, $year]);
            $success_msg = "Award added successfully.";
        } else {
            $error_msg = "All award fields are required.";
        }
    } elseif ($action === 'edit_award') {
        $id = intval($_POST['id'] ?? 0);
        $icon = trim($_POST['icon'] ?? 'Trophy');
        $from_org = trim($_POST['from_org'] ?? '');
        $title = trim($_POST['title'] ?? '');
        $year = trim($_POST['year'] ?? '');
        if ($id && $from_org && $title && $year) {
            $stmt = $pdo->prepare("UPDATE awards SET icon = ?, from_org = ?, title = ?, year = ? WHERE id = ?");
            $stmt->execute([$icon, $from_org, $title, $year, $id]);
            $success_msg = "Award updated successfully.";
        }
    } elseif ($action === 'delete_award') {
        $id = intval($_POST['id'] ?? 0);
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM awards WHERE id = ?");
            $stmt->execute([$id]);
            $success_msg = "Award deleted.";
        }
    }
    
    // --- 6. Membership CRUD ---
    elseif ($action === 'approve_membership') {
        $id = intval($_POST['id'] ?? 0);
        if ($id) {
            $stmt = $pdo->prepare("UPDATE memberships SET status='approved' WHERE id=?");
            $stmt->execute([$id]);
            $success_msg = "Membership approved.";
        }
    } elseif ($action === 'reject_membership') {
        $id = intval($_POST['id'] ?? 0);
        if ($id) {
            $stmt = $pdo->prepare("UPDATE memberships SET status='rejected' WHERE id=?");
            $stmt->execute([$id]);
            $success_msg = "Membership rejected.";
        }
    } elseif ($action === 'delete_membership') {
        $id = intval($_POST['id'] ?? 0);
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM memberships WHERE id=?");
            $stmt->execute([$id]);
            $success_msg = "Membership record deleted.";
        }
    }

    // --- 5. Message CRUD ---
    elseif ($action === 'delete_message') {
        $id = intval($_POST['id'] ?? 0);
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM contacts WHERE id = ?");
            $stmt->execute([$id]);
            $success_msg = "Message deleted successfully.";
        }
    } elseif ($action === 'approve_message') {
        $id = intval($_POST['id'] ?? 0);
        if ($id) {
            // Ensure column exists (for existing installs)
            try { $pdo->query("ALTER TABLE contacts ADD COLUMN IF NOT EXISTS `approved` TINYINT(1) DEFAULT 0"); } catch(Exception $e) {}
            $stmt = $pdo->prepare("UPDATE contacts SET approved = 1 WHERE id = ?");
            $stmt->execute([$id]);
            $success_msg = "Message approved successfully.";
        }
    } elseif ($action === 'ignore_message') {
        $id = intval($_POST['id'] ?? 0);
        if ($id) {
            $stmt = $pdo->prepare("DELETE FROM contacts WHERE id = ?");
            $stmt->execute([$id]);
            $success_msg = "Message ignored and removed.";
        }
    }
}

// Fetch statistics — badge counts only PENDING (unapproved) messages
// Ensure approved column exists safely
try { $pdo->query("ALTER TABLE contacts ADD COLUMN IF NOT EXISTS `approved` TINYINT(1) DEFAULT 0"); } catch(Exception $e) {}
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
} catch(Exception $e) {}
$total_messages    = $pdo->query("SELECT COUNT(*) FROM contacts WHERE approved = 0")->fetchColumn();
$total_gallery     = $pdo->query("SELECT COUNT(*) FROM gallery_images")->fetchColumn();
$total_testimonials= $pdo->query("SELECT COUNT(*) FROM testimonials")->fetchColumn();
$total_awards      = $pdo->query("SELECT COUNT(*) FROM awards")->fetchColumn();
$total_donations   = $pdo->query("SELECT COUNT(*) FROM donation_categories")->fetchColumn();
$total_memberships = $pdo->query("SELECT COUNT(*) FROM memberships")->fetchColumn();
$pending_memberships = $pdo->query("SELECT COUNT(*) FROM memberships WHERE status='pending'")->fetchColumn();

// Load dynamic data based on active tab
$table_data = [];
if ($tab === 'messages') {
    // Pending messages (inbox)
    $table_data = $pdo->query("SELECT * FROM contacts WHERE approved = 0 ORDER BY submitted_at DESC")->fetchAll();
    // Approved messages (archive)
    $approved_messages = $pdo->query("SELECT * FROM contacts WHERE approved = 1 ORDER BY submitted_at DESC")->fetchAll();
} elseif ($tab === 'gallery') {
    $table_data = $pdo->query("SELECT * FROM gallery_images ORDER BY id DESC")->fetchAll();
} elseif ($tab === 'donations') {
    $table_data = $pdo->query("SELECT * FROM donation_categories ORDER BY id ASC")->fetchAll();
} elseif ($tab === 'testimonials') {
    $table_data = $pdo->query("SELECT * FROM testimonials ORDER BY id DESC")->fetchAll();
} elseif ($tab === 'awards') {
    $table_data = $pdo->query("SELECT * FROM awards ORDER BY year DESC, id DESC")->fetchAll();
} elseif ($tab === 'memberships') {
    $status_filter = $_GET['status'] ?? 'all';
    if ($status_filter === 'pending') {
        $table_data = $pdo->query("SELECT * FROM memberships WHERE status='pending' ORDER BY applied_at DESC")->fetchAll();
    } elseif ($status_filter === 'approved') {
        $table_data = $pdo->query("SELECT * FROM memberships WHERE status='approved' ORDER BY applied_at DESC")->fetchAll();
    } elseif ($status_filter === 'rejected') {
        $table_data = $pdo->query("SELECT * FROM memberships WHERE status='rejected' ORDER BY applied_at DESC")->fetchAll();
    } else {
        $table_data = $pdo->query("SELECT * FROM memberships ORDER BY applied_at DESC")->fetchAll();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard — Iraithuligal Iyakkam</title>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #faf8f5;
            --sidebar-bg: #12161a;
            --primary-color: #12161a;
            --gold-color: #cc9933;
            --gold-light: #f5eedc;
            --border-color: #e5e0d8;
            --card-bg: #ffffff;
            --text-muted: #535d66;
            --text-light: #8e9ca8;
            --success-color: #10b981;
            --danger-color: #ef4444;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg-color);
            color: var(--primary-color);
            min-height: 100vh;
            display: flex;
        }

        /* Layout Structure */
        .sidebar {
            width: 260px;
            background-color: var(--sidebar-bg);
            color: #ffffff;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 2.5rem 1.5rem;
            z-index: 100;
        }

        .main-wrapper {
            margin-left: 260px;
            width: calc(100% - 260px);
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        .topbar {
            height: 80px;
            background-color: #ffffff;
            border-bottom: 1px solid var(--border-color);
            padding: 0 3rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .content-area {
            padding: 3rem;
            flex-grow: 1;
        }

        /* Sidebar Styling */
        .sidebar-brand {
            margin-bottom: 3rem;
        }

        .sidebar-brand .sub {
            font-size: 0.6rem;
            text-transform: uppercase;
            letter-spacing: 0.4em;
            color: var(--gold-color);
            font-weight: 700;
            display: block;
            margin-bottom: 0.25rem;
        }

        .sidebar-brand h2 {
            font-family: 'Playfair Display', serif;
            font-weight: 500;
            font-size: 1.4rem;
        }

        .sidebar-brand h2 span {
            font-style: italic;
            color: var(--gold-color);
        }

        .sidebar-menu {
            list-style: none;
            flex-grow: 1;
        }

        .menu-item {
            margin-bottom: 0.75rem;
        }

        .menu-link {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: rgba(255, 255, 255, 0.75);
            text-decoration: none;
            padding: 0.85rem 1.25rem;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: 500;
            transition: all 0.3s ease;
        }

        .menu-link:hover, .menu-link.active {
            color: #ffffff;
            background-color: rgba(255, 255, 255, 0.05);
        }

        .menu-link.active {
            border-left: 3px solid var(--gold-color);
            border-radius: 0 12px 12px 0;
            background-color: rgba(255, 255, 255, 0.08);
            padding-left: calc(1.25rem - 3px);
        }

        .menu-link svg {
            width: 18px;
            height: 18px;
            stroke-width: 2px;
            color: var(--text-light);
        }

        .menu-link.active svg, .menu-link:hover svg {
            color: var(--gold-color);
        }

        .sidebar-footer {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 1.5rem;
            display: flex;
            justify-content: center;
        }

        .logout-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background-color: var(--gold-color);
            color: var(--primary-color);
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            font-size: 0.75rem;
            font-weight: 600;
            border-radius: 12px;
            transition: all 0.3s ease;
        }

        .logout-btn:hover {
            background-color: var(--primary-color);
            color: #ffffff;
            border-color: var(--primary-color);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        /* Topbar Styling */
        .topbar-title h1 {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            font-weight: 500;
        }

        .topbar-actions {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .user-greeting {
            font-size: 0.85rem;
            color: var(--text-muted);
        }

        .user-greeting strong {
            color: var(--primary-color);
        }

        .visit-site-link {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--gold-color);
            text-decoration: none;
            border: 1px solid var(--gold-color);
            padding: 0.5rem 1.25rem;
            border-radius: 9999px;
            transition: all 0.3s ease;
        }

        .visit-site-link:hover {
            background-color: var(--gold-color);
            color: var(--primary-color);
        }

        /* Notifications */
        .alert-banner {
            border-radius: 16px;
            padding: 1rem 2rem;
            margin-bottom: 2rem;
            font-size: 0.85rem;
            font-weight: 500;
            animation: fadeIn 0.4s ease;
        }

        .alert-banner.success {
            background-color: #ecfdf5;
            border: 1px solid rgba(16, 185, 129, 0.15);
            color: #065f46;
        }

        .alert-banner.error {
            background-color: #fef2f2;
            border: 1px solid rgba(239, 68, 68, 0.15);
            color: #991b1b;
        }

        /* Stats Cards */
        .stats-grid {
            display: grid;
            grid-template-cols: repeat(auto-fit, minmax(220px, 1fr));
            gap: 1.5rem;
            margin-bottom: 3rem;
        }

        .stat-card {
            background-color: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.01);
            transition: transform 0.3s ease;
        }

        .stat-card:hover {
            transform: translateY(-2px);
        }

        .stat-info .label {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--text-muted);
            margin-bottom: 0.5rem;
        }

        .stat-info .value {
            font-family: 'Playfair Display', serif;
            font-size: 2.25rem;
            font-weight: 600;
            color: var(--primary-color);
        }

        .stat-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50px;
            height: 50px;
            border-radius: 14px;
            background-color: var(--gold-light);
            color: var(--gold-color);
        }

        .stat-icon svg {
            width: 24px;
            height: 24px;
        }

        /* Tables & Lists */
        .table-card {
            background-color: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 24px;
            padding: 2.5rem;
            box-shadow: 0 4px 20px rgba(0,0,0,0.01);
        }

        .table-header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
        }

        .table-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.35rem;
            font-weight: 500;
        }

        .admin-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }

        .admin-table th {
            padding: 1.25rem 1.5rem;
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            color: var(--text-muted);
            border-bottom: 2px solid var(--border-color);
        }

        .admin-table td {
            padding: 1.25rem 1.5rem;
            font-size: 0.85rem;
            color: var(--primary-color);
            border-bottom: 1px solid var(--border-color);
            vertical-align: middle;
        }

        .admin-table tr:last-child td {
            border-bottom: none;
        }

        .admin-table tr:hover td {
            background-color: #fdfdfd;
        }

        /* Forms in Dashboard */
        .crud-form {
            background-color: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 2.5rem;
        }

        .form-grid {
            display: grid;
            grid-template-cols: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
            margin-bottom: 1.5rem;
        }

        .form-element {
            display: flex;
            flex-direction: column;
        }

        .form-label {
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }

        .form-input, .form-select, .form-textarea {
            width: 100%;
            background-color: #faf8f5;
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 0.85rem 1.1rem;
            font-size: 0.85rem;
            color: var(--primary-color);
            outline: none;
            transition: all 0.3s ease;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
            border-color: var(--gold-color);
            background-color: #ffffff;
            box-shadow: 0 0 0 4px rgba(204, 153, 51, 0.05);
        }

        .form-textarea {
            resize: vertical;
            min-height: 100px;
        }

        /* Badges */
        .badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
        }

        .badge-tag {
            background-color: var(--gold-light);
            color: var(--gold-color);
        }

        /* Buttons */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-weight: 700;
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            padding: 0.85rem 1.75rem;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            border: 1px solid transparent;
        }

        .btn-gold {
            background-color: var(--gold-color);
            color: var(--primary-color);
            border-color: var(--gold-color);
        }

        .btn-gold:hover {
            background-color: var(--primary-color);
            color: #ffffff;
            border-color: var(--primary-color);
        }

        .btn-primary {
            background-color: var(--primary-color);
            color: #ffffff;
            border-color: var(--primary-color);
        }

        .btn-primary:hover {
            background-color: var(--gold-color);
            color: var(--primary-color);
            border-color: var(--gold-color);
        }

        .btn-sm {
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.65rem;
        }

        .btn-outline-danger {
            background-color: transparent;
            color: var(--danger-color);
            border-color: rgba(239, 68, 68, 0.3);
        }

        .btn-outline-danger:hover {
            background-color: var(--danger-color);
            color: #ffffff;
            border-color: var(--danger-color);
        }

        .btn-inline-submit {
            background-color: transparent;
            color: var(--gold-color);
            border: none;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.85rem;
            text-decoration: underline;
            padding: 0;
        }

        .btn-inline-submit:hover {
            color: var(--primary-color);
        }

        /* Image Previews */
        .image-preview {
            width: 60px;
            height: 60px;
            border-radius: 10px;
            object-cover: cover;
            border: 1px solid var(--border-color);
        }

        .gallery-grid {
            display: grid;
            grid-template-cols: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
            margin-top: 1.5rem;
        }

        .gallery-item-card {
            background-color: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.01);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .gallery-item-img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            border-bottom: 1px solid var(--border-color);
        }

        .gallery-item-body {
            padding: 1.5rem;
        }

        .gallery-item-meta {
            font-size: 0.75rem;
            color: var(--text-muted);
            margin-bottom: 1rem;
            display: grid;
            grid-template-cols: 1fr 1fr;
            gap: 0.5rem;
        }

        .gallery-item-actions {
            display: flex;
            gap: 0.5rem;
        }

        /* Inline Forms for quick edits */
        .inline-edit-form {
            display: none;
            background-color: #faf8f5;
            padding: 1.5rem;
            border-radius: 14px;
            border: 1px dashed var(--border-color);
            margin-top: 1rem;
        }

        /* Modal styling */
        .modal {
            display: none; 
            position: fixed; 
            z-index: 200; 
            left: 0;
            top: 0;
            width: 100%; 
            height: 100%; 
            overflow: auto; 
            background-color: rgba(18,22,26,0.6); 
            backdrop-filter: blur(4px);
            align-items: center;
            justify-content: center;
        }

        .modal-content {
            background-color: #ffffff;
            margin: auto;
            padding: 2.5rem;
            border: 1px solid var(--border-color);
            border-radius: 20px;
            width: 90%;
            max-width: 600px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            position: relative;
            animation: modalFadeIn 0.3s ease;
        }

        .close-modal {
            position: absolute;
            top: 1.5rem;
            right: 1.5rem;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-light);
            transition: color 0.3s ease;
        }

        .close-modal:hover {
            color: var(--primary-color);
        }

        @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    </style>
</head>
<body>

    <!-- Sidebar -->
    <div class="sidebar">
        <div>
            <div class="sidebar-brand">
                <span class="sub">Admin Portal</span>
                <h2>Iraithuligal <span>Iyakkam</span></h2>
            </div>
            
            <ul class="sidebar-menu">
                <li class="menu-item">
                    <a href="?tab=dashboard" class="menu-link <?php echo $tab === 'dashboard' ? 'active' : ''; ?>">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
                        Overview
                    </a>
                </li>
                <li class="menu-item">
                    <a href="?tab=messages" class="menu-link <?php echo $tab === 'messages' ? 'active' : ''; ?>">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        Messages
                        <?php if ($total_messages > 0): ?>
                        <span style="display:inline-flex;align-items:center;justify-content:center;background:var(--gold-color);color:var(--primary-color);font-size:0.6rem;font-weight:800;min-width:18px;height:18px;border-radius:9999px;padding:0 4px;margin-left:auto;"><?php echo $total_messages; ?></span>
                        <?php endif; ?>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="?tab=donations" class="menu-link <?php echo $tab === 'donations' ? 'active' : ''; ?>">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        Donation Causes
                    </a>
                </li>
                <li class="menu-item">
                    <a href="?tab=gallery" class="menu-link <?php echo $tab === 'gallery' ? 'active' : ''; ?>">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        Gallery Images
                    </a>
                </li>
                <li class="menu-item">
                    <a href="?tab=testimonials" class="menu-link <?php echo $tab === 'testimonials' ? 'active' : ''; ?>">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        Testimonials
                    </a>
                </li>
                <li class="menu-item">
                    <a href="?tab=awards" class="menu-link <?php echo $tab === 'awards' ? 'active' : ''; ?>">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                        Awards
                    </a>
                </li>
                <li class="menu-item">
                    <a href="?tab=memberships" class="menu-link <?php echo $tab === 'memberships' ? 'active' : ''; ?>">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                        Memberships
                        <?php if ($pending_memberships > 0): ?>
                        <span style="display:inline-flex;align-items:center;justify-content:center;background:var(--gold-color);color:var(--primary-color);font-size:0.6rem;font-weight:800;min-width:18px;height:18px;border-radius:9999px;padding:0 4px;margin-left:auto;"><?php echo $pending_memberships; ?></span>
                        <?php endif; ?>
                    </a>
                </li>
            </ul>
        </div>
        
        <div class="sidebar-footer">
            <a href="logout.php" class="logout-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Sign Out
            </a>
        </div>
    </div>

    <!-- Main Wrapper -->
    <div class="main-wrapper">
        
        <!-- Topbar -->
        <div class="topbar">
            <div class="topbar-title">
                <h1>
                    <?php 
                    if ($tab === 'dashboard') echo 'Overview';
                    elseif ($tab === 'messages') echo 'Messages &amp; Enquiries';
                    elseif ($tab === 'donations') echo 'Donation Causes';
                    elseif ($tab === 'gallery') echo 'Gallery Management';
                    elseif ($tab === 'testimonials') echo 'Testimonials';
                    elseif ($tab === 'awards') echo 'Awards &amp; Recognition';
                    elseif ($tab === 'memberships') echo 'Volunteer Memberships';
                    ?>
                </h1>
            </div>
            <div class="topbar-actions">
                <span class="user-greeting">Welcome, <strong><?php echo htmlspecialchars($_SESSION['admin_username']); ?></strong></span>
                <a href="../" target="_blank" class="visit-site-link">Visit Site</a>
            </div>
        </div>

        <!-- Content Area -->
        <div class="content-area">
            
            <!-- Success/Error Banners -->
            <?php if (!empty($success_msg)): ?>
                <div class="alert-banner success"><?php echo htmlspecialchars($success_msg); ?></div>
            <?php endif; ?>
            <?php if (!empty($error_msg)): ?>
                <div class="alert-banner error"><?php echo htmlspecialchars($error_msg); ?></div>
            <?php endif; ?>

            <!-- OVERVIEW TAB -->
            <?php if ($tab === 'dashboard'): ?>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-info">
                            <p class="label">Pending Messages</p>
                            <p class="value"><?php echo $total_messages; ?></p>
                        </div>
                        <div class="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-info">
                            <p class="label">Donation Causes</p>
                            <p class="value"><?php echo $total_donations; ?></p>
                        </div>
                        <div class="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-info">
                            <p class="label">Gallery Images</p>
                            <p class="value"><?php echo $total_gallery; ?></p>
                        </div>
                        <div class="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-info">
                            <p class="label">Testimonials</p>
                            <p class="value"><?php echo $total_testimonials; ?></p>
                        </div>
                        <div class="stat-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-info">
                            <p class="label">Total Members</p>
                            <p class="value"><?php echo $total_memberships; ?></p>
                        </div>
                        <div class="stat-icon" style="position:relative;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            <?php if ($pending_memberships > 0): ?>
                            <span style="position:absolute;top:-6px;right:-6px;background:var(--gold-color);color:var(--primary-color);font-size:0.55rem;font-weight:800;min-width:16px;height:16px;border-radius:9999px;display:flex;align-items:center;justify-content:center;"><?php echo $pending_memberships; ?></span>
                            <?php endif; ?>
                        </div>
                    </div>
                </div>

                <div class="table-card">
                    <div class="table-header-row">
                        <h3 class="table-title">Recent Enquiries</h3>
                        <a href="?tab=messages" class="btn btn-gold btn-sm">View All Messages</a>
                    </div>
                    <?php 
                    $recent_messages = $pdo->query("SELECT * FROM contacts ORDER BY submitted_at DESC LIMIT 5")->fetchAll();
                    if (empty($recent_messages)): 
                    ?>
                        <p style="text-align: center; color: var(--text-muted); padding: 2rem 0;">No messages received yet.</p>
                    <?php else: ?>
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($recent_messages as $msg): ?>
                                    <tr>
                                        <td><strong><?php echo htmlspecialchars($msg['name']); ?></strong></td>
                                        <td><?php echo htmlspecialchars($msg['email']); ?></td>
                                        <td><?php echo htmlspecialchars($msg['subject'] ?? 'General Enquiry'); ?></td>
                                        <td><?php echo date('d M Y, h:i A', strtotime($msg['submitted_at'])); ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <!-- MESSAGES TAB -->
            <?php if ($tab === 'messages'): ?>

                <!-- PENDING INBOX -->
                <div class="table-card" style="margin-bottom: 2rem;">
                    <div class="table-header-row">
                        <div>
                            <h3 class="table-title">Inbox — Pending</h3>
                            <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0.25rem;">New enquiries awaiting your action.</p>
                        </div>
                        <?php if ($total_messages > 0): ?>
                        <span style="background:var(--gold-color);color:var(--primary-color);font-size:0.7rem;font-weight:800;padding:0.3rem 0.9rem;border-radius:9999px;"><?php echo $total_messages; ?> Pending</span>
                        <?php endif; ?>
                    </div>
                    <?php if (empty($table_data)): ?>
                        <div style="text-align:center;padding:3rem 0;">
                            <svg style="width:48px;height:48px;color:var(--text-light);margin-bottom:1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            <p style="color:var(--text-muted); font-size:0.9rem;">No pending messages. You're all caught up!</p>
                        </div>
                    <?php else: ?>
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>Sender Details</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($table_data as $msg): ?>
                                    <tr>
                                        <td style="min-width:180px;">
                                            <strong><?php echo htmlspecialchars($msg['name']); ?></strong><br>
                                            <span style="font-size:0.75rem;color:var(--text-muted);"><?php echo htmlspecialchars($msg['email']); ?></span><br>
                                            <span style="font-size:0.75rem;color:var(--text-muted);"><?php echo htmlspecialchars($msg['phone'] ?? '—'); ?></span>
                                        </td>
                                        <td><strong><?php echo htmlspecialchars($msg['subject'] ?? 'General Enquiry'); ?></strong></td>
                                        <td>
                                            <div style="font-size:0.85rem;max-width:380px;line-height:1.5;">
                                                <?php echo nl2br(htmlspecialchars($msg['message'])); ?>
                                            </div>
                                            <span style="font-size:0.7rem;color:var(--text-light);display:block;margin-top:0.4rem;">
                                                Submitted: <?php echo date('d M Y, h:i A', strtotime($msg['submitted_at'])); ?>
                                            </span>
                                        </td>
                                        <td>
                                            <div style="display:flex;flex-direction:column;gap:0.5rem;min-width:100px;">
                                                <!-- APPROVE -->
                                                <form method="POST" style="margin:0;">
                                                    <input type="hidden" name="action" value="approve_message">
                                                    <input type="hidden" name="id" value="<?php echo $msg['id']; ?>">
                                                    <button type="submit" class="btn btn-sm" style="width:100%;background:var(--success-color);color:#fff;border-color:var(--success-color);">
                                                        <svg style="width:12px;height:12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                        Approve
                                                    </button>
                                                </form>
                                                <!-- IGNORE / DELETE -->
                                                <form method="POST" style="margin:0;" onsubmit="event.preventDefault(); showConfirmModal('Ignore and remove this message?', this);">
                                                    <input type="hidden" name="action" value="ignore_message">
                                                    <input type="hidden" name="id" value="<?php echo $msg['id']; ?>">
                                                    <button type="submit" class="btn btn-outline-danger btn-sm" style="width:100%;">
                                                        <svg style="width:12px;height:12px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                        Ignore
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    <?php endif; ?>
                </div>

                <!-- APPROVED ARCHIVE -->
                <?php if (!empty($approved_messages)): ?>
                <div class="table-card">
                    <div class="table-header-row">
                        <div>
                            <h3 class="table-title" style="color:var(--success-color);">Approved Messages</h3>
                            <p style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem;">Messages you have reviewed and approved.</p>
                        </div>
                    </div>
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Sender Details</th>
                                <th>Subject</th>
                                <th>Message</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($approved_messages as $msg): ?>
                                <tr style="opacity:0.75;">
                                    <td style="min-width:180px;">
                                        <strong><?php echo htmlspecialchars($msg['name']); ?></strong><br>
                                        <span style="font-size:0.75rem;color:var(--text-muted);"><?php echo htmlspecialchars($msg['email']); ?></span><br>
                                        <span style="font-size:0.75rem;color:var(--text-muted);"><?php echo htmlspecialchars($msg['phone'] ?? '—'); ?></span>
                                    </td>
                                    <td><?php echo htmlspecialchars($msg['subject'] ?? 'General Enquiry'); ?></td>
                                    <td>
                                        <div style="font-size:0.85rem;max-width:380px;line-height:1.5;">
                                            <?php echo nl2br(htmlspecialchars($msg['message'])); ?>
                                        </div>
                                        <span style="font-size:0.7rem;color:var(--text-light);display:block;margin-top:0.4rem;">
                                            Approved · <?php echo date('d M Y, h:i A', strtotime($msg['submitted_at'])); ?>
                                        </span>
                                    </td>
                                    <td>
                                        <form method="POST" onsubmit="event.preventDefault(); showConfirmModal('Delete this approved message?', this);">
                                            <input type="hidden" name="action" value="delete_message">
                                            <input type="hidden" name="id" value="<?php echo $msg['id']; ?>">
                                            <button type="submit" class="btn btn-outline-danger btn-sm">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
                <?php endif; ?>

            <?php endif; ?>

            <!-- DONATION CAUSES TAB -->
            <?php if ($tab === 'donations'): ?>
                <div class="table-card">
                    <div class="table-header-row">
                        <h3 class="table-title">Manage Causes & Goals</h3>
                    </div>
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Thumbnail</th>
                                <th>Title & Tag</th>
                                <th>Stats Value & Label</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($table_data as $row): ?>
                                <tr>
                                    <td>
                                        <img src="<?php echo htmlspecialchars(get_preview_url($row['image'])); ?>" class="image-preview" alt="">
                                    </td>
                                    <td>
                                        <strong><?php echo htmlspecialchars($row['title']); ?></strong><br>
                                        <span class="badge badge-tag"><?php echo htmlspecialchars($row['tag']); ?></span>
                                    </td>
                                    <td>
                                        <strong style="color:var(--gold-color); font-size:1.1rem;"><?php echo htmlspecialchars($row['stat']); ?></strong><br>
                                        <span style="font-size:0.75rem; color:var(--text-muted);"><?php echo htmlspecialchars($row['statLabel']); ?></span>
                                    </td>
                                    <td style="max-width:300px; font-size:0.8rem; color:var(--text-muted);">
                                        <?php echo htmlspecialchars($row['desc']); ?>
                                    </td>
                                    <td>
                                        <button class="btn btn-gold btn-sm" onclick="openEditDonationModal(<?php echo htmlspecialchars(json_encode($row)); ?>)">Edit Cause</button>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>

                <!-- Edit Donation Modal -->
                <div id="editDonationModal" class="modal">
                    <div class="modal-content">
                        <span class="close-modal" onclick="closeEditDonationModal()">&times;</span>
                        <h3 class="table-title" style="margin-bottom: 2rem;">Edit Donation Cause</h3>
                        <form method="POST" enctype="multipart/form-data">
                            <input type="hidden" name="action" value="edit_donation">
                            <input type="hidden" name="id" id="edit_don_id">
                            
                            <div class="form-grid">
                                <div class="form-element">
                                    <label class="form-label" for="edit_don_title">Title</label>
                                    <input class="form-input" type="text" name="title" id="edit_don_title" required>
                                </div>
                                <div class="form-element">
                                    <label class="form-label" for="edit_don_tag">Tag</label>
                                    <input class="form-input" type="text" name="tag" id="edit_don_tag" required>
                                </div>
                            </div>
                            
                            <div class="form-grid">
                                <div class="form-element">
                                    <label class="form-label" for="edit_don_stat">Stat Value (e.g. 500+)</label>
                                    <input class="form-input" type="text" name="stat" id="edit_don_stat" required>
                                </div>
                                <div class="form-element">
                                    <label class="form-label" for="edit_don_statLabel">Stat Label (e.g. Meals Served)</label>
                                    <input class="form-input" type="text" name="statLabel" id="edit_don_statLabel" required>
                                </div>
                            </div>

                            <div class="form-group" style="margin-bottom: 1.5rem;">
                                <label class="form-label" for="edit_don_image_file">Upload New Image (Optional)</label>
                                <input class="form-input" type="file" name="image_file" id="edit_don_image_file" accept="image/*" style="padding: 0.7rem 1.1rem;">
                                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.25rem;">Or edit image path/URL:</div>
                                <input class="form-input" type="text" name="image" id="edit_don_image">
                            </div>

                            <div class="form-group" style="margin-bottom: 1.5rem;">
                                <label class="form-label" for="edit_don_desc">Description</label>
                                <textarea class="form-textarea" name="desc" id="edit_don_desc" required></textarea>
                            </div>

                            <!-- Stylings tags to prevent broken styling on components -->
                            <input type="hidden" name="tagColor" id="edit_don_tagColor">
                            <input type="hidden" name="accentBorder" id="edit_don_accentBorder">

                            <button type="submit" class="btn btn-primary" style="width: 100%;">Save Changes</button>
                        </form>
                    </div>
                </div>

                <script>
                    function openEditDonationModal(data) {
                        document.getElementById('edit_don_id').value = data.id;
                        document.getElementById('edit_don_title').value = data.title;
                        document.getElementById('edit_don_tag').value = data.tag;
                        document.getElementById('edit_don_stat').value = data.stat;
                        document.getElementById('edit_don_statLabel').value = data.statLabel;
                        document.getElementById('edit_don_image').value = data.image;
                        document.getElementById('edit_don_desc').value = data.desc;
                        document.getElementById('edit_don_tagColor').value = data.tagColor;
                        document.getElementById('edit_don_accentBorder').value = data.accentBorder;
                        document.getElementById('editDonationModal').style.display = 'flex';
                    }
                    function closeEditDonationModal() {
                        document.getElementById('editDonationModal').style.display = 'none';
                    }
                </script>
            <?php endif; ?>

            <!-- GALLERY TAB -->
            <?php if ($tab === 'gallery'): ?>
                <div class="crud-form">
                    <h3 class="table-title" style="margin-bottom: 1.5rem;">Add New Gallery Image</h3>
                    <form method="POST" enctype="multipart/form-data">
                        <input type="hidden" name="action" value="add_gallery">
                        <div class="form-grid">
                            <div class="form-element" style="grid-column: span 2;">
                                <label class="form-label" for="new_gal_src_file">Upload Image</label>
                                <input class="form-input" type="file" name="src_file" id="new_gal_src_file" accept="image/*" style="padding: 0.7rem 1.1rem;">
                                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.25rem;">Or paste image path/URL below:</div>
                                <input class="form-input" type="text" name="src" id="new_gal_src" placeholder="e.g. src/assets/fwd/DSC gallery images/DSC_0123.JPG.jpeg">
                            </div>
                            <div class="form-element">
                                <label class="form-label" for="new_gal_span">Grid Layout Span</label>
                                <select class="form-select" name="span" id="new_gal_span">
                                    <option value="">Normal</option>
                                    <option value="row-span-2">Vertical Double Height (row-span-2)</option>
                                </select>
                            </div>
                            <div class="form-element">
                                <label class="form-label" for="new_gal_delay">Animation Delay (sec)</label>
                                <input class="form-input" type="number" name="delay" id="new_gal_delay" step="0.01" value="0.00" min="0">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-gold">Add to Gallery</button>
                    </form>
                </div>

                <div class="table-card">
                    <h3 class="table-title" style="margin-bottom: 1.5rem;">Existing Gallery Grid</h3>
                    <div class="gallery-grid">
                        <?php foreach ($table_data as $img): ?>
                            <div class="gallery-item-card">
                                <div>
                                    <?php $preview_src = get_preview_url($img['src']); ?>
                                    <img src="<?php echo htmlspecialchars($preview_src); ?>" class="gallery-item-img" alt="" onerror="this.src='https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=200&auto=format&fit=crop'">
                                </div>
                                <div class="gallery-item-body">
                                    <div class="gallery-item-meta">
                                        <div><strong>Span:</strong> <?php echo htmlspecialchars($img['span'] ? $img['span'] : 'Normal'); ?></div>
                                        <div><strong>Delay:</strong> <?php echo htmlspecialchars($img['delay']); ?>s</div>
                                    </div>
                                    <div style="font-size:0.7rem; color:var(--text-light); overflow:hidden; text-overflow:ellipsis; white-space:nowrap; margin-bottom:1rem;" title="<?php echo htmlspecialchars($img['src']); ?>">
                                        <?php echo htmlspecialchars($img['src']); ?>
                                    </div>
                                    <div class="gallery-item-actions">
                                        <button class="btn btn-gold btn-sm" style="flex:1;" onclick="openEditGalleryModal(<?php echo htmlspecialchars(json_encode($img)); ?>)">Edit</button>
                                        
                                        <form method="POST" style="flex:1;" onsubmit="event.preventDefault(); showConfirmModal('Delete this image?', this);">
                                            <input type="hidden" name="action" value="delete_gallery">
                                            <input type="hidden" name="id" value="<?php echo $img['id']; ?>">
                                            <button type="submit" class="btn btn-outline-danger btn-sm" style="width:100%;">Delete</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Edit Gallery Modal -->
                <div id="editGalleryModal" class="modal">
                    <div class="modal-content">
                        <span class="close-modal" onclick="closeEditGalleryModal()">&times;</span>
                        <h3 class="table-title" style="margin-bottom: 2rem;">Edit Gallery Image Details</h3>
                        <form method="POST" enctype="multipart/form-data">
                            <input type="hidden" name="action" value="edit_gallery">
                            <input type="hidden" name="id" id="edit_gal_id">
                            
                            <div class="form-group" style="margin-bottom: 1.5rem;">
                                <label class="form-label" for="edit_gal_src_file">Upload New Image (Optional)</label>
                                <input class="form-input" type="file" name="src_file" id="edit_gal_src_file" accept="image/*" style="padding: 0.7rem 1.1rem;">
                                <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 0.25rem;">Or edit URL/path:</div>
                                <input class="form-input" type="text" name="src" id="edit_gal_src">
                            </div>
                            
                            <div class="form-grid">
                                <div class="form-element">
                                    <label class="form-label" for="edit_gal_span">Grid Layout Span</label>
                                    <select class="form-select" name="span" id="edit_gal_span">
                                        <option value="">Normal</option>
                                        <option value="row-span-2">Vertical Double Height (row-span-2)</option>
                                    </select>
                                </div>
                                <div class="form-element">
                                    <label class="form-label" for="edit_gal_delay">Animation Delay (sec)</label>
                                    <input class="form-input" type="number" name="delay" id="edit_gal_delay" step="0.01" min="0" required>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary" style="width: 100%;">Save Gallery Image</button>
                        </form>
                    </div>
                </div>

                <script>
                    function openEditGalleryModal(data) {
                        document.getElementById('edit_gal_id').value = data.id;
                        document.getElementById('edit_gal_src').value = data.src;
                        document.getElementById('edit_gal_span').value = data.span;
                        document.getElementById('edit_gal_delay').value = data.delay;
                        document.getElementById('editGalleryModal').style.display = 'flex';
                    }
                    function closeEditGalleryModal() {
                        document.getElementById('editGalleryModal').style.display = 'none';
                    }
                </script>
            <?php endif; ?>

            <!-- TESTIMONIALS TAB -->
            <?php if ($tab === 'testimonials'): ?>
                <div class="crud-form">
                    <h3 class="table-title" style="margin-bottom: 1.5rem;">Add New Testimonial</h3>
                    <form method="POST">
                        <input type="hidden" name="action" value="add_testimonial">
                        <div class="form-grid">
                            <div class="form-element">
                                <label class="form-label" for="new_test_name">Name</label>
                                <input class="form-input" type="text" name="name" id="new_test_name" placeholder="e.g. Manonmani" required>
                            </div>
                            <div class="form-element">
                                <label class="form-label" for="new_test_role">Role / Location</label>
                                <input class="form-input" type="text" name="role" id="new_test_role" placeholder="e.g. Parent, Tirunelveli" required>
                            </div>
                        </div>
                        <div class="form-group" style="margin-bottom: 1.5rem;">
                            <label class="form-label" for="new_test_quote">Quote</label>
                            <textarea class="form-textarea" name="quote" id="new_test_quote" placeholder="Enter the testimonial quote..." required></textarea>
                        </div>
                        <button type="submit" class="btn btn-gold">Add Testimonial</button>
                    </form>
                </div>

                <div class="table-card">
                    <h3 class="table-title" style="margin-bottom: 1.5rem;">Manage Testimonials</h3>
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Name & Role</th>
                                <th>Quote</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($table_data as $row): ?>
                                <tr>
                                    <td style="min-width: 180px;">
                                        <strong><?php echo htmlspecialchars($row['name']); ?></strong><br>
                                        <span style="font-size:0.75rem; color:var(--text-muted);"><?php echo htmlspecialchars($row['role']); ?></span>
                                    </td>
                                    <td style="font-style: italic; color: var(--text-muted);">
                                        "<?php echo htmlspecialchars($row['quote']); ?>"
                                    </td>
                                    <td style="min-width:180px;">
                                        <div style="display:flex; gap:0.5rem;">
                                            <button class="btn btn-gold btn-sm" onclick="openEditTestimonialModal(<?php echo htmlspecialchars(json_encode($row)); ?>)">Edit</button>
                                            <form method="POST" onsubmit="event.preventDefault(); showConfirmModal('Delete this testimonial?', this);">
                                                <input type="hidden" name="action" value="delete_testimonial">
                                                <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                                                <button type="submit" class="btn btn-outline-danger btn-sm">Delete</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>

                <!-- Edit Testimonial Modal -->
                <div id="editTestimonialModal" class="modal">
                    <div class="modal-content">
                        <span class="close-modal" onclick="closeEditTestimonialModal()">&times;</span>
                        <h3 class="table-title" style="margin-bottom: 2rem;">Edit Testimonial</h3>
                        <form method="POST">
                            <input type="hidden" name="action" value="edit_testimonial">
                            <input type="hidden" name="id" id="edit_test_id">
                            
                            <div class="form-grid">
                                <div class="form-element">
                                    <label class="form-label" for="edit_test_name">Name</label>
                                    <input class="form-input" type="text" name="name" id="edit_test_name" required>
                                </div>
                                <div class="form-element">
                                    <label class="form-label" for="edit_test_role">Role / Location</label>
                                    <input class="form-input" type="text" name="role" id="edit_test_role" required>
                                </div>
                            </div>
                            
                            <div class="form-group" style="margin-bottom: 1.5rem;">
                                <label class="form-label" for="edit_test_quote">Quote</label>
                                <textarea class="form-textarea" name="quote" id="edit_test_quote" required></textarea>
                            </div>

                            <button type="submit" class="btn btn-primary" style="width: 100%;">Save Testimonial</button>
                        </form>
                    </div>
                </div>

                <script>
                    function openEditTestimonialModal(data) {
                        document.getElementById('edit_test_id').value = data.id;
                        document.getElementById('edit_test_name').value = data.name;
                        document.getElementById('edit_test_role').value = data.role;
                        document.getElementById('edit_test_quote').value = data.quote;
                        document.getElementById('editTestimonialModal').style.display = 'flex';
                    }
                    function closeEditTestimonialModal() {
                        document.getElementById('editTestimonialModal').style.display = 'none';
                    }
                </script>
            <?php endif; ?>

            <!-- AWARDS TAB -->
            <?php if ($tab === 'awards'): ?>
                <div class="crud-form">
                    <h3 class="table-title" style="margin-bottom: 1.5rem;">Add New Award</h3>
                    <form method="POST">
                        <input type="hidden" name="action" value="add_award">
                        <div class="form-grid">
                            <div class="form-element">
                                <label class="form-label" for="new_aw_title">Award Title</label>
                                <input class="form-input" type="text" name="title" id="new_aw_title" placeholder="e.g. Excellence in Social Service" required>
                            </div>
                            <div class="form-element">
                                <label class="form-label" for="new_aw_from">Awarding Authority</label>
                                <input class="form-input" type="text" name="from_org" id="new_aw_from" placeholder="e.g. Government Authority" required>
                            </div>
                            <div class="form-element">
                                <label class="form-label" for="new_aw_year">Year</label>
                                <input class="form-input" type="text" name="year" id="new_aw_year" placeholder="e.g. 2023" required>
                            </div>
                            <div class="form-element">
                                <label class="form-label" for="new_aw_icon">Icon Representative</label>
                                <select class="form-select" name="icon" id="new_aw_icon">
                                    <option value="Trophy">Trophy</option>
                                    <option value="Medal">Medal</option>
                                    <option value="Star">Star</option>
                                    <option value="Award">Award Badge</option>
                                    <option value="BadgeCheck">Checked Badge</option>
                                    <option value="Ribbon">Ribbon</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-gold">Add Award</button>
                    </form>
                </div>

                <div class="table-card">
                    <h3 class="table-title" style="margin-bottom: 1.5rem;">Manage Awards</h3>
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Icon</th>
                                <th>Year</th>
                                <th>Award Details</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($table_data as $row): ?>
                                <tr>
                                    <td>
                                        <div class="stat-icon" style="width: 40px; height: 40px; border-radius: 10px;">
                                            <!-- Simple representative display based on selection -->
                                            <?php if ($row['icon'] === 'Trophy'): ?>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34M12 2a7 7 0 0 0-7 7c0 2.5 2 4.5 4.5 4.5h5A4.5 4.5 0 0 0 19 9a7 7 0 0 0-7-7z"></path></svg>
                                            <?php elseif ($row['icon'] === 'Medal'): ?>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                                            <?php else: ?>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px;height:18px;"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
                                            <?php endif; ?>
                                        </div>
                                    </td>
                                    <td>
                                        <strong style="font-size:1.1rem;"><?php echo htmlspecialchars($row['year']); ?></strong>
                                    </td>
                                    <td>
                                        <strong><?php echo htmlspecialchars($row['title']); ?></strong><br>
                                        <span style="font-size:0.75rem; color:var(--text-muted);">From: <?php echo htmlspecialchars($row['from_org']); ?></span>
                                    </td>
                                    <td>
                                        <div style="display:flex; gap:0.5rem;">
                                            <button class="btn btn-gold btn-sm" onclick="openEditAwardModal(<?php echo htmlspecialchars(json_encode($row)); ?>)">Edit</button>
                                            <form method="POST" onsubmit="event.preventDefault(); showConfirmModal('Delete this award?', this);">
                                                <input type="hidden" name="action" value="delete_award">
                                                <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                                                <button type="submit" class="btn btn-outline-danger btn-sm">Delete</button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>

                <!-- Edit Award Modal -->
                <div id="editAwardModal" class="modal">
                    <div class="modal-content">
                        <span class="close-modal" onclick="closeEditAwardModal()">&times;</span>
                        <h3 class="table-title" style="margin-bottom: 2rem;">Edit Award Details</h3>
                        <form method="POST">
                            <input type="hidden" name="action" value="edit_award">
                            <input type="hidden" name="id" id="edit_aw_id">
                            
                            <div class="form-grid">
                                <div class="form-element">
                                    <label class="form-label" for="edit_aw_title">Award Title</label>
                                    <input class="form-input" type="text" name="title" id="edit_aw_title" required>
                                </div>
                                <div class="form-element">
                                    <label class="form-label" for="edit_aw_from">Awarding Authority</label>
                                    <input class="form-input" type="text" name="from_org" id="edit_aw_from" required>
                                </div>
                            </div>

                            <div class="form-grid">
                                <div class="form-element">
                                    <label class="form-label" for="edit_aw_year">Year</label>
                                    <input class="form-input" type="text" name="year" id="edit_aw_year" required>
                                </div>
                                <div class="form-element">
                                    <label class="form-label" for="edit_aw_icon">Icon Representative</label>
                                    <select class="form-select" name="icon" id="edit_aw_icon" required>
                                        <option value="Trophy">Trophy</option>
                                        <option value="Medal">Medal</option>
                                        <option value="Star">Star</option>
                                        <option value="Award">Award Badge</option>
                                        <option value="BadgeCheck">Checked Badge</option>
                                        <option value="Ribbon">Ribbon</option>
                                    </select>
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary" style="width: 100%;">Save Award</button>
                        </form>
                    </div>
                </div>

                <script>
                    function openEditAwardModal(data) {
                        document.getElementById('edit_aw_id').value = data.id;
                        document.getElementById('edit_aw_title').value = data.title;
                        document.getElementById('edit_aw_from').value = data.from_org;
                        document.getElementById('edit_aw_year').value = data.year;
                        document.getElementById('edit_aw_icon').value = data.icon;
                        document.getElementById('editAwardModal').style.display = 'flex';
                    }
                    function closeEditAwardModal() {
                        document.getElementById('editAwardModal').style.display = 'none';
                    }
                </script>
            <?php endif; ?>

            <!-- MEMBERSHIPS TAB -->
            <?php if ($tab === 'memberships'):
                $status_filter = $_GET['status'] ?? 'all';
            ?>
                <!-- Status filter bar -->
                <div style="display:flex;gap:0.75rem;margin-bottom:2rem;flex-wrap:wrap;">
                    <?php
                    $filters = ['all'=>'All Members','pending'=>'Pending','approved'=>'Approved','rejected'=>'Rejected'];
                    foreach ($filters as $key => $label):
                        $cnt = match($key) {
                            'all'      => $total_memberships,
                            'pending'  => $pdo->query("SELECT COUNT(*) FROM memberships WHERE status='pending'")->fetchColumn(),
                            'approved' => $pdo->query("SELECT COUNT(*) FROM memberships WHERE status='approved'")->fetchColumn(),
                            'rejected' => $pdo->query("SELECT COUNT(*) FROM memberships WHERE status='rejected'")->fetchColumn(),
                        };
                        $isActive = $status_filter === $key;
                    ?>
                    <a href="?tab=memberships&status=<?php echo $key; ?>"
                       style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.6rem 1.2rem;border-radius:9999px;font-size:0.75rem;font-weight:700;text-decoration:none;border:1px solid <?php echo $isActive ? 'var(--gold-color)' : 'var(--border-color)'; ?>;background:<?php echo $isActive ? 'var(--gold-color)' : '#fff'; ?>;color:<?php echo $isActive ? 'var(--primary-color)' : 'var(--text-muted)'; ?>;">
                        <?php echo $label; ?>
                        <span style="background:<?php echo $isActive ? 'var(--primary-color)' : 'var(--gold-light)'; ?>;color:<?php echo $isActive ? '#fff' : 'var(--gold-color)'; ?>;border-radius:9999px;padding:0.1rem 0.5rem;font-size:0.65rem;"><?php echo $cnt; ?></span>
                    </a>
                    <?php endforeach; ?>
                </div>

                <div class="table-card">
                    <div class="table-header-row">
                        <div>
                            <h3 class="table-title">Volunteer Memberships</h3>
                            <p style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem;">
                                <?php echo count($table_data); ?> records · showing <strong><?php echo ucfirst($status_filter); ?></strong>
                            </p>
                        </div>
                    </div>

                    <?php if (empty($table_data)): ?>
                        <div style="text-align:center;padding:3rem 0;">
                            <svg style="width:48px;height:48px;color:var(--text-light);margin-bottom:1rem;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
                            <p style="color:var(--text-muted);font-size:0.9rem;">No membership records found.</p>
                        </div>
                    <?php else: ?>
                    <div style="overflow-x:auto;">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Photo</th>
                                <th>Member ID</th>
                                <th>Full Name</th>
                                <th>Contact</th>
                                <th>Age / District</th>
                                <th>Role</th>
                                <th>Applied</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($table_data as $m): ?>
                            <tr>
                                <td>
                                    <?php if ($m['photo']): ?>
                                        <img src="../public<?php echo htmlspecialchars($m['photo']); ?>"
                                             alt="" style="width:48px;height:48px;object-fit:cover;border-radius:50%;border:2px solid var(--gold-color);" />
                                    <?php else: ?>
                                        <div style="width:48px;height:48px;border-radius:50%;background:var(--gold-light);display:flex;align-items:center;justify-content:center;font-family:'Playfair Display',serif;font-size:1.2rem;color:var(--gold-color);font-weight:700;border:2px solid var(--gold-color);">
                                            <?php echo htmlspecialchars(mb_substr($m['full_name'], 0, 1)); ?>
                                        </div>
                                    <?php endif; ?>
                                </td>
                                <td><code style="font-size:0.75rem;background:var(--gold-light);padding:0.2rem 0.5rem;border-radius:6px;color:var(--gold-color);font-weight:700;"><?php echo htmlspecialchars($m['member_id']); ?></code></td>
                                <td><strong><?php echo htmlspecialchars($m['full_name']); ?></strong></td>
                                <td>
                                    <span style="font-size:0.82rem;"><?php echo htmlspecialchars($m['phone']); ?></span><br>
                                    <?php if ($m['email']): ?><span style="font-size:0.75rem;color:var(--text-muted);"><?php echo htmlspecialchars($m['email']); ?></span><?php endif; ?>
                                </td>
                                <td>
                                    <span style="font-size:0.82rem;"><?php echo htmlspecialchars($m['age']); ?> yrs</span><br>
                                    <span style="font-size:0.75rem;color:var(--text-muted);"><?php echo htmlspecialchars($m['district']); ?></span>
                                </td>
                                <td><span class="badge badge-tag"><?php echo htmlspecialchars($m['role']); ?></span></td>
                                <td style="font-size:0.78rem;color:var(--text-muted);"><?php echo date('d M Y', strtotime($m['applied_at'])); ?></td>
                                <td>
                                    <?php
                                    $statusColors = ['pending'=>'#f59e0b','approved'=>'#10b981','rejected'=>'#ef4444'];
                                    $sc = $statusColors[$m['status']] ?? '#999';
                                    ?>
                                    <span style="display:inline-flex;align-items:center;gap:0.4rem;padding:0.3rem 0.8rem;border-radius:9999px;background:<?php echo $sc; ?>20;color:<?php echo $sc; ?>;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">
                                        <span style="width:6px;height:6px;border-radius:50%;background:<?php echo $sc; ?>;"></span>
                                        <?php echo htmlspecialchars($m['status']); ?>
                                    </span>
                                </td>
                                <td>
                                    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
                                        <?php if ($m['status'] === 'pending'): ?>
                                        <form method="POST" style="display:inline;" onsubmit="event.preventDefault(); showConfirmModal('Approve this membership?', this);">
                                            <input type="hidden" name="action" value="approve_membership">
                                            <input type="hidden" name="id" value="<?php echo $m['id']; ?>">
                                            <button type="submit" class="btn btn-sm" style="background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;">✓ Approve</button>
                                        </form>
                                        <form method="POST" style="display:inline;" onsubmit="event.preventDefault(); showConfirmModal('Reject this membership?', this);">
                                            <input type="hidden" name="action" value="reject_membership">
                                            <input type="hidden" name="id" value="<?php echo $m['id']; ?>">
                                            <button type="submit" class="btn btn-sm btn-outline-danger">✗ Reject</button>
                                        </form>
                                        <?php elseif ($m['status'] === 'approved'): ?>
                                        <form method="POST" style="display:inline;" onsubmit="event.preventDefault(); showConfirmModal('Revoke this membership?', this);">
                                            <input type="hidden" name="action" value="reject_membership">
                                            <input type="hidden" name="id" value="<?php echo $m['id']; ?>">
                                            <button type="submit" class="btn btn-sm btn-outline-danger">Revoke</button>
                                        </form>
                                        <?php elseif ($m['status'] === 'rejected'): ?>
                                        <form method="POST" style="display:inline;" onsubmit="event.preventDefault(); showConfirmModal('Re-approve this membership?', this);">
                                            <input type="hidden" name="action" value="approve_membership">
                                            <input type="hidden" name="id" value="<?php echo $m['id']; ?>">
                                            <button type="submit" class="btn btn-sm" style="background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;">Re-approve</button>
                                        </form>
                                        <?php endif; ?>
                                        <form method="POST" style="display:inline;" onsubmit="event.preventDefault(); showConfirmModal('Permanently delete this record?', this);">
                                            <input type="hidden" name="action" value="delete_membership">
                                            <input type="hidden" name="id" value="<?php echo $m['id']; ?>">
                                            <button type="submit" class="btn btn-sm btn-outline-danger">Delete</button>
                                        </form>
                                        <?php if ($m['motivation']): ?>
                                        <button class="btn btn-sm" style="background:var(--gold-light);color:var(--gold-color);border:1px solid var(--gold-color);"
                                            onclick="document.getElementById('motiv_<?php echo $m['id']; ?>').style.display = document.getElementById('motiv_<?php echo $m['id']; ?>').style.display === 'none' ? 'table-row' : 'none'">
                                            Note
                                        </button>
                                        <?php endif; ?>
                                    </div>
                                </td>
                            </tr>
                            <?php if ($m['motivation']): ?>
                            <tr id="motiv_<?php echo $m['id']; ?>" style="display:none;">
                                <td colspan="9" style="background:#fffbeb;padding:1rem 1.5rem;font-size:0.85rem;color:var(--text-muted);font-style:italic;">
                                    <strong style="color:var(--gold-color);">Motivation:</strong> <?php echo nl2br(htmlspecialchars($m['motivation'])); ?>
                                </td>
                            </tr>
                            <?php endif; ?>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                    </div>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
    </div>

    <!-- Custom Confirmation Modal -->
    <div id="confirmModal" class="modal" style="display:none; align-items:center; justify-content:center; background:rgba(0,0,0,0.4); backdrop-filter:blur(5px); z-index:9999; position:fixed; top:0; left:0; right:0; bottom:0;">
        <div class="modal-content" style="max-width:380px; text-align:center; padding:2rem; border-radius:20px; border:1px solid #f0ebe0; background:#fff; box-shadow:0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);">
            <div style="width:54px; height:54px; border-radius:50%; background:#fef3c7; display:flex; align-items:center; justify-content:center; margin:0 auto 1.2rem; border:1px solid #fde68a;">
                <svg style="width:26px; height:26px; color:#d97706;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                </svg>
            </div>
            <h3 style="font-family:'Playfair Display',serif; font-size:1.35rem; color:#1e293b; margin-bottom:0.6rem; font-weight:700;">Confirm Action</h3>
            <p style="color:#64748b; font-size:0.85rem; margin-bottom:1.8rem; line-height:1.5;" id="confirmMessage">Are you sure you want to proceed?</p>
            <div style="display:flex; gap:0.75rem; justify-content:center;">
                <button id="confirmCancelBtn" class="btn btn-outline-danger" style="flex:1; padding:0.6rem 1rem; font-size:0.8rem; font-weight:700; border-radius:10px;" type="button">Cancel</button>
                <button id="confirmOkBtn" class="btn" style="flex:1; background:var(--gold-color); color:var(--primary-color); border:1px solid var(--gold-color); padding:0.6rem 1rem; font-size:0.8rem; font-weight:700; border-radius:10px;" type="button">Confirm</button>
            </div>
        </div>
    </div>

    <!-- General close modals on click outside -->
    <script>
        let activeFormToSubmit = null;

        function showConfirmModal(message, formElement) {
            activeFormToSubmit = formElement;
            document.getElementById('confirmMessage').innerText = message;
            document.getElementById('confirmModal').style.display = 'flex';
        }

        document.getElementById('confirmCancelBtn').onclick = function() {
            document.getElementById('confirmModal').style.display = 'none';
            activeFormToSubmit = null;
        };

        document.getElementById('confirmOkBtn').onclick = function() {
            if (activeFormToSubmit) {
                activeFormToSubmit.submit();
            }
            document.getElementById('confirmModal').style.display = 'none';
        };

        window.onclick = function(event) {
            var donationModal = document.getElementById('editDonationModal');
            var galleryModal = document.getElementById('editGalleryModal');
            var testimonialModal = document.getElementById('editTestimonialModal');
            var awardModal = document.getElementById('editAwardModal');
            var confirmModal = document.getElementById('confirmModal');
            
            if (event.target == donationModal) {
                donationModal.style.display = "none";
            }
            if (event.target == galleryModal) {
                galleryModal.style.display = "none";
            }
            if (event.target == testimonialModal) {
                testimonialModal.style.display = "none";
            }
            if (event.target == awardModal) {
                awardModal.style.display = "none";
            }
            if (event.target == confirmModal) {
                confirmModal.style.display = "none";
                activeFormToSubmit = null;
            }
        }
    </script>
</body>
</html>
