'use strict';

var rp		= require('request-promise');
/**
* @private
*/
function autoParse(body, response, resolveWithFullResponse) {
    // FIXME: The content type string could contain additional values like the charset.
    if (response.headers['content-type'] === 'application/json') {
        return JSON.parse(body);
    } else if (response.headers['content-type'] === 'text/html') {
        return $.load(body);
    } else {
        return body;
    }
}

function Req(opts) {
	this.rpap = rp.defaults({ transform: autoParse, json: true });
	this.endpoint = opts.endpoint;
	this.headers = {
		'accept': 'application/json'
	};
}

/**
* @param {String} url
* @param {Object} data
* @param {Function} callback
* @return {Promise} 
*/
Req.prototype.get = function(url, data) {
	if('header' in data) {
		// set header again
		var __extend = data.header;
		for(var prop in __extend) {
			this.headers[prop] = __extend[prop];
		}
		delete data.header;
	}
	var options = {
		url: this.endpoint + url,
		method: 'GET',
		headers: this.headers,
		qs: data
	};
	
	return this.rpap(options);
}

/**
* @param {String} url
* @param {Object} data
* @param {Function} callback 
* @return {Promise} 
*/
Req.prototype.post = function(url, data) {
	if('header' in data) {
		// set header again
		var __extend = data.header;
		for(var prop in __extend) {
			this.headers[prop] = __extend[prop];
		}
		delete data.header;
	}
	var options = {
		url: this.endpoint + url,
		method: 'POST',
		headers: this.headers,
		body: JSON.stringify(data)
	};
	return this.rpap(options);
}

/**
* @param {String} url
* @param {Object} data
* @param {Function} callback 
*/
Req.prototype.put = function(url, data) {
	if('header' in data) {
		// set header again
		var __extend = data.header;
		for(var prop in __extend) {
			this.headers[prop] = __extend[prop];
		}
		delete data.header;
	}
	var options = {
		url: this.endpoint + url,
		method: 'PUT',
		headers: this.headers,
		body: JSON.stringify(data)
	};
	return this.rpap(options);
}

module.exports = Req;