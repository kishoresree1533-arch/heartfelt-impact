<?php
// index.php
// Gateway file for the admin panel

session_start();

// Check if user is logged in
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    // Redirect to login page
    header('Location: login.php');
    exit;
} else {
    // Redirect to dashboard page
    header('Location: dashboard.php');
    exit;
}
?>
