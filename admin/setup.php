<?php
// setup.php — Run this ONCE to initialize the database and seed data.
// After setup is complete, delete or rename this file for security.

$host = 'localhost';
$user = 'root';
$pass = ''; // Default XAMPP/live server password — change if needed
$dbname = 'Iraithuligal';

$messages = [];
$error = null;
$success = false;

try {
    // Connect without selecting a database first
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    // Create database
    $pdo->exec("CREATE DATABASE IF NOT EXISTS `$dbname` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    $messages[] = "✅ Database <strong>$dbname</strong> created (or already exists).";

    // Switch to that database
    $pdo->exec("USE `$dbname`");

    // --- Create Tables ---
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `admin_users` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `username` VARCHAR(50) NOT NULL UNIQUE,
            `password` VARCHAR(255) NOT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    $messages[] = "✅ Table <strong>admin_users</strong> ready.";

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `donation_categories` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `title` VARCHAR(100) NOT NULL,
            `desc` TEXT NOT NULL,
            `image` VARCHAR(255) NOT NULL,
            `tag` VARCHAR(50) NOT NULL,
            `tagColor` VARCHAR(50) NOT NULL,
            `accentBorder` VARCHAR(50) NOT NULL,
            `stat` VARCHAR(50) NOT NULL,
            `statLabel` VARCHAR(100) NOT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    $messages[] = "✅ Table <strong>donation_categories</strong> ready.";

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `awards` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `icon` VARCHAR(50) NOT NULL,
            `from_org` VARCHAR(150) NOT NULL,
            `title` VARCHAR(150) NOT NULL,
            `year` VARCHAR(10) NOT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    $messages[] = "✅ Table <strong>awards</strong> ready.";

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `testimonials` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `quote` TEXT NOT NULL,
            `name` VARCHAR(100) NOT NULL,
            `role` VARCHAR(100) NOT NULL,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    $messages[] = "✅ Table <strong>testimonials</strong> ready.";

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `gallery_images` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `src` VARCHAR(255) NOT NULL,
            `span` VARCHAR(50) DEFAULT '',
            `delay` DECIMAL(4,2) DEFAULT 0.00,
            `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    $messages[] = "✅ Table <strong>gallery_images</strong> ready.";

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `contacts` (
            `id` INT AUTO_INCREMENT PRIMARY KEY,
            `name` VARCHAR(100) NOT NULL,
            `email` VARCHAR(100) NOT NULL,
            `phone` VARCHAR(20) DEFAULT NULL,
            `subject` VARCHAR(150) DEFAULT NULL,
            `message` TEXT NOT NULL,
            `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            `approved` TINYINT(1) DEFAULT 0
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    $messages[] = "✅ Table <strong>contacts</strong> ready.";

    $pdo->exec("
        CREATE TABLE IF NOT EXISTS `memberships` (
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
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    ");
    $messages[] = "✅ Table <strong>memberships</strong> ready.";

    // --- Seed Data (safe re-runs using INSERT IGNORE / ON DUPLICATE KEY) ---

    // Admin user (password: Iraithuligal@2024)
    $pdo->exec("
        INSERT INTO `admin_users` (`username`, `password`) VALUES
        ('iraithuligal', '\$2y\$10\$s80LCtorbJyGLr3yJjmi1usI13.kHv31dIBLQ4H77IlAW7biPEfPe')
        ON DUPLICATE KEY UPDATE `password` = VALUES(`password`)
    ");
    $messages[] = "✅ Admin user <strong>iraithuligal</strong> seeded.";

    // Donation categories — only insert if empty
    $count = $pdo->query("SELECT COUNT(*) FROM `donation_categories`")->fetchColumn();
    if ($count == 0) {
        $pdo->exec("
            INSERT INTO `donation_categories` (`title`, `desc`, `image`, `tag`, `tagColor`, `accentBorder`, `stat`, `statLabel`) VALUES
            ('Food Support', 'Help provide nutritious meals and basic needs for families in need.', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=900&auto=format&fit=crop', 'Nutrition', 'bg-amber-500', 'hover:ring-amber-400', '500+', 'Meals Served'),
            ('Education Support', 'Support children''s education and open doors to better opportunities.', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=900&auto=format&fit=crop', 'Education', 'bg-sky-500', 'hover:ring-sky-400', '300+', 'Children Supported'),
            ('Healthcare Support', 'Provide essential medical care to underserved and remote communities.', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=900&auto=format&fit=crop', 'Healthcare', 'bg-rose-500', 'hover:ring-rose-400', '1,200+', 'Lives Treated'),
            ('Emergency Relief', 'Help communities recover quickly during difficult crisis situations.', 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=900&auto=format&fit=crop', 'Relief', 'bg-emerald-500', 'hover:ring-emerald-400', '50+', 'Relief Camps')
        ");
        $messages[] = "✅ Donation categories seeded.";
    } else {
        $messages[] = "ℹ️ Donation categories already exist — skipped.";
    }

    // Awards — only insert if empty
    $count = $pdo->query("SELECT COUNT(*) FROM `awards`")->fetchColumn();
    if ($count == 0) {
        $pdo->exec("
            INSERT INTO `awards` (`icon`, `from_org`, `title`, `year`) VALUES
            ('Trophy', 'Government Authority', 'Excellence in Social Service', '2023'),
            ('Medal', 'District Administration', 'Outstanding Humanitarian Initiative', '2022'),
            ('Star', 'Community Leaders', 'Blood Donation Champion Award', '2022'),
            ('Award', 'State NGO Council', 'Best Volunteer Organisation', '2023'),
            ('BadgeCheck', 'Health Department', 'Lifesaving Service Recognition', '2024'),
            ('Ribbon', 'Civil Society Forum', '5 Years of Dedicated Service', '2026')
        ");
        $messages[] = "✅ Awards seeded.";
    } else {
        $messages[] = "ℹ️ Awards already exist — skipped.";
    }

    // Testimonials — only insert if empty
    $count = $pdo->query("SELECT COUNT(*) FROM `testimonials`")->fetchColumn();
    if ($count == 0) {
        $pdo->exec("
            INSERT INTO `testimonials` (`quote`, `name`, `role`) VALUES
            ('I never imagined that strangers could care this much about my son''s life. They truly gave him a second chance.', 'Manonmani', 'Parent, Tirunelveli'),
            ('The school built in our village changed everything. My daughter now dreams of becoming a doctor and serving our people.', 'Muthuramalingam', 'Farmer, Madurai'),
            ('When the floods took everything, they were the first ones on the ground. Not with promises, but with real action.', 'Arulmozhi', 'Fisherman, Cuddalore')
        ");
        $messages[] = "✅ Testimonials seeded.";
    } else {
        $messages[] = "ℹ️ Testimonials already exist — skipped.";
    }

    // Gallery images — only insert if empty
    $count = $pdo->query("SELECT COUNT(*) FROM `gallery_images`")->fetchColumn();
    if ($count == 0) {
        $pdo->exec("
            INSERT INTO `gallery_images` (`src`, `span`, `delay`) VALUES
            ('src/assets/fwd/DSC gallery images/DSC_0123.JPG.jpeg', 'row-span-2', 0.00),
            ('src/assets/fwd/DSC gallery images/DSC_0129.JPG.jpeg', '', 0.08),
            ('src/assets/fwd/DSC gallery images/DSC_0141.JPG.jpeg', '', 0.12),
            ('src/assets/fwd/DSC gallery images/DSC_0190.JPG.jpeg', 'row-span-2', 0.06),
            ('src/assets/fwd/DSC gallery images/IMG_20250929_233351.jpg.jpeg', '', 0.16),
            ('src/assets/fwd/DSC gallery images/IMG_20250929_233504.jpg.jpeg', '', 0.20),
            ('src/assets/fwd/DSC gallery images/IMG_20250929_233629.jpg.jpeg', '', 0.14),
            ('src/assets/fwd/DSC gallery images/IMG_20250929_233642.jpg.jpeg', '', 0.18),
            ('src/assets/fwd/DSC gallery images/IMG_20250929_233803.jpg.jpeg', '', 0.22),
            ('src/assets/gallery image/IMG_20260326_124213.jpg - Copy.jpeg', 'row-span-2', 0.10),
            ('src/assets/gallery image/IMG_20260326_124227.jpg.jpeg', '', 0.24),
            ('src/assets/gallery image/IMG_20260326_124237.jpg.jpeg', '', 0.26),
            ('src/assets/gallery image/IMG_20260326_124248.jpg.jpeg', '', 0.28)
        ");
        $messages[] = "✅ Gallery images seeded.";
    } else {
        $messages[] = "ℹ️ Gallery images already exist — skipped.";
    }

    $success = true;

} catch (PDOException $e) {
    $error = $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Setup — Iraithuligal</title>
    <style>
        body { font-family: sans-serif; max-width: 640px; margin: 60px auto; padding: 0 20px; background: #faf8f5; color: #12161a; }
        h1 { font-size: 1.4rem; margin-bottom: 1.5rem; }
        .msg { padding: 0.6rem 1rem; border-radius: 8px; margin-bottom: 0.5rem; background: #f0fdf4; border: 1px solid #bbf7d0; font-size: 0.9rem; }
        .error { background: #fff5f5; border-color: #fecaca; color: #dc2626; padding: 1rem; border-radius: 8px; }
        .success-box { background: #f0fdf4; border: 1px solid #86efac; border-radius: 12px; padding: 1.2rem 1.5rem; margin-top: 1.5rem; }
        .btn { display: inline-block; margin-top: 1.5rem; padding: 0.8rem 1.5rem; background: #cc9933; color: #fff; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
        .warn { background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 1rem; margin-top: 1.5rem; font-size: 0.85rem; color: #92400e; }
    </style>
</head>
<body>
    <h1>🛠️ Database Setup — Iraithuligal</h1>

    <?php if ($error): ?>
        <div class="error">
            <strong>Error:</strong> <?php echo htmlspecialchars($error); ?>
            <p style="margin-top:0.75rem; font-size:0.85rem;">
                Check that MySQL is running and the credentials in <code>db.php</code> are correct for your live server.<br>
                On shared hosting, the database user and host may differ — update <code>$host</code>, <code>$user</code>, and <code>$pass</code> at the top of this file.
            </p>
        </div>
    <?php else: ?>
        <?php foreach ($messages as $msg): ?>
            <div class="msg"><?php echo $msg; ?></div>
        <?php endforeach; ?>

        <?php if ($success): ?>
            <div class="success-box">
                <strong>Setup complete!</strong> Your database and all tables are ready.<br>
                <small>Admin username: <strong>iraithuligal</strong></small>
            </div>
            <a href="login.php" class="btn">→ Go to Admin Login</a>
            <div class="warn">
                ⚠️ <strong>Security reminder:</strong> Delete or rename <code>setup.php</code> after logging in successfully to prevent it from being run again by anyone.
            </div>
        <?php endif; ?>
    <?php endif; ?>
</body>
</html>
