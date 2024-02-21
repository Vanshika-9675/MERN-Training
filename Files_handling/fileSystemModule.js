
const fs = require("fs");

//list files of a directory
exports.listFiles=(path)=>{
    let promise = fs.promises.readdir(path);

    promise.then((data)=>{
         console.log(data);
    })
    .catch((err)=>{
        console.log(err);
    })
}
//read from files
exports.readAfile =(path)=> {
  let promise = fs.promises.readFile(path, "utf-8");
  promise .then((data) => {
      console.log(data);
      console.log("File read successfully!!");
    })
    .catch((err) => {
      console.log(err);
    });
}

//readAfile();

//write to files
exports.writeInFile =(fileName, data)=> {

  
  let mypromise = fs.promises.writeFile(fileName, data);

  mypromise
    .then(() => {
      console.log("Data written into the file successfully!!");
    })
    .catch((err) => {
      console.log(err);
    });

}
//createAFile();

//create directory

exports.makeDirectory =(directoryName)=>{
    const promise = fs.promises.mkdir(directoryName);

    promise.then(() => {
      console.log("Directory created successfully!");
    }).catch((err) => {
      console.log(err);
    });

}
//makeDirectory();


