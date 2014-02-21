/**
* global.js
* contains all global methods
* File Created: March 22, 2013
*/
var PANEL_CARPET = 0,
	PANEL_DUCT = 1,
	PANEL_UPHOLSTERY = 2,
	PANEL_TILE = 3,
	PANEL_WOOD = 4;

function ResetSpecialOffersCacheCallBack(data, sender) { }

function ResetSpecialOffersCache(sender, asynctype) {
	var info, jsonData, urlMethod;
	info = new Locator(sender);
	info.AsyncType = asynctype;
	urlMethod = '/Services/AjaxHelper.asmx/ResetSpecialOffersCache';
	jsonData = $.validator.format("{sender:'{0}'}", sender);
	return SendAjax(urlMethod, jsonData, ResetSpecialOffersCacheCallBack, info.sender, info.asynctype);
};

function CheckIfZipSelectedCallBack(data, info) {
	var IsZipSelected;
	IsZipSelected = data.d;
	PleaseWait();
	if (!IsZipSelected) {
		return window.location.href = "/Locator.aspx";
	} else {
		if (info.upsender === 'LOCALPAGE') {
			return AddToSpecialOfferCache(info.soid, info.qty, info, IS_ASYNCHRONOUS);
		} else {
			return window.location.href = _fullpath;
		}
	}
};

function CheckIfZipSelected(sender, soid, qty) {
	var info, jsonData, urlMethod;
	info = new Locator(sender, soid, qty);
	urlMethod = '/Services/AjaxHelper.asmx/CheckIfZipSelected';
	jsonData = $.validator.format("{sender:'{0}'}", sender);
	return SendAjax(urlMethod, jsonData, CheckIfZipSelectedCallBack, info);
};

function zipcodeNotServiced(info) {
	var nationalofferscontainer, offerscontainer, txt;
	offerscontainer = $('div[id$=displayflagOffersContainer]');
	nationalofferscontainer = $('div[id$=displayflagNationalOffersContainer]');
	txt = "Zip Code " + selectedzipcode.toString() + "<br /> not serviced in your area";
	offerscontainer.addClass('hideoffers');
	$("div[id$=localOffersBlockZipNotValid]").html(txt);
	return $("div[id$=localOffersBlock]").trigger('click');
};

function zipcodeIsServiced(info) {
	var s;
	PleaseWait();
	if (type(info) === 'string') {
		s = info.toUpperCase();
	} else {
		s = info.upsender;
	}
	if (s === 'LOCALPAGE') {
		$('input[id$=specialOfferszipnumber]').val('');
		return CancelWait();
	} else {
		return window.location.href = "/MoreOffers.aspx";
	}
};

function validateZipCodeCallback(data, info) {
	var offerscontainer, nationalofferscontainer, returnValue;
	offerscontainer = $('div[id$=displayflagOffersContainer]');
	nationalofferscontainer = $('div[id$=displayflagNationalOffersContainer]');
	returnValue = data.d;
	$(".OrderProcessRowGreen").removeClass("OrderProcessRowGreen");

	switch (returnValue) {
		case ZIPCODENOTSERVICED:
			zipcodeNotServiced(info);
			break;
		case ZIPCODEVALID:
			zipcodeIsServiced(info);
			break;
		default:
			break;
	}
}

function validateZipCode(sender, zipcode) {
	var info, asynctype, jsonData, urlMethod;
	info = new Locator(sender);
	info.AsyncType = IS_ASYNCHRONOUS;
	if (info.Equals('LOCALPAGE')) {
		selectedzipcode = zipcode;
		return asynctype = NOT_ASYNCHRONOUS;
	} else {
		selectedzipcode = $('input[id$=specialOfferszipnumber]').val();
		jsonData = $.validator.format("{zipnumber:'{0}'}", selectedzipcode);
		urlMethod = '/Services/AjaxHelper.asmx/ValidateZipCode';
		return SendAjax(urlMethod, jsonData, validateZipCodeCallback, info, IS_ASYNCHRONOUS);
	}
};

function AddToSpecialOffersCacheCallBack(data, info) {
	if (!data.d) {
		return window.location.href = "/Locator.aspx";
	} else if (info.Equals(LOCALPAGE)) {
		return window.location.href = "/MoreOffers.aspx";
	}
};

function AddToSpecialOfferCacheWithPromoCodeFlag(soid, qty, amt, sender, asynctype) {
	var info, jsonData, urlMethod;
	info = new Locator(sender, soid, qty, amt, asynctype);
	urlMethod = '/Services/AjaxHelper.asmx/AddToSpecialOffersCacheWithPromoCodeFlag';
	jsonData = $.validator.format("{soid:'{0}', qty:'{1}', amt:'{2}', pageind:'{3}'}", soid, qty, amt, sender);
	return SendAjax(urlMethod, jsonData, AddToSpecialOffersCacheCallBack, info, asynctype);
};

function AddToSpecialOfferCache(soid, qty, amt, sender, asynctype) {
	var info, jsonData, urlMethod;
	info = new Locator(sender, soid, qty, amt, asynctype);
	urlMethod = '/Services/AjaxHelper.asmx/AddToSpecialOffersCache';
	jsonData = $.validator.format("{soid:'{0}', qty:'{1}', amt:'{2}', pageind:'{3}'}", soid, qty, amt, sender);
	return SendAjax(urlMethod, jsonData, AddToSpecialOffersCacheCallBack, info, asynctype);
};

function ResetLocalOffersGroupContainerCallBack(data, sender) {
	var offerscontainer = $('div[id$=displayflagOffersContainer]');
	var nationalofferscontainer = $('div[id$=displayflagNationalOffersContainer]');

	var offerlist = $('.ulspecialOffersItems');
	var placeholder = $('.placeholder');

	placeholder.find('.span2').val('');
	placeholder.find('span').css('visibility', '');
	selectedzipcode = '';
	offerscontainer.addClass('hideoffers');
	//zipcodecontainer.removeClass('hideoffers');
	//nationalofferscontainer.removeClass('hideoffers');            //Add back if want to see national offers
}

function ResetLocalOffersGroupContainer(clearplaceholder) {
	var urlMethod = '/Services/AjaxHelper.asmx/ResetLocalOffersGroupContainer';
	var jsonData = $.validator.format('{sender:"{0}"}', 'ResetLocalOffersGroupContainer');
	SendAjax(urlMethod, jsonData, ResetLocalOffersGroupContainerCallBack)
}

function FetchSpecialOffersCallback(data) {
	var d, i, lilist, nationalofferscontainer, offer, offerscontainer, _i, _len;
	offerscontainer = $("div[id$=displayflagOffersContainer]");
	nationalofferscontainer = $("div[id$=displayflagNationalOffersContainer]");
	offerlist = $(".ulspecialOffersItems");
	offer = "";
	lilist = "";
	for (i = _i = 0, _len = data.d.length; _i < _len; i = ++_i) {
		d = data.d[i];
		if (d.ExtendedDetail == null) { d.ExtendedDetail = "" };
		sp = d.SalePrice.toString().replace(" ", "");
		if (d.RegularPrice == null || d.RegularPrice.toString().replace(" ", "") == "") {
			rg = "";
		}
		else {
			if ((d.RegularPrice - d.SalePrice) > 0) {
				rg = ", Save $" + (d.RegularPrice - d.SalePrice).toFixed(2).toString().replace(" ", "");
			}
			else { rg = ""; }
		}
		//offer = "<a href='/MoreOffers.aspx'><li class='offer offercontainer'>" + "<div class='offercontainersingle' data-specialofferitemid='" + d.SpecialOfferItemID + "'>" + "<div class='contentcaption'>" + d.SpecialOfferName + "</div>" + "<div class='contenttext'>" + d.ExtendedDetail + "</div>" + "<input id='RedeemSpecialOffer2' class='button-link fixed left' type='button' name='redeemspecialoffer2' value='Redeem This Offer' />" + "</div>" + "</li></a>";
		offer = "<a href='/MoreOffers.aspx'><li class='offer offercontainer'>" + "<div class='offercontainersingle' data-specialofferitemid='" + d.SpecialOfferItemID + "'>" + "<div class='contentcaption'>" + d.SpecialOfferName + "</div>" + "<div class='contentcaption'>$" + sp + " Sale" + rg + "</div>" + "<input id='RedeemSpecialOffer2' class='actionbutton-link button-link fixed left' type='button' name='redeemspecialoffer2' value='Redeem This Offer' />" + "</div>" + "</li></a>";
		lilist += offer;
	}
	if (lilist !== "") {
		offerlist.children("li").remove();
		// TODO: offerlist unremark below
		//offerlist.append(lilist);
		return offerscontainer.removeClass("hideoffers");
	}
};
function FetchSpecialOffers(count) {
	var jsonData, returncount, urlMethod;
	returncount = 0;
	//if (count !== undefined) {
	if (count === undefined || count == 0) {
		return returncount = count;
	} else {
		returncount = (offerreturncount === undefined ? 1 : offerreturncount);
		urlMethod = "/Services/AjaxHelper.asmx/FetchSpecialOffers";
		jsonData = $.validator.format("{count:{0}, includepromocodes:{1}}", returncount, false);
		return SendAjax(urlMethod, jsonData, FetchSpecialOffersCallback);
	}
};

function CheckIfOnSamePage(CurrentPage) {
	var _this, pathArray, thispage, thispathdata;
	_this = CurrentPage;

	pathArray = window.location.pathname.split('/');
	secondLevelLocation = pathArray[pathArray.length - 1].split('.');
	thispage = secondLevelLocation[0].toUpperCase();
	if (_this.data('path') != undefined) {
		thispathdata = _this.data('path').toUpperCase();
	}
	else if (_this.data('externalpath') != undefined) {
		return false;
	}

	if (thispathdata === thispage) { return true; }

	return false;
}

//************************ TOGGLE PANELS METHODS **************************
$(document).ready(function (ready) {
	$('.navigationLinksContent > .navlink, .topBannerContainer .navlink, .SOLink .navlink, .OrderProcessOffersDiv > .navlink').on('click', function (e) {
		//var _this, page, path, pagetype, pathArray, thispage, thispathdata;
		var _this, page, path, pagetype, thispathdata, samePage;
		_this = $(this);

		//pathArray = window.location.pathname.split('/');
		//secondLevelLocation = pathArray[1].split('.');
		//thispage = secondLevelLocation[0].toUpperCase();
		//thispathdata = _this.data('path').toUpperCase();

		//if (thispathdata === thispage) { return false; }
		samePage = CheckIfOnSamePage(_this);

		if (samePage) { return false; }
		thispathdata = _this.data('path');

		if (!_this.hasClass('currentpage')) {
			pagetype = _this.data('pagetype');
			if (pagetype === 'externalpath') {
				window.open(_this.data('externalpath'));
			}
			else if (pagetype === 'none') {
				// do nothing
			}
			else {
				page = '../' + _this.parent().data('product');
				path = (thispathdata === '') ? '/' : '/' + thispathdata + '.aspx';
				_fullpath = (pagetype === 'overview') ? path : page + path;

				//if (path == '/MoreOffers.aspx') {
				//    CheckIfZipSelected('shoppingcart');
				//}
				//else {
				PleaseWait();
				window.location.href = _fullpath;
				//}
			}
		}
	});

	$(document).on('click', '.offercontainersingle', function (e) {
		var soid = $(this).data('specialofferitemid');
		var SENDER = 'LPAGE';
		AddToSpecialOfferCache(soid, 1, 0, SENDER, NOT_ASYNCHRONOUS);
		window.location.href = "/MoreOffers.aspx";
	});
	/************************************************************************
	************************ TOGGLE PANELS EVENTS **************************
	************************************************************************/
});