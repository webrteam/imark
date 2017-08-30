var version = '0.5';

// 默认参数
var ops = {
	appId: '',
	servicePath: '/service',
	env: ''
};

var Ajax = function (url, data, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('post', url, true);
	xhr.responseType = 'json';
	xhr.onload = function () {
		callback && callback(xhr.response);
	};
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	var dataStr = [];
	if (data) {
		for (var k in data) {
			dataStr.push(`${k}=${encodeURIComponent(data[k])}`);
		}
	}
	dataStr = dataStr.join('&');
	xhr.send(dataStr);
};


// 生成UUID
var genUuid = function (len, radix) {
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var uuid = [], i;
	radix = radix || chars.length;

	if (len) {
		// Compact form
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	} else {
		// rfc4122, version 4 form
		var r;

		// rfc4122 requires these characters
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';

		// Fill in random data.  At i==19 set the high bits of clock sequence as
		// per rfc4122, sec. 4.1.5
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random()*16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}

	return uuid.join('');
};

var exp = {};

// 所有埋点
exp.Mark = function (options, callback) {
	ops.url = ops.url || options.url;
	ops.page = ops.page || options.page;
	if (ops.env) {
		options.env = ops.env;
	}
	options.version = version;
	options.timestamp = Date.now();
	options.url = ops.url;
	options.page = ops.page;
	options.appId = ops.appId;
	options.uuid = exp.getUuid();
	Ajax(`${ops.servicePath}/mark`, options, callback);
};

// 按钮埋点
exp.markPicker = function (_ops, callback) {
	if (typeof(_ops) != 'object') {
		_ops = {target: _ops};
	}
	_ops.actionType = 'pick';
	exp.Mark(_ops, callback);
};

// 页面记录
exp.markPage = function (url, page, callback) {
	var actionType = 'enter';
	exp.Mark({actionType, url, page}, callback);
};

// 初始化
exp.markInit = function(_ops){
	if (typeof(_ops) != 'object'){
		_ops = {appId: _ops};
	}
	Object.assign(ops, _ops);
	return exp.getUuid();
};

exp.getUuid = function() {
	if (!localStorage.shanyinUuid) {
		//localStorage.shanyinUuid = genUuid(64);
		localStorage.shanyinUuid = genUuid(16); //暂时
	}
	return localStorage.shanyinUuid;
};

if (typeof module === 'object') {
	module.exports = exp;
}
else {
	for (var k in exp) {
		window[k] = exp[k];
	}
}