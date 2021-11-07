-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 07, 2021 at 10:42 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `movie_ticket`
--

-- --------------------------------------------------------

--
-- Table structure for table `book_movie`
--

CREATE TABLE `book_movie` (
  `id` int(11) NOT NULL,
  `movie_id` int(11) DEFAULT NULL,
  `movie_time_id` int(11) NOT NULL,
  `theater_id` int(11) DEFAULT NULL,
  `screen_seat_id` int(11) DEFAULT NULL,
  `visitor_user_id` int(11) DEFAULT NULL,
  `person_name` varchar(255) DEFAULT NULL,
  `ticket_amount` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `update_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `id` int(11) NOT NULL,
  `movie_name` varchar(255) NOT NULL,
  `movie_trailer` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`id`, `movie_name`, `movie_trailer`) VALUES
(1, 'annatha', 'https://www.youtube.com/watch?v=zyVX8g71TGo'),
(2, 'jai bhim', 'https://www.youtube.com/watch?v=Gc6dEDnL8JA'),
(3, 'Aranmanai', 'https://www.youtube.com/watch?v=MRiK4WHaJb8');

-- --------------------------------------------------------

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `visitor_user_id` int(11) DEFAULT NULL,
  `movie_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL COMMENT '1-5 rating',
  `create_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `show_movie_time`
--

CREATE TABLE `show_movie_time` (
  `id` int(11) NOT NULL,
  `theater_owner_user_id` int(11) NOT NULL,
  `theater_id` int(11) NOT NULL,
  `movie_id` int(11) DEFAULT NULL,
  `show_date` varchar(255) DEFAULT NULL,
  `show_time` time DEFAULT NULL COMMENT 'show_time-24hrs ',
  `movie_amount` int(11) DEFAULT NULL,
  `time_available_status` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `theater`
--

CREATE TABLE `theater` (
  `id` int(11) NOT NULL,
  `theater_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `theater`
--

INSERT INTO `theater` (`id`, `theater_name`) VALUES
(1, 'priya complex'),
(2, 'GK cinemas');

-- --------------------------------------------------------

--
-- Table structure for table `theater_screen_seat`
--

CREATE TABLE `theater_screen_seat` (
  `id` int(11) NOT NULL,
  `seat_class` int(11) DEFAULT NULL COMMENT '1-normal,2-VIP',
  `seat_no` varchar(255) DEFAULT NULL,
  `status` int(5) NOT NULL DEFAULT 0 COMMENT '0-inactive,1-active',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `theater_screen_seat`
--

INSERT INTO `theater_screen_seat` (`id`, `seat_class`, `seat_no`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'A', 1, '2021-11-06 20:02:57', NULL),
(2, 1, 'B', 0, '2021-11-06 20:02:57', NULL),
(3, 1, 'C', 1, '2021-11-06 20:02:57', NULL),
(4, 1, 'D', 0, '2021-11-06 20:02:57', '2021-11-07 09:32:13'),
(5, 1, 'E', 1, '2021-11-06 20:02:57', '2021-11-07 09:33:15'),
(6, 1, 'F', 0, '2021-11-07 09:34:11', '2021-11-07 09:34:24'),
(7, 1, 'G', 1, '2021-11-07 09:35:07', '2021-11-07 09:35:24'),
(8, 1, 'H', 0, '2021-11-07 09:36:59', NULL),
(9, 1, 'I', 1, '2021-11-07 09:36:59', '2021-11-07 09:38:42'),
(10, 1, 'J', 0, '2021-11-07 09:36:59', '2021-11-07 09:37:15'),
(11, 1, 'K', 1, '2021-11-07 09:36:59', '2021-11-07 09:38:44'),
(12, 2, 'L', 1, '2021-11-07 09:36:59', '2021-11-07 09:38:47'),
(13, 2, 'M', 0, '2021-11-07 09:36:59', '2021-11-07 09:38:10'),
(14, 2, 'N', 1, '2021-11-07 09:36:59', '2021-11-07 09:38:50'),
(15, 2, 'O', 0, '2021-11-07 09:36:59', '2021-11-07 09:38:15'),
(16, 2, 'P', 1, '2021-11-07 09:36:59', '2021-11-07 09:38:54'),
(17, 2, 'Q', 0, '2021-11-07 09:36:59', '2021-11-07 09:38:19'),
(18, 2, 'R', 1, '2021-11-07 09:36:59', '2021-11-07 09:38:59'),
(19, 2, 'S', 0, '2021-11-07 09:36:59', '2021-11-07 09:38:24'),
(20, 2, 'T', 1, '2021-11-07 09:36:59', '2021-11-07 09:39:02'),
(21, 2, 'U', 0, '2021-11-07 09:36:59', '2021-11-07 09:38:28'),
(22, 2, 'V', 1, '2021-11-07 09:36:59', '2021-11-07 09:39:05'),
(23, 2, 'W', 0, '2021-11-07 09:36:59', '2021-11-07 09:38:32'),
(24, 2, 'X', 1, '2021-11-07 09:36:59', '2021-11-07 09:39:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_role` int(11) DEFAULT 0 COMMENT '1-theater owner,2-visitor',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book_movie`
--
ALTER TABLE `book_movie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `show_movie_time`
--
ALTER TABLE `show_movie_time`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `theater`
--
ALTER TABLE `theater`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `theater_screen_seat`
--
ALTER TABLE `theater_screen_seat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book_movie`
--
ALTER TABLE `book_movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `show_movie_time`
--
ALTER TABLE `show_movie_time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `theater`
--
ALTER TABLE `theater`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `theater_screen_seat`
--
ALTER TABLE `theater_screen_seat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
