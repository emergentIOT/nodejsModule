const express = require('express');
const getListOfImages = require('./index');
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
const router = express.Router();
const url = require('url');

app.listen(port, () => {console.log(`Server up at PORT: ${port}`);})

app.get("/", function(req, res) {
    //Get query params
    const queryObject = url.parse(req.url,true).query;
    //Get formatted URL
    const getUrl =  getListOfImages.formatQueryParam(queryObject);
    //Get list of images in requested dir
    getListOfImages.getDirFiles(path.join(__dirname, getUrl)).then(images => {
        res.json({
            success: true,
            message: 'Successful !',
            data: images,
        })
    });
})