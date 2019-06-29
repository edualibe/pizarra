-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema db_pizarra
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_pizarra
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_pizarra` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish2_ci ;
USE `db_pizarra` ;

-- -----------------------------------------------------
-- Table `db_pizarra`.`level_user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_pizarra`.`level_user` ;

CREATE TABLE IF NOT EXISTS `db_pizarra`.`level_user` (
  `level_id` INT NOT NULL AUTO_INCREMENT,
  `level_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`level_id`),
  UNIQUE INDEX `level_id_UNIQUE` (`level_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_pizarra`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_pizarra`.`user` ;

CREATE TABLE IF NOT EXISTS `db_pizarra`.`user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(25) NOT NULL,
  `user_fullname` VARCHAR(45) NOT NULL,
  `user_psw` VARCHAR(255) NOT NULL,
  `level_id` INT NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC),
  INDEX `fk_user_level_user_idx` (`level_id` ASC),
  CONSTRAINT `fk_user_level_user`
    FOREIGN KEY (`level_id`)
    REFERENCES `db_pizarra`.`level_user` (`level_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_spanish2_ci;


-- -----------------------------------------------------
-- Table `db_pizarra`.`group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_pizarra`.`group` ;

CREATE TABLE IF NOT EXISTS `db_pizarra`.`group` (
  `group_id` INT NOT NULL AUTO_INCREMENT,
  `group_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE INDEX `group_id_UNIQUE` (`group_id` ASC),
  UNIQUE INDEX `group_name_UNIQUE` (`group_name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_pizarra`.`sucursal`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_pizarra`.`sucursal` ;

CREATE TABLE IF NOT EXISTS `db_pizarra`.`sucursal` (
  `sucursal_id` INT NOT NULL,
  `sucursal_name` VARCHAR(45) NOT NULL,
  `group_id` INT NOT NULL,
  PRIMARY KEY (`sucursal_id`),
  UNIQUE INDEX `sucursal_id_UNIQUE` (`sucursal_id` ASC),
  INDEX `fk_sucursal_group1_idx` (`group_id` ASC),
  CONSTRAINT `fk_sucursal_group1`
    FOREIGN KEY (`group_id`)
    REFERENCES `db_pizarra`.`group` (`group_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_pizarra`.`header`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `db_pizarra`.`header` ;

CREATE TABLE IF NOT EXISTS `db_pizarra`.`header` (
  `header_id` INT NOT NULL AUTO_INCREMENT,
  `sucursal_id` INT NOT NULL,
  `header_title1` VARCHAR(25) NOT NULL,
  `header_title2` VARCHAR(25) NOT NULL,
  `header_title3` VARCHAR(25) NOT NULL,
  `header_subtitle1_1` VARCHAR(25) NOT NULL,
  `header_subtitle1_2` VARCHAR(25) NOT NULL,
  `header_subtitle2_1` VARCHAR(25) NOT NULL,
  `header_subtitle2_2` VARCHAR(25) NOT NULL,
  `header_subtitle3_1` VARCHAR(25) NOT NULL,
  `header_subtitle3_2` VARCHAR(25) NOT NULL,
  `header_value1_1` VARCHAR(25) NOT NULL,
  `header_value1_2` VARCHAR(25) NOT NULL,
  `header_value2_1` VARCHAR(25) NOT NULL,
  `header_value2_2` VARCHAR(25) NOT NULL,
  `header_value3_1` VARCHAR(25) NOT NULL,
  `header_value3_2` VARCHAR(25) NOT NULL,
  `header_content_1` TEXT(750) NULL,
  `header_content_2` TEXT(750) NULL,
  `header_content_3` TEXT(750) NULL,
  PRIMARY KEY (`header_id`),
  UNIQUE INDEX `header_id_UNIQUE` (`header_id` ASC),
  INDEX `fk_header_sucursal1_idx` (`sucursal_id` ASC),
  CONSTRAINT `fk_header_sucursal1`
    FOREIGN KEY (`sucursal_id`)
    REFERENCES `db_pizarra`.`sucursal` (`sucursal_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `db_pizarra`.`level_user`
-- -----------------------------------------------------
START TRANSACTION;
USE `db_pizarra`;
INSERT INTO `db_pizarra`.`level_user` (`level_id`, `level_name`) VALUES (1, 'Administrador');
INSERT INTO `db_pizarra`.`level_user` (`level_id`, `level_name`) VALUES (2, 'Supervisor');
INSERT INTO `db_pizarra`.`level_user` (`level_id`, `level_name`) VALUES (3, 'Operador');

COMMIT;


-- -----------------------------------------------------
-- Data for table `db_pizarra`.`group`
-- -----------------------------------------------------
START TRANSACTION;
USE `db_pizarra`;
INSERT INTO `db_pizarra`.`group` (`group_id`, `group_name`) VALUES (1, 'Casa Central');
INSERT INTO `db_pizarra`.`group` (`group_id`, `group_name`) VALUES (2, 'Sucursales Ctes');
INSERT INTO `db_pizarra`.`group` (`group_id`, `group_name`) VALUES (3, 'Misiones');
INSERT INTO `db_pizarra`.`group` (`group_id`, `group_name`) VALUES (4, 'Buenos Aires');

COMMIT;


-- -----------------------------------------------------
-- Data for table `db_pizarra`.`sucursal`
-- -----------------------------------------------------
START TRANSACTION;
USE `db_pizarra`;
INSERT INTO `db_pizarra`.`sucursal` (`sucursal_id`, `sucursal_name`, `group_id`) VALUES (1, 'Mercedes', 2);
INSERT INTO `db_pizarra`.`sucursal` (`sucursal_id`, `sucursal_name`, `group_id`) VALUES (2, 'San Roque', 2);
INSERT INTO `db_pizarra`.`sucursal` (`sucursal_id`, `sucursal_name`, `group_id`) VALUES (3, 'La Cruz', 2);
INSERT INTO `db_pizarra`.`sucursal` (`sucursal_id`, `sucursal_name`, `group_id`) VALUES (4, 'Empedrado', 2);
INSERT INTO `db_pizarra`.`sucursal` (`sucursal_id`, `sucursal_name`, `group_id`) VALUES (5, 'Goya', 2);
INSERT INTO `db_pizarra`.`sucursal` (`sucursal_id`, `sucursal_name`, `group_id`) VALUES (991, 'Casa Matriz', 1);
INSERT INTO `db_pizarra`.`sucursal` (`sucursal_id`, `sucursal_name`, `group_id`) VALUES (992, 'Salon Aurus', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `db_pizarra`.`header`
-- -----------------------------------------------------
START TRANSACTION;
USE `db_pizarra`;
INSERT INTO `db_pizarra`.`header` (`header_id`, `sucursal_id`, `header_title1`, `header_title2`, `header_title3`, `header_subtitle1_1`, `header_subtitle1_2`, `header_subtitle2_1`, `header_subtitle2_2`, `header_subtitle3_1`, `header_subtitle3_2`, `header_value1_1`, `header_value1_2`, `header_value2_1`, `header_value2_2`, `header_value3_1`, `header_value3_2`, `header_content_1`, `header_content_2`, `header_content_3`) VALUES (1, 1, 'Cheques', 'Prestamos', 'Acciones', '30 dias', '+30 dias', 'Activos', 'Pasivos', 'Lebac', 'Titulos', '12%', '15%', '42% TNA', '39% TNA', '55%', '52%', '36680.jpg,50740.jpg,58298.jpg,78203.jpg,93548.jpg,inversion.jpg', NULL, NULL);

COMMIT;

