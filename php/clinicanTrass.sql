

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

DROP SCHEMA IF EXISTS clinicantrass ;

-- -----------------------------------------------------
-- 
-- -----------------------------------------------------
CREATE SCHEMA clinicantrass DEFAULT CHARACTER SET utf8 ;
USE clinicantrass ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `veterinarios`
--

-- -----------------------------------------------------
-- Table Veterinarios
-- -----------------------------------------------------
DROP TABLE IF EXISTS veterinarios ;

CREATE TABLE veterinarios (
  dni VARCHAR(9) NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  apellidos VARCHAR(45) NOT NULL,
  telefono VARCHAR(9) NULL,
  PRIMARY KEY (dni))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Clientes
-- -----------------------------------------------------
DROP TABLE IF EXISTS clientes ;

CREATE TABLE IF NOT EXISTS clientes (
  dni VARCHAR(9) NOT NULL,
  nomApe VARCHAR(45) NOT NULL,
  telefono VARCHAR(9) NOT NULL,
  PRIMARY KEY (dni))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table Perros
-- -----------------------------------------------------
DROP TABLE IF EXISTS perros ;

CREATE TABLE IF NOT EXISTS perros (
  chip VARCHAR(14) NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  fechaN DATE NOT NULL,
  raza VARCHAR(45) NOT NULL,
  dueno VARCHAR(9) NOT NULL,
  PRIMARY KEY (chip))  
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Consultas
-- -----------------------------------------------------
DROP TABLE IF EXISTS consultas ;

CREATE TABLE IF NOT EXISTS consultas (
  id INT NOT NULL AUTO_INCREMENT,
  fecha DATE NULL,
  hora TIME NULL,
  observaciones TEXT NULL,
  chip VARCHAR(14) NOT NULL,
  veterinario VARCHAR(25) NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table Tratamientos
-- -----------------------------------------------------
DROP TABLE IF EXISTS tratamientos ;

CREATE TABLE IF NOT EXISTS tratamientos (
  id INT NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(50) NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- Volcado de datos para la tabla `veterinarios`
--

INSERT INTO `veterinarios` (`dni`, `nombre`, `apellidos`, `telefono`) VALUES 
('666666666F', 'Pepe', 'Pinto Paredes', '911111111'),
('777777777G', "Claudia", "Cabello Corto", "622222222"),
("888888888H", "Ana", "Aire Agua", "933333333");

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO clientes VALUES 
('11111111A', 'Zacarías Zurrón', '644444444'),
('22222222B', 'Virgilio Veleta', '655555555'),
('33333333C', 'Wenceslao White', '666666666'),
('44444444D', 'Ximo Xilófono', '677777777'),
('55555555E', 'Yen Yegüa Yerbal','688888888');

INSERT INTO perros VALUES 
('111A', 'Chispita', '12/01/2006', 'Pastor alemán', '11111111A'),
('111B', 'Colega', '23/03/2016', 'Pastor belga', '11111111A'),
('111C', 'Boby','05/07/2009', 'Pastor inglés', '11111111A'),
('222A', 'Lunes', '23/10/2010', 'Yorkshire terrier', '22222222B'),
('222B', 'Lara', '15/06/2017', 'Yorkshire terrier', '22222222B'),
('333A', 'Boby', '01/01/2019', 'Beagle', '33333333C'),
('444A', 'Chucho', '06/03/2015', 'Caniche', '44444444D'),
('555A', 'Linux', '14/11/2016', 'Beagle', '55555555E'),
('555B', 'Windows', '13/01/2018', 'Yorkshire terrier', '55555555E');

INSERT INTO Consultas(id, fecha, hora, chip, veterinario, observaciones) VALUES 
( 1, "2018-01-01", "10:22:00", '111A', '666666666F', 'Vacuna de la rabia.'),
( 2, "2018-01-01", "11:33:00", '333A', '777777777G','Perro resfriado. Se prescribe Apiretal.'),
( 3, "2018-01-01", "15:51:00", '222B', '666666666F', 'Caida del pelo. Utilizar champú de huevo.'),
( 4, "2018-01-02", "13:22:00", '111C', '666666666F', 'Vacuna de la rabia.'),
( 5, "2018-01-02", "13:42:00", '111A', '666666666F',   'Empacho por chucherías. Tres días sin comer.'),
( 6, "2018-01-10", "09:12:00", '555A', '888888888H',    'Dientes rotos por morder un teclado y un ratón. Se empastan.'),
( 7, "2018-01-10", "21:23:00", '111A', '888888888H',    'Tiene una astilla en la pata. Se extrae, se venda y se administra antibióticos.'),
( 8, "2018-02-01", "10:22:00", '111A', '666666666F',   'Huesos de la pata delantera izqd. fracturados por caida. Se escayola y recomienda reposo durante 1 mes.'),
( 9, "2018-02-03", "14:04:00", '111B', '666666666F',   'Vacuna del moquillo y vacuna de la toxoplasmosis.'),
(10, "2018-02-03", "19:05:00", '555A', '888888888H',    'Vacuna de la rabia.'),
(11, "2018-02-03", "22:45:00", '555A', '777777777G','Ojo derecho infectado. Se prescribe colirio.'),
(12, "2018-02-03", "23:30:00", '111A', '777777777G','Desparasitación externa e interna.'),
(13, "2018-02-12", "11:30:00", '111A', '777777777G','Revisión de perro sano. Todo bien. La tensión algo alta.'),
(14, "2018-02-12", "12:30:00", '111A', '666666666F',   'Cirugía menor en cuarto trasero debido a una ulcera. Se administra antibióticos.'),
(15, "2018-02-20", "22:27:00", '222A', '666666666F',   'El perro está demasiado obeso, se recomienda dieta y más ejercicio.'),
(16, "2018-02-21", "20:34:00", '111A', '888888888H',    'Operación de cataratas en ambos ojos. Debe revisarse dentro de un año.'),
(17, "2018-03-22", "07:25:00", '111B', '666666666F',   'Se diagnostica la rabia. Se administra antirábico y un tranquilizante.'),
(18, "2018-03-10", "09:21:00", '222B', '888888888H',    'Mordedura por murciélago. Al perro le molesta la luz, el ajo y las cruces de plata. Le están saliendo unos colmillos muy grandes. Se administra anti-draculín 500 en tres dosis.'),
(19, "2018-03-10", "09:22:00", '222A', '888888888H',    'Vacuna de la rabia y desparasitación.'),
(20, "2018-03-20", "14:00:00", '333A', '666666666F',   'Revisión de perro sano. Se detectan pulgas. Se administra anti-pulguín.');

INSERT INTO tratamientos VALUES 
( 1, 'Vacuna de la rabia.'),
( 2, 'Preescripción Apiretal.'),
( 3, 'Vacuna leptospira'),
( 4, 'Empastar muela/s'),
( 5, 'Escayola y se recomienda reposo'),
( 6, 'Vacuna del moquillo'),
( 7, 'Desparasitar'),
( 8, 'Vacuna de la toxoplasmosis.'),
 (9, 'La vacuna del parvovirus.');
