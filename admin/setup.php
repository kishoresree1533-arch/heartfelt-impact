<?php
// setup.php
// Setup script to initialize the Iraithuligal database and create default admin credentials.

$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'Iraithuligal';

$output = [];
$success = true;

try {
    // 1. Connect to MySQL server without database first
    $pdo_init = new PDO("mysql:host=$host;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    
    $output[] = "Connected to MySQL server successfully.";
    
    // 2. Read setup.sql file
    if (!file_exists(__DIR__ . '/setup.sql')) {
        throw new Exception("setup.sql file not found in " . __DIR__);
    }
    
    $sql = file_get_contents(__DIR__ . '/setup.sql');
    
    // 3. Execute setup.sql
    $pdo_init->exec($sql);
    $output[] = "Database schema and seed data executed successfully.";
    
    // 4. Connect to the newly created database
    $pdo_db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    
    // 5. Check and insert/update default admin user
    $username = 'iraithuligal';
    $password = 'iraithuligal@123';
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    
    // Check if the user already exists
    $stmt = $pdo_db->prepare("SELECT id FROM admin_users WHERE username = ?");
    $stmt->execute([$username]);
    $user_exists = $stmt->fetch();
    
    if ($user_exists) {
        // Update password just in case to verify it matches
        $update_stmt = $pdo_db->prepare("UPDATE admin_users SET password = ? WHERE username = ?");
        $update_stmt->execute([$hashed_password, $username]);
        $output[] = "Default admin user 'iraithuligal' credentials updated/verified.";
    } else {
        // Insert new user
        $insert_stmt = $pdo_db->prepare("INSERT INTO admin_users (username, password) VALUES (?, ?)");
        $insert_stmt->execute([$username, $hashed_password]);
        $output[] = "Default admin user 'iraithuligal' created successfully.";
    }
    
} catch (Exception $e) {
    $success = false;
    $output[] = "Error during setup: " . $e->getMessage();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Setup — Iraithuligal</title>
    <!-- Premium Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #faf8f5;
            --primary-color: #12161a;
            --gold-color: #cc9933;
            --gold-light: #f5eedc;
            --border-color: #e5e0d8;
            --text-muted: #535d66;
            --success-color: #10b981;
            --error-color: #ef4444;
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
            align-items: center;
            justify-content: center;
            padding: 2rem;
            line-height: 1.5;
        }

        .card {
            background-color: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 24px;
            width: 100%;
            max-width: 550px;
            padding: 3rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.03);
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, var(--gold-color), #eed5a1, var(--gold-color));
        }

        h1 {
            font-family: 'Playfair Display', serif;
            font-weight: 500;
            font-size: 2.25rem;
            margin-bottom: 1rem;
            color: var(--primary-color);
        }

        h1 span {
            font-style: italic;
            color: var(--gold-color);
        }

        .subtitle {
            font-size: 0.95rem;
            color: var(--text-muted);
            margin-bottom: 2.5rem;
        }

        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1.5rem;
            border-radius: 9999px;
            font-size: 0.85rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            margin-bottom: 2rem;
        }

        .status-badge.success {
            background-color: #ecfdf5;
            color: var(--success-color);
            border: 1px solid rgba(16, 185, 129, 0.2);
        }

        .status-badge.error {
            background-color: #fef2f2;
            color: var(--error-color);
            border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .log-box {
            text-align: left;
            background-color: #fcfbfa;
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 1.5rem;
            font-family: monospace;
            font-size: 0.85rem;
            margin-bottom: 2.5rem;
            max-height: 200px;
            overflow-y: auto;
        }

        .log-item {
            margin-bottom: 0.5rem;
            display: flex;
            align-items: flex-start;
            gap: 0.5rem;
        }

        .log-item::before {
            content: '→';
            color: var(--gold-color);
            font-weight: bold;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: var(--gold-color);
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 700;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            padding: 1.25rem 2.5rem;
            border-radius: 12px;
            transition: all 0.3s ease;
            width: 100%;
            border: 1px solid var(--gold-color);
            cursor: pointer;
        }

        .btn:hover {
            background-color: var(--primary-color);
            color: #ffffff;
            border-color: var(--primary-color);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .credits {
            margin-top: 2rem;
            font-size: 0.75rem;
            color: var(--text-muted);
            letter-spacing: 0.05em;
            text-transform: uppercase;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>Database <span>Setup</span></h1>
        <p class="subtitle">Setting up the environment for Heartfelt Impact Admin Panel</p>

        <?php if ($success): ?>
            <div class="status-badge success">Setup Successful</div>
        <?php else: ?>
            <div class="status-badge error">Setup Failed</div>
        <?php endif; ?>

        <div class="log-box">
            <?php foreach ($output as $line): ?>
                <div class="log-item"><?php echo htmlspecialchars($line); ?></div>
            <?php endforeach; ?>
        </div>

        <?php if ($success): ?>
            <a href="index.php" class="btn">Proceed to Login</a>
        <?php else: ?>
            <button onclick="window.location.reload();" class="btn">Retry Setup</button>
        <?php endif; ?>

        <div class="credits">Iraithuligal Iyakkam</div>
    </div>
</body>
</html>
