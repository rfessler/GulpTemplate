/**
* zipcode and special orffer methods
* File Created: February 15, 2013
*/

var ZIPCODENOTSERVICED = false;
var ZIPCODEVALID = true;
var offerreturncount;
var selectedzipcode = '';
var offerlist;

/*********************************************************************
************************ LOCAL OFFERS BLOCK ************************
*********************************************************************/

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

/*********************************************************************
************************ SPECIAL OFFERS BLOCK ************************
*********************************************************************/

//function XXX_FetchSpecialOffersCallback(data) {
//	var offerscontainer = $('div[id$=displayflagOffersContainer]');
//	//var zipcodecontainer = $('div[id$=displayflagZipcodeContainer]');
//	var nationalofferscontainer = $('div[id$=displayflagNationalOffersContainer]');

//	var offerlist = $('.ulspecialOffersItems');
//	var offer = '';
//	var lilist = ''
//	$.each(data.d, function (key, val) {
//		offer = "<li class='offer offercontainer'>" +
//		"<div class='offercontainersingle' data-specialofferitemid='" + val.SpecialOfferItemID + "'>" +
//		"<div class='contentcaption'>" + val.SpecialOfferName + "</div>" +
//		"<br />" +
//		"<span class='contenttext'>" + val.ExtendedDetail + "</span>" +
//		"<input id='RedeemSpecialOffer2' class='button-link fixedleft' type='button' name='redeemspecialoffer2' value='Redeem This Offer' />" +
//		"</div>" +
//		"</li>";

//		lilist += offer;
//	});

//	if (lilist !== '') {
//		offerlist.children('li').remove();
//		offerlist.append(lilist);

//		offerscontainer.removeClass('hideoffers');
//		//zipcodecontainer.addClass('hideoffers');
//		//nationalofferscontainer.addClass('hideoffers');       //Add back if want to see national offers
//	}
//}

//function XXX_FetchSpecialOffers(count) {
//	var returncount = 0;

//	if (count !== undefined) { returncount = count; }
//	else { var returncount = (offerreturncount === undefined) ? 1 : offerreturncount; }

//	var urlMethod = '/Services/AjaxHelper.asmx/FetchSpecialOffers_V3';
//	var jsonData = $.validator.format("{count:{0}, includepromocodes:{1}}", returncount, false);
//	SendAjax(urlMethod, jsonData, FetchSpecialOffersCallback);
//}