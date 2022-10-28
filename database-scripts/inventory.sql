-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2022 at 05:58 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `imgURI` varchar(1000) DEFAULT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `quantity`, `imgURI`, `userId`) VALUES
(3, 'Boots', 9000, 0, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyuEPIHxKmn5hwMKEslKc-MfMccwxuDu8Ygw&usqp=CAU', 0),
(5, 'Test item 1', 1500, 25, 'http://res.cloudinary.com/dcph0cafi/image/upload/v1666943680/agt5tusan4qnbaoqcgab.jpg', 1),
(6, 'Test Item One', 1500, 25, 'http://res.cloudinary.com/dcph0cafi/image/upload/v1666953341/aekewun3dfhlkikakqm5.jpg', 1),
(7, 'Test Item', 1500, 25, 'http://res.cloudinary.com/dcph0cafi/image/upload/v1666954459/gh6yqxohyzxe8u0nzmve.jpg', 3),
(8, 'Test Item Two', 5200, 45, 'http://res.cloudinary.com/dcph0cafi/image/upload/v1666953531/pmnbamjdjhvcxwt4fwqq.jpg', 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
