-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-11-2026 a las 23:09:00
-- Versión del servidor: 10.11.19-MariaDB
-- Versión de PHP: 8.3.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestion_de_reportes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `ID_C` int(11) NOT NULL,
  `Nom_C` varchar(50) NOT NULL,
  `Mail_C` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`ID_C`, `Nom_C`, `Mail_C`) VALUES
(1, 'MCDonalds', 'contactos@mcdonalds.com.ar'),
(2, 'Cooperativa Obrera', 'soporte.lacoopeencasa@cooperativaobrera.coop');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamentos`
--

CREATE TABLE `departamentos` (
  `ID_Dptos` int(11) NOT NULL,
  `Nom_Dtpo` varchar(50) NOT NULL,
  `Nro_Interfaz` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departamentos`
--

INSERT INTO `departamentos` (`ID_Dptos`, `Nom_Dtpo`, `Nro_Interfaz`) VALUES
(1, 'Soporte', 0),
(2, 'Administración', 0),
(3, 'Desarrollo', 0),
(4, 'Operaciones', 0),
(5, 'Comercial', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `DNI_E` int(8) NOT NULL,
  `Nom_E` varchar(50) NOT NULL,
  `Tel_E` varchar(50) NOT NULL,
  `Mail_E` varchar(50) NOT NULL,
  `ID_Dpto` int(50) NOT NULL,
  `Usuario` varchar(50) NOT NULL,
  `Contrasena` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`DNI_E`, `Nom_E`, `Tel_E`, `Mail_E`, `ID_Dpto`, `Usuario`, `Contrasena`) VALUES
(1111111, 'Infante Agostina Loana', '2914671812', 'ainfante@obralapiedad.com.ar', 3, 'ainfante', '1234'),
(2222222, 'Persona Inventada', '6666677777', 'MailCualquiera@jajas.com', 2, 'pinventada', '1234'),
(3333333, 'Wander Marco Tomás', '2914354410', 'mwander@obralapiedad.com.ar', 1, 'mwander', '1234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modifica`
--

CREATE TABLE `modifica` (
  `Fecha_Modifica` date NOT NULL,
  `Hora_modifica` time NOT NULL,
  `Estado` varchar(50) NOT NULL,
  `DNI_E` int(8) NOT NULL,
  `ID_T` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modifica`
--

INSERT INTO `modifica` (`Fecha_Modifica`, `Hora_modifica`, `Estado`, `DNI_E`, `ID_T`) VALUES
('2026-11-25', '12:35:02', 'Pendiente', 3333333, 2),
('2026-11-25', '12:35:12', 'Pendiente', 3333333, 2),
('2026-11-25', '12:35:17', 'Pendiente', 3333333, 2),
('2026-11-25', '12:35:21', 'Pendiente', 3333333, 2),
('2026-11-25', '12:35:33', 'En proceso', 3333333, 2),
('2026-11-25', '13:11:59', 'En proceso', 3333333, 2),
('2026-11-25', '13:12:16', 'En proceso', 3333333, 2),
('2026-11-25', '18:47:30', 'En proceso', 2222222, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `ID_P` int(11) NOT NULL,
  `Nom_P` varchar(50) NOT NULL,
  `Desc_P` text NOT NULL,
  `ID_C` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`ID_P`, `Nom_P`, `Desc_P`, `ID_C`) VALUES
(1, 'Sistema de tickets', 'Emmm hola', 1),
(2, 'Programación de la caja', 'No sé algo del sistema que usan los cajeros', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticket`
--

CREATE TABLE `ticket` (
  `ID_T` int(11) NOT NULL,
  `DNI_E` int(11) NOT NULL,
  `Descripcion` text NOT NULL,
  `Nvl_Urgencia` varchar(50) NOT NULL,
  `Tipo_Prob` varchar(50) NOT NULL,
  `Fecha_Creacion` date NOT NULL,
  `ID_P` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ticket`
--

INSERT INTO `ticket` (`ID_T`, `DNI_E`, `Descripcion`, `Nvl_Urgencia`, `Tipo_Prob`, `Fecha_Creacion`, `ID_P`) VALUES
(1, 1111111, '[Proyecto: Proyecto02] Error 500 al guardar cliente', 'Bajo', 'Desarrollo', '2026-11-25', 1),
(2, 1111111, '[Proyecto: Programación de la caja] Error 500 al guardar cliente', 'Urgente', 'Desarrollo', '2026-11-25', 1),
(3, 1111111, 'Este es de lo ultimos testeos', 'Medio', 'Desarrollo', '2026-11-25', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`ID_C`);

--
-- Indices de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`ID_Dptos`),
  ADD KEY `Nom_Dptos` (`Nom_Dtpo`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`DNI_E`),
  ADD KEY `Nom_Dpto` (`ID_Dpto`),
  ADD KEY `Nom_E` (`Nom_E`);

--
-- Indices de la tabla `modifica`
--
ALTER TABLE `modifica`
  ADD PRIMARY KEY (`Fecha_Modifica`,`Hora_modifica`),
  ADD KEY `DNI_E` (`DNI_E`),
  ADD KEY `ID_T` (`ID_T`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`ID_P`),
  ADD KEY `ID_C` (`ID_C`);

--
-- Indices de la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`ID_T`),
  ADD KEY `Nom_E` (`DNI_E`),
  ADD KEY `ID_P` (`ID_P`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `ID_C` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `ID_Dptos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `DNI_E` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3333335;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `ID_P` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `ticket`
--
ALTER TABLE `ticket`
  MODIFY `ID_T` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`ID_Dpto`) REFERENCES `departamentos` (`ID_Dptos`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `modifica`
--
ALTER TABLE `modifica`
  ADD CONSTRAINT `modifica_ibfk_1` FOREIGN KEY (`DNI_E`) REFERENCES `empleados` (`DNI_E`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `modifica_ibfk_2` FOREIGN KEY (`ID_T`) REFERENCES `ticket` (`ID_T`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD CONSTRAINT `proyectos_ibfk_1` FOREIGN KEY (`ID_C`) REFERENCES `clientes` (`ID_C`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`DNI_E`) REFERENCES `empleados` (`DNI_E`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`ID_P`) REFERENCES `proyectos` (`ID_P`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
