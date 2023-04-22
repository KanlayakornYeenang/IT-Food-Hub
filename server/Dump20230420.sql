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

-- Dumping structure for table foodhub.category
CREATE TABLE IF NOT EXISTS `category` (
  `cat_id` int(11) NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(45) NOT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table foodhub.category: ~5 rows (approximately)
INSERT INTO `category` (`cat_id`, `cat_name`) VALUES
	(1, 'ข้าวแกง'),
	(2, 'อาหารจานเดียว'),
	(3, 'ก๋วยเตี๋ยว'),
	(4, 'อาหารทานเล่น'),
	(5, 'เครื่องดื่ม');

-- Dumping structure for table foodhub.menu
CREATE TABLE IF NOT EXISTS `menu` (
  `menu_id` int(11) NOT NULL AUTO_INCREMENT,
  `rst_id` int(11) NOT NULL,
  `menu_name` varchar(45) NOT NULL,
  `menu_cat` varchar(45) NOT NULL,
  `menu_desc` varchar(45) DEFAULT NULL,
  `menu_price` decimal(5,2) NOT NULL DEFAULT 0.00,
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table foodhub.menu: ~3 rows (approximately)
INSERT INTO `menu` (`menu_id`, `rst_id`, `menu_name`, `menu_cat`, `menu_desc`, `menu_price`) VALUES
	(1, 1, 'อเมริกาโน่', 'กาแฟ', NULL, 0.00),
	(2, 2, 'ก๋วยเตี๋ยวไก่มะระ', 'ก๋วยเตี๋ยว', NULL, 0.00),
	(3, 2, 'ข้าวไข่ข้น', 'ข้าว', NULL, 0.00);

-- Dumping structure for table foodhub.menu_item
CREATE TABLE IF NOT EXISTS `menu_item` (
  `option_id` int(11) NOT NULL,
  `item_name` varchar(45) NOT NULL,
  `item_price` decimal(5,2) DEFAULT 0.00,
  PRIMARY KEY (`option_id`,`item_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table foodhub.menu_item: ~8 rows (approximately)
INSERT INTO `menu_item` (`option_id`, `item_name`, `item_price`) VALUES
	(1, 'พิเศษ', 10.00),
	(2, 'บะหมี่', 0.00),
	(2, 'วุ้นเส้น', 0.00),
	(2, 'หมี่', 0.00),
	(2, 'เล็ก', 0.00),
	(3, 'น่อง', 0.00),
	(3, 'เลือด', 0.00),
	(3, 'ไก่ฉีก', 0.00);

-- Dumping structure for table foodhub.menu_option
CREATE TABLE IF NOT EXISTS `menu_option` (
  `option_id` int(11) NOT NULL AUTO_INCREMENT,
  `menu_id` int(11) NOT NULL,
  `option_name` varchar(45) NOT NULL,
  `option_type` enum('optional','require') NOT NULL,
  `max_optional` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`option_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table foodhub.menu_option: ~3 rows (approximately)
INSERT INTO `menu_option` (`option_id`, `menu_id`, `option_name`, `option_type`, `max_optional`) VALUES
	(1, 2, 'พิเศษ', 'optional', 1),
	(2, 2, 'เส้น', 'require', 1),
	(3, 2, 'เครื่อง', 'optional', 3);

-- Dumping structure for table foodhub.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_status` varchar(45) NOT NULL,
  `order_total_price` decimal(5,2) DEFAULT 0.00,
  `cus_id` varchar(45) NOT NULL,
  `rst_id` varchar(45) NOT NULL,
  `dlv_id` varchar(45) NOT NULL,
  `order_dest` varchar(45) NOT NULL,
  `order_date_time` datetime NOT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table foodhub.orders: ~0 rows (approximately)
INSERT INTO `orders` (`order_id`, `order_status`, `order_total_price`, `cus_id`, `rst_id`, `dlv_id`, `order_dest`, `order_date_time`) VALUES
	(1, 'กำลังไปที่ร้านอาหาร', 0.00, '2', '2', '1', 'm19', '2023-04-21 11:29:47');

-- Dumping structure for table foodhub.orders_detail
CREATE TABLE IF NOT EXISTS `orders_detail` (
  `order_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `	option_details` longtext DEFAULT NULL,
  PRIMARY KEY (`order_detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table foodhub.orders_detail: ~2 rows (approximately)
INSERT INTO `orders_detail` (`order_detail_id`, `order_id`, `menu_id`, `quantity`, `	option_details`) VALUES
	(1, 1, 1, 1, '{ "พิเศษ": [ "พิเศษ" ], "เส้น": [ "บะหมี่" ], "เครื่อง": [ "น่อง", "เลือด", "ไก่ฉีก" ] }');

-- Dumping structure for table foodhub.restaurants
CREATE TABLE IF NOT EXISTS `restaurants` (
  `rst_id` int(11) NOT NULL AUTO_INCREMENT,
  `rst_name` varchar(45) NOT NULL,
  `rst_locat` varchar(45) NOT NULL DEFAULT 'โรงอาหารคณะไอที',
  PRIMARY KEY (`rst_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table foodhub.restaurants: ~2 rows (approximately)
INSERT INTO `restaurants` (`rst_id`, `rst_name`, `rst_locat`) VALUES
	(1, 'จิบกาแฟสด', 'โรงอาหารคณะไอที'),
	(2, 'ก๋วยเตี๋ยวไก่มะระ ข้าวไข่ข้น', 'โรงอาหารคณะไอที');

-- Dumping structure for table foodhub.restaurants_category
CREATE TABLE IF NOT EXISTS `restaurants_category` (
  `rst_id` int(11) NOT NULL,
  `cat_id` int(11) NOT NULL,
  PRIMARY KEY (`rst_id`,`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table foodhub.restaurants_category: ~2 rows (approximately)
INSERT INTO `restaurants_category` (`rst_id`, `cat_id`) VALUES
	(1, 5),
	(2, 2),
	(2, 3);

-- Dumping structure for table foodhub.role
CREATE TABLE IF NOT EXISTS `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table foodhub.role: ~4 rows (approximately)
INSERT INTO `role` (`role_id`, `role_name`) VALUES
	(1, 'admin'),
	(2, 'customer'),
	(3, 'restaurant'),
	(4, 'delivery person');

-- Dumping structure for table foodhub.users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) NOT NULL,
  `user_password` varchar(45) NOT NULL,
  `user_fname` varchar(45) NOT NULL,
  `user_lname` varchar(45) NOT NULL,
  `user_phone` varchar(45) DEFAULT NULL,
  `user_locat` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table foodhub.users: ~2 rows (approximately)
INSERT INTO `users` (`user_id`, `user_email`, `user_password`, `user_fname`, `user_lname`, `user_phone`, `user_locat`) VALUES
	(1, 'vorawee@gmail.com', 'vorawee', 'vorawee', 'wirawan', NULL, NULL),
	(2, 'mhuukrob@gmail.com', 'mhuukrob', 'kanlayakorn', 'yeenang', NULL, NULL);

-- Dumping structure for table foodhub.users_role
CREATE TABLE IF NOT EXISTS `users_role` (
  `user_id` int(11) NOT NULL,
  `role_id` varchar(45) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table foodhub.users_role: ~2 rows (approximately)
INSERT INTO `users_role` (`user_id`, `role_id`) VALUES
	(1, '1'),
	(2, '1');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
