const fs = require("fs").promises;
const path = require("path");

//1. TEMPLATING & SLIDER LIBRARY:done
//3. Update it for NODE MODULE: created exports function, need to read more and test it as module.
//4. Get path from URL : done, also formatted the URL and its working. : done
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
listImagesFromDefindedIndex(listOfImages.indexOf(requestedFileName), dirs.length, listOfImages);
    return {
        imageList: listOfImages, 
        totalNumberOfImages:dirs.length,
        requestedImageIndex:  listOfImages.indexOf(requestedFileName)
    };
}

function listImagesFromDefindedIndex(startValue, endValue, images) {
    //selected index = 200
    //render till end
    console.log("images", startValue, endValue, images[2]);
     for (i=150; i<= 200  ;i++) {
        console.log("images", images[i]);
     }
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

exports.getDirFiles = getDirFiles;
exports.formatQueryParam = formatQueryParam;
exports.getRequestedImage = getRequestedImage;

/*
CODE FOR DEBUGGING
*/

// async function main() {
//   //https://webgisnv.rail.nsw.gov.au/FOTI/?img=\\asmet032\AIMS_DATA2\EASEMENT_IMAGES\03_FOTI_EAST_HILLS\20200109_07\07_20200109_01331.jpg
//   //get variable img and traverse it upto foldername
  
//   console.log(await traverseDirFiles(path.join(__dirname, "AIMS_DATA2/EASEMENT_IMAGES/03_FOTI_EAST_HILLS/20190115_03")));
// }

// main();

/**
 * Extra code can be added
 * const cors = require('cors');
 * //app.use(cors({ origin: /http:\/\/localhost/ }));
    //app.options('*', cors());
 * 
 */
