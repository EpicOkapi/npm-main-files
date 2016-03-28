'use strict';

const glob = require('glob');
const minimatch = require('minimatch');
const _ = require('lodash');

let defaultOptions = {
    pkgJson: '../package.json',
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
    let packageJson = require(options.pkgJson);
    let dependencies = packageJson.dependencies;

    let allFiles = [];

    for(let dependency in dependencies){
        let modulePath = options.nodeModules + '/' + dependency + '/';
        let dependencyPkg = require('.' + modulePath + 'package.json');
        let dependencyFiles = dependencyPkg.files || [];
        let dependencyMain = dependencyPkg.main;

        if(!options.onlySpecified){
            let files = glob.sync(modulePath + filter, {
                ignore: modulePath + 'node_modules/**/*.*' //Ignore all files from nested node_modules folders
            });

            allFiles = allFiles.concat(files);
        } else {
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
