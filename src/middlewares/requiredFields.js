const {requiredBody} = require("../config/requiredBody");
const {validationRgex} = require("../config/validationRegx");
const {errorResponse,isValidDate} = require("../helper")
module.exports.requiredFields = (req, res, next) => {
    // get the url sub route so we can search inside the required fields and validate it
    let url = req.originalUrl.substring(1);
    url = url.replace(/\//g, '_');

    if(url.indexOf('?') > -1)
        url = url.substring(0, url.lastIndexOf("?"));

    // anything beyond the second underscore remove it
    if((url.match(/\_/g) || []).length > 1) {

        url = url.substring(0,url.lastIndexOf("_"));
    }


    let { body,query,params } = req
    let allFields = {};
    if(body && Object.keys(body).length !== 0 && body.constructor === Object) {
        allFields = {...allFields, ...body}
    }
    if(query && Object.keys(query).length !== 0 && query.constructor === Object) {
        allFields = {...allFields, ...query}
    }   
    if(params && Object.keys(params).length !== 0 && params.constructor === Object) {
        allFields = {...allFields, ...params}
    }

    // ------------------  validate to all fields  -------------------
    const keys = Object.keys(requiredBody[url]);
    for (let i in keys) {
        if(validationRgex[keys[i]]) {
        // get the test regex for that field
        let testRegex = new RegExp(validationRgex[keys[i]]);
        if (requiredBody[url][keys[i]] == true && (allFields[keys[i]] == null || allFields[keys[i]] == undefined))
            return errorResponse(`please enter the missing ${keys[i]} field` ,404,res)
        else if(allFields[keys[i]] && !testRegex.test(allFields[keys[i]]) ){
            return errorResponse(`please enter valid ${keys[i]}` ,404,res)
        }
        }else {
            // there is no regex for that field then it must be a javascript date object field
            allFields[keys[i]] = new Date(allFields[keys[i]])

            if( !isValidDate(allFields[keys[i]])) {
                return errorResponse(`please enter valid javascript date for ${keys[i]}` ,404,res)
            }
        }

    }

    // ------------------  Remove all not used fields -------------------
    const bodyKeys = Object.keys(allFields);
    for(let i in bodyKeys){
        if(!requiredBody[url][bodyKeys[i]]){
            delete allFields[bodyKeys[i]];
        }
    }

    next();
}