CREATE DATABASE IF NOT EXISTS `fitFunWear` DEFAULT CHARACTER SET utf8 ;
USE `fitFunWear` ;

-- -----------------------------------------------------
-- Table `fitFunWear`.`Rol`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fitFunWear`.`Rol` ;

CREATE TABLE IF NOT EXISTS `fitFunWear`.`Rol` (
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
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `email_UNIQUE` (`email`) ,
  INDEX `fk_Users_Rol_idx` (`role_id`) ,
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
  `id_product` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `image` VARCHAR(45) NOT NULL DEFAULT 'default-image.png',
  `available` TINYINT(1) NOT NULL DEFAULT 1,
  `model` VARCHAR(45) NOT NULL,
  `price` DECIMAL NOT NULL,
  `discount` INT NULL DEFAULT 0,
  `quantity` INT NULL,
  PRIMARY KEY (`id_product`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitFunWear`.`carts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fitFunWear`.`carts` ;

CREATE TABLE IF NOT EXISTS `fitFunWear`.`carts` (
  `user_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`user_id`, `product_id`),
  INDEX `product_id_idx` (`product_id`) ,
  INDEX `user_id_idx` (`user_id`) ,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `fitFunWear`.`users` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `fitFunWear`.`products` (`id_product`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitFunWear`.`options`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fitFunWear`.`options` ;

CREATE TABLE IF NOT EXISTS `fitFunWear`.`options` (
  `id_option` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY (`id_option`, `product_id`),
  INDEX `fk_options_products1_idx` (`product_id`) ,
  CONSTRAINT `fk_options_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `fitFunWear`.`products` (`id_product`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `fitFunWear`.`options_values`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fitFunWear`.`options_values` ;

CREATE TABLE IF NOT EXISTS `fitFunWear`.`options_values` (
  `id_option_value` INT NOT NULL,
  `option_id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_option_value`, `option_id`),
  INDEX `option_id_idx` (`option_id`) ,
  CONSTRAINT `option_id`
    FOREIGN KEY (`option_id`)
    REFERENCES `fitFunWear`.`options` (`id_option`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;