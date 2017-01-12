'use strict';
require('dotenv').config();
const express = require('express'),
	app = express(),
	cors = require('cors'),
	logger = require('morgan');

const superagent = require('superagent');
app.use(logger('dev'));
app.use(cors())

app.get('/:app/:path', function(req, res) {
	var url = 'https://sentry.io/api/0/projects/pana/'+req.params.app+'/'+req.params.path+'/';
	if (req.query.u && (req.query.u !== 0 || req.query.u !== '0')) {
		url = req.query.u
	}
	superagent.get(url)
	.set('Authorization', 'Bearer '+ process.env.RAVEN_API_KEY)
	.query({statsPeriod: '14d', query:"level:debug"})
	// query=Concierge%3A%22Concierge%22&limit=25&statsPeriod=24h&shortIdLookup=1&cursor=1484077477000:0:1
	.then(function(success) {
		// console.log("success", success)
		// console.log("success", success)

		console.log("success", success.body)
		// success = JSON.parse(success.body)
		var links = null;
		if (success.links) {
			// console.log("success links", success.links)
			links = success.links;
		}
		success = success.body.map((issue) => {
			var metadata = null;
			return fetchDataFromMeta(issue);
		})
		success = groupByEvent(success);


		res.json({
			data: success,
			links: links,
			status: 'success'
		})
	}).catch(function(err) {
		console.log("err", err)
		res.json({
			err,
			status: 'error'
		})
	});
});

var isValidCulprit = function isValidCulprit(issue) {
	var data = issue.metadata
	if (data) {
		if (data.type && data.value) {
			return data.culprit && data.culprit.contains('global');
		}
	}
};

var fetchDataFromMeta = function fetchDataFromMeta(issue) {
	var data = issue.metadata;
	var parsed = issue;
	console.log("data level!", issue.level, data.title)
	var pd = {
		genericType: 'Error',
		type: null,
		value: null,
		method: null,
		url: null
	};
	if (data) {
		if ((data.type && data.value) && data.type !== 'Error') {
			parsed.parsedData = Object.assign({}, data, {
				culprit: parsed.culprit
			});
		} else if (issue.level === 'debug') {
				pd.value = data.title;
				pd.type = 'Bug';
				pd.url = data.culprit;
				parsed.parsedData = pd;
				console.log("parsed", parsed.parsedData)
				return parsed;
		} else if (data.type && data.value) {
			var tags = data.value.split(':')
			tags = tags.forEach((tag, index) => {
				tag = tag.trim();
				if (tag !== 'Error') {
					if (tag.includes('Error')) {
						pd.type = tag;
					}
					if (tagIsMethod(tag)) {
						pd.method = tag;
					}
					if (!tagIsMethod(tag) && !tag.includes('Error') && tag.includes('http')) {
						// if (tags)
						var rest = tags[index + 1] ? tags[index + 1] : '';
						pd.url = tag + rest;
						tag = '';
					}
					if (!tagIsMethod(tag) && !tag.includes('Error') && index < tags.length - 2) {
						pd.value = tag;
					}
				}
			})
			parsed.parsedData = pd;
		}
	}
	return parsed;
};

var getTagDataType = function(tags) {
	// array of tags from split at :
	// if (tags)
};


var groupByEvent = function groupByEvent(issues) {
	var groups = {};
	issues.forEach((issue, index) => {
		// console.log("issue! ****** ", issue)
		if (issue.parsedData) {
			var value = issue.parsedData.value;
			if (value && issue.level !== 'debug' && value.length > 30)
				value = issue.culprit || issue.parsedData.type || 'Unknown'
			var type = issue.parsedData.type;
			if (value && !groups.hasOwnProperty(value)) {
				groups[value] = [issue];
			} else if (value && groups.hasOwnProperty(value)) {
				groups[value].push(issue);
			} else if (type && !groups.hasOwnProperty(type)) {
				groups[type] = [issue]
			} else if (type && groups.hasOwnProperty(type)) {
				groups[type].push(issue);
			} else {
				groups[genericType].push(issue);
			}
		}
	});
	// console.log("groups", Object.keys(groups))
	return Object.keys(groups).map(key => {
		return {
			title: key,
			events: groups[key]
		}
	});
};

var tagIsMethod = function(tag) {
	var methods = ['GET', 'POST', 'PUT', 'DELETE'];
	return methods.indexOf(tag) > -1;
}



app.listen(4000, function() {
	console.log("listen on 4000");
});
