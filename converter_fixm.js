var fs = require('fs');
var util = require('util');
var xml4js = require('./xml4js');
var xml2js = require('xml2js');


// Most of xml2js options should still work
var options = {};
var parser = new xml4js.Parser(options);


// Default is not to download schemas automatically, so we should add it manually
var xsd = fs.readFileSync('./tests/xsd/FIXM/Schema/applications/fficemessage/fficetemplates/flightdatarequest/FlightDataRequest.xsd', {encoding: 'utf-8'});
var xml = fs.readFileSync('./tests/xml/FIXM/PROPOSAL_RESP.xml', {encoding: 'utf-8'});


parser.addSchema('http://www.fixm.aero/app/ffice2/1.0', xsd, function (err, importsAndIncludes) { 
    // importsAndIncludes contains schemas to be added as well to satisfy all imports and includes found in xsd file
    //convert XML to JSON
    xml2js.parseString(xml, { mergeAttrs: true }, (err, result) => {
        if (err) {
            throw err;
    };

    //convert it to a JSON string
    const json = JSON.stringify(result, null, 4);
    console.log(util.inspect(result, false, null)); 

    //save JSON in a file
    //TODO: saving as JSON file hasn't worked so far
    //fs.writeFileSync('./tests/outcome_fixm/PLAN_STATUS.json', json);
    });
});
