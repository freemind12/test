const express = require('express');
const bodyParser = require('body-parser');

const Images = require('../models/images');
var authenticate = require('../authenticate');

const imagesRouter = express.Router();
const cors = require('./cors');

imagesRouter.use(bodyParser.json());

imagesRouter.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); } );


imagesRouter.route('/')
//.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Images.find({})
    .then((images) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(images);

    }, (err) => next(err))
    .catch((err) => next(err));
})



module.exports = imagesRouter;
