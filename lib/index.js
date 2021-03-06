'use strict';

const readFile = require('fs').readFileSync;
const glob = require('glob');
const minimatch = require('minimatch');
const _ = require('lodash');

let defaultOptions = {
    pkgJson: './package.json',
    nodeModules: './node_modules',
    onlySpecified: true
};

module.exports = function(filter, customOpts){
    let options = customOpts || {};

    //Default all blank options
    for(let option in defaultOptions){
        if(options[option] === undefined){
            options[option] = defaultOptions[option];
        }
    }

    //Get the package.json of the project
    let packageJson = readJsonParsed(options.pkgJson);
    let dependencies = packageJson.dependencies;

    let allFiles = [];

    //Apply the glob to all the dependencies in the package.json
    for(let dependency in dependencies){
        let modulePath = options.nodeModules + '/' + dependency + '/';

        //Read the package.json of a dependency
        let dependencyPkg = readJsonParsed(modulePath + 'package.json');
        let dependencyFiles = dependencyPkg.files || [];
        let dependencyMain = dependencyPkg.main || '';

        if(!options.onlySpecified){ //If you want to search through all files, just apply a glob to the entire directory, ignoring node_modules
            let files = glob.sync(modulePath + filter, {
                ignore: modulePath + 'node_modules/**/*.*' //Ignore all files from nested node_modules folders
            });

            allFiles = allFiles.concat(files);
        } else { //If you only want the specified files, reduce the list to one with the glob applied, and return the full path to the files
            if(dependencyFiles.indexOf(dependencyMain) === -1){
                dependencyFiles.push(dependencyMain);
            }

            let files = _.reduce(dependencyFiles, function(result, file){
                if(minimatch(file, filter)){
                    result.push(modulePath + file);
                }

                return result;
            }, []);

            allFiles = allFiles.concat(files);
        }
    }

    return allFiles;
};

//Does what it says and says what it does
function readJsonParsed(file){
    return JSON.parse(readFile(file, 'utf-8'));
}
