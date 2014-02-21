/* Ajax Objects */

function AjaxDefaultsObj(type) {
	this.ContentType = "application/json; charset=utf-8";
	this.DataType = "json";
	this.Type = (type === '' || type === undefined) ? "POST" : type;
	this.Async = true;
}

function ajaxHelperObj(url, dataStrFmt, args) {
	this.Url = $.validator.format("Services/AjaxHelper.asmx/{0}", url);
	this.DataStrFmt = dataStrFmt;
	this.dataArgs = (args === '' || args === undefined) ? '' : $.validator.format(dataStrFmt, args);
}
var ajaxDefault = new AjaxDefaultsObj();

$.ajaxSetup({
	type: ajaxDefault.Type,
	contentType: ajaxDefault.ContentType,
	dataType: ajaxDefault.DataType,
	async: ajaxDefault.Async,
	statusCode: {
		204: function () { alert('No content to send back'); },
		400: function () { alert('Bad request'); },
		405: function () { alert('Method not allowed.'); },
		408: function () { alert('Request timeout.'); },
		404: function () { alert('Could not contact server.'); },
		503: function () { alert('Service unavailable.'); },
		505: function () { alert(' HTTP version not supported.'); },
		500: function () { alert('A server-side error has occurred.'); }
	},
	error: displayAjaxError
});

function AjaxXhrError(readystate, responsetext, status, statustext) {
	this.readyState = readystate;
	this.responseText = responsetext;
	this.status = status;
	this.statusText = statustext;
}
//var AjaxError = new AjaxXhrError();

function displayAjaxError(xhr, status, exception) {
	var status1 = "", errormsg, errormsgTemplate;
	if (exception === 'parsererror') {
		status1 = 'Requested JSON parse failed.';
	} else if (exception === 'timeout') {
		status1 = 'Ajax Time out error.';
	} else if (exception === 'abort') {
		status1 = 'Ajax request aborted.';
	} else {
		status1 = 'Uncaught Error.\n' + xhr.responseText;
	}

	errormsgTemplate = 'AjaxError Message <br /> Status:{0} <br /> Response:{1} <br /> Exception:{2}.';
	errormsg = errormsgTemplate.format([status1, xhr.responseText, exception]);
	$('#NiceErrorReportingBlock').innerHtml(errormsg);

	//	document.writeln(status1);
	//	document.writeln(xhr.responseText);
	//	document.writeln(exception);

	//		if (status1 != '') {
	//			var r = $.parseJSON(xhr.responseText);
	//			var ErrorString = (status + 'Message:\n\t' + r.Message);
	//			alert(ErrorString);
	//			document.writeln(ErrorString);
	//		}
}

function SendAjax(urlMethod, jsonData, returnFunction, sender, inAsynctype) {
	var asynctype = (inAsynctype === undefined || inAsynctype === null) ? true : false;
	var src = (sender === undefined || sender === null) ? 'SendAjax' : sender;

	$.ajax({
		url: urlMethod,
		data: jsonData,
		async: asynctype,
		sender: src,
		success: function (data) {
			if (data !== null) {
				returnFunction(data, sender);
			}
		}
	});
}

function toJSONWithFuncs(obj) {
	Object.prototype.toJSON = function () {
		var sobj = {}, i;
		for (i in this)
			if (this.hasOwnProperty(i)) {
				sobj[i] = typeof this[i] == 'function' ? this[i].toString() : this[i];
			}
		return sobj;
	};

	var str = JSON.stringify(obj);

	delete Object.prototype.toJSON;

	return str;
}

/*  AJAX METHODS */

function AddToOptionAddonsCacheCallBack(data, sender) { }

function AddToOptionAddonsCache(soid, qty, amt, desc, roomid, addontype, iutmtstid, sender, asynctype) {
	var urlMethod = '/Services/AjaxHelper.asmx/AddToOptionsAddonsCache';
	var jsonData = $.validator.format("{iutmtstid:'{0}', qty:'{1}', amt:'{2}', desc:'{3}', roomid:'{4}', addontype:'{5}', parentid: '{6}'}", soid, qty, amt, desc, roomid, addontype, iutmtstid);
	SendAjax(urlMethod, jsonData, AddToOptionAddonsCacheCallBack, sender, asynctype);
}

function AddToSpecialOffersCache_V2(soid, qty, amt, sender, asynctype, haspromocode) {
	var info, jsonData, urlMethod;
	info = new Locator(sender, soid, qty, amt, asynctype);
	urlMethod = '/Services/AjaxHelper.asmx/AddToSpecialOffersCache_V2';
	jsonData = $.validator.format("{soid:'{0}', qty:{1}, amt:{2}, pageind:'{3}', haspromocode:{4}}", soid, qty, amt, sender, haspromocode);
	return SendAjax(urlMethod, jsonData, AddToSpecialOffersCacheCallBack, info, asynctype);
};

function AddToCreateYourOwnPackageCacheCallBack_V2() { }

function AddToCreateYourOwnPackageCache_V2(iutmtstid, qty, amt, desc, addontype, sender, asynctype) {
	var urlMethod = '/Services/AjaxHelper.asmx/AddToCreateYourOwnPackageCache_V2';
	var jsonData = $.validator.format("{iutmtstid:'{0}', qty:{1}, amt:{2}, desc:'{3}', addontype:'{4}'}", iutmtstid, qty, amt, desc, addontype);
	SendAjax(urlMethod, jsonData, AddToCreateYourOwnPackageCacheCallBack_V2, sender, asynctype);
}

function ResetSpecialOffersCacheCallBack_V2(data, sender) { }

function ResetSpecialOffersCache_V2(sender, asynctype) {
	var info, jsonData, urlMethod;
	info = new Locator(sender);
	info.AsyncType = asynctype;
	urlMethod = '/Services/AjaxHelper.asmx/ResetSpecialOffersCache_V2';
	jsonData = $.validator.format("{sender:'{0}'}", sender);
	return SendAjax(urlMethod, jsonData, ResetSpecialOffersCacheCallBack, info.sender, info.asynctype);
};

/* PROTYPES */

//var ajaxDefault = new ajaxDefaultsObj();
//$.ajaxSetup({ type: ajaxDefault.Type, contentType: ajaxDefault.ContentType, dataType: ajaxDefault.DataType, error: displayAjaxError, async: ajaxDefault.Async });

//Storage.prototype.setObject = function (key, value) {
//	this.setItem(key, JSON.stringify(value));
//}

//Storage.prototype.getObject = function (key) {
//	var value = this.getItem(key);
//	return value && JSON.parse(value);
//}