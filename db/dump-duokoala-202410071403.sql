-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: duokoala
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `activity_id` varchar(255) NOT NULL,
  `activity_description` varchar(255) DEFAULT NULL,
  `happen_at` datetime(6) DEFAULT NULL,
  `actioned_by_admin_user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`activity_id`),
  KEY `FKf6ygsi7d9prwma20yt54cxmq4` (`actioned_by_admin_user_id`),
  CONSTRAINT `FKf6ygsi7d9prwma20yt54cxmq4` FOREIGN KEY (`actioned_by_admin_user_id`) REFERENCES `admin` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
INSERT INTO `activity` VALUES ('7a280a72-4bc3-4587-ab72-b29f1a067d47','Update course ID: 123','2024-08-30 17:02:29.063000','154bd7d7-c989-424f-a8f2-2f4bab7133b5');
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `user_id` varchar(255) NOT NULL,
  `create_by_admin_user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `FKe4s4rcl44ydqfv8j7et9k4034` (`create_by_admin_user_id`),
  CONSTRAINT `FK8ahhk8vqegfrt6pd1p9i03aej` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKe4s4rcl44ydqfv8j7et9k4034` FOREIGN KEY (`create_by_admin_user_id`) REFERENCES `admin` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('154bd7d7-c989-424f-a8f2-2f4bab7133b5',NULL),('a6f76bd7-dfe8-4196-b5b9-45ab62b00772','154bd7d7-c989-424f-a8f2-2f4bab7133b5'),('d361a8af-de76-43e5-b8de-0b9dcd5a2a40','154bd7d7-c989-424f-a8f2-2f4bab7133b5'),('de8d872e-8266-49fa-8a13-33531b10e2f1','154bd7d7-c989-424f-a8f2-2f4bab7133b5'),('decfe66b-8573-41b9-987f-5a6cc079e696','154bd7d7-c989-424f-a8f2-2f4bab7133b5');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer` (
  `answer_id` varchar(255) NOT NULL,
  `answer_description` varchar(255) DEFAULT NULL,
  `is_correct` bit(1) NOT NULL,
  `question_question_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`answer_id`),
  KEY `FK18uq50e5jbrutl3yum1ef2e4o` (`question_question_id`),
  CONSTRAINT `FK18uq50e5jbrutl3yum1ef2e4o` FOREIGN KEY (`question_question_id`) REFERENCES `question` (`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES ('06a2cabe-e923-42f5-a5dc-2d1305745828','ANSWER-1',_binary '\0','113463eb-fc8e-4514-adea-cb66a4d2d570'),('0c758178-4405-458a-950f-122e0f3316f8','ANSWER-3',_binary '\0','8c8b0dab-65c0-4f05-9c3f-55244d753361'),('0fff50f8-ac66-4cd4-82f8-cd5f12d6872b','Experimenting with different styles of communication',_binary '\0','c1b7df09-381c-4fcf-af8a-8c664c0e3aa1'),('15bdb126-0268-41ec-aaef-ecce7f702508','ANSWER-3',_binary '\0','15c592ea-628d-4d60-beb1-bb294240eb66'),('17ae9414-e64a-46d3-8626-c96ad89e1867','A',_binary '\0','caec955b-e87c-422d-af09-fc950f9a4ed6'),('1950fc96-f85e-4f0d-91e5-662a6a187230','A',_binary '\0','7a394eb2-ab18-4947-8109-be4601de3f41'),('1bfe388a-d98e-402f-9185-8a2ded30ab51','A',_binary '\0','72d2b6da-710e-49fc-b08a-c7bb31a2fa96'),('1d407a52-f557-4e83-8a3a-f3149f5db0a8','To dominate the conversation',_binary '\0','b569c2a4-27b5-45ca-9d7c-894b1dc5b365'),('1ddc893c-0663-4650-a5d3-2b603f78ed00','ANSWER-4',_binary '','446e3f3a-b29b-4dde-ac42-d866aca60878'),('209d2c81-f4df-4af5-9b81-2b627b219bac','ANSWER-4',_binary '\0','15c592ea-628d-4d60-beb1-bb294240eb66'),('2406b4c8-3e20-48b4-88b4-1ff29f6d2e17','ANSWER-1',_binary '\0','446e3f3a-b29b-4dde-ac42-d866aca60878'),('2891ef57-8dbb-4f79-8c91-8cf2343e5b4d','To ensure your ideas contribute to the team’s goals',_binary '','b569c2a4-27b5-45ca-9d7c-894b1dc5b365'),('2d087f84-d5c5-495e-bdf6-eed81cedda3b','It allows you to explore and organize your thoughts',_binary '','94edb88d-d45f-4140-9736-892a372547f8'),('309cf682-d342-4d08-92ac-49c32ce17140','ANSWER-4',_binary '','fb758dfa-d2a8-4f4c-ba17-f3eb1c7b8ebd'),('3461c3f7-ab9f-4478-8efe-2289e26e1709','ANSWER-2',_binary '\0','15c592ea-628d-4d60-beb1-bb294240eb66'),('36dd8d26-3a39-4f85-bed3-c506fbc5acfe','Following others\' advice blindly',_binary '\0','63974a67-da0a-43ae-bf13-b43e94dcb58d'),('3758db70-ab41-4665-bbcc-416027cea39f','Listening to your inner thoughts and feelings',_binary '','63974a67-da0a-43ae-bf13-b43e94dcb58d'),('37745878-62b1-4cc3-8f4a-1a43c572cb85','ANSWER-1',_binary '','15c592ea-628d-4d60-beb1-bb294240eb66'),('428d87ed-d010-4c39-95c2-975bb30eb8a8','B',_binary '','caec955b-e87c-422d-af09-fc950f9a4ed6'),('438c35fb-6505-4969-a961-94bf09b3cd95','A',_binary '\0','7a394eb2-ab18-4947-8109-be4601de3f41'),('4818b639-be18-4804-9074-c1177afa2792','Discovering your passion',_binary '\0','4d4281f2-99bc-4614-88d0-2e4aa28e0b70'),('52a5f84e-c7a8-4d4f-a373-17a298063c92','ANSWER-1',_binary '\0','fb758dfa-d2a8-4f4c-ba17-f3eb1c7b8ebd'),('53b93f0e-9fd2-471a-b10f-074da86d10e9','You no longer feel nervous in public speaking situations',_binary '\0','ff6b09e8-d0cc-41fe-9217-aeccd53f7b51'),('57cf1286-9cb9-4d6d-8866-49f9489f167c',' Your opinions are aligned with the majority',_binary '\0','ff6b09e8-d0cc-41fe-9217-aeccd53f7b51'),('686cb3d5-596a-4f20-a423-ab27a019826a','ANSWER-1',_binary '\0','8c8b0dab-65c0-4f05-9c3f-55244d753361'),('6b4b1574-42d8-44bc-9ba0-f9c42ae3c36b','C',_binary '\0','caec955b-e87c-422d-af09-fc950f9a4ed6'),('7110330d-1dd8-40d9-ab43-2193867f55bc','You are comfortable expressing your authentic self',_binary '','ff6b09e8-d0cc-41fe-9217-aeccd53f7b51'),('767d0dcb-d185-4b09-bcae-41e687d1fbe0','To impress your boss',_binary '\0','b569c2a4-27b5-45ca-9d7c-894b1dc5b365'),('76dd2fd8-b29f-45be-90b2-6dbd933611c0','ANSWER-8888888',_binary '\0','1146c9ed-59c6-4b5e-bee5-00039ac81aa4'),('7fd1810d-d78a-43c2-89c3-12d9e35bdff9','C',_binary '\0','72d2b6da-710e-49fc-b08a-c7bb31a2fa96'),('7fd605ac-7e46-4c44-9865-1145160af8f5','Copying successful people',_binary '\0','63974a67-da0a-43ae-bf13-b43e94dcb58d'),('7ff2c288-8187-4c2c-ad0b-e2be7b0655f8','B',_binary '\0','72d2b6da-710e-49fc-b08a-c7bb31a2fa96'),('8ac453e8-9f3c-4f8d-9816-f7f42d7e6f87','ANSWER-2',_binary '\0','fb758dfa-d2a8-4f4c-ba17-f3eb1c7b8ebd'),('953a9f51-f9a5-4e85-ad72-19d7ba77e444','ANSWER-3',_binary '\0','fb758dfa-d2a8-4f4c-ba17-f3eb1c7b8ebd'),('9653c2cc-d376-49e8-80b5-460a79241f3e','ANSWER   9999999999',_binary '\0','1146c9ed-59c6-4b5e-bee5-00039ac81aa4'),('9c379d3b-41c9-47d7-af15-4022940eb4b6','Everyone agrees with you all the time',_binary '\0','ff6b09e8-d0cc-41fe-9217-aeccd53f7b51'),('a2d44804-f460-489e-ab3c-f0f3d109a8c8','To avoid conflict',_binary '\0','b569c2a4-27b5-45ca-9d7c-894b1dc5b365'),('a30562a8-3db9-43a5-b528-4f1b15812c93','Gaining confidence to express your true thoughts and feelings',_binary '','4d4281f2-99bc-4614-88d0-2e4aa28e0b70'),('a9adb037-40fd-460e-aae2-78104eb14ff6','Imitating someone else’s voice',_binary '','c1b7df09-381c-4fcf-af8a-8c664c0e3aa1'),('b21d2c19-03e4-4687-8cd8-12d9980180bd','A',_binary '','72d2b6da-710e-49fc-b08a-c7bb31a2fa96'),('be842f03-0ddc-45a5-aed8-3f0ad94aa87a','Becoming a public speaker',_binary '\0','4d4281f2-99bc-4614-88d0-2e4aa28e0b70'),('bf755896-be36-4107-968e-66c711d7be1f','ANSWER-3',_binary '\0','113463eb-fc8e-4514-adea-cb66a4d2d570'),('c4e33b6e-e449-41b5-a303-f7a1a5643ed4','ANSWER-3',_binary '\0','446e3f3a-b29b-4dde-ac42-d866aca60878'),('c724ef76-5c0a-4de8-b296-06eb834fbdca','ANSWER-6666666',_binary '','1146c9ed-59c6-4b5e-bee5-00039ac81aa4'),('d25d5a95-a1f9-4605-96bb-b98e18059b17','ANSWER-7777777777',_binary '\0','1146c9ed-59c6-4b5e-bee5-00039ac81aa4'),('d27f974c-53b8-4ec2-9c1a-c348ad82babe','ANSWER-4',_binary '\0','113463eb-fc8e-4514-adea-cb66a4d2d570'),('d51db644-85d9-4cdc-9e2e-6d65fc90c126','It helps you memorize others\' speeches',_binary '\0','94edb88d-d45f-4140-9736-892a372547f8'),('d88da59f-0ca3-4f92-bf41-33bac1316157','ANSWER-2',_binary '\0','446e3f3a-b29b-4dde-ac42-d866aca60878'),('dc2134e3-e5b0-4846-8561-7ee21dd04aff','Speaking your mind with honesty',_binary '\0','c1b7df09-381c-4fcf-af8a-8c664c0e3aa1'),('e0a2ed7b-2f41-4512-869d-3a0b5c48e24f','Avoiding self-reflection',_binary '\0','63974a67-da0a-43ae-bf13-b43e94dcb58d'),('e4d9d08c-3d82-4d9a-97b7-94e8093fa7e8','ANSWER-2',_binary '','113463eb-fc8e-4514-adea-cb66a4d2d570'),('e542828a-cb57-42d8-b5bd-442d7a4fcb39','B',_binary '','7a394eb2-ab18-4947-8109-be4601de3f41'),('e72ef5be-94de-44dc-84a5-07b5f7174c57','C',_binary '\0','7a394eb2-ab18-4947-8109-be4601de3f41'),('e8c4ca10-9aea-4689-a6ca-e52ade4d9a31','ANSWER-2',_binary '','8c8b0dab-65c0-4f05-9c3f-55244d753361'),('eb3d1608-897a-40bd-a462-88a2c0cd80a9','It makes you sound smarter',_binary '\0','94edb88d-d45f-4140-9736-892a372547f8'),('ed925863-2727-4618-87c4-fd65cf0ada72','Learning to sing',_binary '\0','4d4281f2-99bc-4614-88d0-2e4aa28e0b70'),('f50f6456-30a5-4fd2-b33f-7fa5c95f2c8a','It forces you to stay silent',_binary '\0','94edb88d-d45f-4140-9736-892a372547f8'),('fa5570f6-5769-49c4-90f6-bcd7be02789f','ANSWER-4',_binary '\0','8c8b0dab-65c0-4f05-9c3f-55244d753361'),('fea785d1-5ad9-4728-8808-e33caa12f46c','Taking time to reflect on your beliefs',_binary '\0','c1b7df09-381c-4fcf-af8a-8c664c0e3aa1');
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certification`
--

DROP TABLE IF EXISTS `certification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certification` (
  `certificate_id` varchar(255) NOT NULL,
  `certificate_name` varchar(255) DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `issuing_organization` varchar(255) DEFAULT NULL,
  `status` enum('APPROVED','PENDING_APPROVAL','REJECTED') DEFAULT NULL,
  `approved_by_admin_user_id` varchar(255) DEFAULT NULL,
  `uploaded_by_teacher_user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`certificate_id`),
  KEY `FKanptn6oobc4k8sroaict3vy1` (`approved_by_admin_user_id`),
  KEY `FKiep73gdadvh99rehb4ts85r77` (`uploaded_by_teacher_user_id`),
  CONSTRAINT `FKanptn6oobc4k8sroaict3vy1` FOREIGN KEY (`approved_by_admin_user_id`) REFERENCES `admin` (`user_id`),
  CONSTRAINT `FKiep73gdadvh99rehb4ts85r77` FOREIGN KEY (`uploaded_by_teacher_user_id`) REFERENCES `teacher` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certification`
--

LOCK TABLES `certification` WRITE;
/*!40000 ALTER TABLE `certification` DISABLE KEYS */;
INSERT INTO `certification` VALUES ('12feb760-5239-410f-bb8b-d25b862e7913','TOEIC 770','2024-10-15','2003-10-15','DNA National','PENDING_APPROVAL',NULL,'08877d35-f3ce-4c82-9664-4e5c5065f717'),('12feb760-5239-410f-bb8b-d25b862e7dd3','Gludse','2024-10-15','2003-10-15','DNA National','APPROVED','de8d872e-8266-49fa-8a13-33531b10e2f1','08877d35-f3ce-4c82-9664-4e5c5065f717'),('12feb760-5239-410f-bb8b-d25b862e7deq','IELTS 8.0','2024-10-15','2003-10-15','DNA National','REJECTED','de8d872e-8266-49fa-8a13-33531b10e2f1','08877d35-f3ce-4c82-9664-4e5c5065f717'),('12feb760-5239-410f-bb8b-d25b864e7913','Database IMS','2024-10-15','2003-10-15','SIYT International','PENDING_APPROVAL',NULL,'0bc87564-f672-424a-b248-3016d66310e0'),('3822bf38-a64f-4caa-a551-dfc56ccf72a5','Proof_1','2024-10-15','2003-10-15','DNA National','PENDING_APPROVAL',NULL,'08877d35-f3ce-4c82-9664-4e5c5065f717');
/*!40000 ALTER TABLE `certification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certification_proof_images`
--

DROP TABLE IF EXISTS `certification_proof_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certification_proof_images` (
  `certification_certificate_id` varchar(255) NOT NULL,
  `proof_images_image_id` varchar(255) NOT NULL,
  UNIQUE KEY `UKt5lu788o3deu0sr3beavuw8sk` (`proof_images_image_id`),
  KEY `FKbg8bouya6ix4545bg9n1n8rl7` (`certification_certificate_id`),
  CONSTRAINT `FKbg8bouya6ix4545bg9n1n8rl7` FOREIGN KEY (`certification_certificate_id`) REFERENCES `certification` (`certificate_id`),
  CONSTRAINT `FKh8qiko3vhlam3goqx8eqh6xye` FOREIGN KEY (`proof_images_image_id`) REFERENCES `image` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certification_proof_images`
--

LOCK TABLES `certification_proof_images` WRITE;
/*!40000 ALTER TABLE `certification_proof_images` DISABLE KEYS */;
INSERT INTO `certification_proof_images` VALUES ('3822bf38-a64f-4caa-a551-dfc56ccf72a5','03aeda72-3e67-482c-ba17-f00383b9f3d2'),('3822bf38-a64f-4caa-a551-dfc56ccf72a5','19baca62-5e56-4ae9-9c83-f659b4e31299'),('3822bf38-a64f-4caa-a551-dfc56ccf72a5','70d38efc-44ba-4bc7-9e9b-5c0a3573ccee');
/*!40000 ALTER TABLE `certification_proof_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` varchar(255) NOT NULL,
  `course_description` varchar(255) DEFAULT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `course_price` float NOT NULL,
  `course_uploaded_at` datetime(6) DEFAULT NULL,
  `status` enum('PENDING_APPROVAL','APPROVED','REJECTED','IN_EDITING') DEFAULT NULL,
  `approved_by_admin_user_id` varchar(255) DEFAULT NULL,
  `image_image_id` varchar(255) DEFAULT NULL,
  `uploaded_by_teacher_user_id` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) NOT NULL,
  `course_level` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  UNIQUE KEY `UKinds57ry7n6sxvyeuieua56i2` (`image_image_id`),
  KEY `FKfxjylaj6tmxos3uxsk79oqpug` (`approved_by_admin_user_id`),
  KEY `FKrojvr6swod79efruh685gjejr` (`uploaded_by_teacher_user_id`),
  CONSTRAINT `FKb89e7q45apdq655ayx2qw5qlg` FOREIGN KEY (`image_image_id`) REFERENCES `image` (`image_id`),
  CONSTRAINT `FKfxjylaj6tmxos3uxsk79oqpug` FOREIGN KEY (`approved_by_admin_user_id`) REFERENCES `admin` (`user_id`),
  CONSTRAINT `FKrojvr6swod79efruh685gjejr` FOREIGN KEY (`uploaded_by_teacher_user_id`) REFERENCES `teacher` (`user_id`),
  CONSTRAINT `chk_course_level` CHECK ((`course_level` in (_utf8mb4'BEGINNER',_utf8mb4'INTERMEDIATE',_utf8mb4'ADVANCED',_utf8mb4'EXPERT'))),
  CONSTRAINT `status_check` CHECK ((`status` in (_utf8mb4'PENDING_APPROVAL',_utf8mb4'APPROVED',_utf8mb4'REJECTED',_utf8mb4'IN_EDITING')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('03031bab-e364-402e-879f-4c8d806a6b0c','1','Create Testing 8',0,'2024-10-03 10:57:54.287466','IN_EDITING',NULL,'df6d40c9-ce85-4f7f-84e2-0be45feb4cc2','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('04dacbe6-57af-4fc9-bf7b-7be61ecc1cc8','Create Testing 5','Create Testing 5',0,'2024-10-03 10:55:16.342661','IN_EDITING',NULL,'d3f2d55e-7913-4f05-bda7-7b36b23b0150','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('0973d617-8cd2-4759-bdb1-e58635ef1803','15','Create Testing 15',0,'2024-10-03 14:04:35.737179','IN_EDITING',NULL,'180a7cb1-7f2d-4c4a-a261-d6d16e5dd090','0bc87564-f672-424a-b248-3016d66310e0',_binary '\0','BEGINNER'),('1913a125-d9ed-4fda-870b-d28f09ebefc4','16','Create Testing 16',0,'2024-10-03 14:39:01.451215','IN_EDITING',NULL,'795f6beb-450a-4933-81fd-79c8b5721991','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('21f55e49-5080-432b-a0b1-3a1eadcf32c4','Basic English With Koala - Part 4','Basic English With Koala - Part 4',0,'2024-10-02 22:45:12.885245','IN_EDITING',NULL,'d29e630b-2548-459b-a5e4-3f2bba3829d0','0bc87564-f672-424a-b248-3016d66310e0',_binary '\0','BEGINNER'),('252f9a33-e448-4eb5-bbce-c03e12c346d7','Create Testing 3','Create Testing 3',0,'2024-10-02 23:02:59.018489','IN_EDITING',NULL,'ffd87ff3-6477-4e36-aed4-55d9d19fd03d','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('325eaec7-e976-4fe8-a3e7-6ffc3c644fe8','Create Testing 1','Create Testing 1',0,'2024-10-02 22:59:51.072718','IN_EDITING',NULL,'14b2b6ed-b009-4796-8284-da0b6b602b86','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('3f9e627a-9046-421b-9e72-0aba2b7d578c','Learn to work with data in Python, including data cleaning, visualization, and statistical analysis.','Data Analysis with Python - Part2',420.5,'2024-09-21 14:37:58.352387','PENDING_APPROVAL',NULL,'8cc08f9a-a4c6-47ac-a0cd-a6cb1c9935a7','08877d35-f3ce-4c82-9664-4e5c5065f717',_binary '\0','INTERMEDIATE'),('42c2887d-e63a-46e1-9ac5-db82063a7b4e','Designed for healthcare workers, this course covers medical terminology, patient communication, and writing reports in English.','English for Healthcare Professionals - Part 1',149.92,'2024-09-09 14:54:15.453186','PENDING_APPROVAL',NULL,'28fafea3-124d-462c-a34f-d1aef2a3ddad','08877d35-f3ce-4c82-9664-4e5c5065f717',_binary '\0','BEGINNER'),('46e400c1-baa2-40d6-a5a1-e7077e0fdf04','14','Create Testing 14',0,'2024-10-03 11:17:07.258240','IN_EDITING',NULL,'fd712a7c-2013-4b28-82f5-8b61c0f58529','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('4bc18f42-433a-41ce-94a9-ce1cc57ec66d','This course enhances your creative writing skills through various genres, including fiction, poetry, and storytelling in English.','Creative Writing in English',87.2,'2024-09-07 21:32:40.042108','APPROVED','154bd7d7-c989-424f-a8f2-2f4bab7133b5','d41e500a-edc7-47fe-8225-8c2c1aae5abb','0bc87564-f672-424a-b248-3016d66310e0',_binary '\0','BEGINNER'),('53f8fe54-d8bf-462f-8e34-e1679b9a95ad','13','Create Testing 13',0,'2024-10-03 11:15:18.235186','IN_EDITING',NULL,'d6f4231a-4009-4a45-a207-cc70fbd04c48','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('577c80a8-3550-4125-85c1-c165086e76d4','11','Create Testing 11',0,'2024-10-03 11:13:51.346618','IN_EDITING',NULL,'1abdfe99-d517-4242-9558-1266d5a4d662','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('65ad597d-4771-4ce2-ae46-d5bfa0d4edc7','Designed for healthcare workers, this course covers medical terminology, patient communication, and writing reports in English.','English for Healthcare Professionals - Part 3',149.92,'2024-09-09 12:47:12.366096','PENDING_APPROVAL',NULL,'a0b4aa36-88e1-43f9-b538-40ce2b0d5107','08877d35-f3ce-4c82-9664-4e5c5065f717',_binary '\0','EXPERT'),('6cf7c084-29b8-493d-b3c1-c991bc4cb461','Designed for healthcare workers, this course covers medical terminology, patient communication, and writing reports in English.','English for Healthcare Professionals - Part 2',149.92,'2024-09-07 21:37:12.262766','APPROVED','de8d872e-8266-49fa-8a13-33531b10e2f1','dd89a29a-f32a-41cc-9674-89b5f8a6b9b8','0bc87564-f672-424a-b248-3016d66310e0',_binary '\0','INTERMEDIATE'),('739d1b0d-946a-4243-9fa4-0f4b9e55e858','Create Testing 2','Create Testing 2',0,'2024-10-02 23:00:47.752338','IN_EDITING',NULL,'e12312b4-e475-43c5-b9e7-4ecb67817032','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('77534ac9-87e7-461e-aa1e-581a30a2be68','This course focuses on English language skills needed for travel, including booking accommodations, navigating airports, and handling common travel situations.','English for Travel',137.4,'2024-09-02 15:46:49.697899','REJECTED','154bd7d7-c989-424f-a8f2-2f4bab7133b5','0f75fdeb-212e-4da5-87f0-eb70f42c76bd','08877d35-f3ce-4c82-9664-4e5c5065f717',_binary '\0','INTERMEDIATE'),('77d0fccb-2a0b-42ec-94db-ed37f9f2adbe','20','Create Testing 20',0,'2024-10-05 12:35:00.383800','IN_EDITING',NULL,'a5e4ba0c-4a1b-4569-aed4-4f3aab9e8d3e','2b7a2933-b8b0-4e95-89ad-451e85d30d43',_binary '\0','BEGINNER'),('7a450a15-0878-4457-beb5-2ac8e56fd4e1','19','Create Testing 19',0,'2024-10-05 11:46:21.989167','IN_EDITING',NULL,'91641b5d-b872-41d4-ac51-1aa68b479949','0bc87564-f672-424a-b248-3016d66310e0',_binary '\0','BEGINNER'),('7d402f72-723e-4f2a-94c7-d050f7e6336d','12','Create Testing 12',0,'2024-10-03 11:14:02.805245','IN_EDITING',NULL,'75ad3e06-d037-4253-b4e5-82281d687596','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('7e08ed78-fb48-459e-845d-800171a916ff','Create Testing 6','Create Testing 6',0,'2024-10-03 10:56:09.819548','IN_EDITING',NULL,'8b078156-b77e-4a52-a934-34712af6581f','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('7e9ea213-f8fe-4032-8507-dc202b694585','9','Create Testing 9',0,'2024-10-03 11:09:16.658014','IN_EDITING',NULL,'01d3af37-4539-47e8-8952-6558bc3aa450','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('876e4430-c1b1-487f-a209-cca520573847','Basic English With Koala - Part 3','Basic English With Koala - Part 3',0,'2024-10-02 22:35:28.933099','IN_EDITING',NULL,'cf039c95-2aee-4ba6-8875-98824e3ec59a','0bc87564-f672-424a-b248-3016d66310e0',_binary '\0','BEGINNER'),('877633c9-05e6-4fb3-b1e3-b702504bc8b1','This course is designed to improve everyday English communication skills, focusing on speaking, listening, and practical conversation.','English Communication Skills',120,'2024-09-02 23:27:40.774371','APPROVED','154bd7d7-c989-424f-a8f2-2f4bab7133b5','28264c29-934d-44d4-9201-30aa761cd9dc','0bc87564-f672-424a-b248-3016d66310e0',_binary '\0','BEGINNER'),('8894a8a3-2493-4f61-a591-39c5cee9d0ef','Basic English With Koala - Part 2','Basic English With Koala - Part 2',0,'2024-10-02 22:32:12.191200','IN_EDITING',NULL,'e51b7f6f-d087-4bea-89ce-0893cb9e7a3f','0bc87564-f672-424a-b248-3016d66310e0',_binary '\0','BEGINNER'),('88fdf9ab-3b53-4456-8120-b097eaf1808e','2','Basic English With Koala',0,'2024-10-07 12:37:21.566770','IN_EDITING',NULL,'dee2f446-038c-4cef-a319-022b21f7f294','3585f1a4-07d9-460d-8a63-b9e2ee128f3e',_binary '\0','BEGINNER'),('90633e60-0a17-4b59-92a1-d53bae49c25a','1','Create Testing 8',0,'2024-10-03 11:07:55.762905','IN_EDITING',NULL,'151e30ec-07cb-48ea-9207-25e834adbf46','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('9b600cc7-007d-436e-a784-5bf3bd1b65c7','Create Testing 6','Create Testing 7',0,'2024-10-03 10:56:43.111269','IN_EDITING',NULL,'834018f2-454a-4922-b795-b3c3ed195b92','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('a1e45fc6-d5bc-431e-8e9b-cba37d1dc7a6','10','Create Testing 10',0,'2024-10-03 11:10:36.027091','IN_EDITING',NULL,'9d699650-b121-4c1c-8033-d19c3527762d','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('ac2a192f-ac56-4b07-b2f1-62de7adbf442','Basic English With Koala - Part 5','Basic English With Koala - Part 5',0,'2024-10-02 22:46:12.607050','IN_EDITING',NULL,'ba5cb85c-c04a-472a-9a8a-83c6de3f1c7c','0bc87564-f672-424a-b248-3016d66310e0',_binary '\0','BEGINNER'),('be1833d6-8e21-4d4b-89e8-ccf8153c4572','This course helps students improve their English for professional and academic environments, focusing on listening and reading skills for the TOEIC exam.','TOEIC Exam Preparation',150,'2024-09-02 15:45:00.865716','PENDING_APPROVAL','154bd7d7-c989-424f-a8f2-2f4bab7133b5','534f03cb-0942-4e69-b5ed-1c3ff4cc118f','0bc87564-f672-424a-b248-3016d66310e0',_binary '\0','INTERMEDIATE'),('c13f8fc8-2b20-455b-8f25-41d4df61d797','Basic English With Koala','Basic English With Koala',0,'2024-10-02 22:25:22.632733','IN_EDITING',NULL,'638b81f0-3a88-4b06-9ad6-64cf70cc3abe','0bc87564-f672-424a-b248-3016d66310e0',_binary '\0','BEGINNER'),('d429bc00-3ae6-4e77-9e9a-dd265c2220b7','This course prepares students for the IELTS exam with a focus on listening, reading, writing, and speaking skills. It includes test strategies and practice exams.','IELTS Preparation Course',180,'2024-09-03 01:15:17.461035','REJECTED','154bd7d7-c989-424f-a8f2-2f4bab7133b5','e9bcf93b-7b53-40a2-81ed-f9b1788215a2','0bc87564-f672-424a-b248-3016d66310e0',_binary '\0','BEGINNER'),('e77a9f18-1d71-4d07-8f1d-7989a2320b7d','Create Testing 4','Create Testing 4',0,'2024-10-03 10:53:30.188644','IN_EDITING',NULL,'0a3e5449-1c5b-4a26-a9da-4f52a29ab7d5','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('e8e1d7b9-3a85-4f8e-b7cf-ea7c41f0db0b','18','Create Testing 18',0,'2024-10-04 12:13:30.071913','IN_EDITING',NULL,'fdfbf4af-e507-4c6e-9f98-5076c111a782','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('eca4c0c9-1696-411b-b0aa-21fa0759ba05','Learn to work with data in Python, including data cleaning, visualization, and statistical analysis.','Data Analysis with Python - Part4',320.5,'2024-10-02 18:58:34.465912','IN_EDITING',NULL,'54262972-f79d-44e5-9a3d-a4b42f2081df','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','INTERMEDIATE'),('f25653ce-1ca3-49ef-a2c6-935d1460faf4','17','Create Testing 17',20,'2024-10-04 12:08:05.265149','IN_EDITING',NULL,'841802c2-2af4-4b9b-aa11-fa8012933467','77e2720f-3766-411c-9a83-d66fe9e8695b',_binary '\0','BEGINNER'),('f38978db-f331-4ea4-b0e9-6e5bc5eb50f4','Learn to work with data in Python, including data cleaning, visualization, and statistical analysis.','Data Analysis with Python',295.99,'2024-09-21 14:31:36.679885','APPROVED','154bd7d7-c989-424f-a8f2-2f4bab7133b5','dbab6e8b-7ae2-464e-b259-643436ea3b53','08877d35-f3ce-4c82-9664-4e5c5065f717',_binary '\0','INTERMEDIATE'),('f6e31b35-3fee-4669-a0b3-12facc4c8ddb','This course is designed for professionals seeking to enhance their business English skills, with advanced topics including negotiations, presentations, and business correspondence.','Advanced Business English',217.5,'2024-09-02 23:27:32.169979','IN_EDITING','154bd7d7-c989-424f-a8f2-2f4bab7133b5','217ab01c-002f-456a-8649-3c48b233fb7e','0bc87564-f672-424a-b248-3016d66310e0',_binary '\0','ADVANCED'),('fdea06df-65ac-4f74-a75d-d06b7cd44cbd','Tailored for IT professionals, this course focuses on technical vocabulary, communication skills in tech environments, and writing documentation.','English for Tech Professionals',145,'2024-09-07 21:28:38.741934','APPROVED','154bd7d7-c989-424f-a8f2-2f4bab7133b5','a6932097-1a4e-44e8-8e42-37965757435b','08877d35-f3ce-4c82-9664-4e5c5065f717',_binary '\0','EXPERT');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_fields`
--

DROP TABLE IF EXISTS `course_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_fields` (
  `course_course_id` varchar(255) NOT NULL,
  `fields_field_name` varchar(255) NOT NULL,
  PRIMARY KEY (`course_course_id`,`fields_field_name`),
  KEY `FKif9v76r9gpu2oybrfh9em2g5p` (`fields_field_name`),
  CONSTRAINT `FKif9v76r9gpu2oybrfh9em2g5p` FOREIGN KEY (`fields_field_name`) REFERENCES `field` (`field_name`),
  CONSTRAINT `FKon2mlhdr7sr4phxalnkrkv5s7` FOREIGN KEY (`course_course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_fields`
--

LOCK TABLES `course_fields` WRITE;
/*!40000 ALTER TABLE `course_fields` DISABLE KEYS */;
INSERT INTO `course_fields` VALUES ('f6e31b35-3fee-4669-a0b3-12facc4c8ddb','business'),('3f9e627a-9046-421b-9e72-0aba2b7d578c','dataScience'),('f38978db-f331-4ea4-b0e9-6e5bc5eb50f4','dataScience'),('42c2887d-e63a-46e1-9ac5-db82063a7b4e','education'),('4bc18f42-433a-41ce-94a9-ce1cc57ec66d','education'),('3f9e627a-9046-421b-9e72-0aba2b7d578c','engineering'),('eca4c0c9-1696-411b-b0aa-21fa0759ba05','engineering'),('f38978db-f331-4ea4-b0e9-6e5bc5eb50f4','engineering'),('3f9e627a-9046-421b-9e72-0aba2b7d578c','english'),('42c2887d-e63a-46e1-9ac5-db82063a7b4e','english'),('4bc18f42-433a-41ce-94a9-ce1cc57ec66d','english'),('6cf7c084-29b8-493d-b3c1-c991bc4cb461','english'),('876e4430-c1b1-487f-a209-cca520573847','english'),('877633c9-05e6-4fb3-b1e3-b702504bc8b1','english'),('8894a8a3-2493-4f61-a591-39c5cee9d0ef','english'),('be1833d6-8e21-4d4b-89e8-ccf8153c4572','english'),('c13f8fc8-2b20-455b-8f25-41d4df61d797','english'),('d429bc00-3ae6-4e77-9e9a-dd265c2220b7','english'),('eca4c0c9-1696-411b-b0aa-21fa0759ba05','english'),('f25653ce-1ca3-49ef-a2c6-935d1460faf4','english'),('f38978db-f331-4ea4-b0e9-6e5bc5eb50f4','english'),('f6e31b35-3fee-4669-a0b3-12facc4c8ddb','english'),('fdea06df-65ac-4f74-a75d-d06b7cd44cbd','english'),('42c2887d-e63a-46e1-9ac5-db82063a7b4e','healthcare'),('6cf7c084-29b8-493d-b3c1-c991bc4cb461','healthcare'),('fdea06df-65ac-4f74-a75d-d06b7cd44cbd','technology'),('4bc18f42-433a-41ce-94a9-ce1cc57ec66d','writing');
/*!40000 ALTER TABLE `course_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_types`
--

DROP TABLE IF EXISTS `course_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_types` (
  `course_course_id` varchar(255) NOT NULL,
  `types_type_name` varchar(255) NOT NULL,
  PRIMARY KEY (`course_course_id`,`types_type_name`),
  KEY `FKim7y8xamdd44enafurq63wrgc` (`types_type_name`),
  CONSTRAINT `FKim7y8xamdd44enafurq63wrgc` FOREIGN KEY (`types_type_name`) REFERENCES `type` (`type_name`),
  CONSTRAINT `FKr6xvf8kl4vaiu2ukop8cpd5v7` FOREIGN KEY (`course_course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_types`
--

LOCK TABLES `course_types` WRITE;
/*!40000 ALTER TABLE `course_types` DISABLE KEYS */;
INSERT INTO `course_types` VALUES ('d429bc00-3ae6-4e77-9e9a-dd265c2220b7','AcademicEnglish'),('f25653ce-1ca3-49ef-a2c6-935d1460faf4','AcademicEnglish'),('f25653ce-1ca3-49ef-a2c6-935d1460faf4','AdvancedEnglish'),('f6e31b35-3fee-4669-a0b3-12facc4c8ddb','AdvancedEnglish'),('be1833d6-8e21-4d4b-89e8-ccf8153c4572','BusinessEnglish'),('f6e31b35-3fee-4669-a0b3-12facc4c8ddb','BusinessEnglish'),('876e4430-c1b1-487f-a209-cca520573847','ConversationalEnglish'),('877633c9-05e6-4fb3-b1e3-b702504bc8b1','ConversationalEnglish'),('8894a8a3-2493-4f61-a591-39c5cee9d0ef','ConversationalEnglish'),('c13f8fc8-2b20-455b-8f25-41d4df61d797','ConversationalEnglish'),('4bc18f42-433a-41ce-94a9-ce1cc57ec66d','CreativeEnglish'),('876e4430-c1b1-487f-a209-cca520573847','EnglishCommunication'),('877633c9-05e6-4fb3-b1e3-b702504bc8b1','EnglishCommunication'),('8894a8a3-2493-4f61-a591-39c5cee9d0ef','EnglishCommunication'),('c13f8fc8-2b20-455b-8f25-41d4df61d797','EnglishCommunication'),('d429bc00-3ae6-4e77-9e9a-dd265c2220b7','IELTS'),('42c2887d-e63a-46e1-9ac5-db82063a7b4e','MedicalEnglish'),('65ad597d-4771-4ce2-ae46-d5bfa0d4edc7','MedicalEnglish'),('6cf7c084-29b8-493d-b3c1-c991bc4cb461','MedicalEnglish'),('77534ac9-87e7-461e-aa1e-581a30a2be68','PracticalEnglish'),('42c2887d-e63a-46e1-9ac5-db82063a7b4e','ProfessionalEnglish'),('65ad597d-4771-4ce2-ae46-d5bfa0d4edc7','ProfessionalEnglish'),('6cf7c084-29b8-493d-b3c1-c991bc4cb461','ProfessionalEnglish'),('fdea06df-65ac-4f74-a75d-d06b7cd44cbd','ProfessionalEnglish'),('877633c9-05e6-4fb3-b1e3-b702504bc8b1','SpeakingSkills'),('3f9e627a-9046-421b-9e72-0aba2b7d578c','TechnicalEnglish'),('eca4c0c9-1696-411b-b0aa-21fa0759ba05','TechnicalEnglish'),('f38978db-f331-4ea4-b0e9-6e5bc5eb50f4','TechnicalEnglish'),('fdea06df-65ac-4f74-a75d-d06b7cd44cbd','TechnicalEnglish'),('be1833d6-8e21-4d4b-89e8-ccf8153c4572','TestPreparation'),('d429bc00-3ae6-4e77-9e9a-dd265c2220b7','TestPreparation'),('be1833d6-8e21-4d4b-89e8-ccf8153c4572','TOEIC'),('77534ac9-87e7-461e-aa1e-581a30a2be68','TravelEnglish'),('4bc18f42-433a-41ce-94a9-ce1cc57ec66d','WritingSkills');
/*!40000 ALTER TABLE `course_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount` (
  `discount_id` varchar(255) NOT NULL,
  `discount_rate` float NOT NULL,
  `end_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `created_by_admin_user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`discount_id`),
  KEY `FKb37k3i6vkpnw1v6xifeg0mhc1` (`created_by_admin_user_id`),
  CONSTRAINT `FKb37k3i6vkpnw1v6xifeg0mhc1` FOREIGN KEY (`created_by_admin_user_id`) REFERENCES `admin` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount`
--

LOCK TABLES `discount` WRITE;
/*!40000 ALTER TABLE `discount` DISABLE KEYS */;
INSERT INTO `discount` VALUES ('d9cf55e5-58a2-4fdc-8b89-5b432e9edc05',0.3,'2024-08-15','2024-08-15','154bd7d7-c989-424f-a8f2-2f4bab7133b5'),('d9cf55e5-58a2-4fdc-8b89-5b432e9edc06',0.5,'2024-08-15','2024-08-15','154bd7d7-c989-424f-a8f2-2f4bab7133b5');
/*!40000 ALTER TABLE `discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount_course`
--

DROP TABLE IF EXISTS `discount_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount_course` (
  `discount_course_id` varchar(255) NOT NULL,
  `status` enum('APPROVED','PENDING_APPROVAL','REJECTED') DEFAULT NULL,
  `course_course_id` varchar(255) DEFAULT NULL,
  `discount_discount_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`discount_course_id`),
  UNIQUE KEY `unique_discount_and_course` (`discount_discount_id`,`course_course_id`),
  KEY `FKr71cag26jvykukbxy0rsk5oj5` (`course_course_id`),
  CONSTRAINT `FK541y38qixluslge54gkk0h88f` FOREIGN KEY (`discount_discount_id`) REFERENCES `discount` (`discount_id`) ON DELETE CASCADE,
  CONSTRAINT `FKr71cag26jvykukbxy0rsk5oj5` FOREIGN KEY (`course_course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_course`
--

LOCK TABLES `discount_course` WRITE;
/*!40000 ALTER TABLE `discount_course` DISABLE KEYS */;
INSERT INTO `discount_course` VALUES ('6eab840a-6681-4b41-8931-8f85745d5899','APPROVED','f6e31b35-3fee-4669-a0b3-12facc4c8ddb','d9cf55e5-58a2-4fdc-8b89-5b432e9edc05'),('b455b6e6-2650-4c6d-ba54-b9f2a840279c','APPROVED','f6e31b35-3fee-4669-a0b3-12facc4c8ddb','d9cf55e5-58a2-4fdc-8b89-5b432e9edc06'),('c7a7a833-39ce-458b-9f34-1d04d026636c','PENDING_APPROVAL','877633c9-05e6-4fb3-b1e3-b702504bc8b1','d9cf55e5-58a2-4fdc-8b89-5b432e9edc06'),('c7a7a833-39ce-458b-9f34-1d07d026636c','APPROVED','6cf7c084-29b8-493d-b3c1-c991bc4cb461','d9cf55e5-58a2-4fdc-8b89-5b432e9edc06');
/*!40000 ALTER TABLE `discount_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enroll_course`
--

DROP TABLE IF EXISTS `enroll_course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enroll_course` (
  `enroll_course_id` varchar(255) NOT NULL,
  `enroll_at` datetime(6) DEFAULT NULL,
  `process` float NOT NULL,
  `course_course_id` varchar(255) DEFAULT NULL,
  `student_user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`enroll_course_id`),
  UNIQUE KEY `unique_course_and_student` (`course_course_id`,`student_user_id`),
  KEY `FKlo7f47qeaog9k67kyhnvpk4g5` (`student_user_id`),
  CONSTRAINT `FKlo7f47qeaog9k67kyhnvpk4g5` FOREIGN KEY (`student_user_id`) REFERENCES `student` (`user_id`),
  CONSTRAINT `FKlsr1ddcl3ismr5shnjpwhwn32` FOREIGN KEY (`course_course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enroll_course`
--

LOCK TABLES `enroll_course` WRITE;
/*!40000 ALTER TABLE `enroll_course` DISABLE KEYS */;
INSERT INTO `enroll_course` VALUES ('2603b445-66e6-4eb8-b7aa-ad03a7c2bbfa','2024-09-08 17:59:01.679395',0,'4bc18f42-433a-41ce-94a9-ce1cc57ec66d','7cba39b1-1fbe-4687-a63c-9560ec29d166'),('2e554fea-f72e-469f-8e0b-dead7079cf2c','2024-09-08 17:55:07.643413',0,'4bc18f42-433a-41ce-94a9-ce1cc57ec66d','3e1e88b1-c6ba-492c-b362-75e7dc3cceba'),('39964106-b719-475a-a69f-209507f986f4','2024-09-06 08:10:17.014344',0,'77534ac9-87e7-461e-aa1e-581a30a2be68','a917d04b-68ac-46e0-85d8-ead65f38eefc'),('3f200e3f-f91b-4f6a-a2f2-c93f2911546f','2024-09-08 18:04:20.347435',0,'6cf7c084-29b8-493d-b3c1-c991bc4cb461','424eac21-9dc7-4461-aa48-930051720145'),('49dac9b1-5fa5-4454-9714-962b8bc5b348','2024-09-08 17:59:29.739593',1,'4bc18f42-433a-41ce-94a9-ce1cc57ec66d','8463b920-18d6-4044-bdd6-e7398dc52b53'),('7e1b50e5-7544-4948-afd8-f9dd59cf290a','2024-09-08 18:05:47.046599',0,'6cf7c084-29b8-493d-b3c1-c991bc4cb461','8f96bc01-fa5f-4384-b7f1-efb1ae4ed122'),('7e97f265-ab24-4037-aebd-d896ef5b0e15','2024-09-08 18:00:02.860078',0,'4bc18f42-433a-41ce-94a9-ce1cc57ec66d','8f96bc01-fa5f-4384-b7f1-efb1ae4ed122'),('91bc16c3-02c8-44be-ae08-fcf775ff46c9','2024-09-08 18:05:23.337321',0,'6cf7c084-29b8-493d-b3c1-c991bc4cb461','8463b920-18d6-4044-bdd6-e7398dc52b53'),('9ea7a15c-b531-41b8-9a0e-e9ba00cd96fa','2024-09-08 18:03:49.801426',0,'6cf7c084-29b8-493d-b3c1-c991bc4cb461','3e1e88b1-c6ba-492c-b362-75e7dc3cceba'),('aed44ff4-84c9-4e61-882e-719b8b528fac','2024-09-06 08:36:54.801432',0.3,'877633c9-05e6-4fb3-b1e3-b702504bc8b1','a917d04b-68ac-46e0-85d8-ead65f38eefc'),('c21f6225-cf70-46a6-914c-8f1c620898c7','2024-09-08 17:55:48.975703',1,'4bc18f42-433a-41ce-94a9-ce1cc57ec66d','424eac21-9dc7-4461-aa48-930051720145'),('c8978455-e97c-43ea-92dc-530ae27889e0','2024-09-08 18:02:19.106016',1,'4bc18f42-433a-41ce-94a9-ce1cc57ec66d','a917d04b-68ac-46e0-85d8-ead65f38eefc'),('df613f15-74df-4c75-b334-7b2e11a917ba','2024-09-08 18:06:21.244358',0,'6cf7c084-29b8-493d-b3c1-c991bc4cb461','a917d04b-68ac-46e0-85d8-ead65f38eefc'),('f1eacb06-3967-476b-bdf9-425a7c23b0e5','2024-09-08 18:04:43.861858',0,'f38978db-f331-4ea4-b0e9-6e5bc5eb50f4','7cba39b1-1fbe-4687-a63c-9560ec29d166'),('f20b0cdd-55ab-4753-ad29-b862b3d89d4a','2024-09-14 21:20:51.816501',0.5,'6cf7c084-29b8-493d-b3c1-c991bc4cb461','021ebec3-c49d-4c34-999a-56857e3eade1');
/*!40000 ALTER TABLE `enroll_course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `field`
--

DROP TABLE IF EXISTS `field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `field` (
  `field_name` varchar(255) NOT NULL,
  `field_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`field_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES ('business','Courses focusing on business strategy, finance, and leadership.'),('computerScience','Courses related to programming, algorithms, and data structures.'),('dataScience','Courses involving data analysis, machine learning, and statistics.'),('education','Courses related to teaching methods, curriculum development, and pedagogy.'),('engineering','Courses covering mechanical, electrical, and civil engineering topics.'),('english','Covers English grammar, vocabulary, and language proficiency.'),('healthcare','Courses covering medical knowledge, healthcare management, and nursing.'),('law','Courses related to legal systems, contracts, and criminal justice.'),('marketing','Courses focusing on advertising, digital marketing, and brand management.'),('psychology','Courses on mental health, behavioral analysis, and cognitive science.'),('technology','Courses focused on software development, cloud computing, artificial intelligence, and cutting-edge innovations in IT.'),('writing','Courses aimed at improving writing skills, including creative writing, technical writing, and business communication.');
/*!40000 ALTER TABLE `field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `image_id` varchar(255) NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES ('01d3af37-4539-47e8-8952-6558bc3aa450','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('03aeda72-3e67-482c-ba17-f00383b9f3d2','https://img.freepik.com/free-vector/certificate-template-with-elegant-elements_23-2148568461.jpg?t=st=1726913659~exp=1726917259~hmac=57b4dbedfaff1b9ff40afb87bb9d4b43f859e8693dd5f419de829ffa0b33dfd6&w=1380'),('06c545d4-fe45-4651-9dda-d2d770a7a84a','admin'),('0a3e5449-1c5b-4a26-a9da-4f52a29ab7d5','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('0f75fdeb-212e-4da5-87f0-eb70f42c76bd','https://img.freepik.com/free-vector/three-horizontal-london-banner-set-with-london-sights-culture-symbols-descriptions_1284-33878.jpg?t=st=1725717988~exp=1725721588~hmac=9b2e6b4c2c394b1e4d18af62c2eebc69e2160b83c3610a9ceacda249ab384388&w=740'),('12125a13-4ed3-4d0c-8e63-79fd5198c420','https://img.freepik.com/free-vector/pet-logo-design-paw-vector-animal-shop-business_53876-136741.jpg?t=st=1728022504~exp=1728026104~hmac=f154f50e0efa26b10074cc7c500220c50ab2917a099583b70da321b2fb10ad58&w=740'),('12125a13-4ed3-4d0c-8e63-79fd5198c49f','https://img.freepik.com/free-photo/lovely-pet-portrait-isolated_23-2149192357.jpg?t=st=1728021207~exp=1728024807~hmac=d1d0c062c927d8e78677d4800987b43f0e71ad16ea0714f0a7e98ca1a8f1dbc1&w=1380'),('12528873-5027-4e65-a683-1fb4199a68e0','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('13a36dda-ae7a-43d3-830f-f06025f5c8b8',NULL),('14b2b6ed-b009-4796-8284-da0b6b602b86','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('151e30ec-07cb-48ea-9207-25e834adbf46','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('180a7cb1-7f2d-4c4a-a261-d6d16e5dd090','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('18823f9c-e90a-48cc-9426-29b8634d0163','https://img.freepik.com/free-vector/language-concept-with-speech-bubbles_23-2147887055.jpg?t=st=1726465644~exp=1726469244~hmac=e333d519cf71a561773b379ca3031272224d6b1b86da904a4727c8ab5d045bba&w=826'),('19baca62-5e56-4ae9-9c83-f659b4e31299','https://img.freepik.com/free-vector/certificate-template-with-elegant-elements_23-2148568461.jpg?t=st=1726913659~exp=1726917259~hmac=57b4dbedfaff1b9ff40afb87bb9d4b43f859e8693dd5f419de829ffa0b33dfd6&w=1380'),('1abdfe99-d517-4242-9558-1266d5a4d662','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('217ab01c-002f-456a-8649-3c48b233fb7e','https://img.freepik.com/free-vector/education-dictionaries-communication-different-languages-translation-dictionary-concepts-flat-style_1284-41319.jpg?t=st=1725717852~exp=1725721452~hmac=440b03d4dbd26d6276eb17f010550f9de0277828c0c206d74dc9d775c4941562&w=996'),('247bf031-a9f0-45ff-911e-3fc8c0253ac8',NULL),('2526bca5-8dbc-4968-9774-f64249386b5e','https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?t=st=1727871003~exp=1727874603~hmac=f8c37610237b941bbc670d98edab8384afee90d0e447acfb13e23f588f48562a&w=740'),('2629d109-0525-4e32-a48e-50a9b9400858','https://img.freepik.com/premium-vector/business-professionals-exchanging-handshakes_1319560-43983.jpg?w=826'),('28264c29-934d-44d4-9201-30aa761cd9dc','https://img.freepik.com/free-vector/hand-drawn-english-book-illustration_23-2149517759.jpg?t=st=1725717407~exp=1725721007~hmac=6521006e0ed4b1bdf3573037b6655b6f632dad24bae32e4b8eca4d5deb41ba4c&w=740'),('286f95bb-30df-4d7d-b615-8c967fb8ae0f',NULL),('28fafea3-124d-462c-a34f-d1aef2a3ddad','https://img.freepik.com/free-vector/gradient-world-health-day-background_23-2149309101.jpg?t=st=1725719813~exp=1725723413~hmac=6e74d23a2577ee9bc355dd603a66dd41ca0a760b523b09a9d6e75a8fe24ec9b1&w=1380'),('2b556b3c-27c9-4b70-8fc3-8a69a1cd85b6','https://img.freepik.com/free-vector/cute-koala-hanging-tree-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated_138676-8369.jpg?t=st=1725785461~exp=1725789061~hmac=1b09ec54a8beb4110ce75b748637243f57c2aa560ab792f10eec1541052a8584&w=826'),('31345465-e5d8-47ec-bcc9-a1acee31f72e','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('34c8819a-2bad-4a07-bfb5-e66c2de95643',NULL),('36c1dcf7-4b2c-485a-8c9c-0ecd6721c6c2','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('36f74ac7-f97b-4444-b7c7-65f84d217079',NULL),('37087e64-3e25-4aab-97dc-77f2447c4a36','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('398ded7c-6c19-40a1-9f09-827462c79859','tiendat6'),('39cafc49-5561-4729-917f-5c5d7304fac0','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('3afe3cfb-e048-4d7a-97c6-8d45bb050ce4','https://img.freepik.com/free-vector/cute-koala-with-cub-cartoon-icon-illustration_138676-2839.jpg?t=st=1725788697~exp=1725792297~hmac=837d0a0630c05027b6df4169410805eaa088e02e2fe76a8b0b093970cdc77b34&w=826'),('4474a49b-56b6-4152-a7fe-8737a71a35db','https://img.freepik.com/free-vector/cute-monkey-business-holding-stick-cartoon-vector-icon-illustration-animal-business-isolated-flat_138676-12339.jpg?t=st=1725789895~exp=1725793495~hmac=500be1029f0f67644016bc44c2a1db70a627b0da0d84c769bba5ed73db07f558&w=826'),('46641ee9-a1d2-4b38-8614-7e65391c4d6e','https://img.freepik.com/free-photo/close-up-man-cartoon-character-smiling_23-2150964469.jpg?t=st=1726142296~exp=1726145896~hmac=1ebd7dc3f7f9b55cb843bc40270cace94e76a6e07f26397d26d72c71429dd549&w=740'),('48d7764a-390e-4a91-a244-bc425a720e3c','https://img.freepik.com/free-vector/language-concept-background_23-2147875493.jpg?t=st=1726464512~exp=1726468112~hmac=1bf8ca8158870dfd81acde746f0718cb92e1d2cff2d99725b9ba339c452af6f4&w=826'),('49b8ab45-34db-4876-b064-ca7b9c12fd50','https://img.freepik.com/premium-vector/cute-koala-cartoon-character-icon-illustration-white-background_1188713-6715.jpg?w=826'),('4a9ae17c-36b6-494d-84ce-5990cb2d0cc5','https://img.freepik.com/premium-vector/cute-koala-cartoon-character-icon-illustration-white-background_1188713-6713.jpg?w=826'),('4bf407e6-1e9d-48f2-a4a0-32c6a714503f','https://img.freepik.com/free-vector/cute-koala-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_138676-7349.jpg?t=st=1725788857~exp=1725792457~hmac=54b6282d8531f058e3cf7705cb123063469545fff0410d5df16a3cf15a763eef&w=826'),('4e8dd3d2-0f00-4b3f-aaac-57f6d8cee56d',NULL),('50156f4d-e2ff-4bf1-a828-4077f65d5ba9','https://img.freepik.com/free-vector/cute-koala-sitting-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_138676-7349.jpg?t=st=1725788857~exp=1725792457~hmac=54b6282d8531f058e3cf7705cb123063469545fff0410d5df16a3cf15a763eef&w=826'),('534f03cb-0942-4e69-b5ed-1c3ff4cc118f','https://img.freepik.com/premium-photo/competition-winning-certificate-with-words-best-toeic-competition-cartoon-vector-ar-169-style-raw-stylize-300-v-6-job-id-36d0bc2dd4f24769a3984f1c3ad83406_939033-127987.jpg?w=1380'),('54262972-f79d-44e5-9a3d-a4b42f2081df','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('55fdc99f-0e06-4696-930a-07bfffae4844','https://img.freepik.com/free-vector/technical-support-concept_1284-67978.jpg?t=st=1726464548~exp=1726468148~hmac=49f92eca412b683e4a0fd21f7a6922d0d13ddd46275c8dcf7c1055c360fc89e8&w=826'),('56ea208c-5407-4437-a5f8-7499c59fece5',NULL),('5dfdec2e-27ad-4cf7-b74e-af83d84e3fcf','https://img.freepik.com/free-psd/3d-file-java_602782-338.jpg?t=st=1725784047~exp=1725787647~hmac=f884e042ef418d0ce1cb50f21ddbf8162a4a8a9e08fcd1a2d10bd6aa88946670&w=740'),('6198984e-eaf6-427e-a167-19ce8b0ec958','https://img.freepik.com/free-vector/futuristic-glowing-technology-holographic-design_1017-29752.jpg?t=st=1726464482~exp=1726468082~hmac=bd09cca26f851ba3ecae587bab843f932ab125a578ee4e7a20e8c1524084867f&w=1380'),('638b81f0-3a88-4b06-9ad6-64cf70cc3abe','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('67ad1427-a2d4-445d-b837-adfe2ded9546','admin'),('67aee20d-1892-4ae7-a7c1-48520a744734',NULL),('69e672ed-1852-4794-9854-c6dcd8d079bf','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('6a8009a4-a7fa-458f-80f6-a4e86131d8ab','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('6adfd171-e46a-4ed3-a87a-921df624135b',NULL),('70d38efc-44ba-4bc7-9e9b-5c0a3573ccee','https://img.freepik.com/free-vector/certificate-template-with-elegant-elements_23-2148568461.jpg?t=st=1726913659~exp=1726917259~hmac=57b4dbedfaff1b9ff40afb87bb9d4b43f859e8693dd5f419de829ffa0b33dfd6&w=1380'),('723bed88-8527-4295-9813-e4b7c6f511f7','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('72b70540-8783-4cfc-b62e-bfb45888480d','tiendat6'),('75ad3e06-d037-4253-b4e5-82281d687596','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('795f6beb-450a-4933-81fd-79c8b5721991','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('7a0ad8a2-603d-45a6-8274-d0de35057315',NULL),('7ad96544-c796-4e67-8da4-29473df7b32a',NULL),('8201a688-cca9-440d-a953-efe207f697fc',NULL),('82dfe086-c073-4485-9885-2f37fdd00759','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('834018f2-454a-4922-b795-b3c3ed195b92','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('83a6b14c-d12b-4519-96e8-d03558a4bb44','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('841802c2-2af4-4b9b-aa11-fa8012933467','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('8478b9dc-5ff8-4811-956f-5f693af2bb4d','https://img.freepik.com/free-vector/8000-110_138676-7702.jpg?t=st=1725789058~exp=1725792658~hmac=04943cf62fcfc9360b4fe1ddf14576cc5fac4188bd37ba7e46dc68af44112d7b&w=826'),('84c9e922-43b9-4a71-bb41-3ec70bb436df','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('897c0eee-cb52-479a-8098-199b7d29b3bb','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('8b078156-b77e-4a52-a934-34712af6581f','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('8cc08f9a-a4c6-47ac-a0cd-a6cb1c9935a7','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('8d99f3c5-8feb-4259-9ccd-f6aba1e9cf82','https://img.freepik.com/premium-vector/cute-koala-working-laptop-with-headphone-cartoon_138676-2078.jpg?w=740'),('90284ffd-6609-479e-9cbd-d3bb96233780','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('91641b5d-b872-41d4-ac51-1aa68b479949','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('92f48639-888a-421d-af8c-84e1ad4cfaf0','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('94f0fb79-7cc4-435a-9a50-6d9896ce4107','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('9534cab2-95bb-4058-ae8f-c168ea3de23a','https://img.freepik.com/premium-vector/vector-guy-expressing-thumbs-up_995281-3293.jpg?w=740'),('96e1af84-2a9c-4736-9831-f84cc5e2934b',NULL),('9a7d8950-3776-49a5-9355-6a0388c808cd',NULL),('9b775d26-82b9-498e-9428-179a2bffd34d',NULL),('9bca3150-edff-4be7-87be-cd89289f01d0','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('9d699650-b121-4c1c-8033-d19c3527762d','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('a0b4aa36-88e1-43f9-b538-40ce2b0d5107','https://img.freepik.com/premium-vector/two-people-stand-front-large-computer-screen-with-medical-website-interface_657438-30674.jpg?w=740'),('a2a5bbeb-09dd-4099-832d-46c0257a57b1','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('a57d1f1a-fb54-4096-b6a3-f807492303d4','https://img.freepik.com/free-vector/cute-koala-zombie-cartoon-vector-icon-illustration-animal-halloween-icon-isolated-flat-vector_138676-12615.jpg?t=st=1725788171~exp=1725791771~hmac=36e9e5d1f82bd49c3e8fd48e4471725f27d71ce62e4a28e6394cb51d8ece725f&w=826'),('a594ae68-f381-4159-a0e2-b973203c5336','https://img.freepik.com/premium-photo/man-face-black-linear-cartoon-icon-user-isolated-white-background-ai-generated_1095381-16833.jpg?w=740'),('a5dc89ed-b3be-43af-a131-dc9d38da966a','https://img.freepik.com/free-vector/new-app-development-desktop_23-2148684987.jpg?t=st=1726464534~exp=1726468134~hmac=b5385c0f4de3de5911f05664e048269aef4286d4f1274929e58ecd9d3f19c636&w=826'),('a5e4ba0c-4a1b-4569-aed4-4f3aab9e8d3e','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('a6932097-1a4e-44e8-8e42-37965757435b','https://img.freepik.com/free-vector/hand-drawn-english-school-illustration_23-2149496641.jpg?t=st=1725719124~exp=1725722724~hmac=fe0c58e49344ef037053f31812747aa7666b39c3542a165fb59811c4038dba8c&w=740'),('a7e35d9e-a5ec-43ae-838d-6dbcf74b7698',NULL),('a832059a-dd11-46fe-b2c4-b7675c79ff2c','https://img.freepik.com/free-vector/hand-drawn-cartoon-koala-illustration_23-2150305405.jpg?t=st=1725789731~exp=1725793331~hmac=20f55ad4148bbd06083812e17597affc7367ffa6d5acd4076e5f33177e5974c2&w=826'),('a94eec7d-04c5-440e-9b28-7beb19e0358c',NULL),('ab1b6a0e-fda8-4938-8136-07a848c99764','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('b0a94f77-f0b9-4456-ac9b-5ff9b0a8c1a1',NULL),('b2d904ef-aa1b-4853-98f2-2685dd7e00cb','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('b58ffa27-f6f0-4838-8458-0b2746138872',NULL),('ba5cb85c-c04a-472a-9a8a-83c6de3f1c7c','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('bd944892-5b9a-41af-85ea-5f17b0ea9ced','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('c10d7fa6-b525-48fa-8ab8-e1b53f8d4835','https://img.freepik.com/premium-vector/cute-koala-cartoon-character-icon-illustration-white-background_1188713-6715.jpg?w=826'),('c2012997-464f-488e-aef5-cbe05e390290','tiendat6'),('c2cb6300-f860-4fc2-a8bc-f4368ed07cb8','https://img.freepik.com/free-photo/close-up-man-cartoon-character-smiling_23-2150964469.jpg?t=st=1726142296~exp=1726145896~hmac=1ebd7dc3f7f9b55cb843bc40270cace94e76a6e07f26397d26d72c71429dd549&w=740'),('c3a1537d-3a5b-443b-8c8f-e2bc37b6dc29',NULL),('c50d95b0-a5ae-4551-9009-609b705b1069','https://img.freepik.com/free-vector/cute-koala-hanging-pencil-with-bag-cartoon-vector-icon-illustration-animal-education-isolated_138676-7644.jpg?t=st=1725788982~exp=1725792582~hmac=e4eb814f2b4014559b946fb7e6b5c69ec95eeb12dffef8f1860831812e27c626&w=826'),('c5840ef7-212f-4454-893f-93ba11c843c5','tiendat6'),('c7d66ed0-8b20-400a-80b1-3ce1322fb699','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('c7f1990d-5393-46ba-9bdb-d60f9b03c980','admin'),('ca016562-1f03-495a-a833-3f776bf57166',NULL),('cc371c58-1c32-42b8-b2bc-412376405fb2','admin'),('cf039c95-2aee-4ba6-8875-98824e3ec59a','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('cf3b4b41-e092-4848-bca2-d35c3f324c34','tiendat6'),('cf719bff-21ba-46c8-8843-73948f06316b','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('d1dca31c-27ee-459a-844d-31f98fb1127a','https://img.freepik.com/free-vector/cute-baby-koala-holding-branch-wood-balloon-cartoon-vector-icon-illustration-animal-nature-isolated_138676-12522.jpg?t=st=1725787373~exp=1725790973~hmac=2e0be651cacdbabe15eb83e53eabb9385a0c7464d0dac8a9774e659a51eaef2d&w=826'),('d2202810-c196-4b78-b2c5-17d56626ed84','https://img.freepik.com/free-vector/presentation-word-concept_23-2147844792.jpg?t=st=1726465698~exp=1726469298~hmac=16a7c4d33a79de5f5231dd0944697748515bb5362b292e321d416a30777323cd&w=826'),('d29e630b-2548-459b-a5e4-3f2bba3829d0','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('d3f2d55e-7913-4f05-bda7-7b36b23b0150','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('d41e500a-edc7-47fe-8225-8c2c1aae5abb','https://img.freepik.com/free-vector/hand-drawn-flat-design-poetry-illustration_23-2149291738.jpg?t=st=1725719521~exp=1725723121~hmac=4cf751e4dd1f1748c11b7037a3f68cff9bef4539ed32629b33d3b9ff84fdcedd&w=740'),('d6f4231a-4009-4a45-a207-cc70fbd04c48','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('dbab6e8b-7ae2-464e-b259-643436ea3b53','https://img.freepik.com/free-vector/hand-drawn-web-developers-working_23-2148819605.jpg?t=st=1726903487~exp=1726907087~hmac=de77d601f1abbff49c450a7d52304f1015992aae50f9a6877f35b26c9c36a817&w=740'),('dc8a1801-261b-49d9-ad27-db9c0b05529d','https://img.freepik.com/free-vector/cute-koala-with-big-burger-cartoon-icon-illustration-animal-food-icon-concept-isolated-flat-cartoon-style_138676-2165.jpg?t=st=1725787581~exp=1725791181~hmac=10c75aea7c68d8d5c979106c1bce7c5fb488a1ef737c3ec30893fab2910377ef&w=826'),('dc915743-f328-48da-8507-99c8c40a1681','https://img.freepik.com/premium-vector/ui-design-flat-editable-illustration_203633-1941.jpg?w=1380'),('dd89a29a-f32a-41cc-9674-89b5f8a6b9b8','https://img.freepik.com/premium-vector/doctor-patient-holding-health-insurance-shield_520881-9267.jpg?w=1380'),('de220eb3-375b-4800-a9a2-caca1c1f1e39',NULL),('de6f3c25-4af2-428e-8e73-944bda2c8697','https://img.freepik.com/premium-vector/cute-koala-working-laptop-with-headphone-cartoon_138676-2078.jpg?w=740'),('dee2f446-038c-4cef-a319-022b21f7f294','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('df6d40c9-ce85-4f7f-84e2-0be45feb4cc2','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('df9f8141-ef26-496c-af49-08ed0c47c5ce','https://img.freepik.com/free-vector/office-table-top-view-business-meeting-flat-web-infographic-concept-staff-table-report-analytics-working-tablet-laptop-empty-background-brainstorm-report-planning-creative-people-collection_126523-1383.jpg?t=st=1726465722~exp=1726469322~hmac=50d7fc4dcc03393e0e542d1f6c756f792407b40d0b9a13576a9e9275b2a915a3&w=1380'),('e12312b4-e475-43c5-b9e7-4ecb67817032','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('e1e71184-dd1e-4a15-b70f-62558d067211','https://img.freepik.com/free-vector/cyber-security-concept_23-2148543851.jpg?t=st=1726464572~exp=1726468172~hmac=523774f555d9b248e2e22beb78be380e514670ab44f27b3e9825c1c0003447fc&w=826'),('e51b7f6f-d087-4bea-89ce-0893cb9e7a3f','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('e576685b-e0ef-4371-b0e8-bc23f837ca00','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('e7b7dfc3-9695-4036-b762-1bd074c6eafa','https://img.freepik.com/free-vector/cute-koala-hug-coffee-cup-cartoon-vector-icon-illustration-animal-drink-icon-isolated-flat-vector_138676-12212.jpg?t=st=1725786756~exp=1725790356~hmac=f28fca9d66517b0ed28eb5f32225fd804739aa374adee65b403f927c970c3067&w=826'),('e9bcf93b-7b53-40a2-81ed-f9b1788215a2','https://img.freepik.com/free-vector/english-school-hand-drawn-flat-illustration_23-2149540333.jpg?t=st=1725717523~exp=1725721123~hmac=1fe571174ae8ed585092321fc2dacd293f3fca63614554e5f41b5dbd148e7ac4&w=740'),('ebb637c2-e69f-40c4-a8cd-fdf364e7cc43','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('ebc86642-9d8e-4d27-8fa2-5bf16e636620',NULL),('ecafd282-aace-4d5a-bef5-c1cfd8f22ed3',NULL),('ed0370ee-ca78-4385-a3e5-e5977de0ae8a','https://img.freepik.com/free-vector/koala-little-star_1191-738.jpg?t=st=1726038242~exp=1726041842~hmac=68489b816ce5e22fd86e6571a86379cbeef6ad9fee2019961ea43e7d4ed24204&w=740'),('ef651627-0c58-4fdb-aa26-ad5e88e7a2b7',NULL),('fa41f92e-6b32-4518-b15a-8146868eda49','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('fc3b23c7-7aa4-4e18-9b09-45d47260128a','https://img.freepik.com/free-vector/online-courses-cartoon-advertising-web-page-with-students-sitting-books-pile-with-laptops-notebooks_1284-27827.jpg?t=st=1725700658~exp=1725704258~hmac=daba2412280b9fe2caaaea1d0f27a89292a45357f6c3ed4398fac80d72777f49&w=1380'),('fd712a7c-2013-4b28-82f5-8b61c0f58529','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('fdfbf4af-e507-4c6e-9f98-5076c111a782','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996'),('ff8c65fb-6aae-4c63-a233-890e8219093f','https://img.freepik.com/free-vector/cute-koala-holding-branch-tree-cartoon-vector-icon-illustration-animal-nature-icon-isolated-flat_138676-12795.jpg?t=st=1725786679~exp=1725790279~hmac=55cd7370becaa44e479cee0e6f5d7234731be9779bfa0028b40c9859f36d2d49&w=826'),('ffd87ff3-6477-4e36-aed4-55d9d19fd03d','https://img.freepik.com/free-vector/app-development-concept-design_23-2148670525.jpg?t=st=1726903863~exp=1726907463~hmac=8832d5f008a90a10ba85a5baa57ce274a70f2d57ed166d12346d7307327e908c&w=996');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invalidated_token`
--

DROP TABLE IF EXISTS `invalidated_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invalidated_token` (
  `token_id` varchar(255) NOT NULL,
  `expiry_time` datetime(6) DEFAULT NULL,
  `user_user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`token_id`),
  KEY `FKfh7vrsxsh75d40qdc18vlhcen` (`user_user_id`),
  CONSTRAINT `FKfh7vrsxsh75d40qdc18vlhcen` FOREIGN KEY (`user_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invalidated_token`
--

LOCK TABLES `invalidated_token` WRITE;
/*!40000 ALTER TABLE `invalidated_token` DISABLE KEYS */;
INSERT INTO `invalidated_token` VALUES ('039d9feb-04ab-4b66-80a0-93321cf9983b','2024-09-30 19:18:17.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('03a914f7-ab66-4be1-b8fb-a7b5774108fb','2024-10-01 22:50:50.000000','0bc87564-f672-424a-b248-3016d66310e0'),('07558652-b2f7-4f6b-bcae-ed9d93610a49','2024-10-01 21:50:41.000000','0bc87564-f672-424a-b248-3016d66310e0'),('0b4adcf2-f29b-40d0-b86b-f77dfcbbb5e8','2024-10-05 11:25:22.000000','0bc87564-f672-424a-b248-3016d66310e0'),('0e90f0b8-0702-4ee4-86a5-7e4c99e8a199','2024-10-05 15:43:54.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('11577689-306c-4ffc-91df-e8b8d67e6f5c','2024-09-30 22:10:16.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('135f6d02-52c4-42e1-a4e2-a5a83bf9fc3f','2024-10-02 17:15:18.000000','0bc87564-f672-424a-b248-3016d66310e0'),('144b2871-f61f-44bd-8d9a-f18655ec4de7','2024-10-03 16:42:23.000000','0bc87564-f672-424a-b248-3016d66310e0'),('15709309-13f5-4ced-9200-1942354f7ebb','2024-10-05 20:45:07.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('168692f2-085d-4fc3-bf10-d4a8b1c7a2f0','2024-10-02 10:53:02.000000','0bc87564-f672-424a-b248-3016d66310e0'),('1fee9b28-cace-4a4d-81bf-22fc7fc1ab0e','2024-10-01 10:51:05.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('22a5644b-58b4-4d77-bd09-cea9fbd1880f','2024-09-30 15:10:17.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('29332275-550b-4754-b20f-e5b88866bff5','2024-10-05 10:22:14.000000','0bc87564-f672-424a-b248-3016d66310e0'),('29633b46-3dda-42c4-b97b-ee2411394e41','2024-10-07 13:16:28.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('2a3acd2b-2375-4284-95ab-2bf918e7cbb0','2024-10-02 08:17:42.000000','0bc87564-f672-424a-b248-3016d66310e0'),('324f7ccf-e357-46b1-936a-529da449e517','2024-09-30 19:57:53.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('357f089d-334a-465c-8b2a-f9f3cbe2731d','2024-10-03 12:58:18.000000','0bc87564-f672-424a-b248-3016d66310e0'),('365b6931-3b15-45a9-b9db-2760e73410ee','2024-10-03 12:06:54.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('3874b67d-3cb6-4e5c-8442-2edcb6723b07','2024-09-30 19:44:28.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('3f06e3f5-5945-4fe9-949a-29af28fdb49b','2024-10-02 15:17:51.000000','0bc87564-f672-424a-b248-3016d66310e0'),('40585de3-abc6-4548-add4-3786ac936a0f','2024-10-05 12:47:13.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('46a2fa73-64ca-4c0d-ba78-bb28540e808c','2024-09-30 20:51:19.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('4bdb37ea-6060-48e9-a707-4e14abc55520','2024-10-05 13:34:22.000000','2b7a2933-b8b0-4e95-89ad-451e85d30d43'),('4dcededc-3cd7-47ff-8d9c-bb2f0e49ef55','2024-10-05 18:28:22.000000','d41f0978-5a2e-41af-82ca-f867a671c1a3'),('4e68c40c-d734-43da-91ae-f48de6b146b1','2024-09-30 19:37:32.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('510224fe-c889-4ae7-81e2-661ca1a9ea24','2024-10-02 08:50:46.000000','0bc87564-f672-424a-b248-3016d66310e0'),('52fddf22-e15d-43ac-a3b6-b177b1fd1bc4','2024-10-03 14:52:47.000000','0bc87564-f672-424a-b248-3016d66310e0'),('556d5186-4daf-4666-b779-a3f1ac1de881','2024-10-01 13:59:53.000000','0bc87564-f672-424a-b248-3016d66310e0'),('59f7a322-f3b0-4bef-a649-05d5967088fe','2024-10-05 11:25:25.000000','0bc87564-f672-424a-b248-3016d66310e0'),('622b367c-fda7-4710-a4be-f633d080f38f','2024-10-03 11:03:13.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('624e2e08-9a27-4ebc-a8fe-5d8ba4e858a5','2024-10-04 12:42:50.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('640b1419-0d81-4859-ba82-e327c24b0b6e','2024-10-01 15:00:19.000000','0bc87564-f672-424a-b248-3016d66310e0'),('65ce64de-1b35-45ce-b1fe-5acd9e568be7','2024-10-03 12:59:34.000000','0bc87564-f672-424a-b248-3016d66310e0'),('66f487f0-61b3-48ad-add3-a5563a7d92bf','2024-10-01 11:21:43.000000','0bc87564-f672-424a-b248-3016d66310e0'),('68800492-f590-49dd-9453-21b275af172f','2024-10-05 11:26:02.000000','0bc87564-f672-424a-b248-3016d66310e0'),('6888d921-e802-4ef6-85c4-5e1221e93396','2024-10-01 10:52:27.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('6d5bf932-224b-42ea-9287-b809d70a0572','2024-10-07 13:36:13.000000','3585f1a4-07d9-460d-8a63-b9e2ee128f3e'),('6e100935-4da9-46e3-a726-aedd5cb16aa6','2024-09-30 19:40:09.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('78a09218-fc3a-4962-ab92-2ac18d587680','2024-09-30 19:48:46.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('78c44fed-8415-4170-9690-a259a7ec5827','2024-10-04 12:55:00.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('7ae8a4d6-27d0-41d3-8697-5c61bd72f3d1','2024-10-03 15:00:42.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('7cf4010d-13a8-41b0-b7dd-8714bc5f6475','2024-10-03 14:43:25.000000','0bc87564-f672-424a-b248-3016d66310e0'),('803e02e0-623b-4330-8597-6a8e84c8d76c','2024-10-03 15:08:12.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('8116bc28-cf3a-4673-ad4d-e6f736471843','2024-09-30 22:04:23.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('82f8dc05-c1a3-4aa0-bfce-cd6e35b4b628','2024-10-03 15:07:05.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('89c4efbc-2f9a-454b-9d60-8cc737071517','2024-10-02 13:11:56.000000','0bc87564-f672-424a-b248-3016d66310e0'),('8bf76fb8-fa88-4f59-a59d-d26d39bd0365','2024-10-05 14:46:02.000000','87aaff89-ed02-402e-9359-971d95eb80d8'),('8d6ba63e-26c1-4a50-8118-5a85fd6a2aec','2024-09-30 19:59:41.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('8e56d707-6ee9-437b-973a-1c1c49357db5','2024-10-03 14:53:39.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('8e96f468-28e0-47bf-8d77-4a7facb617f6','2024-10-05 11:27:52.000000','0bc87564-f672-424a-b248-3016d66310e0'),('94fe7f64-49d2-4433-bec2-223c057ed731','2024-09-30 19:56:02.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('9602065e-9a17-43e9-8124-2699fb1f6d34','2024-10-04 11:55:15.000000','0bc87564-f672-424a-b248-3016d66310e0'),('9b2a07ea-10ff-42cd-9a17-ba8046957806','2024-09-30 22:10:22.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('9b32b6db-5dc2-413d-b904-3ea6c32dae5a','2024-10-05 20:44:52.000000','87aaff89-ed02-402e-9359-971d95eb80d8'),('a12d247a-e1ec-4632-89dd-835fef207b4c','2024-10-03 15:00:35.000000','0bc87564-f672-424a-b248-3016d66310e0'),('a3d04868-db1c-41ec-88c2-a4b29d91a31d','2024-09-30 19:58:35.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('a41023ac-3b02-4e32-9b86-e81c5dd80bbd','2024-09-30 22:04:17.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('a537d8b8-9178-49d3-8a39-1beb26be022f','2024-10-03 15:41:11.000000','0bc87564-f672-424a-b248-3016d66310e0'),('aa00ac01-4519-4687-b1f1-18ba22c0f097','2024-10-03 15:41:00.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('b60c5a31-d44e-40f2-acde-aefcf0f7cffc','2024-09-30 22:10:09.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('b66b2159-77bd-49bc-a994-4e66f8b0a53c','2024-09-30 20:00:09.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('b7b4d51c-7f24-4fc0-9a9a-ccf58774d9a0','2024-09-30 20:00:28.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('b7e72e32-dc7b-4ae9-9687-fb95365e5c1c','2024-10-01 23:46:23.000000','0bc87564-f672-424a-b248-3016d66310e0'),('ba02ed21-7c98-4c43-a6d5-1e11b8343f16','2024-10-05 20:43:27.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('bb49c423-7a06-4636-9dcf-6e7c2dd9a786','2024-10-05 15:43:40.000000','0bc87564-f672-424a-b248-3016d66310e0'),('bfa024dc-1634-4ba0-ad78-8b0012b9bfd7','2024-10-02 08:51:46.000000','0bc87564-f672-424a-b248-3016d66310e0'),('c174e448-03ca-471d-ba86-797068fcfa17','2024-10-05 12:47:02.000000','0bc87564-f672-424a-b248-3016d66310e0'),('c1e15a44-38d5-4d08-8c4e-f4b24152b914','2024-10-02 23:59:09.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('c1ed2c38-51ff-4d1b-ae86-d59c71f7a978','2024-10-05 20:40:43.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('c295af0b-ef8e-4e03-9f84-278ce9945f02','2024-10-04 13:25:41.000000','0bc87564-f672-424a-b248-3016d66310e0'),('c6c6b250-ab48-47dc-af4d-0284873b3244','2024-09-30 16:38:29.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('c708a8a3-00a1-4be0-9b7c-eec457337f47','2024-10-03 14:53:29.000000','0bc87564-f672-424a-b248-3016d66310e0'),('cc37c1fe-b84a-450e-b058-1f6d5231402d','2024-10-02 23:23:34.000000','0bc87564-f672-424a-b248-3016d66310e0'),('cdd32e67-96f1-4388-85bb-9f4f0c064442','2024-10-03 14:53:47.000000','0bc87564-f672-424a-b248-3016d66310e0'),('cf8aba16-2b29-4648-aef1-cdbfd57940b1','2024-09-30 22:09:58.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('d2078f58-fa29-496a-8001-a7bf73b6a11f','2024-10-04 12:45:27.000000','3737c549-ebf4-46d8-af29-e91524d92810'),('d224f02f-e931-4edc-b39d-1704feabd7ab','2024-10-05 15:44:12.000000','d41f0978-5a2e-41af-82ca-f867a671c1a3'),('e462cbc7-fea8-465f-8fcf-61b7c9280d66','2024-10-05 11:24:57.000000','0bc87564-f672-424a-b248-3016d66310e0'),('e59a066b-d2d0-4d98-beb2-fc5e98551d1f','2024-10-07 13:38:40.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('ec4c269d-a33e-4f8f-a101-1c546d7634e6','2024-09-30 19:52:22.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('ecc804a1-7b62-40a2-90ab-f248d2ce1443','2024-09-30 19:40:59.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('f17cdb23-d58f-47ca-ad88-c38c64bb1cd1','2024-09-30 19:55:56.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('f286dc0e-787e-46b1-bfb6-9da40f280d30','2024-09-30 19:39:13.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('f2a0531a-d8fb-4d51-99ea-bb2c20649b6b','2024-10-05 11:24:52.000000','0bc87564-f672-424a-b248-3016d66310e0'),('f34f0501-c331-4618-a2d5-658db86e7c69','2024-09-30 19:55:24.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('f692385a-011b-4120-a275-3edc96fa419d','2024-10-03 14:43:54.000000','0bc87564-f672-424a-b248-3016d66310e0'),('f776c6a2-2125-473c-b940-50184b23a8a1','2024-09-30 21:09:56.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('fab188d1-937e-41b1-b516-8471943aab8b','2024-10-05 18:29:58.000000','77e2720f-3766-411c-9a83-d66fe9e8695b'),('fb4befe2-623e-4901-ab82-ea0e771bba85','2024-10-05 13:37:50.000000','0bc87564-f672-424a-b248-3016d66310e0'),('fc08f93a-7a63-41e8-bc1a-a48f6563dea5','2024-10-03 15:03:26.000000','0bc87564-f672-424a-b248-3016d66310e0');
/*!40000 ALTER TABLE `invalidated_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson`
--

DROP TABLE IF EXISTS `lesson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson` (
  `lesson_id` varchar(255) NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  `lesson_description` varchar(1000) DEFAULT NULL,
  `course_course_id` varchar(255) DEFAULT NULL,
  `image_image_id` varchar(255) DEFAULT NULL,
  `video_video_id` varchar(255) DEFAULT NULL,
  `lesson_name` varchar(255) DEFAULT NULL,
  `lesson_uploaded_at` datetime(6) DEFAULT NULL,
  `is_demo` bit(1) NOT NULL,
  PRIMARY KEY (`lesson_id`),
  UNIQUE KEY `UK908pmg4sv542haikdudg5m1jx` (`image_image_id`),
  UNIQUE KEY `UK9usmpc7s7fh14f3283f4ex567` (`video_video_id`),
  KEY `FKludiv7d49615l8eqnxdxwoi05` (`course_course_id`),
  CONSTRAINT `FKfks0phf15vboy6ef4f1gfpa16` FOREIGN KEY (`video_video_id`) REFERENCES `video` (`video_id`) ON DELETE CASCADE,
  CONSTRAINT `FKhuvht98s5enmhwmdbpvmwkhj6` FOREIGN KEY (`image_image_id`) REFERENCES `image` (`image_id`) ON DELETE CASCADE,
  CONSTRAINT `FKludiv7d49615l8eqnxdxwoi05` FOREIGN KEY (`course_course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson`
--

LOCK TABLES `lesson` WRITE;
/*!40000 ALTER TABLE `lesson` DISABLE KEYS */;
INSERT INTO `lesson` VALUES ('07e94909-363e-400a-9d5c-118f448d2042',_binary '\0','This introductory lesson focuses on helping students discover their unique writing style. Students will explore various writing prompts and exercises to identify their strengths and preferences in creative writing. The lesson aims to build confidence and encourage self-expression through words.','4bc18f42-433a-41ce-94a9-ce1cc57ec66d','2b556b3c-27c9-4b70-8fc3-8a69a1cd85b6','19a252f8-ef7d-4a35-879b-d90be825c31e','Finding Your Voice','2024-09-09 15:23:42.643900',_binary '\0'),('1179234b-e708-44d8-bf18-2e88c3330d5b',_binary '\0','In this advanced lesson, students will develop skills for professional discussions in English. They\'ll learn how to present case studies, discuss treatment methods, and participate in medical meetings. The lesson also covers using academic and specialized language in presentations.','6cf7c084-29b8-493d-b3c1-c991bc4cb461','c50d95b0-a5ae-4551-9009-609b705b1069','c0c3014a-e369-4156-a4d9-41da4cdc99d8','Professional Discussions and Case Presentations','2024-09-09 15:23:42.643900',_binary '\0'),('12d8a8ae-6e01-499c-9111-9371a108aecc',_binary '\0','Learn the specific terminology used in IT support, troubleshooting, and customer service.','fdea06df-65ac-4f74-a75d-d06b7cd44cbd','55fdc99f-0e06-4696-930a-07bfffae4844','85401871-0fd4-4720-911f-9667250fa6d9','English for IT Support','2024-09-16 12:19:31.064401',_binary '\0'),('256ed365-03f4-4437-902c-3bd8685b7b9c',_binary '','this is leson for C++ and update','be1833d6-8e21-4d4b-89e8-ccf8153c4572','8d99f3c5-8feb-4259-9ccd-f6aba1e9cf82','0994c8a7-90df-43ef-bb6a-593996d4c7a2','Advance C++','2024-09-09 15:23:42.643900',_binary '\0'),('2573c7fc-118c-4284-be0b-8c62b9c42a58',_binary '\0','This more advanced lesson focuses on professional communication between healthcare departments. Students will learn how to discuss patient cases with colleagues, write concise medical reports, and participate in team meetings. The lesson covers medical abbreviations, formal medical English, and effective information sharing in a healthcare setting.','6cf7c084-29b8-493d-b3c1-c991bc4cb461','4474a49b-56b6-4152-a7fe-8737a71a35db','91aac492-60be-423e-a484-3f98a8e49092','Interdepartmental Communication','2024-09-09 15:23:42.643900',_binary '\0'),('27be8a75-cfe2-413e-ae75-90c04f5d1886',_binary '\0','In this lesson, students will learn to read and interpret various medical documents in English. They\'ll study the structure of patient charts, lab reports, and medication lists. The lesson includes exercises in summarizing key information from these documents and explaining results to patients in simple terms.','6cf7c084-29b8-493d-b3c1-c991bc4cb461','4a9ae17c-36b6-494d-84ce-5990cb2d0cc5','f7e195b9-ac8f-4623-bf68-61d6003443bf','Understanding Medical Records and Charts','2024-09-09 15:23:42.643900',_binary '\0'),('27f4eaef-3d6c-4a1c-8968-6cd24cd1b0e1',_binary '\0','This final, more challenging lesson introduces advanced creative writing concepts such as non-linear narratives, unreliable narrators, and experimental styles. Students will analyze examples from literature and practice incorporating these techniques into their own writing, pushing the boundaries of traditional storytelling.','4bc18f42-433a-41ce-94a9-ce1cc57ec66d','dc8a1801-261b-49d9-ad27-db9c0b05529d','5796102f-a683-44f9-9fba-6b2705f838d8','Advanced Narrative Techniques','2024-09-09 15:23:42.643900',_binary '\0'),('336672a7-7966-4689-be62-5c527f2c9592',_binary '\0','Learn how to write clear and concise business emails and reports.','f6e31b35-3fee-4669-a0b3-12facc4c8ddb','dc915743-f328-48da-8507-99c8c40a1681','af153572-f157-4879-ae84-e3d80f92bb87','Business Writing Fundamentals','2024-09-16 12:39:26.765454',_binary '\0'),('3e70ad72-c0e5-4143-80b9-2e4908e2eb32',_binary '\0','This lesson focuses on reading and comprehending various types of medical records in English. Students will familiarize themselves with the structure of medical reports, test results, and prescriptions. They\'ll practice summarizing important information and explaining the significance of results to colleagues or patients.','6cf7c084-29b8-493d-b3c1-c991bc4cb461','4bf407e6-1e9d-48f2-a4a0-32c6a714503f','b7edad78-e8c6-4a2f-9892-cef1fcda31da','Reading and Understanding Medical Records','2024-09-09 15:23:42.643900',_binary '\0'),('42430618-75ab-469c-a9b0-23f5c00cb60a',_binary '\0','In this lesson, students will learn techniques to create vivid and engaging descriptions in their writing. They\'ll practice using sensory details, figurative language, and varied vocabulary to bring their scenes and characters to life. The lesson includes exercises in describing settings, objects, and people.','4bc18f42-433a-41ce-94a9-ce1cc57ec66d','ff8c65fb-6aae-4c63-a233-890e8219093f','1d33f9e9-5797-40d3-919e-b7b72bea0bd1','The Power of Descriptions','2024-09-09 15:23:42.643900',_binary '\0'),('4682bf5e-9946-4cd4-a670-95f1a2728761',_binary '\0','this is leson for C++ 3','be1833d6-8e21-4d4b-89e8-ccf8153c4572','de6f3c25-4af2-428e-8e73-944bda2c8697','7f182d43-27d1-4c73-b7de-bdb76c2d4cc0','Beginner C++','2024-09-09 15:23:42.643900',_binary '\0'),('4f2c1535-61d1-4cc1-a5f5-792d883196c1',_binary '\0','Master the art of negotiation in English, including strategies and key phrases.','f6e31b35-3fee-4669-a0b3-12facc4c8ddb','2629d109-0525-4e32-a48e-50a9b9400858','d4300364-689c-4945-9277-814b65446fd1','Negotiation Skills in English','2024-09-16 12:39:26.825099',_binary '\0'),('57433142-d266-467a-9c33-e589cb8cfe5f',_binary '\0','this is leson for java for newbie','4bc18f42-433a-41ce-94a9-ce1cc57ec66d','5dfdec2e-27ad-4cf7-b74e-af83d84e3fcf','10bded79-10d7-426a-ab0e-a5449a5b9a85','lesson test 10/8','2024-10-07 13:07:26.178125',_binary ''),('5aeaeab5-4fd2-4047-9d2d-8cbc92d24990',_binary '\0','Master the art of delivering technical presentations in English.','fdea06df-65ac-4f74-a75d-d06b7cd44cbd','6198984e-eaf6-427e-a167-19ce8b0ec958','e9187492-fda3-4d9f-a725-b201a4c2bae2','Presenting in English for Tech Professionals','2024-09-16 12:19:31.097951',_binary '\0'),('5d2ef095-618f-4f7e-b173-b846421c26d3',_binary '\0','Introduce lesson for newbiew','4bc18f42-433a-41ce-94a9-ce1cc57ec66d','ed0370ee-ca78-4385-a3e5-e5977de0ae8a','5e56272b-2613-4c85-a4f2-311c59a66ee6','Introduce lesson','2024-09-09 15:23:42.643900',_binary '\0'),('6015008e-ed68-42d3-81fa-e1869f76c4fd',_binary '\0','Here, students will explore the elements of plot and various storytelling techniques. They\'ll learn about conflict, rising action, climax, and resolution. The lesson includes exercises in outlining stories, creating plot twists, and maintaining narrative tension throughout a piece of writing.','4bc18f42-433a-41ce-94a9-ce1cc57ec66d','d1dca31c-27ee-459a-844d-31f98fb1127a','f27e6eb3-13c6-46ac-9227-1fb32fd465e6','Plot Structure and Storytelling','2024-09-09 15:23:42.643900',_binary '\0'),('7956c04d-3386-46b7-8a97-e706caa3dbdd',_binary '\0','Learn cybersecurity vocabulary and concepts such as encryption, firewalls, and intrusion detection systems in English.','fdea06df-65ac-4f74-a75d-d06b7cd44cbd','e1e71184-dd1e-4a15-b70f-62558d067211','f7aaeaf5-29c9-4496-b180-80883ab727be','English for Cybersecurity','2024-09-16 12:19:31.132638',_binary '\0'),('8b3de1f6-3a73-4106-a2f4-4a86abc9f325',_binary '\0','This lesson introduces fundamental medical terminology. Students will learn words related to body parts, common symptoms, and basic medical specialties. The focus is on correct pronunciation and using vocabulary in simple contexts.','6cf7c084-29b8-493d-b3c1-c991bc4cb461','49b8ab45-34db-4876-b064-ca7b9c12fd50','97599aa6-d274-46ed-a2af-ae64a478cb59','Basic Medical Vocabulary','2024-09-09 15:23:42.643900',_binary '\0'),('9926df32-11e8-4f4b-8de7-e5050effd02c',_binary '\0','This is the most challenging lesson, focusing on professional writing skills in the medical field. Students will learn how to write medical reports, research summaries, and prepare documents for international conferences. The lesson also includes academic writing techniques, proper citation methods, and accurate use of specialized terminology.','6cf7c084-29b8-493d-b3c1-c991bc4cb461','8478b9dc-5ff8-4811-956f-5f693af2bb4d','0fdb322e-0d12-4f9b-a611-a785ddfdb02f','Writing Medical Reports and Research','2024-09-09 15:23:42.643900',_binary '\0'),('9eaf6d46-19f2-4d13-891b-4b7a83ca040b',_binary '\0','In this lesson, students will learn how to effectively communicate with patients in English. They\'ll practice skills such as greeting patients, asking about symptoms, and explaining simple medical procedures. The lesson also includes useful phrases for expressing empathy and reassuring patients.','6cf7c084-29b8-493d-b3c1-c991bc4cb461','3afe3cfb-e048-4d7a-97c6-8d45bb050ce4','f73e8b17-2dff-44b6-9548-0d0209ea1ed4','Patient Communication','2024-09-09 15:23:42.643900',_binary '\0'),('b18606fb-1965-4773-ab91-d75a1d37f140',_binary '\0','Develop advanced skills for delivering professional presentations in English.','f6e31b35-3fee-4669-a0b3-12facc4c8ddb','d2202810-c196-4b78-b2c5-17d56626ed84','fcbc2b2f-5410-44c7-b084-b460c4ea20aa','Presentations for Business Professionals','2024-09-16 12:39:26.855662',_binary '\0'),('b2879651-af4d-4276-b31b-dee9bda3f9c4',_binary '\0','This lesson delves into character development. Students will learn how to create multi-dimensional characters with distinct personalities, motivations, and backstories. They\'ll practice writing character sketches, dialogues, and scenes that reveal character traits indirectly.','4bc18f42-433a-41ce-94a9-ce1cc57ec66d','e7b7dfc3-9695-4036-b762-1bd074c6eafa','41328787-0514-441f-b44c-a1710da5fc37','Crafting Compelling Characters','2024-09-09 15:23:42.643900',_binary '\0'),('d2d05634-e659-4f54-9148-fc8abf19ba42',_binary '\0','Learn how to communicate effectively in business meetings, including agenda setting and problem-solving discussions.','f6e31b35-3fee-4669-a0b3-12facc4c8ddb','df9f8141-ef26-496c-af49-08ed0c47c5ce','197c0527-5454-4ad9-922d-a93ecd094e74','English for Business Meetings','2024-09-16 12:39:26.888532',_binary '\0'),('eb3612bc-84c9-4862-97f3-7a9d5011fe1e',_binary '\0','Learn the basic vocabulary and phrases used in the technology field.','fdea06df-65ac-4f74-a75d-d06b7cd44cbd','48d7764a-390e-4a91-a244-bc425a720e3c','b43c0983-297d-43e8-ae51-d25f3ba149a6','Introduction to Technical English','2024-09-16 12:19:30.786144',_binary '\0'),('edb7d91e-0a37-4c7e-8bd8-a3f5a7648459',_binary '\0','Understand how to navigate cultural differences in global business settings and improve communication.','f6e31b35-3fee-4669-a0b3-12facc4c8ddb','18823f9c-e90a-48cc-9426-29b8634d0163','ca0ef8ed-aae3-4cb6-8825-d882f7af0238','Cross-Cultural Communication','2024-09-16 12:39:26.918721',_binary '\0'),('ee9a6123-38cd-4008-8065-b9142ef2b187',_binary '\0','In this lesson, students will learn how to effectively communicate with patients in English. They\'ll practice skills such as greeting patients, asking about symptoms, and explaining simple medical procedures. The lesson also includes useful phrases for expressing empathy and reassuring patients.','4bc18f42-433a-41ce-94a9-ce1cc57ec66d','c10d7fa6-b525-48fa-8ab8-e1b53f8d4835','cc0d1b79-ead9-42ea-9e79-70f3bcfcbf07','Patient Communication','2024-09-09 15:23:42.643900',_binary '\0'),('eeb977c4-5365-4a97-8ac4-43e12c54e927',_binary '\0','This lesson introduces students to sources of creative writing inspiration. Students will engage in brainstorming activities, free writing, and observing their surroundings for ideas. The goal is to help students overcome the fear of the blank page and begin the creative process.','4bc18f42-433a-41ce-94a9-ce1cc57ec66d','a57d1f1a-fb54-4096-b6a3-f807492303d4','7e9bf9c3-3e16-46e9-875d-469f3d0d1637','Exploring Inspiration','2024-09-09 15:23:42.643900',_binary '\0'),('ef0aa6df-ebff-4d31-81ab-e6ebc89d7fde',_binary '\0','Understand common English terms and phrases in software development, including coding, debugging, and version control.','fdea06df-65ac-4f74-a75d-d06b7cd44cbd','a5dc89ed-b3be-43af-a131-dc9d38da966a','403271af-5072-4631-9825-7c4d14719b4f','English for Software Development','2024-09-16 12:19:31.023698',_binary '\0'),('f0ec21f7-a136-46f0-a7cc-da971eea096d',_binary '\0','This lesson delves into descriptive techniques in creative writing. Students will learn how to use vivid language to create images, sounds, and emotions in the reader\'s mind. They\'ll practice using sensory details to describe settings, characters, and situations.','4bc18f42-433a-41ce-94a9-ce1cc57ec66d','a832059a-dd11-46fe-b2c4-b7675c79ff2c','2e5a34a2-cd44-42ab-bd1c-823f8ad59b52','The Art of Description','2024-09-09 15:23:42.643900',_binary '\0');
/*!40000 ALTER TABLE `lesson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` varchar(255) NOT NULL,
  `org_amount` float NOT NULL,
  `processed_date` datetime(6) DEFAULT NULL,
  `teacher_amount` float NOT NULL,
  `total_amount` float NOT NULL,
  `enroll_course_enroll_course_id` varchar(255) DEFAULT NULL,
  `teacher_user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  UNIQUE KEY `UKme8dvhr43h8wsnccq08kl7fv2` (`enroll_course_enroll_course_id`),
  KEY `FKoeicuj9hbckww9tg2c4x1ehex` (`teacher_user_id`),
  CONSTRAINT `FKnvdaet1hp4v43ah1rwmrtu1a5` FOREIGN KEY (`enroll_course_enroll_course_id`) REFERENCES `enroll_course` (`enroll_course_id`),
  CONSTRAINT `FKoeicuj9hbckww9tg2c4x1ehex` FOREIGN KEY (`teacher_user_id`) REFERENCES `teacher` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `permission_name` varchar(255) NOT NULL,
  `permission_description` varchar(255) NOT NULL,
  PRIMARY KEY (`permission_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES ('CREATE_USER','create new user'),('DELETE_SEFT_USER','delete my account'),('DELETE_USER','delete a user'),('GET_ALL_USER','get all user\'s information'),('GET_SEFT_STUDENT','get my student\'s information'),('GET_SEFT_TEACHER','get my teacher\'s information'),('GET_USER','get information a user'),('UPDATE_SEFT_USER','update  personal information'),('UPDATE_USER','update a user');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `question_id` varchar(255) NOT NULL,
  `question_description` varchar(255) DEFAULT NULL,
  `test_test_id` varchar(255) DEFAULT NULL,
  `image_image_id` varchar(255) DEFAULT NULL,
  `is_active` bit(1) NOT NULL,
  PRIMARY KEY (`question_id`),
  UNIQUE KEY `UKhhd840jju31v5bgc8t4yshcuu` (`image_image_id`),
  KEY `FKakgj0tvwvkim8c5fdhsfd1e3w` (`test_test_id`),
  CONSTRAINT `FKakgj0tvwvkim8c5fdhsfd1e3w` FOREIGN KEY (`test_test_id`) REFERENCES `test` (`test_id`),
  CONSTRAINT `FKducbll940gbgbkxc7ab2ou5vh` FOREIGN KEY (`image_image_id`) REFERENCES `image` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES ('113463eb-fc8e-4514-adea-cb66a4d2d570','Q4','0074bf14-f5b0-46a3-adab-d7692eb32bdd','12125a13-4ed3-4d0c-8e63-79fd5198c49f',_binary ''),('1146c9ed-59c6-4b5e-bee5-00039ac81aa4','Q4','0074bf14-f5b0-46a3-adab-d7692eb32bdd',NULL,_binary ''),('15c592ea-628d-4d60-beb1-bb294240eb66','Q4','0074bf14-f5b0-46a3-adab-d7692eb32bdd',NULL,_binary ''),('446e3f3a-b29b-4dde-ac42-d866aca60878','Q4','0074bf14-f5b0-46a3-adab-d7692eb32bdd',NULL,_binary ''),('4d4281f2-99bc-4614-88d0-2e4aa28e0b70','What does it mean to \"find your voice\" in the context of personal development?\n','59a9f0a8-dbec-4882-8eeb-0fb3bb397d88',NULL,_binary ''),('63974a67-da0a-43ae-bf13-b43e94dcb58d','Which of the following is a key step in finding your voice?\n','59a9f0a8-dbec-4882-8eeb-0fb3bb397d88',NULL,_binary ''),('72d2b6da-710e-49fc-b08a-c7bb31a2fa96','Q4','0074bf14-f5b0-46a3-adab-d7692eb32bdd',NULL,_binary ''),('7a394eb2-ab18-4947-8109-be4601de3f41','Q4','0074bf14-f5b0-46a3-adab-d7692eb32bdd',NULL,_binary ''),('8c8b0dab-65c0-4f05-9c3f-55244d753361','Q3','0074bf14-f5b0-46a3-adab-d7692eb32bdd',NULL,_binary ''),('94edb88d-d45f-4140-9736-892a372547f8','How can writing help in finding your voice?\n','59a9f0a8-dbec-4882-8eeb-0fb3bb397d88',NULL,_binary ''),('b569c2a4-27b5-45ca-9d7c-894b1dc5b365','Why is it important to find your voice in a team setting?\n','59a9f0a8-dbec-4882-8eeb-0fb3bb397d88',NULL,_binary ''),('c1b7df09-381c-4fcf-af8a-8c664c0e3aa1','What should you avoid when trying to find your voice?\n','59a9f0a8-dbec-4882-8eeb-0fb3bb397d88','12125a13-4ed3-4d0c-8e63-79fd5198c420',_binary ''),('caec955b-e87c-422d-af09-fc950f9a4ed6','Q4','0074bf14-f5b0-46a3-adab-d7692eb32bdd',NULL,_binary ''),('fb758dfa-d2a8-4f4c-ba17-f3eb1c7b8ebd','Q4','0074bf14-f5b0-46a3-adab-d7692eb32bdd',NULL,_binary ''),('ff6b09e8-d0cc-41fe-9217-aeccd53f7b51','What can be a sign that you\'ve successfully found your voice?\n','59a9f0a8-dbec-4882-8eeb-0fb3bb397d88',NULL,_binary '');
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_result`
--

DROP TABLE IF EXISTS `quiz_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_result` (
  `quiz_result_id` varchar(255) NOT NULL,
  `answered_questions` int NOT NULL,
  `correct_answers` int NOT NULL,
  `date_taken` datetime(6) DEFAULT NULL,
  `total_question` int NOT NULL,
  `student_user_id` varchar(255) DEFAULT NULL,
  `test_test_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`quiz_result_id`),
  KEY `FK3rptvq5nf1bgrb62qiqqv9ax2` (`student_user_id`),
  KEY `FKm9vk15pcinrqherfjpo27q0fd` (`test_test_id`),
  CONSTRAINT `FK3rptvq5nf1bgrb62qiqqv9ax2` FOREIGN KEY (`student_user_id`) REFERENCES `student` (`user_id`),
  CONSTRAINT `FKm9vk15pcinrqherfjpo27q0fd` FOREIGN KEY (`test_test_id`) REFERENCES `test` (`test_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_result`
--

LOCK TABLES `quiz_result` WRITE;
/*!40000 ALTER TABLE `quiz_result` DISABLE KEYS */;
INSERT INTO `quiz_result` VALUES ('1990b786-ca70-49f5-a8a3-a0851849b06c',4,2,'2024-09-26 01:03:56.100132',5,'021ebec3-c49d-4c34-999a-56857e3eade1','59a9f0a8-dbec-4882-8eeb-0fb3bb397d88'),('f5f50311-8c05-42b0-9184-cab08078da95',3,1,'2024-09-26 01:03:51.291828',3,'021ebec3-c49d-4c34-999a-56857e3eade1','59a9f0a8-dbec-4882-8eeb-0fb3bb397d88');
/*!40000 ALTER TABLE `quiz_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reference`
--

DROP TABLE IF EXISTS `reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reference` (
  `reference_id` varchar(255) NOT NULL,
  `learning_level` enum('ADVANCED','BEGINNER','EXPERT','INTERMEDIATE') DEFAULT NULL,
  `study_time_goal` int NOT NULL,
  `student_user_id` varchar(255) DEFAULT NULL,
  `taken_date` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`reference_id`),
  UNIQUE KEY `UK68ncqwk9y0s123tp07lh90ndg` (`student_user_id`),
  CONSTRAINT `FK4s0tm3fo2fxlso2jd2q7nxjg4` FOREIGN KEY (`student_user_id`) REFERENCES `student` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reference`
--

LOCK TABLES `reference` WRITE;
/*!40000 ALTER TABLE `reference` DISABLE KEYS */;
/*!40000 ALTER TABLE `reference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reference_favorite_fields`
--

DROP TABLE IF EXISTS `reference_favorite_fields`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reference_favorite_fields` (
  `reference_reference_id` varchar(255) NOT NULL,
  `favorite_fields_field_name` varchar(255) NOT NULL,
  PRIMARY KEY (`reference_reference_id`,`favorite_fields_field_name`),
  KEY `FKdomoxjoyh040d4abtaejn3p1a` (`favorite_fields_field_name`),
  CONSTRAINT `FKdomoxjoyh040d4abtaejn3p1a` FOREIGN KEY (`favorite_fields_field_name`) REFERENCES `field` (`field_name`),
  CONSTRAINT `FKin4f0jlqj8l0nca4yoopun71d` FOREIGN KEY (`reference_reference_id`) REFERENCES `reference` (`reference_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reference_favorite_fields`
--

LOCK TABLES `reference_favorite_fields` WRITE;
/*!40000 ALTER TABLE `reference_favorite_fields` DISABLE KEYS */;
/*!40000 ALTER TABLE `reference_favorite_fields` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request_discount`
--

DROP TABLE IF EXISTS `request_discount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request_discount` (
  `request_discount_id` varchar(255) NOT NULL,
  `discount_rate` float NOT NULL,
  `status` enum('APPROVED','PENDING_APPROVAL','REJECTED') DEFAULT NULL,
  `approved_by_admin_user_id` varchar(255) DEFAULT NULL,
  `course_course_id` varchar(255) DEFAULT NULL,
  `submitted_by_teacher_user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`request_discount_id`),
  KEY `FKncwce1ht0f03g2s4g6v10m0ud` (`approved_by_admin_user_id`),
  KEY `FKtl2ydgt9ui6k8rrfje8pg4l6j` (`course_course_id`),
  KEY `FK76nntxiccvy2g3pqcy6udtye9` (`submitted_by_teacher_user_id`),
  CONSTRAINT `FK76nntxiccvy2g3pqcy6udtye9` FOREIGN KEY (`submitted_by_teacher_user_id`) REFERENCES `teacher` (`user_id`),
  CONSTRAINT `FKncwce1ht0f03g2s4g6v10m0ud` FOREIGN KEY (`approved_by_admin_user_id`) REFERENCES `admin` (`user_id`),
  CONSTRAINT `FKtl2ydgt9ui6k8rrfje8pg4l6j` FOREIGN KEY (`course_course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request_discount`
--

LOCK TABLES `request_discount` WRITE;
/*!40000 ALTER TABLE `request_discount` DISABLE KEYS */;
INSERT INTO `request_discount` VALUES ('54c8d95f-4fb8-40bb-9cf4-38866cee4875',0.1,'APPROVED','154bd7d7-c989-424f-a8f2-2f4bab7133b5','f6e31b35-3fee-4669-a0b3-12facc4c8ddb','08877d35-f3ce-4c82-9664-4e5c5065f717'),('b1d6d53c-5dfc-4193-8abb-544a5addd446',0.2,'PENDING_APPROVAL',NULL,'4bc18f42-433a-41ce-94a9-ce1cc57ec66d','08877d35-f3ce-4c82-9664-4e5c5065f717'),('cd240536-71a1-433f-bbc0-c91efeb71538',0.3,'PENDING_APPROVAL',NULL,'877633c9-05e6-4fb3-b1e3-b702504bc8b1','08877d35-f3ce-4c82-9664-4e5c5065f717'),('e23f9095-b42b-4119-9d85-53f881e1116c',0.4,'APPROVED','154bd7d7-c989-424f-a8f2-2f4bab7133b5','f6e31b35-3fee-4669-a0b3-12facc4c8ddb','08877d35-f3ce-4c82-9664-4e5c5065f717'),('e23f9095-b62b-4119-9d85-53f881e1116c',0.4,'APPROVED','154bd7d7-c989-424f-a8f2-2f4bab7133b5','6cf7c084-29b8-493d-b3c1-c991bc4cb461','08877d35-f3ce-4c82-9664-4e5c5065f717');
/*!40000 ALTER TABLE `request_discount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `review_id` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `rating` float NOT NULL,
  `review_at` datetime(6) DEFAULT NULL,
  `course_course_id` varchar(255) DEFAULT NULL,
  `student_user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  UNIQUE KEY `unique_review` (`course_course_id`,`student_user_id`),
  KEY `FKa24vqnei1k78p3bau9ybv9ncf` (`student_user_id`),
  CONSTRAINT `FKa24vqnei1k78p3bau9ybv9ncf` FOREIGN KEY (`student_user_id`) REFERENCES `student` (`user_id`),
  CONSTRAINT `FKkdo43h8ybekah0x2bu98qindw` FOREIGN KEY (`course_course_id`) REFERENCES `course` (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES ('424fe99b-d433-4f5c-bb20-0a99b6e22767','this course so nice',1,'2024-09-06 13:35:38.471995','6cf7c084-29b8-493d-b3c1-c991bc4cb461','a917d04b-68ac-46e0-85d8-ead65f38eefc'),('51c17053-c627-4a2d-9ae7-96da89b16935','so so',0.8,'2024-09-14 21:29:00.153547','6cf7c084-29b8-493d-b3c1-c991bc4cb461','021ebec3-c49d-4c34-999a-56857e3eade1'),('64e5df98-6691-461c-3ffa-701913b1a423','not good',0.2,'2024-08-12 11:58:55.883469','f6e31b35-3fee-4669-a0b3-12facc4c8ddb','3e1e88b1-c6ba-492c-b362-75e7dc3cceba'),('64e5df98-6691-461c-3ffa-701923b1a405','not good',0.4,'2024-09-08 11:58:55.883469','f6e31b35-3fee-4669-a0b3-12facc4c8ddb','021ebec3-c49d-4c34-999a-56857e3eade1'),('64e5df98-6691-461c-3ffa-701923b1a423','not good',0.4,'2024-10-09 11:58:55.883469','f6e31b35-3fee-4669-a0b3-12facc4c8ddb','a917d04b-68ac-46e0-85d8-ead65f38eefc'),('64e5df98-6691-461c-45fa-701923b1a405','it\'s good',0.8,'2024-09-09 11:58:55.883469','fdea06df-65ac-4f74-a75d-d06b7cd44cbd','3e1e88b1-c6ba-492c-b362-75e7dc3cceba'),('64eadf98-6691-461c-45fa-701923b1a405','it\'s good',0.6,'2024-09-09 11:57:55.883469','fdea06df-65ac-4f74-a75d-d06b7cd44cbd','a917d04b-68ac-46e0-85d8-ead65f38eefc'),('64eadf98-6691-468c-45fa-701923b1a405','it\'s good',0.8,'2024-09-09 11:54:55.883469','fdea06df-65ac-4f74-a75d-d06b7cd44cbd','021ebec3-c49d-4c34-999a-56857e3eade1'),('64eadf98-6691-468c-8efa-701923b15264','good',0.8,'2024-09-05 11:54:55.883469','4bc18f42-433a-41ce-94a9-ce1cc57ec66d','d52b13c4-d2b4-46f9-a888-e28c08cc8690'),('64eadf98-6691-468c-8efa-701923b15673','good',0.8,'2024-09-07 11:54:55.883469','4bc18f42-433a-41ce-94a9-ce1cc57ec66d','c2a34142-7ed4-4103-a77d-148de8ee8413'),('64eadf98-6691-468c-8efa-701923b15674','good',1,'2024-09-08 11:54:55.883469','4bc18f42-433a-41ce-94a9-ce1cc57ec66d','a917d04b-68ac-46e0-85d8-ead65f38eefc'),('64eadf98-6691-468c-8efa-701923b1a405','so so',0.6,'2024-09-09 11:54:55.883469','6cf7c084-29b8-493d-b3c1-c991bc4cb461','3e1e88b1-c6ba-492c-b362-75e7dc3cceba');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `role_name` varchar(255) NOT NULL,
  `role_description` varchar(255) NOT NULL,
  PRIMARY KEY (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES ('ADMIN','manage all user and approve course in a system'),('STUDENT','end user: student in a system'),('TEACHER','end user: teacher in a system');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `role_role_name` varchar(255) NOT NULL,
  `permissions_permission_name` varchar(255) NOT NULL,
  PRIMARY KEY (`role_role_name`,`permissions_permission_name`),
  KEY `FKss4qy3ho5ho4uilvor0j6cpiv` (`permissions_permission_name`),
  CONSTRAINT `FK89sokgd3h7b3f1v15aao21no5` FOREIGN KEY (`role_role_name`) REFERENCES `role` (`role_name`),
  CONSTRAINT `FKss4qy3ho5ho4uilvor0j6cpiv` FOREIGN KEY (`permissions_permission_name`) REFERENCES `permission` (`permission_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `FKk5m148xqefonqw7bgnpm0snwj` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES ('021ebec3-c49d-4c34-999a-56857e3eade1'),('1d2a7f99-78dc-4036-821b-5da227d6d3d7'),('3e1e88b1-c6ba-492c-b362-75e7dc3cceba'),('424eac21-9dc7-4461-aa48-930051720145'),('5006cf12-2c5e-4cda-abce-6c7caa872bad'),('7cba39b1-1fbe-4687-a63c-9560ec29d166'),('8463b920-18d6-4044-bdd6-e7398dc52b53'),('8f96bc01-fa5f-4384-b7f1-efb1ae4ed122'),('9146f9f2-c986-4e04-ab4a-f0d9b0a6ff8e'),('a917d04b-68ac-46e0-85d8-ead65f38eefc'),('c2a34142-7ed4-4103-a77d-148de8ee8413'),('d52b13c4-d2b4-46f9-a888-e28c08cc8690');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_answer`
--

DROP TABLE IF EXISTS `student_answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_answer` (
  `student_answer_id` varchar(255) NOT NULL,
  `is_correct` bit(1) NOT NULL,
  `question_question_id` varchar(255) DEFAULT NULL,
  `quiz_result_quiz_result_id` varchar(255) DEFAULT NULL,
  `selected_answer_answer_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`student_answer_id`),
  KEY `FK4nscpen1kpb5erxycoak09rwt` (`question_question_id`),
  KEY `FK8n8t6xsuvhnajmxh8wpyonj61` (`quiz_result_quiz_result_id`),
  KEY `FKfaryilogvy11m5pbrlw0rpxjq` (`selected_answer_answer_id`),
  CONSTRAINT `FK4nscpen1kpb5erxycoak09rwt` FOREIGN KEY (`question_question_id`) REFERENCES `question` (`question_id`),
  CONSTRAINT `FK8n8t6xsuvhnajmxh8wpyonj61` FOREIGN KEY (`quiz_result_quiz_result_id`) REFERENCES `quiz_result` (`quiz_result_id`),
  CONSTRAINT `FKfaryilogvy11m5pbrlw0rpxjq` FOREIGN KEY (`selected_answer_answer_id`) REFERENCES `answer` (`answer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_answer`
--

LOCK TABLES `student_answer` WRITE;
/*!40000 ALTER TABLE `student_answer` DISABLE KEYS */;
INSERT INTO `student_answer` VALUES ('6bdd611c-a463-4885-9caf-4edb573db3df',_binary '','63974a67-da0a-43ae-bf13-b43e94dcb58d','f5f50311-8c05-42b0-9184-cab08078da95','e0a2ed7b-2f41-4512-869d-3a0b5c48e24f'),('94eb94c9-16e1-44b2-b99f-571644ed782b',_binary '','63974a67-da0a-43ae-bf13-b43e94dcb58d','1990b786-ca70-49f5-a8a3-a0851849b06c','e0a2ed7b-2f41-4512-869d-3a0b5c48e24f'),('a6c5939b-4fb5-4c94-a9fc-e87f1354328e',_binary '','4d4281f2-99bc-4614-88d0-2e4aa28e0b70','1990b786-ca70-49f5-a8a3-a0851849b06c','4818b639-be18-4804-9074-c1177afa2792'),('ba9d59ea-801d-478d-912c-ac76219cda1c',_binary '\0','94edb88d-d45f-4140-9736-892a372547f8','f5f50311-8c05-42b0-9184-cab08078da95','2d087f84-d5c5-495e-bdf6-eed81cedda3b'),('cb74857d-7646-4ce0-9c9d-84e034307e04',_binary '','4d4281f2-99bc-4614-88d0-2e4aa28e0b70','f5f50311-8c05-42b0-9184-cab08078da95','4818b639-be18-4804-9074-c1177afa2792'),('f77b4326-e653-4594-91a7-eacccd6171af',_binary '\0','94edb88d-d45f-4140-9736-892a372547f8','1990b786-ca70-49f5-a8a3-a0851849b06c','2d087f84-d5c5-495e-bdf6-eed81cedda3b');
/*!40000 ALTER TABLE `student_answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `user_id` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `FKpb6g6pahj1mr2ijg92r7m1xlh` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */;
INSERT INTO `teacher` VALUES ('08877d35-f3ce-4c82-9664-4e5c5065f717'),('0bc87564-f672-424a-b248-3016d66310e0'),('0d379f51-9be2-4688-84ec-fa92078fd02d'),('25308c74-f7af-4715-ae5b-dabd74cc48b1'),('2b7a2933-b8b0-4e95-89ad-451e85d30d43'),('32811b19-b810-4c83-a554-add325dc22e6'),('3585f1a4-07d9-460d-8a63-b9e2ee128f3e'),('3737c549-ebf4-46d8-af29-e91524d92810'),('3806d7ff-e965-4658-a86a-3e0487322649'),('3edf8850-501d-4d45-a10b-9cb928fe1610'),('53e8138b-b44b-4cce-927c-744b36973b89'),('6536881c-b387-4af7-899d-e46fb1781193'),('72f1d877-b093-4aa5-a590-854beb3ec11b'),('77e2720f-3766-411c-9a83-d66fe9e8695b'),('7f752f4b-3c9f-47f2-a2d1-6bf8921aa151'),('8427f967-1385-40dc-8507-1775ef181644'),('87aaff89-ed02-402e-9359-971d95eb80d8'),('ad92ef3a-e120-4b04-b9e2-ed396aafcf42'),('beb1e37a-61d1-46a0-85a0-35647c10014b'),('d41f0978-5a2e-41af-82ca-f867a671c1a3'),('db0df2fe-3378-4e7f-9bf5-54831451afdb'),('e3b87ba8-175d-41cf-87df-ead5d228761d'),('e54cb2dc-3f83-4935-a984-6afce4ac7dc1'),('fd8c00f8-213c-4924-a96c-bb65f4a2892f');
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `test_id` varchar(255) NOT NULL,
  `is_deleted` bit(1) NOT NULL,
  `test_description` varchar(255) DEFAULT NULL,
  `lesson_lesson_id` varchar(255) DEFAULT NULL,
  `test_uploaded_at` datetime(6) DEFAULT NULL,
  `status` enum('APPROVED','IN_EDITING') DEFAULT NULL,
  `passing_score` int NOT NULL,
  PRIMARY KEY (`test_id`),
  KEY `FK6mj74nra5hdiuwmbae6awnp8o` (`lesson_lesson_id`),
  CONSTRAINT `FK6mj74nra5hdiuwmbae6awnp8o` FOREIGN KEY (`lesson_lesson_id`) REFERENCES `lesson` (`lesson_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES ('0074bf14-f5b0-46a3-adab-d7692eb32bdd',_binary '\0','exam 3','42430618-75ab-469c-a9b0-23f5c00cb60a',NULL,'IN_EDITING',60),('59a9f0a8-dbec-4882-8eeb-0fb3bb397d88',_binary '\0','Finding Your Voice Test','07e94909-363e-400a-9d5c-118f448d2042',NULL,'IN_EDITING',0),('6c3841c0-ff42-4ed6-b308-fcfe19a21327',_binary '\0','TEST TEST','6015008e-ed68-42d3-81fa-e1869f76c4fd','2024-09-09 15:34:25.812058','APPROVED',0),('6e019102-ef0d-4ab8-ab44-86dead6c86d4',_binary '\0','Đánh giá năng lực lần 2','5d2ef095-618f-4f7e-b173-b846421c26d3','2024-09-21 15:18:14.119374','IN_EDITING',0),('a6ffbe77-2490-4694-8866-5fdddf4ca0cb',_binary '\0','exam TEST','b2879651-af4d-4276-b31b-dee9bda3f9c4','2024-09-28 11:00:01.261505','IN_EDITING',30),('b42c400a-f513-4574-8f9b-9ad7e8b29278',_binary '\0','Đánh giá năng lực','27f4eaef-3d6c-4a1c-8968-6cd24cd1b0e1','2024-09-21 15:15:22.677852','APPROVED',0),('ba09ae0a-7468-43cd-a1a6-ecdbe151397a',_binary '','exam 2','f0ec21f7-a136-46f0-a7cc-da971eea096d',NULL,'APPROVED',0);
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `type_name` varchar(255) NOT NULL,
  `type_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`type_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES ('AcademicEnglish','Focuses on English skills needed for studying in an academic environment.'),('AdvancedEnglish','Focuses on advanced English language skills, including complex grammar, advanced vocabulary, and nuanced communication.'),('BusinessEnglish','Covers language skills necessary for communication in professional and business contexts.'),('ConversationalEnglish','Enhances fluency in everyday English conversation.'),('CreativeEnglish','Enhances creative expression through writing and storytelling in English.'),('EnglishCommunication','Improves everyday English speaking, listening, and conversation skills for social and professional use.'),('IELTS','International English Language Testing System preparation for academic and general training modules.'),('MedicalEnglish','Covers vocabulary and communication skills specific to healthcare and medical contexts.'),('PracticalEnglish','Emphasizes practical usage of English in everyday situations, including interactions in public spaces and basic service scenarios.'),('ProfessionalEnglish','Covers language skills essential for effective communication in a professional context, including business meetings, email correspondence, and presentations.'),('SpeakingSkills','Focuses on improving spoken English for clear and effective communication.'),('TechnicalEnglish','Focusing on the specific vocabulary and communication skills needed in technical and IT fields.'),('TestPreparation','Helps students prepare for standardized English tests such as IELTS, TOEIC, and TOEFL.'),('TOEIC','Test of English for International Communication, focusing on English language proficiency in business and professional settings.'),('TravelEnglish','Covers English language skills specifically for travel, including common phrases and vocabulary for various travel situations.'),('WritingSkills','Focuses on developing various writing techniques and styles, including creative writing, academic writing, and professional documentation.');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_bio` varchar(700) DEFAULT NULL,
  `user_birth` date DEFAULT NULL,
  `user_hometown` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `image_image_id` varchar(255) DEFAULT NULL,
  `is_deleted` bit(1) NOT NULL,
  `is_first_login` bit(1) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UKpdd50dj1hoybkht7kiec8ks5t` (`image_image_id`),
  UNIQUE KEY `unique_username` (`username`),
  CONSTRAINT `FKgx9c4y5baaa86htogxhllfen0` FOREIGN KEY (`image_image_id`) REFERENCES `image` (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('021ebec3-c49d-4c34-999a-56857e3eade1','tiendat@gmail.com','Tuyên','Hoàng','$2a$10$6NLg.Lf3Z6/u3QJIbt0btukLcLUgUCky/4z4Q21MTFAbhi5plq2lq','I\'m a good student','2003-10-20','24-THN','student5','2526bca5-8dbc-4968-9774-f64249386b5e',_binary '\0',_binary '\0'),('08877d35-f3ce-4c82-9664-4e5c5065f717','tranminhkhoa5421@gmail.com','Minh','Khoa','$2a$10$9gRGaisY1ODB.petkQm/NeoT4oll88xUnW/rWjtnkmtTZMXjia3US','Hi, I’m Tran Minh Khoa, a Senior Software Engineer with over 8 years of experience in software development and system architecture. I specialize in building scalable web applications and cloud solutions, with a strong focus on backend technologies and security. Throughout my career, I have led numerous projects across various industries and have spoken at several tech conferences, sharing insights on system optimization and cloud integration. I’m passionate about mentoring young developers and continuously learning about the latest technological advancements to stay ahead in this fast-evolving field.','1992-02-09','Ho Chi Minh City, Vietnam','teacher','9534cab2-95bb-4058-ae8f-c168ea3de23a',_binary '\0',_binary '\0'),('0bc87564-f672-424a-b248-3016d66310e0','hoangminhduong312@gmail.com','Minh','Dương','$2a$10$w/9lTWWjG2X06KaU3Ip7qOgmsyW1cosRtBAB4hXPwDeyxIHLGiOuu','With over 5 years of teaching experience, I have a deep passion for educating and empowering students in the field of technology. My expertise includes programming, big data, and artificial intelligence. I strive to create a dynamic learning environment that fosters critical thinking, creativity, and problem-solving skills. I believe that learning is a lifelong journey, and I encourage my students to continuously explore and embrace the ever-evolving world of technology','2000-10-15','Da Nang, Vietnam','teacher1','a594ae68-f381-4159-a0e2-b973203c5336',_binary '\0',_binary '\0'),('0d379f51-9be2-4688-84ec-fa92078fd02d','lelacquoi@gmail.com','Hoàng','Minh','$2a$10$E57/WNRDHbm1LBlm8T3mweyYGuBKd82BvUqpWy3fGyr4U/I5B8Wh6',NULL,NULL,NULL,'nguyenvanle4','37087e64-3e25-4aab-97dc-77f2447c4a36',_binary '\0',_binary '\0'),('154bd7d7-c989-424f-a8f2-2f4bab7133b5','admin@gmail.com','Hà','Thu','$2a$10$DwD1HarCWk5Fuymbl6wSHecikFrLIHFs8TRxBUJXDi60iRSAcS/yO','First admin in the System!','2003-10-15','24-THN','admin','bd944892-5b9a-41af-85ea-5f17b0ea9ced',_binary '\0',_binary '\0'),('1d2a7f99-78dc-4036-821b-5da227d6d3d7','tulele@student.ctu.edu.vn','Tú','Lê','$2a$10$8qyhx2RQlIfmWfuBfAEQNOlFrU0qMwFRuE/temg/hsWoXd178ZZWu','Tớ là Tú, xin chào cậu','2003-08-29','Trà Vinh','Tule0103','c2cb6300-f860-4fc2-a8bc-f4368ed07cb8',_binary '\0',_binary ''),('25308c74-f7af-4715-ae5b-dabd74cc48b1','lelacquoi@gmail.com','le','nguyen','$2a$10$VOt6GlB9QSEoA0QEGqm6mOUdIS1a/XCOPFEOPC2jbpxWHU8C1q76G',NULL,NULL,NULL,'nguyenvanle16','13a36dda-ae7a-43d3-830f-f06025f5c8b8',_binary '\0',_binary ''),('2b7a2933-b8b0-4e95-89ad-451e85d30d43','lelacquoi@gmail.com','Tú','Lê','$2a$10$QdndrS6rTR3O18xBUj992OVWG8LzNJG6GtyjVGuk2R3p1vsN5JQeO',NULL,NULL,NULL,'nguyenvanle10','82dfe086-c073-4485-9885-2f37fdd00759',_binary '\0',_binary '\0'),('32811b19-b810-4c83-a554-add325dc22e6','lelacquoi@gmail.com','Lẹ','Nguyễn','$2a$10$RZsXFF7KIAhUAIfQII5qU.K3ji2RGXRubExf/Q7XvYjdTJQVcN/lu','',NULL,'','nguyenvanle1','9bca3150-edff-4be7-87be-cd89289f01d0',_binary '\0',_binary '\0'),('3585f1a4-07d9-460d-8a63-b9e2ee128f3e','lelacquoi@gmail.com','le','nguyen','$2a$10$piQFL8FajKHh6ztFMNn0UeAZM4i1Z.yFBLLwp35A.yNX29Nqr/R2y',NULL,NULL,NULL,'nguyenvanle20','ef651627-0c58-4fdb-aa26-ad5e88e7a2b7',_binary '\0',_binary ''),('3737c549-ebf4-46d8-af29-e91524d92810','lelacquoi@gmail.com','le','nguyen','$2a$10$I3BEl01XicAaKgQYheYUAef6WrUrPv/WiLqxxZxzGOdkHbesRfvP.',NULL,NULL,NULL,'nguyenvanle17','286f95bb-30df-4d7d-b615-8c967fb8ae0f',_binary '\0',_binary ''),('3806d7ff-e965-4658-a86a-3e0487322649','tiendat@gmail.com','Đạt','Nguyễn','$2a$10$3kydNdDhhaaHcMkY4gFZ..cTa5JfUEqfQEc5OspAFJjpZjUuMCK7W','I\'m a student','2003-10-15','24-THN','teacherTienDat3','39cafc49-5561-4729-917f-5c5d7304fac0',_binary '\0',_binary '\0'),('3e1e88b1-c6ba-492c-b362-75e7dc3cceba','duynguyen@gmail.com','Duy','Tâm','$2a$10$muJ9AyNIW4l38WHRrLcqaeLPTrtYHIH9UsnpZgJqsiLTbGMuTB.iW',NULL,'2003-10-16',NULL,'Duy0102','c7d66ed0-8b20-400a-80b1-3ce1322fb699',_binary '\0',_binary '\0'),('3edf8850-501d-4d45-a10b-9cb928fe1610','lelacquoi@gmail.com','Phi','Trương','$2a$10$W4qaBHY23Eg3QmEiQ8leD.P349WHsYS3LWJmQaPuS.z983zZiNVh2',NULL,NULL,NULL,'nguyenvanle13','ab1b6a0e-fda8-4938-8136-07a848c99764',_binary '\0',_binary '\0'),('424eac21-9dc7-4461-aa48-930051720145','lelacquoi@gmail.com','Lý','Huỳnh','$2a$10$18K.sf1ptTggQ/2F9fzrP.nLj/TI5.KbavqMyT.Ra3gPgUBnI.eoa',NULL,'2003-02-01',NULL,'Le0102','94f0fb79-7cc4-435a-9a50-6d9896ce4107',_binary '\0',_binary '\0'),('5006cf12-2c5e-4cda-abce-6c7caa872bad','kimlan0803@gmail.com','Lân','Kim','$2a$10$bPT8iIIP9hniUdT9g8v51.5w97PyBWS9W2OpWhvswnq82U4qITH02','I\'m is a best student in a system','2003-08-29','Tri Tôn - An Giang','student1','46641ee9-a1d2-4b38-8614-7e65391c4d6e',_binary '\0',_binary ''),('53e8138b-b44b-4cce-927c-744b36973b89','lelacquoi@gmail.com','Châu','Minh','$2a$10$aZaUIAKGhEXn1m4HcvhR5.yUF3bnMr5iCyx5E8L5rCIpKlfWzwt4q',NULL,NULL,NULL,'nguyenvanle8','cf719bff-21ba-46c8-8843-73948f06316b',_binary '\0',_binary '\0'),('6536881c-b387-4af7-899d-e46fb1781193','lelacquoi@gmail.com','Hoàng','Phúc','$2a$10$AfpltVYJ3n5nSW6X9nlHROvg96ROvw4g8a5u6e5bWZGuyj32yf1h.',NULL,NULL,NULL,'nguyenvanle11','83a6b14c-d12b-4519-96e8-d03558a4bb44',_binary '\0',_binary '\0'),('72f1d877-b093-4aa5-a590-854beb3ec11b','lelacquoi@gmail.com','Lệ','Thu','$2a$10$PrFP4raN1L.NgGsSiqV5Zu3HcS4dmtt9oYADlNPJB3ZgfWEFarNGe',NULL,NULL,NULL,'nguyenvanle6','84c9e922-43b9-4a71-bb41-3ec70bb436df',_binary '\0',_binary '\0'),('77e2720f-3766-411c-9a83-d66fe9e8695b','lelacquoi@gmail.com','Kiệt','Nguyễn','$2a$10$xW2LKuajUx40c330LI2Ff.55IajKkh2YtOUL4IUEqeYMJUXIw6gVC','',NULL,'','nguyenvanle','90284ffd-6609-479e-9cbd-d3bb96233780',_binary '\0',_binary '\0'),('7cba39b1-1fbe-4687-a63c-9560ec29d166','nguyenhungthinh@gmail.com','Sao','Huỳnh','$2a$10$gIR7dbr43bEX5tk5d4k7S.i2.kmzgiqrxllZELxy/xBPIQaCy8fQW',NULL,'2003-02-01',NULL,'Thinh0102','ebb637c2-e69f-40c4-a8cd-fdf364e7cc43',_binary '\0',_binary '\0'),('7f752f4b-3c9f-47f2-a2d1-6bf8921aa151','1234@gmail.com','Tú','Lê','$2a$10$UM0abQgAdG5kuMowuQiu5eM.4JNrOhe8WFVb8xi2zeqWBRZRy539i','Experiend with speaking','2003-08-29',NULL,'teacher2','b58ffa27-f6f0-4838-8458-0b2746138872',_binary '\0',_binary ''),('8427f967-1385-40dc-8507-1775ef181644','lelacquoi@gmail.com','GIàu','Ngọc','$2a$10$fhn1R3/kURoC9CjaOy3mhOQMaHo2BlD7BhL/obTSJdjHmlP2TlHIm',NULL,NULL,NULL,'nguyenvanle5','92f48639-888a-421d-af8c-84e1ad4cfaf0',_binary '\0',_binary '\0'),('8463b920-18d6-4044-bdd6-e7398dc52b53','leduonganhtu0102@gmail.com','Sang','Thanh','$2a$10$5Xr4ebLzHE85Rp7XskacUezkOIiexHJrxfRYGTlMevpBJ0rg2dEYO',NULL,'2003-02-01',NULL,'TuLe0102','50156f4d-e2ff-4bf1-a828-4077f65d5ba9',_binary '\0',_binary '\0'),('87aaff89-ed02-402e-9359-971d95eb80d8','lelacquoi@gmail.com','le','nguyen','$2a$10$BcgWv4/ea/fvfh9d/8nrMenK/Z2M1VdEzboaHqPcvhXSAdnwPXEW.',NULL,NULL,NULL,'nguyenvanle19','34c8819a-2bad-4a07-bfb5-e66c2de95643',_binary '\0',_binary ''),('8f96bc01-fa5f-4384-b7f1-efb1ae4ed122','thu1610@gmail.com','Hoàng','Nguyễn','$2a$10$062mfPix59jkbG5cJd64Z.9xBWH6oMxP6QW4QQv9TRyjyV.POJoea',NULL,'2003-10-16',NULL,'Thu0102','b2d904ef-aa1b-4853-98f2-2685dd7e00cb',_binary '\0',_binary '\0'),('9146f9f2-c986-4e04-ab4a-f0d9b0a6ff8e','1234@gmail.com','Đạo','Văn','$2a$10$4hiAs0wUdaIX10LB2CGcG.9dKrL2ktcliXvnnW41jcTGK0EAiib/a',NULL,'2003-08-29',NULL,'TienDat002','247bf031-a9f0-45ff-911e-3fc8c0253ac8',_binary '\0',_binary ''),('a6f76bd7-dfe8-4196-b5b9-45ab62b00772','admin@gmail.com','Khang','Lê','$2a$10$2oYV9GycIX18kqT73KErwu.JZb1CQlC315ylNjLtFdL7EDwdr0r92','My bio!','2003-10-15','24-THN','admin1','6a8009a4-a7fa-458f-80f6-a4e86131d8ab',_binary '\0',_binary '\0'),('a917d04b-68ac-46e0-85d8-ead65f38eefc','tiendat@gmail.com','Hào','Trương','$2a$10$EVZdycT5CX6tPOpdMuw2HuSfA33Tbno8j77mBcoBe1me5HHpkSoXq','I\'m a student','2003-10-15','24-THN','student4','31345465-e5d8-47ec-bcc9-a1acee31f72e',_binary '\0',_binary '\0'),('ad92ef3a-e120-4b04-b9e2-ed396aafcf42','lelacquoi@gmail.com','Anh','Thư','$2a$10$jI1ZxCygaiOw4ZJnYrvrgeH0kcCvTBqAm6cBYsXmbaiD.HdyqzjK6',NULL,NULL,NULL,'nguyenvanle9','897c0eee-cb52-479a-8098-199b7d29b3bb',_binary '\0',_binary '\0'),('beb1e37a-61d1-46a0-85a0-35647c10014b','lelacquoi@gmail.com','le','nguyen','$2a$10$RKuVIPIOYJwyVxlXISpxyu9iSahVT58upqgX.Ma4mY/TgJOsBMmFa',NULL,NULL,NULL,'nguyenvanle15','a7e35d9e-a5ec-43ae-838d-6dbcf74b7698',_binary '\0',_binary ''),('c2a34142-7ed4-4103-a77d-148de8ee8413','tiendat@gmail.com','tien','dat','$2a$10$glRBDjzmbWIOFDXUnajhZehrYXxutBYMdwReQqOejT7hVS8AFqMS6','I\'m a student','2003-10-15','24-THN','student6','cf3b4b41-e092-4848-bca2-d35c3f324c34',_binary '\0',_binary ''),('d361a8af-de76-43e5-b8de-0b9dcd5a2a40','admin@gmail.com','tien','dat','$2a$10$62Hek6C3nzv7iSzYCAxVR.Q3H45EtEOD2CunRnU0cUIxo3GI0nLjS','My bio!','2003-10-15','24-THN','admin4','06c545d4-fe45-4651-9dda-d2d770a7a84a',_binary '\0',_binary ''),('d41f0978-5a2e-41af-82ca-f867a671c1a3','lelacquoi@gmail.com','le','nguyen','$2a$10$DEckYwL.cnb2QJbuWd/GYuHZMhhIqJRXXHDXLFzFnLPqO883SmAtC',NULL,NULL,NULL,'nguyenvanle18','6adfd171-e46a-4ed3-a87a-921df624135b',_binary '\0',_binary ''),('d52b13c4-d2b4-46f9-a888-e28c08cc8690','tiendat@gmail.com','Châu','Huỳnh','$2a$10$9qcNbznS6d1RFcANpt7g8eaQNeLsO6iBkyAay8TAggp1kEspKNeWa','I\'m a student','2003-10-15','24-THN','student','c2012997-464f-488e-aef5-cbe05e390290',_binary '\0',_binary ''),('db0df2fe-3378-4e7f-9bf5-54831451afdb','lelacquoi@gmail.com','le','nguyen','$2a$10$sYo5pui4kV1VCqGEPZivw.wlnV/f4/BeWO1BdsSJSehiZt97TaXES',NULL,NULL,NULL,'nguyenvanle14','8201a688-cca9-440d-a953-efe207f697fc',_binary '\0',_binary ''),('de8d872e-8266-49fa-8a13-33531b10e2f1','admin@gmail.com','Nhật','Nguyễn','$2a$10$X9rHmhE3zN4tVYlIpCBuzuJSb6OofSkPzR7r3Xf6wDYoeoNmT/Cai','My bio!','2003-10-15','24-THN','admin2','a2a5bbeb-09dd-4099-832d-46c0257a57b1',_binary '\0',_binary '\0'),('decfe66b-8573-41b9-987f-5a6cc079e696','admin@gmail.com','Anh','Nhật','$2a$10$ft7pVUGvMA38b.zIMEnQDOutAe65WMnuzmF7pIZC6ORcQwgRnTdkG','My bio!','2003-10-15','24-THN','admin3','e576685b-e0ef-4371-b0e8-bc23f837ca00',_binary '\0',_binary '\0'),('e3b87ba8-175d-41cf-87df-ead5d228761d','lelacquoi@gmail.com','Hồng','Nguyễn','$2a$10$ieinZB1Z/wnGiDI25iIAeezVmjBfB.3Yc4iQa2Z1v5qy0QY7Et.f.',NULL,NULL,NULL,'nguyenvanle7','12528873-5027-4e65-a683-1fb4199a68e0',_binary '\0',_binary '\0'),('e54cb2dc-3f83-4935-a984-6afce4ac7dc1','lelacquoi@gmail.com','Tâm','Trần','$2a$10$7zPIr2nrIFhxed2ChpkQweRFob71c5Kfai4tehSbDenUNjwou7yQK',NULL,NULL,NULL,'nguyenvanle3','69e672ed-1852-4794-9854-c6dcd8d079bf',_binary '\0',_binary '\0'),('fd8c00f8-213c-4924-a96c-bb65f4a2892f','tiendat@gmail.com','Ngọc','Đào','$2a$10$ViYRyfvKCJNxMHaVA4S/6e0YScqSq5xkh0.ToT0kryD1J461HgTqa','I\'m a student','2003-10-15','24-THN','teacherTienDat2','36c1dcf7-4b2c-485a-8c9c-0ecd6721c6c2',_binary '\0',_binary '\0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_user_id` varchar(255) NOT NULL,
  `roles_role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`user_user_id`,`roles_role_name`),
  KEY `FKlcygxtaadskmj7vga3jwsxmts` (`roles_role_name`),
  CONSTRAINT `FKkv46dn3qakjvsk7ra33nd5sns` FOREIGN KEY (`user_user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKlcygxtaadskmj7vga3jwsxmts` FOREIGN KEY (`roles_role_name`) REFERENCES `role` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES ('154bd7d7-c989-424f-a8f2-2f4bab7133b5','ADMIN'),('a6f76bd7-dfe8-4196-b5b9-45ab62b00772','ADMIN'),('d361a8af-de76-43e5-b8de-0b9dcd5a2a40','ADMIN'),('de8d872e-8266-49fa-8a13-33531b10e2f1','ADMIN'),('decfe66b-8573-41b9-987f-5a6cc079e696','ADMIN'),('021ebec3-c49d-4c34-999a-56857e3eade1','STUDENT'),('1d2a7f99-78dc-4036-821b-5da227d6d3d7','STUDENT'),('3e1e88b1-c6ba-492c-b362-75e7dc3cceba','STUDENT'),('424eac21-9dc7-4461-aa48-930051720145','STUDENT'),('5006cf12-2c5e-4cda-abce-6c7caa872bad','STUDENT'),('7cba39b1-1fbe-4687-a63c-9560ec29d166','STUDENT'),('8463b920-18d6-4044-bdd6-e7398dc52b53','STUDENT'),('8f96bc01-fa5f-4384-b7f1-efb1ae4ed122','STUDENT'),('9146f9f2-c986-4e04-ab4a-f0d9b0a6ff8e','STUDENT'),('a917d04b-68ac-46e0-85d8-ead65f38eefc','STUDENT'),('c2a34142-7ed4-4103-a77d-148de8ee8413','STUDENT'),('d52b13c4-d2b4-46f9-a888-e28c08cc8690','STUDENT'),('08877d35-f3ce-4c82-9664-4e5c5065f717','TEACHER'),('0bc87564-f672-424a-b248-3016d66310e0','TEACHER'),('0d379f51-9be2-4688-84ec-fa92078fd02d','TEACHER'),('25308c74-f7af-4715-ae5b-dabd74cc48b1','TEACHER'),('2b7a2933-b8b0-4e95-89ad-451e85d30d43','TEACHER'),('32811b19-b810-4c83-a554-add325dc22e6','TEACHER'),('3585f1a4-07d9-460d-8a63-b9e2ee128f3e','TEACHER'),('3737c549-ebf4-46d8-af29-e91524d92810','TEACHER'),('3806d7ff-e965-4658-a86a-3e0487322649','TEACHER'),('3edf8850-501d-4d45-a10b-9cb928fe1610','TEACHER'),('53e8138b-b44b-4cce-927c-744b36973b89','TEACHER'),('6536881c-b387-4af7-899d-e46fb1781193','TEACHER'),('72f1d877-b093-4aa5-a590-854beb3ec11b','TEACHER'),('77e2720f-3766-411c-9a83-d66fe9e8695b','TEACHER'),('7f752f4b-3c9f-47f2-a2d1-6bf8921aa151','TEACHER'),('8427f967-1385-40dc-8507-1775ef181644','TEACHER'),('87aaff89-ed02-402e-9359-971d95eb80d8','TEACHER'),('ad92ef3a-e120-4b04-b9e2-ed396aafcf42','TEACHER'),('beb1e37a-61d1-46a0-85a0-35647c10014b','TEACHER'),('d41f0978-5a2e-41af-82ca-f867a671c1a3','TEACHER'),('db0df2fe-3378-4e7f-9bf5-54831451afdb','TEACHER'),('e3b87ba8-175d-41cf-87df-ead5d228761d','TEACHER'),('e54cb2dc-3f83-4935-a984-6afce4ac7dc1','TEACHER'),('fd8c00f8-213c-4924-a96c-bb65f4a2892f','TEACHER');
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `video_id` varchar(255) NOT NULL,
  `video_duration` int NOT NULL,
  `video_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES ('0994c8a7-90df-43ef-bb6a-593996d4c7a2',1756,'videoUrl-test-update'),('0fdb322e-0d12-4f9b-a611-a785ddfdb02f',563,'https://youtu.be/ohW-P3ld4Mw'),('10bded79-10d7-426a-ab0e-a5449a5b9a85',550,'https://youtu.be/6WYJLkd3R9M?list=PLkeaG1zpPTHiMjczpmZ6ALd46VjjiQJ_8'),('197c0527-5454-4ad9-922d-a93ecd094e74',20,'https://youtu.be/l-aV3qt6dKw'),('19a252f8-ef7d-4a35-879b-d90be825c31e',852,'https://www.youtube.com/watch?v=niU9s2WwkpE'),('1d33f9e9-5797-40d3-919e-b7b72bea0bd1',606,'https://youtu.be/cL0aUTE6CH8'),('2e5a34a2-cd44-42ab-bd1c-823f8ad59b52',990,'https://youtu.be/YqRqHPQWzhk'),('403271af-5072-4631-9825-7c4d14719b4f',717,'https://youtu.be/XkP6eEGAXmA'),('41328787-0514-441f-b44c-a1710da5fc37',311,'https://youtu.be/cL0aUTE6CH8'),('5796102f-a683-44f9-9fba-6b2705f838d8',896,'https://youtu.be/uL0atQFZzL8'),('5e56272b-2613-4c85-a4f2-311c59a66ee6',55,'videoUrl-test-update'),('7e9bf9c3-3e16-46e9-875d-469f3d0d1637',997,'https://youtu.be/NFFfP0Ka180'),('7f182d43-27d1-4c73-b7de-bdb76c2d4cc0',1254,'videoUrl-test2'),('85401871-0fd4-4720-911f-9667250fa6d9',326,'https://youtu.be/lJC_sJ6jhDo?list=PLTZYG7bZ1u6pQJShZs9iV0aJNzsqTm4Mx'),('91aac492-60be-423e-a484-3f98a8e49092',468,'https://youtu.be/AZtBPrkc31g'),('97599aa6-d274-46ed-a2af-ae64a478cb59',427,'https://youtu.be/IW22_OnpS5Y'),('af153572-f157-4879-ae84-e3d80f92bb87',109,'https://youtu.be/8E-oqahDnb8'),('b43c0983-297d-43e8-ae51-d25f3ba149a6',600,'https://youtu.be/xVFMmyROOo4?list=PLzf4HHlsQFwIQUeZq_ykEVB6qZrTRnJZn'),('b7edad78-e8c6-4a2f-9892-cef1fcda31da',713,'https://youtu.be/1w3Sh3EzE7s'),('c0c3014a-e369-4156-a4d9-41da4cdc99d8',452,'https://youtu.be/nGzYzq3Wsos'),('ca0ef8ed-aae3-4cb6-8825-d882f7af0238',1197,'https://youtu.be/YMyofREc5Jk'),('cc0d1b79-ead9-42ea-9e79-70f3bcfcbf07',427,'https://youtu.be/IW22_OnpS5Y'),('d4300364-689c-4945-9277-814b65446fd1',307,'https://youtu.be/bgz2vNMTpxQ'),('e9187492-fda3-4d9f-a725-b201a4c2bae2',20,'https://youtu.be/Yc6dBrMDP30'),('f27e6eb3-13c6-46ac-9227-1fb32fd465e6',623,'https://youtu.be/tcgIQ_ld0Ls'),('f5dfafdf-69f6-4081-a26b-a952fd5444df',2358,'videoUrl-test'),('f73e8b17-2dff-44b6-9548-0d0209ea1ed4',240,'https://youtu.be/OnaVsSGD7n4'),('f7aaeaf5-29c9-4496-b180-80883ab727be',471,'https://youtu.be/b12JrM-6DBY'),('f7e195b9-ac8f-4623-bf68-61d6003443bf',724,'https://youtu.be/lNwRvKaNsGc'),('fcbc2b2f-5410-44c7-b084-b460c4ea20aa',377,'https://youtu.be/Y9GZaA6u2mM');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'duokoala'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-07 14:03:07
