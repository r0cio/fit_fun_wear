-- -----------------------------------------------------
-- Database `fitFunWear`
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS `fitFunWear` DEFAULT CHARACTER SET utf8 ;
USE `fitFunWear` ;

-- -----------------------------------------------------
-- Table `fitFunWear`.`rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fitFunWear`.`rol` ;

CREATE TABLE IF NOT EXISTS `fitFunWear`.`rol` (
  `id_role` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_role`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitFunWear`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fitFunWear`.`users` ;

CREATE TABLE IF NOT EXISTS `fitFunWear`.`users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `image` VARCHAR(45) NOT NULL DEFAULT 'default-image,png',
  `created_at` DATE NULL DEFAULT NULL,
  `updated_at` DATE NULL DEFAULT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `email_UNIQUE` (`email`),
  INDEX `fk_Users_Rol_idx` (`role_id`),
  CONSTRAINT `fk_Users_Rol`
    FOREIGN KEY (`role_id`)
    REFERENCES `fitFunWear`.`Rol` (`id_role`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitFunWear`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fitFunWear`.`products` ;

CREATE TABLE IF NOT EXISTS `fitFunWear`.`products` (
  `id_product` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NOT NULL,
  `model` VARCHAR(45) NOT NULL,
  `created_at` DATE NULL DEFAULT NULL,
  `updated_at` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id_product`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitFunWear`.`sizes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fitFunWear`.`sizes` ;

CREATE TABLE IF NOT EXISTS `fitFunWear`.`sizes` (
  `id_size` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_size`),
  UNIQUE INDEX `id_size_UNIQUE` (`id_size`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitFunWear`.`colors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fitFunWear`.`colors` ;

CREATE TABLE IF NOT EXISTS `fitFunWear`.`colors` (
  `id_color` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_color`),
  UNIQUE INDEX `id_option_value_UNIQUE` (`id_color`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitFunWear`.`categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fitFunWear`.`categories` ;

CREATE TABLE IF NOT EXISTS `fitFunWear`.`categories` (
  `id_category` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_category`),
  UNIQUE INDEX `id_category_UNIQUE` (`id_category`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitFunWear`.`attributes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fitFunWear`.`attributes` ;

CREATE TABLE IF NOT EXISTS `fitFunWear`.`attributes` (
  `id_attribute` INT NOT NULL AUTO_INCREMENT,
  `available` TINYINT(1) NOT NULL,
  `image` VARCHAR(45) NOT NULL DEFAULT 'default-image.png',
  `price` DECIMAL NOT NULL,
  `discount` TINYINT(100) NOT NULL,
  `quantity` SMALLINT NULL,
  `gender` ENUM('H', 'M', 'U') NOT NULL,
  `size_id` INT NOT NULL,
  `color_id` INT NOT NULL,
  `category_id` INT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id_attribute`),
  UNIQUE INDEX `id_attribute_UNIQUE` (`id_attribute`) ,
  INDEX `fk_attribute_color1_idx` (`color_id`),
  INDEX `fk_attribute_category1_idx` (`category_id`),
  INDEX `fk_attribute_size1_idx` (`size_id`),
  INDEX `fk_attribute_product1_idx` (`product_id`),
  CONSTRAINT `fk_attribute_size1`
    FOREIGN KEY (`size_id`)
    REFERENCES `fitFunWear`.`sizes` (`id_size`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_attribute_color1`
    FOREIGN KEY (`color_id`)
    REFERENCES `fitFunWear`.`colors` (`id_color`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_attribute_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `fitFunWear`.`categories` (`id_category`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_attribute_product1`
    FOREIGN KEY (`product_id`)
    REFERENCES `fitFunWear`.`products` (`id_product`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitFunWear`.`carts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fitFunWear`.`carts` ;

CREATE TABLE IF NOT EXISTS `fitFunWear`.`carts` (
  `user_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `attribute_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `attribute_id`),
  INDEX `user_id_idx` (`user_id`),
  INDEX `fk_carts_attribute1_idx` (`attribute_id`),
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `fitFunWear`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_carts_attribute1`
    FOREIGN KEY (`attribute_id`)
    REFERENCES `fitFunWear`.`attributes` (`id_attribute`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
