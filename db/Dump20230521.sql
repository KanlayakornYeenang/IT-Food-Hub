-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.24-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.4.0.6659
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table foodhub.cart
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `item_id` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table foodhub.cart: ~1 rows (approximately)
INSERT INTO `cart` (`cart_id`, `user_id`, `menu_id`, `quantity`, `item_id`) VALUES
	(121, 1, 1, 2, '');

-- Dumping structure for table foodhub.category
CREATE TABLE IF NOT EXISTS `category` (
  `cat_id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table foodhub.category: ~5 rows (approximately)
INSERT INTO `category` (`cat_id`, `cat_name`) VALUES
	(1, 'ข้าวแกง'),
	(2, 'อาหารจานเดียว'),
	(3, 'ก๋วยเตี๋ยว'),
	(4, 'อาหารทานเล่น'),
	(5, 'เครื่องดื่ม');

-- Dumping structure for table foodhub.image
CREATE TABLE IF NOT EXISTS `image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `file_path` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `picture_type` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `restaurant_id` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `user_id` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `menu_id` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table foodhub.image: ~0 rows (approximately)
INSERT INTO `image` (`id`, `file_path`, `picture_type`, `restaurant_id`, `user_id`, `menu_id`) VALUES
	(1, '\\images\\image-1684269086732.png', 'profile', NULL, '3', NULL);

-- Dumping structure for table foodhub.menu
CREATE TABLE IF NOT EXISTS `menu` (
  `menu_id` int(11) NOT NULL AUTO_INCREMENT,
  `rst_id` int(11) NOT NULL,
  `menu_name` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `menu_cat` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `menu_desc` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `menu_price` decimal(5,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table foodhub.menu: ~6 rows (approximately)
INSERT INTO `menu` (`menu_id`, `rst_id`, `menu_name`, `menu_cat`, `menu_desc`, `menu_price`) VALUES
	(1, 1, 'อเมริกาโน่', 'กาแฟ', NULL, 35.00),
	(2, 2, 'ก๋วยเตี๋ยวไก่มะระ', 'ก๋วยเตี๋ยว', NULL, 0.00),
	(3, 2, 'ข้าวไข่ข้น', 'ข้าว', NULL, 20.00),
	(16, 2, 'ข้าวไข่เจียว', 'ข้าว', 'ข้าวไข่เจียวอร่อยนะ', 50.00),
	(17, 2, 'ข้าวไข่เจียว', 'ข้าว', 'ข้าวไข่เจียวอร่อยนะ', 50.00),
	(18, 2, 'ข้าวไข่เจียว', 'ข้าว', 'ข้าวไข่เจียวอร่อยนะ', 50.00);

-- Dumping structure for table foodhub.menu_item
CREATE TABLE IF NOT EXISTS `menu_item` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `option_id` int(11) NOT NULL,
  `item_name` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `item_price` decimal(5,2) DEFAULT 0.00,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table foodhub.menu_item: ~10 rows (approximately)
INSERT INTO `menu_item` (`item_id`, `option_id`, `item_name`, `item_price`) VALUES
	(1, 1, 'พิเศษ', 10.00),
	(2, 2, 'บะหมี่', 5.00),
	(3, 2, 'วุ้นเส้น', 0.00),
	(4, 2, 'หมี่', 0.00),
	(5, 2, 'เล็ก', 0.00),
	(6, 3, 'น่อง', 2.00),
	(7, 3, 'เลือด', 0.00),
	(8, 3, 'ไก่ฉีก', 0.00),
	(9, 7, 'แฮม', 0.00),
	(10, 8, 'แฮม', 0.00);

-- Dumping structure for table foodhub.menu_option
CREATE TABLE IF NOT EXISTS `menu_option` (
  `option_id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_id` int(11) NOT NULL,
  `option_name` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `option_type` int(11) NOT NULL DEFAULT 0,
  `max_optional` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`option_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table foodhub.menu_option: ~6 rows (approximately)
INSERT INTO `menu_option` (`option_id`, `menu_id`, `option_name`, `option_type`, `max_optional`) VALUES
	(1, 2, 'พิเศษ', 0, 0),
	(2, 2, 'เส้น', 1, 1),
	(3, 2, 'เครื่อง', 0, 0),
	(6, 16, 'เนื้อ', 0, 0),
	(7, 17, 'เนื้อ', 0, 0),
	(8, 18, 'เนื้อ', 0, 0);

-- Dumping structure for table foodhub.notification
CREATE TABLE IF NOT EXISTS `notification` (
  `noti_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_Id` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `user_id` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `time_stamp` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `message` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `isreaded` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`noti_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table foodhub.notification: ~6 rows (approximately)
INSERT INTO `notification` (`noti_id`, `order_Id`, `user_id`, `time_stamp`, `message`, `isreaded`) VALUES
	(30, '2-230513162930', '2', '2023-05-21 02:22:00', 'กำลังจัดเตรียมอาหาร', NULL),
	(31, '2-230513162930', '2', '2023-05-21 02:22:03', 'กำลังไปจัดส่งอาหาร', NULL),
	(32, '2-230513162930', '2', '2023-05-21 02:22:06', 'จัดส่งเรียบร้อย', NULL),
	(33, '2-230513162930', '2', '2023-05-21 02:40:51', 'กำลังจัดเตรียมอาหาร', NULL),
	(34, '2-230513162930', '2', '2023-05-21 02:40:52', 'กำลังไปจัดส่งอาหาร', NULL),
	(35, '2-230513162930', '2', '2023-05-21 02:40:54', 'จัดส่งเรียบร้อย', NULL);

-- Dumping structure for table foodhub.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `order_status` int(11) NOT NULL DEFAULT 0,
  `order_total_price` decimal(5,2) DEFAULT 0.00,
  `cus_id` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `dlv_id` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `order_dest` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `order_date_time` datetime NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table foodhub.orders: ~1 rows (approximately)
INSERT INTO `orders` (`order_id`, `order_status`, `order_total_price`, `cus_id`, `dlv_id`, `order_dest`, `order_date_time`) VALUES
	('2-230513162930', 3, 135.00, '2', '3', 'Common Room', '2023-05-13 16:29:30'),
	('3-230521192630', 0, 30.00, '3', NULL, 'test', '2023-05-21 19:26:30');

-- Dumping structure for table foodhub.orders_detail
CREATE TABLE IF NOT EXISTS `orders_detail` (
  `order_detail_id` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `order_id` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `menu_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `option_detail` longtext COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`order_detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table foodhub.orders_detail: ~3 rows (approximately)
INSERT INTO `orders_detail` (`order_detail_id`, `order_id`, `menu_id`, `quantity`, `option_detail`) VALUES
	('2-230513162930-10', '2-230513162930', 1, 3, ''),
	('2-230513162930-30', '2-230513162930', 3, 1, ''),
	('3-230521192630-30', '3-230521192630', 3, 1, '');

-- Dumping structure for table foodhub.restaurants
CREATE TABLE IF NOT EXISTS `restaurants` (
  `rst_id` int(11) NOT NULL AUTO_INCREMENT,
  `owner_id` int(11) NOT NULL,
  `rst_name` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `rst_locat` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL DEFAULT 'โรงอาหารคณะไอที',
  PRIMARY KEY (`rst_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table foodhub.restaurants: ~2 rows (approximately)
INSERT INTO `restaurants` (`rst_id`, `owner_id`, `rst_name`, `rst_locat`) VALUES
	(1, 0, 'จิบกาแฟสด', 'โรงอาหารคณะไอที'),
	(2, 3, 'ก๋วยเตี๋ยวไก่มะระ ข้าวไข่ข้น', 'โรงอาหารคณะไอที');

-- Dumping structure for table foodhub.restaurants_category
CREATE TABLE IF NOT EXISTS `restaurants_category` (
  `rst_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  PRIMARY KEY (`rst_id`,`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table foodhub.restaurants_category: ~3 rows (approximately)
INSERT INTO `restaurants_category` (`rst_id`, `cat_id`) VALUES
	(1, 5),
	(2, 2),
	(2, 3);

-- Dumping structure for table foodhub.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` varchar(5) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `user_role` enum('admin','customer','restaurant') COLLATE utf8mb4_unicode_520_ci DEFAULT 'customer',
  `user_email` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `user_password` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `user_fname` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `user_lname` varchar(45) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `user_phone` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `user_locat` varchar(45) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- Dumping data for table foodhub.users: ~5 rows (approximately)
INSERT INTO `users` (`user_id`, `user_role`, `user_email`, `user_password`, `user_fname`, `user_lname`, `user_phone`, `user_locat`) VALUES
	('1', 'customer', 'vorawee1@gmail.com', 'Vorawe@17', 'Vorawee', 'Wirawan', '0911111111', NULL),
	('2', 'customer', 'mhuukrob@gmail.com', 'mhuukrob', 'Kanlayakorn', 'Yeenang', '0839163049', 'Common Room'),
	('3', 'restaurant', 'test', 'test', 'test', 'test', '123', 'test'),
	('4', 'customer', 'gear@gmail.com', 'Gear@123', 'teweqe', 'teseqeq', '0916988234', 'm21'),
	('5', 'customer', 'email@gmail.com', 'Vorawe13', 'firstname', 'lastname', '0999999999', 'M12131');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
