-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: whiting_turner
-- ------------------------------------------------------
-- Server version	5.7.13-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lmvmodeloption`
--

DROP TABLE IF EXISTS `lmvmodeloption`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lmvmodeloption` (
  `label` varchar(200) DEFAULT NULL,
  `urn` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lmvmodeloption`
--

LOCK TABLES `lmvmodeloption` WRITE;
/*!40000 ALTER TABLE `lmvmodeloption` DISABLE KEYS */;
INSERT INTO `lmvmodeloption` VALUES ('Electrical Model','dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d3Rfd2hpdGluZ3R1cm5lci84NjE5MDRfNTAxal9lbGVjX2FsbF9zdG4ucnZ0'),('Mechanical Model','dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d3Rfd2hpdGluZ3R1cm5lci84NjE5MDRfNTAxal9tZWNoX2FsbF9zdG4ucnZ0'),('Structural Model','dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d3Rfd2hpdGluZ3R1cm5lci84NjE5MDRfNTAxal9zdHJ1Y19hbGxfbXlpLnJ2dA=='),('House.dwfx','dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d3Rfd2hpdGluZ3R1cm5lci9Ib3VzZS5kd2Z4'),('BDGP_Arch_VC_3-24-16_TD.rvt','dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d3Rfd2hpdGluZ3R1cm5lci9CREdQX0FyY2hfVkNfMy0yNC0xNl9URC5ydnQ='),('861904_501j_arch_all_stn.rvt','dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d3Rfd2hpdGluZ3R1cm5lci84NjE5MDRfNTAxal9hcmNoX2FsbF9zdG4ucnZ0'),('BV Kepler Combined.nwd','dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d3Rfd2hpdGluZ3R1cm5lci9CViUyMEtlcGxlciUyMENvbWJpbmVkLm53ZA=='),('T2772_San Rafael_CA_Arch_2012MB.rvt','dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d3Rfd2hpdGluZ3R1cm5lci9UMjc3Ml9TYW4lMjBSYWZhZWxfQ0FfQXJjaF8yMDEyTUIucnZ0'),('T2772_San Rafael_CA_Struc_2012MB.rvt','dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d3Rfd2hpdGluZ3R1cm5lci9UMjc3Ml9TYW4lMjBSYWZhZWxfQ0FfU3RydWNfMjAxMk1CLnJ2dA=='),('T2772_San Rafael_CA_Elec_2012MB.rvt','dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d3Rfd2hpdGluZ3R1cm5lci9UMjc3Ml9TYW4lMjBSYWZhZWxfQ0FfRWxlY18yMDEyTUIucnZ0'),('T2772_San_Rafael_CA_Mech_2012MB.rvt','dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d3Rfd2hpdGluZ3R1cm5lci9UMjc3Ml9TYW5fUmFmYWVsX0NBX01lY2hfMjAxMk1CLnJ2dA=='),('T2772_San_Rafael_CA_Refr_2012MB.rvt','dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d3Rfd2hpdGluZ3R1cm5lci9UMjc3Ml9TYW5fUmFmYWVsX0NBX1JlZnJfMjAxMk1CLnJ2dA=='),('struc.nwc','dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6d3Rfd2hpdGluZ3R1cm5lci9zdHJ1Yy5ud2M=');
/*!40000 ALTER TABLE `lmvmodeloption` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-07-05 19:37:19
