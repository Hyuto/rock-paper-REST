const exec = require('child_process').exec;
const fs = require('fs-extra');
const path = require('path');

// Dirs
const PARENT_DIR = path.join(__dirname, '..');
const ACTIVE_BUILD_DIR = path.join(PARENT_DIR, 'build');
const CURRENT_BUILD_DIR = path.join(__dirname, 'build');

// Asynchronous react build command
const execBuild = () => {
    return new Promise((resolve, reject) => {
        exec('npm run build', (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }
            resolve(stdout? stdout : stderr);
        });
    });
}

// Build
const build = execBuild();
build.then((events) => {
    console.log(events);

    // Check is build folder is on PARENT_DIR
    if(fs.existsSync(ACTIVE_BUILD_DIR) && fs.lstatSync(ACTIVE_BUILD_DIR).isDirectory()){
        // Delete ACTIVE_BUILD_DIR
        console.log('Deleting active build directory..');
        fs.removeSync(ACTIVE_BUILD_DIR); 
    }

    // Move CURRENT_BUILD_DIR to PARENT_DIR
    console.log('Moving latest build directory to main folder..');
    fs.renameSync(CURRENT_BUILD_DIR, ACTIVE_BUILD_DIR);
}).then(() => console.log('Done!'))