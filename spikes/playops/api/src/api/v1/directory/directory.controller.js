const httpStatus = require('http-status');
const shellJs = require("shelljs");
const fs = require('fs');
/**
 * directory
 * @public
 */
exports.directory = async (req, res, next) => {
  res.status(httpStatus.OK);

  var directories = shellJs.exec("ls -d */ | cut -f1 -d'/'");

  var files = shellJs.exec("ls -p -a | grep -v /");

  var pwd = shellJs.exec("pwd");

  return res.json({  
    directory: directories,
    files:files,
    pwd:pwd
  });
};

exports.openDirectory = async (req, res, next) => {
    res.status(httpStatus.OK);

    var requestBody = req.body;

    if(requestBody.isFile){
        var fileOutput = shellJs.cat(requestBody.directoryName);
        return res.json({
            output: fileOutput
        });
    }else{
        shellJs.cd(requestBody.directoryName);
        return res.json({
            output:"ggg"
        });
    }
}


exports.pasteDirectory = async (req, res, next) => {
    res.status(httpStatus.OK);
    var requestBody = req.body;

    if(requestBody.isCopy){
        shellJs.exec("cp -r "+requestBody.source+" "+requestBody.destination);
    }else{
        shellJs.exec("mv "+requestBody.source+" "+requestBody.destination);
    }

    return res.json({
        output:"ggg"
    });

}

