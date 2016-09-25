'use strict';
var request = require('../middle/helpers/apiHelper'),
	app = require('../middle/constants/app');
	//async = require('async'); /// for further using
	
/**
* Base API Client
* @type api {Request} request instance
* @type body {Object|string} body of requests
* @type uri {String} uri | params of requests
*/
function BaseAPIClient() {
	this.api = new request({
		endpoint: app.core
	});
	this.body = {}; // body of request
	this.uri = '';
}

/**
* response handler
* @param {Object} response
* @return {Object} result
*/
BaseAPIClient.prototype._process = function(response) {
	if(response.result.resultlst) {
		return response.result.resultlst;
	}
	return response;
}

/**
* error handler
* @param {Object} response
* @return {Error | String} error message
*/
BaseAPIClient.prototype._failure = function(error) {
	console.log('Error -> ', error);
	if(error.cause.message) {
		return error.cause.message;
	}
	return error;
}

/**
* set url params
* @param {String} par
*/
BaseAPIClient.prototype.setUrl = function(par) {
	if(typeof par !== typeof undefined) {
		this.uri = par;
	}
}

/**
* set body content of request
* @param {Object} data
*/
BaseAPIClient.prototype.setBody = function(data) {
	if(typeof data !== typeof undefined) {
		this.body = data;
	}
}

/**
* main method for calling API
* @param {Function} success
* @param {Function} failure
* @param {String?} method protocol
*/
BaseAPIClient.prototype.makeAPICall = function(success, failure, method) {
	var _this = this,
		_promise;
	method = method.toLowerCase().trim() || 'get';
	switch(method) {
		case 'put':
			_promise = _this.api.put(_this.uri, _this.body);
			break;
		case 'post':
			_promise = _this.api.post(_this.uri, _this.body);
			break;
		default:
			_promise = _this.api.get(_this.uri, _this.body);
	}
	// then process the response
	_promise.then(function(resp) {
		var rs = _this._process(resp);
		success(rs);
	})
	.catch(function(reason) {
		var err = this._failure(reason);
		console.log('An error has occured ', err);
		//throw new Error('The service has been down.')
		failure(err);
	});
}

module.exports = BaseAPIClient;