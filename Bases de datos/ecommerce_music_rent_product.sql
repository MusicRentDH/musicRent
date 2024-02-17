-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce_music_rent
-- ------------------------------------------------------
-- Server version	5.7.44-log

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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` tinytext,
  `name` varchar(255) DEFAULT NULL,
  `price` bigint(20) DEFAULT NULL,
  `category_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (2,'Guitarra Eléctrica Nebula Noir','Guitarra Eléctrica Nebula Noir',1200000,1),(3,'Guitarra Eléctrica Jazz Bass 3 colores','Guitarra Eléctrica Jazz Bass 3 colores',1300000,1),(4,'Guitarra Eléctrica Jazz Bass Pau Ferro','Guitarra Eléctrica Jazz Bass Pau Ferro',1300000,1),(5,'Violín Conjunto 1/4 Tamaño','Violín Conjunto 1/4 Tamaño',900000,1),(7,'violín morado brillante 3/4','violín morado brillante 3/4',800000,1),(8,'Batería electrónica Yamaha DTX8K','Batería electrónica Yamaha DTX8K',2000000,2),(9,'Batería Electrónica de 8 Piezas','Batería Electrónica de 8 Piezas',2000000,2),(10,'piano de cola digital con banco blanco','piano de cola digital con banco blanco',2500000,2),(11,'Piano Yamaha Clavinova CLP-765GP','Piano Yamaha Clavinova CLP-765GP',2500000,2),(12,'Piano de cola digital Roland GP-3','Piano de cola digital Roland GP-3',3500000,2),(14,'Trompeta Etude ETR-100 Series','Trompeta Etude ETR-100 Series',920000,3),(15,'Trompeta Allora ATR-250','Trompeta Allora ATR-250',940000,3),(16,'Saxofón Selmer Paris Referencia 54','Saxofón Selmer Paris Referencia 54',2940000,3),(17,'Clarinete intermedio Yamaha YCL-450','Clarinete intermedio Yamaha YCL-450',1940000,3),(18,'Batería electrónica Alesis Crimson','Batería electrónica Alesis Crimson',1940000,2);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-17 15:23:48
