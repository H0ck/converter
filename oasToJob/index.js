let fs = require('fs');
const yaml = require('js-yaml');
const utils = require('../utils');

module.exports.convert = function convert(args) {
    console.log("Starting conversion")
    if (args.length < 1) {
        console.log("Please specify oasFile to convert to a Job.")
        return;
    }


    let oasFile;
    try {
        oasFile = yaml.load(fs.readFileSync("./" + args[0], 'utf8'));
    } catch (err) {
        console.error("Error loading file: ", args[0])
        return;
    }

    //Do the conversion
    Object.keys(oasFile.scenarios).forEach(scenario => {
        let jobResult = yaml.load(fs.readFileSync(__dirname + '/jobTemplate.yaml', 'utf8'));
        jobResult.code = utils.JSONEscape(fs.readFileSync(__dirname + '/jobCode.js', 'utf8'));
        oasFile.scenarios[scenario].users?.forEach(user => {
            user.usage?.forEach(usage => {
                if (Math.round(user.count * Object.values(usage)[0]) > 0) {
                    jobResult.parametrizationGroups.push({
                        parameters: [
                            {
                                name: 'profile',
                                type: 'list',
                                definition: Object.keys(usage)[0]
                            },
                            {
                                name: 'userType',
                                type: 'list',
                                definition: user.type
                            },
                            {
                                name: 'collectionUrl',
                                type: 'list',
                                definition: oasFile.profiles[Object.keys(usage)[0]]?.url
                            },
                            {
                                name: 'index',
                                type: 'ranges',
                                definition: "1-" + Math.round(user.count * Object.values(usage)[0])
                            }

                        ]
                    });
                }

            })
        })

        if (!fs.existsSync('./h0ck-converter-output')) {
            fs.mkdirSync('./h0ck-converter-output');
        }
        fs.writeFile('./h0ck-converter-output/outputJob-' + scenario + '.yaml', yaml.dump(jobResult), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });

        fs.writeFile('./h0ck-converter-output/outputJob-' + scenario + '.json', JSON.stringify(jobResult, null, 2), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON data is saved.");
        });



    })
}


