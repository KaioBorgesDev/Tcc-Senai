-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 10.87.100.6    Database: senai_game_desenv
-- ------------------------------------------------------
-- Server version	5.7.11-log

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
-- Table structure for table `alternativas`
--

DROP TABLE IF EXISTS `alternativas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alternativas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) NOT NULL,
  `correta` int(1) NOT NULL,
  `id_pergunta` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_pergunta_idx` (`id_pergunta`),
  CONSTRAINT `id_pergunta` FOREIGN KEY (`id_pergunta`) REFERENCES `perguntas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alternativas`
--

/*!40000 ALTER TABLE `alternativas` DISABLE KEYS */;
INSERT INTO `alternativas` VALUES (1,'2005',0,1),(2,'2006',0,1),(3,'1500',1,1),(4,'2000',0,1),(5,'2003',0,1),(6,'2003',0,2),(7,'2001',0,2),(8,'2004',0,2),(9,'1005',0,2),(10,'1498',1,2),(11,'1002',0,3),(12,'1497',1,3),(13,'1002',0,3),(14,'1920',0,3),(15,'1950',0,3),(16,'1498',1,4),(17,'1005',0,4),(18,'1060',0,4),(19,'1049',0,4),(20,'1400',0,4),(21,'1004',0,5),(22,'1520',1,5),(23,'1670',0,5),(24,'1900',0,5),(25,'1928',0,5),(26,'1502',0,6),(27,'1200',0,6),(28,'1005',0,6),(29,'1143',1,6),(30,'1059',0,6),(31,'descriçõa',0,3),(32,'descriçõa',0,3),(33,'descriçõa',0,3),(34,'descriçõa',0,3),(35,'descriçõa',0,3);
/*!40000 ALTER TABLE `alternativas` ENABLE KEYS */;

--
-- Table structure for table `favoritadas`
--

DROP TABLE IF EXISTS `favoritadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favoritadas` (
  `emai_user` varchar(50) NOT NULL,
  `prova_fav` int(11) NOT NULL,
  `id_favoritada` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id_favoritada`),
  KEY `email_usuario_idx` (`emai_user`),
  KEY `id_processo_idx` (`prova_fav`),
  KEY `id_prova_idx` (`prova_fav`),
  CONSTRAINT `email_usuario` FOREIGN KEY (`emai_user`) REFERENCES `usuarios` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_processoFav` FOREIGN KEY (`prova_fav`) REFERENCES `processos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favoritadas`
--

/*!40000 ALTER TABLE `favoritadas` DISABLE KEYS */;
/*!40000 ALTER TABLE `favoritadas` ENABLE KEYS */;

--
-- Table structure for table `perguntas`
--

DROP TABLE IF EXISTS `perguntas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perguntas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(100) NOT NULL,
  `id_processo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_processo_idx` (`id_processo`),
  CONSTRAINT `id_processo` FOREIGN KEY (`id_processo`) REFERENCES `processos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perguntas`
--

/*!40000 ALTER TABLE `perguntas` DISABLE KEYS */;
INSERT INTO `perguntas` VALUES (1,'Qual foi o ano que descobriram o Brasil?',1),(2,'Qual foi o ano que descobriram a India?',1),(3,'Qual foi o ano que descobriram o Canada?',1),(4,'Qual foi o ano que descobriram a Venezuela?',1),(5,'Qual foi o ano que descobriram o Chile?',1),(6,'Qual foi o ano que descobriram o Portugal?',1);
/*!40000 ALTER TABLE `perguntas` ENABLE KEYS */;

--
-- Table structure for table `processos`
--

DROP TABLE IF EXISTS `processos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `processos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(100) NOT NULL,
  `semestre` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `processos`
--

/*!40000 ALTER TABLE `processos` DISABLE KEYS */;
INSERT INTO `processos` VALUES (1,'Aprendizagem Industrial','Prova com 20 questões, 10 alternativa de matemática, e 10 de Portugues.','2'),(2,'Curso Comunidade Industrial','Prova com 30 questões, 10 alternativa de matemática, e 10 de Portugues.','1');
/*!40000 ALTER TABLE `processos` ENABLE KEYS */;

--
-- Table structure for table `progresso`
--

DROP TABLE IF EXISTS `progresso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `progresso` (
  `id_progresso` int(11) NOT NULL,
  `email_user` varchar(100) NOT NULL,
  `id_prova` int(11) NOT NULL,
  `ultima_questao` int(11) NOT NULL,
  `data_progresso` date DEFAULT NULL,
  PRIMARY KEY (`id_progresso`),
  KEY `email_user_idx` (`email_user`),
  KEY `id_processo_idx` (`id_prova`),
  KEY `id_questao_idx` (`ultima_questao`),
  CONSTRAINT `email_user` FOREIGN KEY (`email_user`) REFERENCES `usuarios` (`email`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_prova` FOREIGN KEY (`id_prova`) REFERENCES `processos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_questao` FOREIGN KEY (`ultima_questao`) REFERENCES `perguntas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `progresso`
--

/*!40000 ALTER TABLE `progresso` DISABLE KEYS */;
INSERT INTO `progresso` VALUES (1,'Kaio@gmail.com',1,1,'2024-09-10');
/*!40000 ALTER TABLE `progresso` ENABLE KEYS */;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scores` (
  `email_User` varchar(45) NOT NULL,
  `acertos` int(11) DEFAULT NULL,
  `erros` int(11) DEFAULT NULL,
  PRIMARY KEY (`email_User`),
  KEY `email_User_idx` (`email_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
INSERT INTO `scores` VALUES ('Kaio@gmail.com',10,1);
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `email` varchar(100) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(15) NOT NULL,
  `status` varchar(15) DEFAULT NULL,
  `rule` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('123456','123456','123456',NULL,NULL),('1234567','1234567','1234567',NULL,NULL),('caiovaiamerdakrllllllllllll','123456','123456',NULL,NULL),('Kaio','Kaio','1234',NULL,NULL),('Kaio@gmail.com','123123','123456',NULL,NULL),('kaiocalmapfv','147896','147896',NULL,NULL),('kaioooooo','123456','123456',NULL,NULL),('mariel@gmail.com','Mariel Guerra','123456',NULL,NULL),('marielguerra','123456','123456',NULL,NULL),('string','string','string',NULL,NULL);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-12 16:32:28
