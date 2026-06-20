<?php
// login.php
// Premium Admin Login Page

session_start();
require_once __DIR__ . '/db.php';

$error = '';
$db_not_setup = false;

// If $pdo is null, database hasn't been set up yet
if ($pdo === null) {
    $db_not_setup = true;
}

// Redirect if already logged in
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: dashboard.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($db_not_setup) {
        $error = 'Database is not configured. Please run setup first.';
    } else {
        $username = trim($_POST['username'] ?? '');
        $password = trim($_POST['password'] ?? '');

        if (empty($username) || empty($password)) {
            $error = 'Please fill in all fields.';
        } else {
            try {
                $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ?");
                $stmt->execute([$username]);
                $admin = $stmt->fetch();

                if ($admin && password_verify($password, $admin['password'])) {
                    // Password matches, log user in
                    $_SESSION['admin_logged_in'] = true;
                    $_SESSION['admin_username'] = $admin['username'];
                    session_regenerate_id(true);
                    header('Location: dashboard.php');
                    exit;
                } else {
                    $error = 'Invalid username or password.';
                }
            } catch (PDOException $e) {
                $error = 'Database connection error: ' . $e->getMessage();
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Portal — Iraithuligal Iyakkam</title>
    <!-- Google Fonts -->
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
            --card-bg: rgba(255, 255, 255, 0.85);
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
            padding: 1.5rem;
            position: relative;
            overflow: hidden;
        }

        /* Ambient Blobs in Background */
        .ambient-blob-1 {
            position: absolute;
            top: -10%;
            right: -10%;
            width: 50vw;
            height: 50vw;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(204, 153, 51, 0.08) 0%, rgba(250, 248, 245, 0) 70%);
            z-index: 1;
            pointer-events: none;
        }

        .ambient-blob-2 {
            position: absolute;
            bottom: -15%;
            left: -10%;
            width: 45vw;
            height: 45vw;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(163, 191, 214, 0.12) 0%, rgba(250, 248, 245, 0) 70%);
            z-index: 1;
            pointer-events: none;
        }

        .login-container {
            width: 100%;
            max-width: 460px;
            z-index: 10;
            position: relative;
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .brand-logo {
            text-align: center;
            margin-bottom: 2.5rem;
        }

        .brand-logo .sub {
            font-size: 0.65rem;
            text-transform: uppercase;
            letter-spacing: 0.5em;
            color: var(--gold-color);
            font-weight: 700;
            margin-bottom: 0.5rem;
            display: block;
        }

        .brand-logo h1 {
            font-family: 'Playfair Display', serif;
            font-weight: 500;
            font-size: 1.85rem;
            line-height: 1.2;
        }

        .brand-logo h1 span {
            font-style: italic;
            color: var(--gold-color);
        }

        .login-card {
            background-color: var(--card-bg);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid var(--border-color);
            border-radius: 24px;
            padding: 3rem 2.5rem;
            box-shadow: 0 12px 40px rgba(18, 22, 26, 0.04);
            position: relative;
            overflow: hidden;
        }

        .login-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--gold-color), #eed5a1, var(--gold-color));
        }

        .card-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
            color: var(--primary-color);
        }

        .card-subtitle {
            font-size: 0.85rem;
            color: var(--text-muted);
            margin-bottom: 2rem;
        }

        .form-group {
            margin-bottom: 1.5rem;
            position: relative;
        }

        .form-label {
            display: block;
            font-size: 0.7rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.15em;
            margin-bottom: 0.6rem;
            color: var(--primary-color);
        }

        .form-input {
            width: 100%;
            background-color: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 1rem 1.25rem;
            font-size: 0.9rem;
            color: var(--primary-color);
            outline: none;
            transition: all 0.3s ease;
        }

        .form-input:focus {
            border-color: var(--gold-color);
            box-shadow: 0 0 0 4px rgba(204, 153, 51, 0.08);
        }

        .error-message {
            background-color: #fff5f5;
            border: 1px solid rgba(239, 68, 68, 0.15);
            color: #ef4444;
            padding: 0.85rem 1.25rem;
            border-radius: 12px;
            font-size: 0.8rem;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .error-message svg {
            flex-shrink: 0;
            width: 16px;
            height: 16px;
        }

        .db-warning {
            background-color: #fffbeb;
            border: 1px solid rgba(245, 158, 11, 0.2);
            color: #b45309;
            padding: 1rem;
            border-radius: 12px;
            font-size: 0.8rem;
            margin-bottom: 1.5rem;
            text-align: left;
        }

        .db-warning a {
            color: var(--primary-color);
            font-weight: 700;
            text-decoration: underline;
        }

        .btn-submit {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            background-color: var(--gold-color);
            color: var(--primary-color);
            border: 1px solid var(--gold-color);
            padding: 1.1rem;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.25em;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 0.5rem;
        }

        .btn-submit:hover {
            background-color: var(--primary-color);
            color: #ffffff;
            border-color: var(--primary-color);
            transform: translateY(-1px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .btn-submit:active {
            transform: translateY(0);
        }

        .back-link {
            text-align: center;
            margin-top: 2rem;
        }

        .back-link a {
            font-size: 0.75rem;
            color: var(--text-muted);
            text-decoration: none;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .back-link a:hover {
            color: var(--gold-color);
        }

        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    </style>
</head>
<body>
    <div class="ambient-blob-1"></div>
    <div class="ambient-blob-2"></div>

    <div class="login-container">
        <div class="brand-logo">
            <span class="sub">Iraithuligal Iyakkam</span>
            <h1>Heartfelt <span>Impact</span></h1>
        </div>

        <div class="login-card">
            <h2 class="card-title">Admin Sign In</h2>
            <p class="card-subtitle">Please enter your credentials to access the portal.</p>

            <?php if ($db_not_setup): ?>
                <div class="db-warning">
                    <strong>Notice:</strong> The database has not been initialized. 
                    Please run <a href="setup.php">setup.php</a> first to create the schema and admin credentials.
                </div>
            <?php endif; ?>

            <?php if (!empty($error)): ?>
                <div class="error-message">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <span><?php echo htmlspecialchars($error); ?></span>
                </div>
            <?php endif; ?>

            <form method="POST" action="">
                <div class="form-group">
                    <label class="form-label" for="username">Username</label>
                    <input class="form-input" type="text" id="username" name="username" placeholder="Username" required autocomplete="username">
                </div>

                <div class="form-group">
                    <label class="form-label" for="password">Password</label>
                    <input class="form-input" type="password" id="password" name="password" placeholder="Password" required autocomplete="current-password">
                </div>

                <button type="submit" class="btn-submit" <?php echo $db_not_setup ? 'disabled style="opacity:0.6; cursor:not-allowed;"' : ''; ?>>
                    Sign In
                </button>
            </form>
        </div>

        <div class="back-link">
            <a href="../">← Back to Site</a>
        </div>
    </div>
</body>
</html>
