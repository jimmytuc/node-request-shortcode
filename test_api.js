'use strict';

var client = require('./api');

var dssclient = new client(); // querying the coreservices

dssclient.custinfo('0006414');