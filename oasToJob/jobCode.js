const newman = require('newman');
const axios = require('axios');
module.exports.main = async function (params) {
    return new Promise(async function (resolve, reject) {
        let result = {}
        let collectionRequest = await axios.get(params.collectionUrl);
        newman.run({
            collection: collectionRequest.data,
            reporters: 'cli'
        }, function (err, response) {
            if (err) { reject(err); throw err; }
            result.stats = response.run.stats;
            result.params = params;
            result.timings = response.run.timings;
            console.log('collection run complete!');
            resolve(result);
        });
    })
}

