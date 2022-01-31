-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 31, 2022 at 04:10 PM
-- Server version: 10.6.0-MariaDB
-- PHP Version: 8.0.8

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecom_demo_db`
--
CREATE DATABASE IF NOT EXISTS `ecom_demo_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `ecom_demo_db`;

-- --------------------------------------------------------

--
-- Table structure for table `cart_item`
--

DROP TABLE IF EXISTS `cart_item`;
CREATE TABLE IF NOT EXISTS `cart_item` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`user_id`,`product_id`),
  KEY `fk_user_has_product_product1_idx` (`product_id`),
  KEY `fk_user_has_product_user1_idx` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cart_item`
--

INSERT INTO `cart_item` (`user_id`, `product_id`, `quantity`, `create_time`, `modified_time`) VALUES
(1, 1, 1, '2022-01-30 16:38:54', '2022-01-31 15:29:20'),
(1, 2, 1, '2022-01-30 17:14:33', '2022-01-31 15:29:22'),
(1, 3, 1, '2022-01-31 15:29:38', '2022-01-31 15:29:38'),
(2, 1, 3, '2022-01-31 16:07:27', '2022-01-31 16:07:27'),
(2, 2, 2, '2022-01-31 16:07:41', '2022-01-31 16:07:41'),
(3, 1, 3, '2022-01-31 15:31:02', '2022-01-31 15:31:02'),
(3, 2, 2, '2022-01-31 15:31:02', '2022-01-31 15:31:02'),
(3, 3, 1, '2022-01-31 15:31:34', '2022-01-31 15:31:34'),
(3, 4, 1, '2022-01-31 15:31:34', '2022-01-31 15:31:34'),
(4, 1, 3, '2022-01-31 15:32:16', '2022-01-31 15:32:16'),
(4, 3, 1, '2022-01-31 15:32:16', '2022-01-31 15:32:16'),
(4, 4, 1, '2022-01-31 15:32:34', '2022-01-31 15:32:34');

-- --------------------------------------------------------

--
-- Table structure for table `discount`
--

DROP TABLE IF EXISTS `discount`;
CREATE TABLE IF NOT EXISTS `discount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `promotion_type_id` int(11) NOT NULL,
  `discount_type_id` int(11) NOT NULL,
  `discount_unit_id` int(11) NOT NULL,
  `discount_value` decimal(10,2) NOT NULL,
  `valid_from` timestamp NOT NULL DEFAULT current_timestamp(),
  `valid_until` timestamp NULL DEFAULT NULL,
  `order_value_unit_id` int(11) NOT NULL,
  `min_order_value` decimal(10,2) DEFAULT NULL,
  `max_discount_amount` decimal(10,2) DEFAULT NULL,
  `is_active` int(11) NOT NULL DEFAULT 0,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`,`promotion_type_id`,`discount_type_id`,`discount_unit_id`,`order_value_unit_id`) USING BTREE,
  KEY `fk_discount_discount_type_idx` (`discount_type_id`),
  KEY `fk_discount_discount_unit1_idx` (`discount_unit_id`),
  KEY `fk_discount_promotion_type1_idx` (`promotion_type_id`),
  KEY `fk_discount_order_value_unit1_idx` (`order_value_unit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `discount`
--

INSERT INTO `discount` (`id`, `promotion_type_id`, `discount_type_id`, `discount_unit_id`, `discount_value`, `valid_from`, `valid_until`, `order_value_unit_id`, `min_order_value`, `max_discount_amount`, `is_active`, `create_time`, `modified_time`) VALUES
(1, 5, 1, 1, '15.00', '2022-01-30 18:15:14', '2022-02-28 18:12:47', 1, '3.00', NULL, 1, '2022-01-30 18:15:14', '2022-01-31 09:58:32'),
(2, 5, 1, 1, '5.00', '2021-11-01 18:24:21', '2022-02-24 18:19:51', 1, '2.00', NULL, 1, '2022-01-30 18:24:21', '2022-01-31 12:28:00'),
(4, 2, 2, 1, '20.00', '2022-01-31 10:48:52', '2022-03-09 10:46:28', 2, '150.00', NULL, 1, '2022-01-31 10:48:52', '2022-01-31 15:06:08');

-- --------------------------------------------------------

--
-- Table structure for table `discount_type`
--

DROP TABLE IF EXISTS `discount_type`;
CREATE TABLE IF NOT EXISTS `discount_type` (
  `id` int(11) NOT NULL,
  `code` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `desc` varchar(250) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `discount_type`
--

INSERT INTO `discount_type` (`id`, `code`, `title`, `desc`, `create_time`, `modified_time`) VALUES
(1, 'DTPRD', 'Product', NULL, '2022-01-30 13:02:53', '2022-01-30 13:02:53'),
(2, 'DTCRT', 'Cart', NULL, '2022-01-30 13:03:19', '2022-01-30 13:03:19');

-- --------------------------------------------------------

--
-- Table structure for table `discount_unit`
--

DROP TABLE IF EXISTS `discount_unit`;
CREATE TABLE IF NOT EXISTS `discount_unit` (
  `id` int(11) NOT NULL,
  `code` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `desc` varchar(250) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `discount_unit`
--

INSERT INTO `discount_unit` (`id`, `code`, `title`, `desc`, `create_time`, `modified_time`) VALUES
(1, 'DUPRICE', 'Price', NULL, '2022-01-30 07:04:19', '2022-01-30 07:04:19'),
(2, 'DUPROD', 'Product', NULL, '2022-01-30 07:06:25', '2022-01-30 07:08:31');

-- --------------------------------------------------------

--
-- Table structure for table `order_value_unit`
--

DROP TABLE IF EXISTS `order_value_unit`;
CREATE TABLE IF NOT EXISTS `order_value_unit` (
  `id` int(11) NOT NULL,
  `code` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `desc` varchar(250) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `order_value_unit`
--

INSERT INTO `order_value_unit` (`id`, `code`, `title`, `desc`, `create_time`, `modified_time`) VALUES
(1, 'OVUPRD', 'Product', NULL, '2022-01-31 08:19:25', '2022-01-31 08:19:25'),
(2, 'OVUPRC', 'Price', NULL, '2022-01-31 08:19:44', '2022-01-31 08:19:44');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(80) DEFAULT NULL,
  `desc` varchar(250) DEFAULT NULL,
  `sku` varchar(45) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `is_active` int(11) DEFAULT 0,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `title`, `desc`, `sku`, `price`, `is_active`, `create_time`, `modified_time`) VALUES
(1, 'Product A', 'The lorem ipsum is a placeholder text used in publishing and graphic design. This filler text is a short paragraph that contains all the letters of the alphabet.', 'PA001', '30.00', 1, '2022-01-30 06:26:20', '2022-01-30 06:26:20'),
(2, 'Product B', 'The lorem ipsum is a placeholder text used in publishing and graphic design. This filler text is a short paragraph that contains all the letters of the alphabet.', 'PA002', '20.00', 1, '2022-01-30 06:27:53', '2022-01-30 06:27:53'),
(3, 'Product C', 'The lorem ipsum is a placeholder text used in publishing and graphic design. This filler text is a short paragraph that contains all the letters of the alphabet.', 'PA003', '50.00', 1, '2022-01-30 06:27:53', '2022-01-30 06:27:53'),
(4, 'Product D', 'The lorem ipsum is a placeholder text used in publishing and graphic design. This filler text is a short paragraph that contains all the letters of the alphabet.', 'PA004', '15.00', 1, '2022-01-30 06:28:27', '2022-01-30 06:28:27');

-- --------------------------------------------------------

--
-- Table structure for table `product_discount`
--

DROP TABLE IF EXISTS `product_discount`;
CREATE TABLE IF NOT EXISTS `product_discount` (
  `product_id` int(11) NOT NULL,
  `discount_id` int(11) NOT NULL,
  PRIMARY KEY (`product_id`,`discount_id`) USING BTREE,
  KEY `fk_product_has_discount_product1_idx` (`product_id`),
  KEY `fk_product_has_discount_discount1_idx` (`discount_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product_discount`
--

INSERT INTO `product_discount` (`product_id`, `discount_id`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `promotion_type`
--

DROP TABLE IF EXISTS `promotion_type`;
CREATE TABLE IF NOT EXISTS `promotion_type` (
  `id` int(11) NOT NULL,
  `code` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `desc` varchar(250) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `promotion_type`
--

INSERT INTO `promotion_type` (`id`, `code`, `title`, `desc`, `create_time`, `modified_time`) VALUES
(1, 'DTPRC', 'Percentage discount', NULL, '2022-01-30 07:07:54', '2022-01-30 07:07:54'),
(2, 'DTFTPRC', 'Flat price', NULL, '2022-01-30 07:12:03', '2022-01-30 07:12:03'),
(3, 'DTFTPER', 'Flat percentage', NULL, '2022-01-30 07:12:21', '2022-01-30 07:12:21'),
(4, 'DTBOGO', 'Buy One Get One', NULL, '2022-01-30 07:13:14', '2022-01-30 07:13:14'),
(5, 'DTMBUY', 'Multi buy', NULL, '2022-01-30 07:14:37', '2022-01-30 07:14:37'),
(6, 'DTFSHP', 'Free shipping', NULL, '2022-01-30 07:15:09', '2022-01-30 07:15:09');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(16) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(32) NOT NULL,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT current_timestamp(),
  `modified_time` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `first_name`, `last_name`, `create_time`, `modified_time`) VALUES
(1, 'adamjoe', 'adamjoe@gmail.com', 'aj123#', 'Adam', 'Joe', '2022-01-30 06:19:45', '2022-01-30 06:19:45'),
(2, 'erlich', 'erlichb@gmail.com', 'erlich123#', 'Erlich', 'Bachman', '2022-01-31 15:28:19', '2022-01-31 15:28:19'),
(3, 'richard', 'richardh@gmail.com', 'richard123#', 'Richard', 'Hendricks', '2022-01-31 15:28:19', '2022-01-31 15:28:19'),
(4, 'jared', 'jaredd@gmail.com', 'jared123#', 'Jared', 'Dunn', '2022-01-31 15:28:52', '2022-01-31 15:28:52');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `fk_user_has_product_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user_has_product_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `discount`
--
ALTER TABLE `discount`
  ADD CONSTRAINT `fk_discount_discount_type` FOREIGN KEY (`discount_type_id`) REFERENCES `discount_type` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_discount_discount_unit1` FOREIGN KEY (`discount_unit_id`) REFERENCES `discount_unit` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_discount_order_value_unit1` FOREIGN KEY (`order_value_unit_id`) REFERENCES `order_value_unit` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_discount_promotion_type1` FOREIGN KEY (`promotion_type_id`) REFERENCES `promotion_type` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `product_discount`
--
ALTER TABLE `product_discount`
  ADD CONSTRAINT `fk_product_has_discount_discount1` FOREIGN KEY (`discount_id`) REFERENCES `discount` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_has_discount_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
