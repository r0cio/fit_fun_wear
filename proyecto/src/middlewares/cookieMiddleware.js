// ************ Require's ************
const express = require('express');

function cookieMiddleware(req, res, next){
    
    if(req.cookies.getColor != undefined ){
        req.session.color = req.cookies.getColor;
    }
    
   // req.session.color = req.cookies.getColor;
    next();
}

module.exports = cookieMiddleware;