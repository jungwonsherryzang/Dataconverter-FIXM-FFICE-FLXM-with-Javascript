#!/usr/bin/env node

var xml4json = require('./lib/xml4json');
//import * as xml4json from './lib/xml4json.js';

xml4json({
  downloadSchemas: true
});