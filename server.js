'using strict'

const express = require('express');
const getListOfImages = require('./index');
const path = require("path");
//const port = process.env.PORT || 5000;
const port = 4000;
const app = express();
const router = express.Router();
const url = require('url');

app.use('/AIMS_DATA2', express.static(path.resolve(__dirname, 'AIMS_DATA2')));
app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.use('/views', express.static(path.resolve(__dirname, 'views')))
app.set('view engine', 'ejs');
app.listen(port, () => {console.log(`Server up at PORT: ${port}`);})

/**
 * Handling FOTI Url & POLE Url
 */

app.get("/", function(req, res) {
    
    let finalUrl = [];
    const queryObject = url.parse(req.url,true).query;
    //If POLE Url requsted.
    if(queryObject.PTIV!=null){
        getListOfImages.formatPoleQueryParam(queryObject).then(images => {
            console.log("POLE Data", images);
             res.render('poleUI', { 
                 myData: {
                    poleImages: images.listOfPoleImages 
                    }
                });
        }).catch(error => console.log(`Error: ${error}`));
    return;
    }
    //Get formatted URL
    const getUrl =  getListOfImages.formatQueryParam(queryObject);
   
    const requestedFile = getListOfImages.getRequestedImage(queryObject);
    
    getListOfImages.getDirFiles(path.join(__dirname, getUrl), requestedFile).then(images => {
        console.log("FOTI Data", images); 
        //Adding complete url
        images.imageList.forEach(function(image) {
            finalUrl.push(getUrl + "/" + image);
        });
      
        //Return data for ejs to render.
        res.render('fotiUI', {
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
        
    })
    
    }).catch(error => console.log(`Error: ${error}`));
})

// Invalid URL
app.get("*", function(req, res) {
    
    res.status(400).send({ message: 'Invalid URL' });
})