const fs = require("fs").promises;
const path = require("path");


//3. Update it for NODE MODULE: created exports function, need to read more and test it as module.
//6. Handle exceptions : working
//7. Adding logger
//8. Cors
//9. nginx 
//10. Security: OpenAuth

/**
 * 
 * @param {* dir path for requested FOTI link} folderName.
 * @returns An array of images.
 */
async function getDirFiles(folderName, requestedFileName) {
    //Array to get list of images in requested directory.
    let listOfImages = [];
    const slideRange = 6;
    let l_startIndex = 0;
    //Read directory. 
    const dirs = await fs.readdir(folderName, { withFileTypes: true });
    console.log(`Total number of images: ${dirs.length}`);
    for (const item of dirs) {
        if(item.isDirectory()) {
           //listOfImages = listOfImages.concat(await traverseDirFiles(path.join(folderName, item.name)));
           listOfImages = listOfImages.concat(item.name);
        } else {
            if (path.extname(item.name) === ".jpg") {
            //listOfImages.push(path.join(folderName, item.name));
            listOfImages.push(item.name);
        }
    }
}
//Calculate position of requested image.
 l_startIndex = listOfImages.indexOf(requestedFileName);

//Trim image count to defined range.
const totFiles = dirs.length;

if(totFiles == 0) {
    console.log(`No images found in given path`);
}

let startRange = Math.max( (l_startIndex - slideRange), 0);
let endRange = Math.min( (l_startIndex + slideRange), totFiles);
if (startRange < slideRange){
    endRange = Math.min((slideRange-startRange)+endRange, totFiles);
}
let l_subFiles = listOfImages.slice(startRange, endRange);


//Recalculate start index for file sub set.
l_startIndex = l_subFiles.indexOf(requestedFileName);

//Add logger
//console.log("Testing", startRange, endRange, l_subFiles, l_startIndex);

let moreToGet = true;
let morePrevious = true;

if(endRange >= totFiles) {
    moreToGet = false;
}

if(startRange == 0) {
    morePrevious = false;
}
let startOffset = 0;

return {
        // imageList: listOfImages.sort(), 
        imageList: l_subFiles.sort(),
        totalFiles: dirs.length,
        requestedImageIndex: listOfImages.indexOf(requestedFileName),
        startIndex: l_startIndex,
        startImageIndex: startRange,
        endImageIndex: endRange,
        checkMoreToGet: moreToGet,
        checkMoreToPrevious: morePrevious
    };
}

/**
 * 
 * @param {* Query params } queryObject 
 * @returns {* formatted url to access the list of FOTI images from Application directory}
 * 
 */
  function formatQueryParam(queryObject) {
    //Trim image count to defined range.
    //Calculate startRange and endrange
    let formatUrl = [];
     
    if(!queryObject) {
        console.log(`No Query param available : ${queryObject}`)
    }
    const splitUrl = queryObject.url.split("\\");
    for (i = 3 ; i < splitUrl.length - 1 ; i++ ) {
        formatUrl.push(splitUrl[i]);
    }
    return formatUrl.join('/');
}

 function getRequestedImage(queryObject) {
    const splitUrl = queryObject.url.split("\\");
    return splitUrl[splitUrl.length - 1];
}

/**
 * Functions for POLE 
 * @param {Pole Object} queryObject 
 * @returns 
 */

function formatPoleQueryParam(queryObject) {
    //Trim image count to defined range.
    //Calculate startRange and endrange
    
    var allUrl = [];
     
  

    if(!queryObject) {
        console.log(`No Query param available : ${queryObject}`)
    }

    for(i=0;i<queryObject.PTIV;i++)
    {
      
        if(i==0) {
            var formatUrl = [];
            let splitUrl = queryObject['url'].toString().split("\\");             
            for (j = 3 ; j < splitUrl.length ; j++ ) {
                formatUrl.push(splitUrl[j]);
            }
            allUrl.push(formatUrl.join('/'));
             
        } else {
            var formatUrl = [];
        let splitUrl1 = queryObject['url' + i.toString()].toString().split("\\");
        for (k = 3 ; k < splitUrl1.length ; k++ ) {
           formatUrl.push(splitUrl1[k]);
            }
           // formatUrl.join('/')
            allUrl.push(formatUrl.join('/'));    
        }
      
   
   
    }
// return formatUrl.join('/');
return allUrl;
}

exports.getDirFiles = getDirFiles;
exports.formatQueryParam = formatQueryParam;
exports.getRequestedImage = getRequestedImage;
exports.formatPoleQueryParam = formatPoleQueryParam;

/*
CODE FOR DEBUGGING
*/

/**
 * Extra code can be added
 * const cors = require('cors');
 * //app.use(cors({ origin: /http:\/\/localhost/ }));
    //app.options('*', cors());
 * 
 */
