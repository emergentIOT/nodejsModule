const fs = require("fs").promises;
const path = require("path");

//1. TEMPLATING & SLIDER LIBRARY
//2. MAKE GENERIC FILE EXTENSIONS
//3. Update it for NODE MODULE: created exports function, need to read more and test it as module.
//4. Get path from URL : done, also formatted the URL and its working.
//6. Handle exceptions

/**
 * 
 * @param {* dir path for requested FOTI link} folderName.
 * @returns An array of images.
 */
async function getDirFiles(folderName) {
    //Array to get list of images in requested directory.
    let listOfImages = [];

    //Read directory. 
    const dirs = await fs.readdir(folderName, { withFileTypes: true });
   
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
return listOfImages;
}



/**
 * 
 * @param {* Query params } queryObject 
 * @returns {* formatted url to access the list of FOTI images from Application directory}
 * 
 */
function formatQueryParam(queryObject) {
    let formatUrl = [];
    if(!queryObject) {
        console.log(`No Query param available : ${queryObject}`)
    }
    const splitUrl = queryObject.url.split("\\");
    for (i = 3 ; i < splitUrl.length - 1 ; i++ ){
        formatUrl.push(splitUrl[i]);
    }
    return formatUrl.join('/');
}

exports.getDirFiles = getDirFiles;
exports.formatQueryParam = formatQueryParam;


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
