const npmMainFiles = require('../');

describe('Basic functionality tests', function(){
    var options;

    beforeEach(function(){
        options = {
            nodeModules: './spec/fixtures',
            pkgJson: './spec/package.json'
        }
    });

    it('should include all files in the files array of the packages', function(){
        var files = npmMainFiles('**/*.js', options);

        expect(files).toEqual([options.nodeModules + '/test/testA.js', options.nodeModules + '/test/testB.js']);
    });

    it('should include all files in the packages', function(){
        options.onlySpecified = false;

        var files = npmMainFiles('**/*.js', options);

        expect(files).toEqual([options.nodeModules + '/test/testA.js', options.nodeModules + '/test/testB.js', options.nodeModules + '/test/testC.js']);
    });
});
