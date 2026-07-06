-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-07-2026 a las 06:48:46
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `videojuegos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `nombre` varchar(200) NOT NULL,
  `producto` varchar(200) NOT NULL,
  `pago_total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`nombre`, `producto`, `pago_total`) VALUES
('pancho', 'Final Fantasy IX (x1)', 99),
('lopane', 'Mortal Kombat Decept (x1)', 66);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE `juegos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `genero` varchar(20) NOT NULL,
  `imagen` varchar(3000) NOT NULL,
  `precio` int(11) NOT NULL,
  `juego_activo` tinyint(1) DEFAULT 1,
  `tipo_de_juegos` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`id`, `nombre`, `genero`, `imagen`, `precio`, `juego_activo`, `tipo_de_juegos`) VALUES
(2, 'dragon quest 7', 'jrpg', 'https://static.wikia.nocookie.net/dragonquest/images/e/e0/Dragon_Warrior_VII.jpg/revision/latest?cb=20131110200759&path-prefix=es', 77, 1, 'retro'),
(3, 'Final Fantasy IX', 'JRPG', 'https://image.api.playstation.com/cdn/UP0082/CUSA08877_00/w5Qz9UKNBvTZBSRZlV2jeG2BLOJ1u7Jw.png?w=440', 99, 1, 'retro'),
(4, 'Mortal Kombat Decept', 'JRPG', 'https://static.wikia.nocookie.net/mortalkombat/images/8/89/Mortal_Kombat_Deception_ps2.jpg/revision/latest/scale-to-width-down/300?cb=20081205204400&path-prefix=es', 66, 1, 'retro'),
(5, 'sfzero3', 'pelea', 'https://www.capcom-games.com/cfc2/assets/images/common/title4/package.png', 497, 1, 'retro'),
(6, 'nightmare on elm str', 'horror', 'https://m.media-amazon.com/images/M/MV5BNmQ2ZjQzZWMtZDkzYS00YTA0LTg2NDgtNzM4MGY2MDZmN2NkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 50, 1, 'retro'),
(7, 'silent hill 4', 'survival horror', 'https://sm.ign.com/ign_es/game/s/silent-hil/silent-hill-4-the-room_1z9c.png', 50, 1, 'retro'),
(8, 're requiem', 'survival horror', 'https://store-images.s-microsoft.com/image/apps.65104.14157056169306105.30ae0432-c36b-42e7-9bbb-f85189243ca3.8e302653-b1b3-4ef9-b328-6a0822123e0c', 50, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `email`, `password`) VALUES
(1, '0', '0', '[123456]'),
(2, '0', '0', '12354'),
(3, 'pancho', 'mail@gmail.com', '12354'),
(4, 'panchou', 'panchoisdiancho@gmail.com', '$2b$10$8FPQcH2B4UKvhHT/WmKA9eK7WdquRYhTSCm4zOIceOb7TRsfVlQMq');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `juegos`
--
ALTER TABLE `juegos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
