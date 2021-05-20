
module.exports.main = async function (results, params) {
    //TODO: Change this to dynamic. //Overwrite params, for the moment this is static 
    let paramsTemp = {
        aggregations: {
            "totalRequests": {
                field: "stats.requests.total",
                operation: "sum",
            },
            "totalFailedRequests": {
                field: "stats.requests.failed",
                operation: "sum",
            },
            "totalAsserts": {
                field: "stats.assertions.total",
                operation: "sum",
            },
            "totalFailedAsserts": {
                field: "stats.assertions.failed",
                operation: "sum",
            },
            "responseAverage": {
                field: "timings.responseAverage",
                operation: "avg"
            },
            "responseMax": {
                field: "timings.responseMax",
                operation: "max"
            }
        }
    }




    const _ = require('lodash');
    let aggregations = {}
    Object.keys(paramsTemp.aggregations).forEach(agg => {
        aggregationObject = paramsTemp.aggregations[agg];
        let aggregationResult = 0;
        switch (aggregationObject.operation) {
            case "max":
                results.forEach(r => { let val = parseInt(_.get(r, aggregationObject.field)); if (val > aggregationResult) aggregationResult = val; })
                break;
            case "min":
                results.forEach(r => { let val = parseInt(_.get(r, aggregationObject.field)); if (val < aggregationResult) aggregationResult = val; })
                break;
            case "avg":
                results.forEach(r => { let val = parseInt(_.get(r, aggregationObject.field)); aggregationResult += val; })
                aggregationResult = aggregationResult / results.length;
                break;
            case "sum":
                results.forEach(r => { let val = parseInt(_.get(r, aggregationObject.field)); aggregationResult += val; })
                break;
            default:
                break;
        }
        aggregations[agg] = aggregationResult;

    })
    return aggregations
}

module.exports = {
    name: "fieldAggregator",
    code: "module.exports.main = " + this.main.toString(),
    parameters: { "aggregations": {} }
}

