-- Inserción de datos en las tablas de la DB fitfunwear
USE `fitFunWear`;

INSERT INTO `fitFunWear`.`Rol`
(`id_role`, `name`)
VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- Insertando datos en tabla users
INSERT INTO `fitFunWear`.`users`
(`id_user`, `name`, `last_name`, `email`, `password`, `image`, `role_id`)
VALUES
(1, 'Leticia', 'Luna', 'lety@prueba.com',  'passwordkeylety', 'default-image.png', 1),
(2, 'Diego', 'Gongora', 'diego@prueba.com', 'passwordkeydiego', 'default-image.png', 1),
(3, 'Quetzalli', 'Pinzón', 'quetzalli@prueba.com', 'passwordkeyquetzalli', 'default-image.png', 1),
(4, 'Abigail', 'Montes', 'abigail@prueba.com', 'passwordkeyabigail', 'default-image.png', 2),
(5, 'Bruno', 'Martínez', 'bruno@prueba.com', 'passwordkeybruno', 'default-image.png', 2),
(6, 'Diego', 'Contreras', 'diegocontreras@prueba.com', 'passwordkeydiegoc', 'default-image.png', 2),
(7, 'Karen', 'Vargas', 'karen@prueba.com', 'passwordkeykaren', 'default-image.png', 2),
(8, 'Montserrath', 'Alpizar', 'montse@prueba.com', 'passwordkeymontse', 'default-image.png', 2),
(9, 'Andrea', 'Santos', 'andrea@prueba.com', 'passwordkeyandrea', 'default-image.png', 2),
(10, 'Juan', 'Cruz', 'juan@prueba.com', 'passwordkeyjuan', 'default-image.png', 2);

-- Insertando datos en tabla products
INSERT INTO `fitFunWear`.`products`
(`id_product`, `name`, `description`, `model`)
VALUES
(1, 'Tenis NIKE', 'Tenis marca NIKE', '2345'),
(2, 'Leggings Reebok', 'Leggings marca REEBOK', '745'),
(3, 'Conjunto FILA', 'Conjunto de short y playera marca FILA', '8345'),
(4, 'Playera Adidas', 'Playera marca ADIDAS', '1345'),
(5, 'Conjunto deportivo', 'Conjunto deportivo de licra, top con copas desmontables y legging a la cintura','2345');


-- Insertando datos en tabla sizes
INSERT INTO `fitFunWear`.`sizes`
(`id_size`, `name`)
VALUES
(1, 'S'),
(2, 'M'),
(3, 'L'),
(4, '21'),
(5, '27'),
(6, '29');

-- Insertando datos en tabla colors
INSERT INTO `fitFunWear`.`colors`
(`id_color`, `name`)
VALUES
(1,'Blanco'),
(2,'Gris'),
(3,'Azul'),
(4,'Verde'),
(5,'Rosa'),
(6,'Lila'),
(7,'Amarillo'),
(8,'Naranja'),
(9,'Negro'),
(10,'Rojo');

-- Insertando datos en tabla categories
INSERT INTO `fitFunWear`.`categories`
(`id_category`, `name`)
VALUES
(1, 'Ofertas'),
(2, 'Más vendidos'),
(3, 'Tendencia'),
(4, 'Normal');

-- Insertando datos en tabla atributos
INSERT INTO `fitFunWear`.`attributes`
(`id_attribute`, `available`, `image`,`price`, `discount`, `gender`, `quantity`, `size_id`, `color_id`, `category_id`, `product_id`)
VALUES
(1,1,'jade-tennis.jpg', 2555.00, 10, 'H', 5, 4, 4,1,1),
(2,1,'jade-tennis.jpg', 2555.00, 10,'H', 5, 5, 4,1,1),
(3,1,'jade-tennis.jpg', 2555.00, 0, 'H', 10, 6, 4,4,1),
(4,1,'tenis-lila.jpeg', 2555.00, 10,'M', 5, 4, 6,1,1),
(5,1,'tenis-lila.jpeg', 2555.00, 10,'M', 5, 5, 6,1,1),
(6,1,'tenis-lila.jpeg', 2555.00, 0, 'M',10, 6, 6,4,1),
(7,1,'leggings-gris.jpeg', 550.00, 0, 'M',3, 1, 2,4,2),
(8,1,'leggings-gris.jpeg', 550.00, 10, 'M',10, 3, 2,1,2),
(9,1,'leggings-gris.jpeg', 550.00, 0, 'M',3, 2, 5,4,2),
(10,1,'leggings-gris.jpeg', 550.00, 10, 'M',10, 3, 5,4,2),
(11,1,'leggings-pink.jpeg', 550.00, 0, 'M',4, 3, 7,3,2),
(12,1,'conjuntoFila.jpg', 1750.00, 0, 'H',7, 3, 3,4,3),
(13,1,'conjuntoFila.jpg', 1750.00, 0, 'H',7, 2, 3,4,3),
(14,1,'conjuntoFila.jpg', 1750.00, 0, 'H',7, 1, 3,4,3),
(15,1,'conjunto-short-playera-gris.jpeg', 1750.00, 0, 'H',3, 3, 2,4,3),
(16,1,'conjunto-short-playera-gris.jpeg', 1750.00, 0, 'H',3, 2, 2,4,3),
(17,1,'conjunto-short-playera-gris.jpeg', 1750.00, 0, 'H',3, 1, 2,4,3),
(18,1,'conjunto-short-playera-verde.jpeg', 1750.00, 0, 'H',4, 3, 4,4,3),
(19,1,'conjunto-short-playera-verde.jpeg', 1750.00, 0, 'H',4, 2, 4,4,3),
(20,1,'conjunto-short-playera-verde.jpeg', 1750.00, 0, 'H',4, 1, 4,4,3),
(21,1,'haryo-setyadi-acn5ERAeSb4-unsplash.jpg', 1250.00, 0, 'H',4, 1, 1,4,4),
(22,1,'julia-rekamie-Z72YujnOrlY-unsplash.jpg', 1050.00, 0, 'M',4, 1, 9,4,5);

-- Insertando datos en tabla carts
INSERT INTO `fitFunWear`.`carts`
(`user_id`, `quantity`, `attribute_id`)
VALUES
(1,1,1),
(2,1,4),
(3,5,3);