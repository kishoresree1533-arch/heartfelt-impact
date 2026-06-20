-- SQL Setup Script for Iraithuligal Database
-- This script will create the database and all required tables.

CREATE DATABASE IF NOT EXISTS `Iraithuligal` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `Iraithuligal`;

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS `admin_users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Donation Categories Table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Awards Table
CREATE TABLE IF NOT EXISTS `awards` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `icon` VARCHAR(50) NOT NULL,
    `from_org` VARCHAR(150) NOT NULL,
    `title` VARCHAR(150) NOT NULL,
    `year` VARCHAR(10) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Testimonials Table
CREATE TABLE IF NOT EXISTS `testimonials` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `quote` TEXT NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `role` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Gallery Images Table
CREATE TABLE IF NOT EXISTS `gallery_images` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `src` VARCHAR(255) NOT NULL,
    `span` VARCHAR(50) DEFAULT '',
    `delay` DECIMAL(4,2) DEFAULT 0.00,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Contacts Table (for Form Submissions)
CREATE TABLE IF NOT EXISTS `contacts` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(20) DEFAULT NULL,
    `subject` VARCHAR(150) DEFAULT NULL,
    `message` TEXT NOT NULL,
    `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `approved` TINYINT(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Memberships Table
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Clear tables first to allow clean re-runs of setup
TRUNCATE TABLE `donation_categories`;
TRUNCATE TABLE `awards`;
TRUNCATE TABLE `testimonials`;
TRUNCATE TABLE `gallery_images`;

-- Seed Donation Categories
INSERT INTO `donation_categories` (`title`, `desc`, `image`, `tag`, `tagColor`, `accentBorder`, `stat`, `statLabel`) VALUES
('Food Support', 'Help provide nutritious meals and basic needs for families in need.', 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=900&auto=format&fit=crop', 'Nutrition', 'bg-amber-500', 'hover:ring-amber-400', '500+', 'Meals Served'),
('Education Support', 'Support children''s education and open doors to better opportunities.', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=900&auto=format&fit=crop', 'Education', 'bg-sky-500', 'hover:ring-sky-400', '300+', 'Children Supported'),
('Healthcare Support', 'Provide essential medical care to underserved and remote communities.', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=900&auto=format&fit=crop', 'Healthcare', 'bg-rose-500', 'hover:ring-rose-400', '1,200+', 'Lives Treated'),
('Emergency Relief', 'Help communities recover quickly during difficult crisis situations.', 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=900&auto=format&fit=crop', 'Relief', 'bg-emerald-500', 'hover:ring-emerald-400', '50+', 'Relief Camps');

-- Seed Awards
INSERT INTO `awards` (`icon`, `from_org`, `title`, `year`) VALUES
('Trophy', 'Government Authority', 'Excellence in Social Service', '2023'),
('Medal', 'District Administration', 'Outstanding Humanitarian Initiative', '2022'),
('Star', 'Community Leaders', 'Blood Donation Champion Award', '2022'),
('Award', 'State NGO Council', 'Best Volunteer Organisation', '2023'),
('BadgeCheck', 'Health Department', 'Lifesaving Service Recognition', '2024'),
('Ribbon', 'Civil Society Forum', '5 Years of Dedicated Service', '2026');

-- Seed Testimonials
INSERT INTO `testimonials` (`quote`, `name`, `role`) VALUES
('I never imagined that strangers could care this much about my son''s life. They truly gave him a second chance.', 'Manonmani', 'Parent, Tirunelveli'),
('The school built in our village changed everything. My daughter now dreams of becoming a doctor and serving our people.', 'Muthuramalingam', 'Farmer, Madurai'),
('When the floods took everything, they were the first ones on the ground. Not with promises, but with real action.', 'Arulmozhi', 'Fisherman, Cuddalore');

-- Seed Gallery Images
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
('src/assets/gallery image/IMG_20260326_124248.jpg.jpeg', '', 0.28);

-- Seed Admin User
INSERT INTO `admin_users` (`username`, `password`) VALUES
('iraithuligal', '$2y$10$s80LCtorbJyGLr3yJjmi1usI13.kHv31dIBLQ4H77IlAW7biPEfPe')
ON DUPLICATE KEY UPDATE `password` = VALUES(`password`);

