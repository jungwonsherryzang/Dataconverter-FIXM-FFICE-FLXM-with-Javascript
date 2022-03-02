# Dataconverter FIXM-FFICE with Typescript/Javascript
Developing a data converter that converts XML to JSON and vice versa for an air traffic management dealing with flight data

FIXM that stands for Flight Information eXchange Model is a data format for aviation flight information.
FIXM is a global exchange standard capturing Flight and Flow information.
FIXM is implemented in UML and XML and fully supports the data exchange requirements for the Flight and Flow Information for a Collaborative Environment (FF-ICE) concept, as defined by the ICAO ATMRPP.
https://fixm.aero/

FIXM consists of FIXM Applications, FIXM Core and FIXM Extensions.
FIXM Applications (Message Support) contains metadata about the message exchange in addition to guidance for constructing messages such as XML templates.
FIXM Core (Basic Flight Data) contains basic flight data that are globally applicable and which are endorsed by the FIXM CCB.
FIXM Extensions (Regional Supplements) supports localized requirements from particular communities of interest. It extends basic flight data and/or applications.

## FIXM Data Example
``` xsd
<?xml version="1.0" encoding="utf-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fx="http://www.fixm.aero/flight/4.2" xmlns:fb="http://www.fixm.aero/base/4.2" elementFormDefault="qualified" version="4.2.0">
	<xs:annotation>
		<xs:documentation>Root Package for FIXM Core.

=========================================== 
Copyright (c) 2020 Airservices Australia, DSNA, EUROCONTROL, GCAA UAE, IATA, International Coordinating Council of Aerospace Industries Associations, JCAB, NATS Limited, NAV CANADA, SESAR Joint Undertaking and US FAA 
=========================================== 
All rights reserved. 
          
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met: 
	- Redistributions of source code must retain the above copyright notice, this list of conditions and the disclaimer.
	- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the disclaimer in the documentation and/or other materials provided with the distribution.
	- Neither the names of Airservices Australia, DSNA, EUROCONTROL, GCAA UAE, IATA, International Coordinating Council of Aerospace Industries Associations, JCAB, NATS Limited, NAV CANADA, SESAR Joint Undertaking and US FAA nor the names of their contributors may be used to endorse or promote products derived from this specification without specific prior written permission.
          
DISCLAIMER 
          
THIS SPECIFICATION IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
          
========================================== 
Editorial note: this license is an instance of the BSD license template as provided by the Open Source Initiative: 
http://www.opensource.org/licenses/bsd-license.php 
          
The authoritative reference for FIXM is www.FIXM.aero. 
          
Details on Airservices Australia: http://www.airservicesaustralia.com/ 
Details on DSNA: http://www.developpement-durable.gouv.fr/-Navigation-aerienne-.html 
Details on EUROCONTROL: http://www.eurocontrol.int/ 
Details on IATA: http://www.iata.org/Pages/default.aspx 
Details on JCAB: http://www.mlit.go.jp/en/koku/index.html 
Details on NATS Limited: http://www.nats.co.uk/ 
Details on NAV CANADA: http://www.navcanada.ca/ 
Details on the UAE GCAA: https://www.gcaa.gov.ae 
Details on the ICCAIA: www.iccaia.org 
Details on the SESAR JU and its members: http://www.sesarju.eu/discover-sesar/partnering-smarter-aviation/members 
Details on the US FAA: http://www.faa.gov/ </xs:documentation>
	</xs:annotation>
	<xs:import namespace="http://www.fixm.aero/base/4.2" schemaLocation="./base/Base.xsd"/>
	<xs:import namespace="http://www.fixm.aero/flight/4.2" schemaLocation="./flight/Flight.xsd"/>
</xs:schema>
```

### USAGE
``` javascript
var fs = require('fs');
var util = require('util');
var xml4js = require('xml4js');

// Most of xml2js options should still work
var options = {};
var parser = new xml4js.Parser(options);


// Default is to not download schemas automatically, so we should add it manually
var xsd = fs.readFileSync('./tests/other/test1.xsd', {encoding: 'utf-8'});
var xml = fs.readFileSync('./tests/other/test1.xml', {encoding: 'utf-8'});


parser.addSchema('http://www.example.com/PO', xsd, function (err, importsAndIncludes) {
    // importsAndIncludes contains schemas to be added as well to satisfy all imports and includes found in schema.xsd

    parser.parseString(xml, function (err, result) {
        console.log(util.inspect(result, false, null));
    });
});
```

#### TEST FILE


