'using strict'

const express = require('express');
const getListOfImages = require('./index');
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
const router = express.Router();
const url = require('url');

app.use('/AIMS_DATA2', express.static(path.resolve(__dirname, 'AIMS_DATA2')));
app.set('view engine', 'ejs');
app.listen(port, () => {console.log(`Server up at PORT: ${port}`);})


app.get("/", function(req, res) {
    let finalUrl = [];
    let freshImagesArray = [];
    //Get query params
    const queryObject = url.parse(req.url,true).query;
    //Get formatted URL
    const getUrl =  getListOfImages.formatQueryParam(queryObject);
    //Get list of images in requested dir
    const requestedFile = getListOfImages.getRequestedImage(queryObject);
    
    getListOfImages.getDirFiles(path.join(__dirname, getUrl), requestedFile).then(images => {
        
        images.imageList.forEach(function(image) {
           // freshImagesArray.push(getUrl + "/" + image);
            finalUrl.push(getUrl + "/" + image);
        });
       
        //Return data for ejs to render.
        res.render('devices', {
            listOfImages: finalUrl, 
            totalNumberOfImages: images.totalNumberOfImages,
            imageAtIndex: images.requestedImageIndex
        });
    }).catch(error => console.log(`Error: ${error}`));
})