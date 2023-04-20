-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: itfoodhub
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `CustomerId` int NOT NULL AUTO_INCREMENT,
  `Customer_Email` varchar(45) DEFAULT NULL,
  `Customer_Fname` varchar(45) DEFAULT NULL,
  `Customer_Lname` varchar(45) DEFAULT NULL,
  `Customer_Password` varchar(45) DEFAULT NULL,
  `Customer_isOwner` varchar(45) DEFAULT '0',
  `Customer_isDelivery` varchar(45) DEFAULT '0',
  `Customer_Phone` varchar(45) DEFAULT NULL,
  `Restauran_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`CustomerId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'vorawee@gmail.com','vorawee','wirawan','vorawee','1','0',NULL,NULL),(2,'mukrob@gmail.com','mind','mind','mukrob','0','0',NULL,NULL),(3,'test@gmail.com','test','test','test','0','0',NULL,NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foodorder`
--

DROP TABLE IF EXISTS `foodorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `foodorder` (
  `foodorder_id` int NOT NULL AUTO_INCREMENT,
  `food_name` varchar(45) DEFAULT NULL,
  `food_price` varchar(45) DEFAULT NULL,
  `order_id` int NOT NULL,
  PRIMARY KEY (`foodorder_id`),
  KEY `order_idFK_idx` (`order_id`),
  CONSTRAINT `order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foodorder`
--

LOCK TABLES `foodorder` WRITE;
/*!40000 ALTER TABLE `foodorder` DISABLE KEYS */;
INSERT INTO `foodorder` VALUES (1,'กะเพราหมู','50',1),(2,'ไก่ผัดพริก','50',1),(3,'กะเพราโบราณ','50',1),(4,'ผัดซี้อิ้ว','45',2),(5,'หมุพริกแกง','60',2),(6,'เนื้อน้ำมันหอย','60',2),(7,'กะเพราไก่','50',3),(8,'ข้าวผัดน้ำพริก','50',3),(9,'หมูกระเทียม','60',3),(10,'ข้าวไข่ดาว','70',3);
/*!40000 ALTER TABLE `foodorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_status` varchar(45) DEFAULT NULL,
  `order_total_price` varchar(45) DEFAULT NULL,
  `foodOrder_id` varchar(45) DEFAULT NULL,
  `order_destination` varchar(45) DEFAULT NULL,
  `delivery_id` int DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `restaurant_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'going to restaurant','100','1','m19',1,2,'ร้านพี่ช้าง'),(2,'find rider','200','3','m22',NULL,3,'ร้านไก่ทอด'),(3,'find rider','300','2','m21',NULL,3,'ร้านพ่อมึง');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurants` (
  `Restuarant_id` int NOT NULL AUTO_INCREMENT,
  `Restaurant_name` varchar(45) NOT NULL,
  `Restuarant_Location` varchar(45) NOT NULL,
  `Restuarant_type` varchar(45) NOT NULL,
  PRIMARY KEY (`Restuarant_id`,`Restaurant_name`,`Restuarant_Location`,`Restuarant_type`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'พี่ช้าง','โรงอาหาร ไอที','a la carte'),(2,'ร้าน A','โรงอาหาร ไอที','a la carte'),(3,'ร้าน B','โรงอาหาร ไอที','a la carte'),(4,'ร้าน C','โองอาหาร ไอที','noodle'),(5,'ร้าน D','โรงอาหาร ไอที','drink'),(6,'ร้าน E','โรงอาหาร ไอที','snack');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimages`
--

DROP TABLE IF EXISTS `testimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimages` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `file_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimages`
--

LOCK TABLES `testimages` WRITE;
/*!40000 ALTER TABLE `testimages` DISABLE KEYS */;
INSERT INTO `testimages` VALUES (1,'\\test\\image-1681939058259.png');
/*!40000 ALTER TABLE `testimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_fname` varchar(45) DEFAULT NULL,
  `user_lname` varchar(45) DEFAULT NULL,
  `user_email` varchar(45) DEFAULT NULL,
  `user_password` varchar(45) DEFAULT NULL,
  `user_role` enum('admin','customer','partner','delivery') DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'vorawee','wirawam','vorawee@gmail.com','test','partner'),(2,'mhukrob','zaza','mhukrob@gmail.com','mhukrob','admin'),(3,'testRegister','testregister','test@gmail.com','test','customer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'itfoodhub'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-20 12:47:04
