// ************ Require's ************
const express = require('express');

// ************ Multer Require ************
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination:(req, file, cb)=> {
        cb(null, './public/images/products');

    },
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        //cb(null, Date.now() + path.extname(file.originalname));
        cb(null, fileName);
    }
});

const uploadFile = multer({ storage });

module.exports = uploadFile;