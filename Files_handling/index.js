const {listFiles,readAfile,writeInFile,makeDirectory} = require("./fileSystemModule");

choice = process.argv[2];
switch (choice) {
    case 'list':
        listFiles(process.argv[3]);
        break;
    case 'read':
        readAfile(process.argv[3])
        break;
    case 'write':
        writeInFile(process.argv[3], process.argv)
        break;
    case 'createDirectory':
        makeDirectory(process.argv[3])
        break;
    default:
        console.log('Invalid input!!');
}
