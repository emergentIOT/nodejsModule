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
    //Get query params
    const queryObject = url.parse(req.url,true).query;
    //Get formatted URL
    const getUrl =  getListOfImages.formatQueryParam(queryObject);
    //Get list of images in requested dir
    const requestedFile = getListOfImages.getRequestedImage(queryObject);
    
    getListOfImages.getDirFiles(path.join(__dirname, getUrl), requestedFile).then(images => {
        
        //Adding complete url
        images.imageList.forEach(function(image) {
            finalUrl.push(getUrl + "/" + image);
        });
       console.log("Data", images);
        //Return data for ejs to render.
        res.render('devices', {
           myData : { 
            listOfImages: finalUrl, 
            onlyImagesName: images.imageList,
            totalNumberOfImages: images.totalFiles,
            imageAtIndex: images.requestedImageIndex,
            startIndex: images.startImageIndex,
            endIndex: images.endImageIndex,
            moreToGet: images.checkMoreToGet,
            MorePrevious: images.checkMoreToPrevious
        }
    });
        
    }).catch(error => console.log(`Error: ${error}`));
})