-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-05-2021 a las 17:23:23
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilah_resto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `menus`
--

CREATE TABLE `menus` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `description` varchar(250) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `menus`
--

INSERT INTO `menus` (`id`, `name`, `price`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Bagel de Salmón', 425, NULL, '2021-05-11 22:08:39', '2021-05-11 22:08:39'),
(2, 'Hamburguesa Clásica', 350, NULL, '2021-05-11 22:08:39', '2021-05-11 22:08:39'),
(3, 'Sandwich Veggie', 310, NULL, '2021-05-11 22:08:39', '2021-05-11 22:08:39'),
(4, 'Ensalada Veggie', 340, NULL, '2021-05-11 22:08:39', '2021-05-11 22:08:39'),
(5, 'Focaccia', 300, NULL, '2021-05-11 22:08:39', '2021-05-11 22:08:39'),
(6, 'Sandwich Focaccia', 440, NULL, '2021-05-11 22:08:39', '2021-05-11 22:08:39'),
(7, 'Veggie Avocado', 310, NULL, '2021-05-11 22:08:39', '2021-05-11 22:08:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `menu_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `quantity`, `createdAt`, `updatedAt`, `menu_id`, `order_id`) VALUES
(7, 1, '2021-05-11 22:33:40', '2021-05-11 22:33:40', 1, 4),
(8, 5, '2021-05-11 22:33:40', '2021-05-11 22:33:40', 2, 4),
(9, 1, '2021-05-11 23:38:41', '2021-05-11 23:38:41', 1, 5),
(10, 25, '2021-05-11 23:38:41', '2021-05-11 23:38:41', 2, 5),
(11, 2, '2021-05-11 23:38:41', '2021-05-11 23:38:41', 4, 5),
(12, 15, '2021-05-11 23:38:41', '2021-05-11 23:38:41', 7, 5),
(13, 1, '2021-05-14 16:46:36', '2021-05-14 16:46:36', 1, 6),
(14, 25, '2021-05-14 16:46:36', '2021-05-14 16:46:36', 2, 6),
(15, 2, '2021-05-14 16:46:36', '2021-05-14 16:46:36', 4, 6),
(16, 15, '2021-05-14 16:46:36', '2021-05-14 16:46:36', 7, 6),
(17, 4, '2021-05-14 16:46:36', '2021-05-14 16:46:36', 5, 6),
(18, 1, '2021-05-14 17:14:20', '2021-05-14 17:14:20', 1, 7),
(19, 25, '2021-05-14 17:14:20', '2021-05-14 17:14:20', 2, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `state` enum('new','confirm','cancel','delivered') DEFAULT 'new',
  `payment_method` enum('cash','card') DEFAULT 'cash',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `state`, `payment_method`, `createdAt`, `updatedAt`, `user_id`) VALUES
(4, 'new', 'cash', '2021-05-11 20:33:40', '2021-05-11 20:33:40', 2),
(5, 'new', 'cash', '2021-05-11 21:38:41', '2021-05-11 21:38:41', 2),
(6, 'new', 'cash', '2021-05-14 14:46:36', '2021-05-14 14:46:36', 2),
(7, 'new', 'cash', '2021-05-14 15:14:20', '2021-05-14 15:14:20', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `password` varchar(150) DEFAULT NULL,
  `isAdmin` enum('admin','user') DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `address`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
(1, 'admin', 'admin@gmail.com', '12345678', 'admin adress', '$2a$10$4NiPvhESMq11cmVv6jS05.Gc6tH6p.GUWcr5T4FyIb.gk1kgX.Ys.', 'admin', '2021-05-11 22:09:00', '2021-05-11 22:09:00'),
(2, 'pedrito', 'pedrito@gmail.com', '12345678', 'admin adress', '$2a$10$xH9VInpLtHuuL8HhiGpksewWA9JFFIc13EisZuzfZQvM4x8V6Jkq6', 'user', '2021-05-11 22:10:00', '2021-05-11 22:10:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `menus`
--
ALTER TABLE `menus`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `menu_id` (`menu_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `menus`
--
ALTER TABLE `menus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `orderdetails_ibfk_1` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orderdetails_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
