'use strict';
// API endpoint interface
var inherits = require('inherits');
var BaseApiClient = require('./base');
/**
 * DSS Web API client.
 *
 * @param {Object=} opts
 * @param {Object} opts.retryConfig The configuration to use for the retry operation
 * @constructor
 */
function APIClient(opts) {
	var clientOpts = opts || {};
	this.retry = null;
	BaseApiClient.call(this, clientOpts);
}
/** @inheritDocs **/
inherits(APIClient, BaseApiClient);

/**
* /GET customer info {@link }
* @param {String} cif
* @param {Function} cb
* @param {Object}
*/
APIClient.prototype.custinfo = function(cif) {
	var _this = this;
	_this.setUrl('CustInfo/' + cif);
	_this.makeAPICall(function(resp) {
		console.log('data resp: ', resp);
	},
	function(err) {
		console.log('error: ', err);
	}, 'GET');
};

module.exports = APIClient;