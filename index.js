console.log("test")

const oasToJob = require('./oasToJob');

let args = process.argv.slice(2);

let converterCommandMapping = {
    'oasToJob': oasToJob
}

module.exports.oasToJob = oasToJob;

if (args.concat.length === 0){
    //Dynamic execution

} else{
    //Call the corresponding converter removing the converter name parameter.
    if (converterCommandMapping[args[0]]){
        converterCommandMapping[args[0]].convert(args.slice(1));
    }
    else {
        console.log("Converter", args[0], "not found");
    }
}