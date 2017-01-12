
import request from 'superagent'
console.log("request", request)
// require('superagent-auth-bearer')(request)
import Promise from 'bluebird'

const SENTRY_SLUG = {
	api: 'pana-api',
	agent: 'pana-agent',
	web: 'pana-web-u4'
};


let Ajax = (function() {


	class Ajax {
		constructor(project) {
			this.url = "http://localhost:4000/"+SENTRY_SLUG[project];
		}

		fetch(path, next, previous) {
			var url = (next) ? next : ((previous) ? previous : '0')
			console.log('******', path, next, previous)
			path = (path.indexOf('/') === 0) ? path : '/' + path
			path = this.url + path
			return new Promise((resolve, reject) => {
				var req = request.get(path)

				console.log("request her her her", req )
				req.end(this._handleAjax.bind(this, resolve, reject));
			});
		}

		save() {

		}

		_handleAjax(resolve, reject, error, response) {
			console.log('err, res', error, response)
			if (error) {return reject(error);}
			console.log("response!", response);
			resolve({
				body: response.body.data,
				next: (response.body.links) ? response.body.links.next : null,
				previous: (response.body.links) ? response.body.links.previous : null
			})
		}


	}


	return Ajax;

})();




module.exports = Ajax;
