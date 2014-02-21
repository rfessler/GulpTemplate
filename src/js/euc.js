var PROBLEMWITHORDERSAVE = "1";
var PROBLEMWITHCUSTOMERSAVE = "2";
var ORDERSAVED = "3";

var ZIPCODENOTSERVICED = false;
var ZIPCODEVALID = true;
var STATE = "";

var PHONENUMBERLENGTH1 = 1;
var PHONENUMBERLENGTH2 = 2;
var PHONENUMBERLENGTH3 = 3;
var PHONENUMBERLENGTH4 = 4;
var PHONENUMBERLENGTH5 = 5;
var PHONENUMBERLENGTH6 = 6;
var PHONENUMBERLENGTH7 = 7;
var PHONENUMBERLENGTH8 = 8;
var PHONENUMBERLENGTH9 = 9;
var PHONENUMBERLENGTH10 = 10;

var KEYBACKSPACE = 8;
var KEYTAB = 9;
var KEYDELETE = 46;

var CLEANDEFAULT = "C";
var CARPET = "CPT";
var AIRDUCT = "ADT";
var UPHOLSTERY = "UPH";
var TILEGROUT = "TG";

//var GARAGEDOOR = "GD";
//var GARAGEDOOROPENER = "GDO";
//var GARAGEDOORREPAIR = "GDR"
//var GARAGEDEFAULT = "D";

var ICONCOLORORANGE = "#D14E00";
var ICONCOLORBLUE = "#003E7E";

var FIRSTTIME = true;
var RESETSENDER = "PopulateLefNav";

var OFFERSERVICETYPEREFID = "";

/********************************************** CALLBACKS *******************************/
function ResetCartAmount(sender, asynctype) {
	var urlMethod = '/Services/AjaxHelper.asmx/SetCartAmount';
	var jsonData = $.validator.format("{sender: '{0}'}", sender);
	SendAjax(urlMethod, jsonData, SetCartAmountCallBack, sender, asynctype);
}

function SetCartAmountCallBack(data, sender) {
	var returnValue = data.d;
	$(".cartAmount").html(returnValue);
}

//function GetServiceTypeRefPageLinkByContentObjectIdCallBack(tmp, data) {
//	window.location.href = tmp;
//	//window.location.href = data.d;
//}

function UpdateSpecialOffersPromoCacheCallBack(data, sender) { }

function UpdateSpecialOffersPromoCache(soid, qty, isselected, sender, asynctype) {
	var urlMethod = '/Services/AjaxHelper.asmx/UpdateSpecialOffersPromoCache';
	var jsonData = $.validator.format("{soid: '{0}', qty:'{1}', isSelected: '{2}'}", soid, qty, isselected);
	SendAjax(urlMethod, jsonData, UpdateSpecialOffersPromoCacheCallBack, sender, asynctype);
}

function SaveCustomerInfoCallback(data) {
	var abc = data.d + "";

	switch (abc.charAt(0)) {
		//var SENDER = 'PopulateLefNav';
		case ORDERSAVED:
			$.fancybox.close();
			//var def = abc.substring(1);
			switch (window.location.pathname.replace("/", "")) {
				case "CompleteOrder.aspx":
					ResetSpecialOffersCache(RESETSENDER, false);
					//ResetCartAmount("default", false)
					window.location.href = "/ThankYouCompleteOrder.aspx"; //+ def;
					break;
				default:
					window.location.href = "/ThankYou.aspx"; //+ def;
					break;
			}
			//window.location.href = "/ThankYou.aspx?" + def;
			break;
		case PROBLEMWITHORDERSAVE:
			CancelWait();
			$("div[id*=customerrequiredtext]").html("Problem creating order.  Please try again...");
			break;
		case PROBLEMWITHCUSTOMERSAVE:
			CancelWait();
			$("div[id*=customerrequiredtext]").html("Problem saving customer information.  Please try again...");
			break;
	}

	return true;
}

function AddToCreateYourOwnPackageCacheCallBack(data) {
	var able;
}

function AddToCreateYourOwnPackageCache(soid, qty, amt, desc, roomid, addontype, iutmtstid, sender, asynctype) {
	var urlMethod = '/Services/AjaxHelper.asmx/AddToCreateYourOwnPackageCache';
	var jsonData = $.validator.format("{iutmtstid:'{0}', qty:'{1}', amt:'{2}', desc:'{3}', roomid:'{4}', addontype:'{5}', parentid: '{6}'}", soid, qty, amt, desc, roomid, addontype, iutmtstid);
	SendAjax(urlMethod, jsonData, AddToCreateYourOwnPackageCacheCallBack, sender, asynctype);
}

function UpdateCreateYourOwnPackageCacheCallBack(data, sender) { }

function UpdateCreateYourOwnPackageCache(iutmtstid, qty, isselected, amt, roomid, sender, asynctype) {
	var urlMethod = '/Services/AjaxHelper.asmx/UpdateCreateYourOwnPackageCache';
	var jsonData = $.validator.format("{iutmtstid: '{0}', qty: '{1}', isSelected: '{2}', amt: '{3}', roomid: '{4}'}", iutmtstid, qty, false, amt, roomid);
	SendAjax(urlMethod, jsonData, UpdateCreateYourOwnPackageCacheCallBack, sender, asynctype);
}

function PromoCodeToArrayCallBack(data) {
	var returnValue = data.d;

	if (returnValue === 1) {
		//		$("[id*=moreOffersPostBackButton]").trigger('click');
		window.location.reload();
	}
	else {
		var txt = "<b>Promo Code(s) invalid:</b><br> " + $("input[id*=specialOfferspromocode]").val();  //+ "<br /> invalid.";
		$("div[id*=moreOffersBlockPromoNotValid]").html(txt);
		$("div[id*=moreOffersBlock]").trigger('click');
		CancelWait();
	}
}

//function DoPostBack(e) {
//    var id = $("[id*=moreOffersPostBackButton]").attr("id");
//    __doPostBack(id.toString(),'');
//    CancelWait();
//}

function ResetCreateYourOwnPackageHideCallBack(data) {
	window.location.href = "/MoreOffers.aspx";
}

function FetchDisclaimerTextCallBack(data) {
	var txt = data.d;
	$("div[id*=DisclaimerText]").text(txt);
}

/******************************************** END CALLBACKS *****************************/
$(function () {
	if (!window.addEventListener) {
		window.attachEvent("pageshow",
			function () {
				if (!(FIRSTTIME)) {
					CancelWait();
					$(".topnav").removeClass("OrangeBottomBorder");
					if (window.location.href.toUpperCase().indexOf("DEFAULT.ASPX") > -1) { $(".topnav.left").addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', CLEANDEFAULT); }
					if (window.location.href.toUpperCase().indexOf("CARPETCLEANING.ASPX") > -1) { $(".topnav.middle1").addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', CARPET); }
					if (window.location.href.toUpperCase().indexOf("AIRDUCTCLEANING.ASPX") > -1) { $(".topnav.middle2").addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', AIRDUCT); }
					if (window.location.href.toUpperCase().indexOf("UPHOLSTERYCLEANING.ASPX") > -1) { $(".topnav.middle3").addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', UPHOLSTERY); }
					if (window.location.href.toUpperCase().indexOf("TILEGROUTCLEANING.ASPX") > -1) { $(".topnav.middle4").addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', TILEGROUT); }
				}
				else { FIRSTTIME = false; }
			});
	}
	else {
		window.addEventListener("pageshow",
			function () {
				if (!(FIRSTTIME)) {
					CancelWait();
					$(".topnav").removeClass("OrangeBottomBorder");
					if (window.location.href.toUpperCase().indexOf("DEFAULT.ASPX") > -1) { $(".topnav.left").addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', CLEANDEFAULT); }
					if (window.location.href.toUpperCase().indexOf("CARPETCLEANING.ASPX") > -1) { $(".topnav.middle1").addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', CARPET); }
					if (window.location.href.toUpperCase().indexOf("AIRDUCTCLEANING.ASPX") > -1) { $(".topnav.middle2").addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', AIRDUCT); }
					if (window.location.href.toUpperCase().indexOf("UPHOLSTERYCLEANING.ASPX") > -1) { $(".topnav.middle3").addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', UPHOLSTERY); }
					if (window.location.href.toUpperCase().indexOf("TILEGROUTCLEANING.ASPX") > -1) { $(".topnav.middle4").addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', TILEGROUT); }
				}
				else { FIRSTTIME = false; }
			},
			false);
	}
});

$(document).ready(function () {
    CancelWait();
    var name = "#floatmenu";
    var position = $(name).offset();
    var msie = $.browser.msie;

    $(window).scroll(function () {
        var floatmenuid = $(name).attr("id");
        if ((floatmenuid !== undefined) && (floatmenuid.length > 0)) {
            $(name).find(".input-prepend").find("label").find("span").html("");
            var viewTop = $(window).scrollTop();
            var posTop;
            if (parseInt(viewTop) > parseInt(position.top)) {
                posTop = (viewTop - position.top) + "px";
                $(name).stop();
                $(name).animate({ "marginTop": posTop }, 0, function () {
                    $(name).find(".input-prepend").find("label").find("span").html("Enter Code(s)");
                });  //400 is wait duration not speed.  Lower wait duration, faster the scroll
            }
            else {
                $(name).stop();
                $(name).css("marginTop", "");
                $(name).animate({ "marginTop": "" }, 0, function () {
                    $(name).find(".input-prepend").find("label").find("span").html("Enter Code(s)");
                });
            }
        }
    });

    var windowWidth = $(window).width();

    //    $(window).resize(function (e) {
    //        if (windowWidth != $(window).width()) {
    //            prnt = $("#CompleteOrder").find('div.customerform');
    //            SetIconsRed(prnt);
    //        }
    //    });

    var stopinv;
    var intval = setInterval(
		function rotateImages() {
		    if (stopinv === undefined) {
		        var ocurPhoto = $('.divphotoshow div.current');
		        var onxtPhoto = ocurPhoto.next();
		        if (onxtPhoto.length === 0)
		            onxtPhoto = $('.divphotoshow div:first');
		        ocurPhoto.removeClass('current').addClass('previous');
		        onxtPhoto.addClass('current').removeClass('previous');

		        var ocurli = $(".active");
		        var onxtli = ocurli.next();
		        if (onxtli.length === 0)
		            onxtli = $("ul[id$=ulphotoshow] li:first");
		        ocurli.removeClass('active').removeClass('misc-OrangeSquare');
		        ocurli.addClass('misc-OrangeSquareEmpty');
		        onxtli.removeClass('misc-OrangeSquareEmpty');
		        onxtli.addClass('active').addClass('misc-OrangeSquare');
		    }
		}, "5000");

    $("div[id*=moreOffersBlock]").fancybox({
        beforeLoad: function (e) {
            //$("div[id*=moreOffersBlockPromoNotValid]").removeClass("hide");
            $("div[id*=moreOffersBlockPromoNotValid]").css("display", "");
        },
        afterClose: function (e) {
            $("input[id*=specialOfferspromocode]").focus().val();
        }
    });

    $("div[id*=localOffersBlock]").fancybox({
        beforeLoad: function (e) {
            $("div[id*=localOffersBlockZipNotValid]").css("display", "");
        },
        afterClose: function (e) {
            $("input[id$=specialOfferszipnumber]").focus().val('');
        }
    });

    //    $("div[id*=emergencyrepair]").click(function (e) {
    //        $("#emergencyBlock").trigger('click');
    //    });

    var ftype = 'emer';
    $(".emergency, .requestestimate").click(function (e) {
        if ($(this).hasClass("requestestimate")) {
            ftype = "est";
        }
        else {
            ftype = "emer";
        }
        STATE = $("#CompleteOrder input[id*=state]").val();
        $("#emergencyBlock").trigger('click');
    });

    //    $(".GarageDoorCircles, .GarageDoorSquares").click(function (e) {
    //        switch (true) {
    //            case $(this).hasClass('WhiteCircle'):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_TrueWhite_515.jpg', 'alt': 'True White' });
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_TrueWhite_515.jpg', 'alt': 'True White' });
    //                break;
    //            case $(this).hasClass('AlmondCircle'):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_Almond_515.jpg', 'alt': 'Almond' });
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_Almond_515.jpg', 'alt': 'Almond' });
    //                break;
    //            case $(this).hasClass('WickerTanCircle'):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_WickerTan_515.jpg', 'alt': 'Wicker Tan' });
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_WickerTan_515.jpg', 'alt': 'Wicker Tan' });
    //                break;
    //            case $(this).hasClass('SandtoneCircle'):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_Sandtone_515.jpg', 'alt': 'Sandstone' });
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_Sandtone_515.jpg', 'alt': 'Sandstone' });
    //                break;
    //            case $(this).hasClass('TerratoneCircle'):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_Terratone_515.jpg', 'alt': 'Terratone' });
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_Terratone_515.jpg', 'alt': 'Terratone' });
    //                break;
    //            case $(this).hasClass('DarkBrownCircle'):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_DarkBrown_515.jpg', 'alt': 'Dark Brown' });
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_DarkBrown_515.jpg', 'alt': 'Dark Brown' });
    //                break;
    //            case $(this).hasClass('HunterGreenCircle'):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_DarkGreen_515.jpg', 'alt': 'Hunter Green' });
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_DarkGreen_515.jpg', 'alt': 'Hunter Green' });
    //                break;
    //            case $(this).hasClass('GrayCircle'):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_Gray_515.jpg', 'alt': 'Gray' });
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_Gray_515.jpg', 'alt': 'Gray' });
    //                break;
    //            case $(this).hasClass('MediumWoodgrainSquare'):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_MediumWood_515.jpg', 'alt': 'Medium Woodgrain' });
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_MediumWood_515.jpg', 'alt': 'Medium Woodgain' });
    //                break;
    //            case $(this).hasClass('DarkWoodgrainSquare'):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_DarkWood_515.jpg', 'alt': 'Dark Woodgrain' });
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_DarkWood_515.jpg', 'alt': 'Dark Woodgrain' });
    //                break;
    //            default:
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_TrueWhite_515.jpg', 'alt': 'True White' });
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr({ 'src': '../images/backgrounds/swatches/ColorPopUps_TrueWhite_515.jpg', 'alt': 'True White' });
    //        }

    //        var divSection = $(this).closest('.groupcontainer').attr('id');

    //        if (divSection == "TraditionalColors") {
    //            $("#GarageDoorTraditionalBlock").trigger('click');
    //        }
    //        else {
    //            $("#GarageDoorCarriageBlock").trigger('click', 'type');
    //        }
    //    });

    //    $(".GarageDoorPhotos").click(function (e) {
    //        var doorType;
    //        switch (true) {
    //            case $(this).hasClass("CHCascade"):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr('src', '../images/Doors_515/StlCarr_515/StlCarrBBCascadeBlRdgHndl_515.jpg');
    //                doorType = 'CH';
    //                break;
    //            case $(this).hasClass("CHMedWd"):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr('src', '../images/Doors_515/StlCarr_515/StlCarrBBMedWdBlRgHanStrps_515.jpg');
    //                doorType = 'CH';
    //                break;
    //            case $(this).hasClass("CHMoonlt"):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr('src', '../images/Doors_515/StlCarr_515/StlCarrBBMoonltBlRdgHndl_515.jpg');
    //                doorType = 'CH';
    //                break;
    //            case $(this).hasClass("CHMoonltSandtone"):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr('src', '../images/Doors_515/StlCarr_515/StlCarrBBMoonltSandtoneBlRdgHndlStrp_515.jpg');
    //                doorType = 'CH';
    //                break;
    //            case $(this).hasClass("CHPrairie"):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr('src', '../images/Doors_515/StlCarr_515/StlCarrBBPrairieBlRdgHndlStrp_515.jpg');
    //                doorType = 'CH';
    //                break;
    //            case $(this).hasClass("CHStockton"):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr('src', '../images/Doors_515/StlCarr_515/StlCarrBBStocktonBlRdgHndlStrp_515.jpg');
    //                doorType = 'CH';
    //                break;
    //            case $(this).hasClass("CHWaterford"):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr('src', '../images/Doors_515/StlCarr_515/StlCarrBBWaterfordBlRdgHndlStrp_515.jpg');
    //                doorType = 'CH';
    //                break;
    //            case $(this).hasClass("CHSeineCanterbry"):
    //                $("img[id*=GarageDoorCarriageBlockColor]").attr('src', '../images/Doors_515/StlCarr_515/StlCarrLgPnlBBSeineCanterbryHndlStrp_515.jpg');
    //                doorType = 'CH';
    //                break;
    //            case $(this).hasClass("TFlshPnl"):
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr('src', '../images/Doors_515/Trad_515/TradFlshPnlClsd_515.jpg');
    //                doorType = 'T';
    //                break;
    //            case $(this).hasClass("TFlshPnlClsdSandtone"):
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr('src', '../images/Doors_515/Trad_515/TradFlshPnlClsdSandtone_515.jpg');
    //                doorType = 'T';
    //                break;
    //            case $(this).hasClass("TLgPnlClsdSandtone"):
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr('src', '../images/Doors_515/Trad_515/TradLgPnlClsdSandtone_515.jpg');
    //                doorType = 'T';
    //                break;
    //            case $(this).hasClass("TLgPnlWaterford"):
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr('src', '../images/Doors_515/Trad_515/TradLgPnlWaterford_515.jpg');
    //                doorType = 'T';
    //                break;
    //            case $(this).hasClass("TRibbedPanel"):
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr('src', '../images/Doors_515/Trad_515/TradRibbedPanel_515.jpg');
    //                doorType = 'T';
    //                break;
    //            case $(this).hasClass("TShrtPnlCascade4"):
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr('src', '../images/Doors_515/Trad_515/TradShrtPnlCascade4_515.jpg');
    //                doorType = 'T';
    //                break;
    //            case $(this).hasClass("TShrtPnlCascade5"):
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr('src', '../images/Doors_515/Trad_515/TradShrtPnlCascade5_515.jpg');
    //                doorType = 'T';
    //                break;
    //            case $(this).hasClass("TShrtPnlCascadeAlmond"):
    //                $("img[id*=GarageDoorTraditionalBlockColor]").attr('src', '../images/Doors_515/Trad_515/TradShrtPnlCascadeAlmond_515.jpg');
    //                doorType = 'T';
    //                break;
    //        }

    //        switch (doorType) {
    //            case 'CH':
    //                $("#GarageDoorCarriageBlock").trigger('click');
    //                break;
    //            case 'T':
    //                $("#GarageDoorTraditionalBlock").trigger('click');
    //                break;
    //        }
    //    });

    //    $("#GarageDoorTraditionalBlock").fancybox();
    //    $("#GarageDoorCarriageBlock").fancybox();

    //    $(".CarriageHouseCircles").hover(function (e) {
    //        switch (true) {
    //            case $(this).hasClass('WhiteCircle'):
    //                $("img[id*=GarageDoorBlockColor]").attr('src', '../images/products/GarageDoors/StlCarrLgPnlBBMoonlite_483.jpg');
    //                break;
    //            case $(this).hasClass('AlmondCircle'):
    //                $("img[id*=GarageDoorBlockColor]").attr('src', '../images/overview/StlCarrBBBlRdgHndlStrp_483.jpg');
    //                break;
    //            default:
    //                $("img[id*=GarageDoorBlockColor]").attr('src', '../images/overview/PremCarBaseABlRdgHndl_483.jpg');
    //        }
    //        $("#GarageDoorBlock").trigger('click');
    //    });
    //$("#GarageDoorBlock").fancybox().hover(function () {
    //$(this).mouseout(function ()
    //{ $.fancybox.close(); });
    //});

    $("#emergencyBlock").fancybox({
        beforeLoad: function (e) {
            $(".columnbox label input").val('');
            $(".columncitystatezipbox label input").val('');
            $(".columnbox label textarea").val('');
            $(".columnbox label span").css('visibility', '');
            $(".columncitystatezipbox label span").css('visibility', '');
            $(".customerdatecalendar").css('display', 'none');
            $(".emergencybox").css('padding', '0px');
            $("div[id*=customerrequiredtext]").html("");
            $(".emergencybox select[id*=ddlCities]").addClass("hide");
            $(".emergencybox input[id*=city]").removeClass("hide");
            $(".emergencybox input[id*=city]").removeAttr("readonly");
            $(".emergencybox input[id*=state]").removeAttr("readonly");
            $(".emergencybox input[id*=zipnumber]").removeAttr("readonly");
            if (ftype === "est") {
                var txt = $("div[id*=instructiontextcompleteorder]").text().replace('order', 'request for an estimate');
                $("div[id*=instructiontextcompleteorder]").css('display', 'block').text(txt);
                $("div[id*=instructiontextcompleteorder]").addClass("backgroundlightyellow");

                $("div[id*=instructiontextemergency]").css('display', 'none');
                $(".customerheader").css("display", "none");
                $(".customerheader.seperator").css("display", "block");

                txt = 'Submit this Form to Request an Estimate <br /> or Call ' + $("input[id*=hdnemergencynumber]").val();
                $(".customerheader.middle").addClass("estimateheadersetting").css("display", "block").html(txt);
                $(".customerheader.middle").css('color', ICONCOLORBLUE);
                $(".EmergencyButton").val("Submit Request for Estimate");
            }
            else {
                $(".EmergencyButton").val("Submit Emergency Request");
                $("div[id*=instructiontextemergency]").css('display', 'block');
                $("div[id*=instructiontextcompleteorder]").css('display', 'none');
            }
        },
        afterShow: function (e) {
            var customerform = $('.fancybox-wrap').find('div.customerform');
            SetAllRequiredIconColor(customerform, ICONCOLORBLUE);
        },
        afterClose: function (e) {
            var topnav = $.jStorage.get('prevtopnav');
            switch (topnav) {
                case CLEANDEFAULT:
                    $("div[id*=topnavleft]").addClass("OrangeBottomBorder");
                    break;
                case AIRDUCT:
                    $("div[id*=topnavmiddle2]").addClass("OrangeBottomBorder");
                    break;
                case UPHOLSTERY:
                    $("div[id*=topnavmiddle3]").addClass("OrangeBottomBorder");
                    break;
                case CARPET:
                    $("div[id*=topnavmiddle1]").addClass("OrangeBottomBorder");
                    break;
                case TILEGROUT:
                    $("div[id*=topnavmiddle4]").addClass("OrangeBottomBorder");
                    break;
                default:
                    $("div[id*=topnavleft]").addClass("OrangeBottomBorder");
            }
            //$.jStorage.deleteKey('prevtopnav');
            $(".customerdatecalendar").css('display', 'block');
            $("div[id*=instructiontextemergency]").css('display', 'none');

            var txt = $("div[id*=instructiontextcompleteorder]").text().replace('request for an estimate', 'order');
            $("div[id*=instructiontextcompleteorder]").css('display', 'block').removeClass("backgroundlightyellow");

            $(".EmergencyButton").val("Submit");
            $(".customerheader").css("display", "block");
            $(".customerheader.middle").css('color', 'red');

            txt = 'For Emergency Service, Call: ' + $("input[id*=hdnemergencynumber]").val() + '<br /> or Submit this Form';
            $(".customerheader.middle").removeClass("estimateheadersetting").html(txt);
            if (STATE !== "") {
                $("#CompleteOrder input[id*=state]").val(STATE);
                $("#CompleteOrder input[id*=state]").prev().css('visibility', 'hidden');
            }
            CancelWait();
        }
    });

    $("ul li[id*=liContent]").click(function (e) {
        $('.active').addClass('misc-OrangeSquareEmpty');
        $('.active').removeClass('misc-OrangeSquare').removeClass('active');
        $(this).addClass('active').addClass('misc-OrangeSquare');
        $(this).removeClass('misc-OrangeSquareEmpty');
        $('.current').addClass('previous');
        $('.current').removeClass('current');
        var divid = "div[id*=" + $(this).attr("id").replace("li", "div") + "]";
        $(divid).removeClass('previous').addClass('current');
        stopinv = true;
    });

    //Click on current picture, direct to respective URL
    $(".divphotoshow").click(function (e) {
        var pic = $(this).find('div.current').find("img");
        var id = pic.attr('src').substring(35);
        var tmp = $(this).find('div.current').find('.imgText').data('redirect');

        if (!$("html").hasClass('chrome')) { PleaseWait(); } // PleaseWait() doesn't work well on Chrome -- AFH 1.31.14
        window.location = tmp;

        //return false;

        //var urlMethod = '/Services/AjaxHelper.asmx/GetServiceTypeRefPageLinkByContentObjectId';
        //var jsonData = $.validator.format("{contentObjectIdString:'{0}'}", id);
        //SendAjax(urlMethod, jsonData, GetServiceTypeRefPageLinkByContentObjectIdCallBack(tmp));
    });

    $("input[id*=OrderProcessDisclaimer]").click(function (e) {
        OFFERSERVICETYPEREFID = $(this).data("servicetyperefid");
        $("#DisclaimerBlock").trigger("click");
    });

    $("#DisclaimerBlock").fancybox({
        'width': 600,
        'height': 200,
        'autoSize': false,
        beforeLoad: function (e) {
            var urlMethod = '/Services/AjaxHelper.asmx/FetchDisclaimerText';
            var jsonData = $.validator.format("{servicetyperefid:'{0}'}", OFFERSERVICETYPEREFID);
            SendAjax(urlMethod, jsonData, FetchDisclaimerTextCallBack, NOT_ASYNCHRONOUS);
        },
        afterClose: function (e) {
            $("div[id*=DisclaimerText]").text("");
        }
    });

    $(".OrderProcessSubmit").click(function (e) {
        if ($(this).hasClass("disableClass")) {
        }
        else {
            PleaseWait();
            totalqty = $(".totalqty").text();
            if (totalqty === "0") {
                CancelWait();
            }
            else {
                $(".EmergencyButton").val("Submit");
                window.location.href = "/CompleteOrder.aspx";
            }
        }
    });

    $(".OrderProcessIndividualSubmit").click(function (e) {
        PleaseWait();
        var urlMethod = '/Services/AjaxHelper.asmx/ResetCreateYourOwnPackageHide';
        var jsonData = $.validator.format("{resetflag:'{0}'}", false);
        SendAjax(urlMethod, jsonData, ResetCreateYourOwnPackageHideCallBack);
    });

    //	$(".Social-facebook-icon").click(function (e) {
    //		window.location = "http://www.facebook.com";
    //	});

    //	$(".Social-youtube-icon").click(function (e) {
    //		window.location = "http://www.youtube.com";
    //	});

    // For videos inside a carousel logic
    $("#slider-carousel").jcarousel();

    $("#yt_videosurround").fancybox({
        afterClose: function (e) {
            $("#yt_embededvideo").empty();
        }
    });

    $("li.jcarousel-item").click(function (e) {
        $("#yt_videosurround").trigger('click');
    });
    // End of videos inside a carousel logic

    $('.avideos').fancybox({
        openEffect: 'none',
        closeEffect: 'none',
        type: 'iframe'
    });

    var cellextclicked = false;
    var homeextclicked = false;
    $(".input-prepend, #homeextnumber, #cellextnumber").click(function (e) {
        if ($(this).attr("id") !== "homeextnumber" && $(this).attr("id") !== "cellextnumber") {
            if (!(cellextclicked) && !(homeextclicked)) {
                if ($(this).hasClass("commentbox")) { $(this).find("textarea:first").focus(); }
                else { $(this).find("input:first").focus(); }
            }
            else {
                if (homeextclicked) { $(this).find("#homeextnumber").focus(); }
                else { $(this).find("#cellextnumber").focus(); }
            }
            cellextclicked = false;
            homeextclicked = false;
        }
        else {
            if ($(this).attr("id") === "homeextnumber") { homeextclicked = true; }
            if ($(this).attr("id") === "cellextnumber") { cellextclicked = true; }
        }
    });

    $(".topnav").click(function (e) {
        $(".OrangeBottomBorder").removeClass("OrangeBottomBorder");
        if ($(this).hasClass("left")) { $(this).addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', CLEANDEFAULT); PleaseWait(); window.location.href = "/"; }
        if ($(this).hasClass("middle1")) { $(this).addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', CARPET); PleaseWait(); window.location.href = "/CarpetCleaning.aspx"; }
        if ($(this).hasClass("middle2")) { $(this).addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', AIRDUCT); PleaseWait(); window.location.href = "/AirDuctCleaning.aspx"; }
        if ($(this).hasClass("middle3")) { $(this).addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', UPHOLSTERY); PleaseWait(); window.location.href = "/UpholsteryCleaning.aspx"; }
        if ($(this).hasClass("middle4")) { $(this).addClass("OrangeBottomBorder"); $.jStorage.set('prevtopnav', TILEGROUT); PleaseWait(); window.location.href = "/TileGroutCleaning.aspx"; }
        return false;
    });

    $(".columnbox input[id*=phone]").keyup(function (e) {
        var prnt = $(this).closest('div.customerform');
        var numid = prnt.find($(this)).val();
        var numval = numid.replace(/[^0-9]/g, '');
        var key = (e.keyCode ? e.keyCode : e.which);

        if (numval.length === 0) { prnt.find($(this)).val(''); }
        else if (key === KEYBACKSPACE || key === KEYTAB || key === KEYDELETE) { }
        else {
            switch (numval.length) {
                case PHONENUMBERLENGTH1: case PHONENUMBERLENGTH2:
                    prnt.find($(this)).val('(' + numval);
                    break;
                case PHONENUMBERLENGTH3:
                    prnt.find($(this)).val('(' + numval + ')');
                    break;
                case PHONENUMBERLENGTH4: case PHONENUMBERLENGTH5:
                    prnt.find($(this)).val('(' + numval.substring(0, 3) + ') ' + numval.substring(3));
                    break;
                case PHONENUMBERLENGTH6:
                    prnt.find($(this)).val('(' + numval.substring(0, 3) + ') ' + numval.substring(3) + '-');
                    break;
                case PHONENUMBERLENGTH7: case PHONENUMBERLENGTH8: case PHONENUMBERLENGTH9: case PHONENUMBERLENGTH10:
                    prnt.find($(this)).val('(' + numval.substring(0, 3) + ') ' + numval.substring(3, 6) + '-' + numval.substring(6));
                    break;
            }
        }
    });

    $(".digitsonly input[id*=number]").keyup(function (e) {
        var numid = $(this).attr("id");
        var numval = $("#" + numid).val().replace(/[^0-9]/g, '');
        var key = (e.keyCode ? e.keyCode : e.which);

        if (numval.length === 0) { $("#" + numid).val(''); }
        else if (key === KEYBACKSPACE || key === KEYTAB || key === KEYDELETE) { }
        else { $("#" + numid).val(numval); }
    });

    $(".OrderProcessRow td.OPRfirst, .OrderProcessRow td.OPRmiddle2 span, .OrderProcessRow td.OPRmiddle1,.OrderProcessRow td.OPRlast, .OrderProcessRow td.OPRmiddle3 div").click(function (e) {
        $(this).closest("tr").toggleClass("OrderProcessRowGreen");
        if ($(this).closest("tr").hasClass("OrderProcessRowGreen")) {
            var abc = $(this).closest("tr").find(".OPRmiddle2").find("select option:eq(1)").val();
            if ($(this).closest("td").hasClass("OPRmiddle3")) {
                $(this).closest("tr").find(".OPRmiddle3").find("input").attr('checked', true);
                abc = $(this).closest("tr").find(".OPRmiddle3").find("select option:eq(1)").val();
            }
            $(this).closest("tr").find(".OPRfirst").find("input").attr('checked', true);
            $(this).closest("tr").find(".OPRmiddle2").find("select").val(abc);
            $(this).closest("tr").find(".first").find("select").val(abc);
            $(this).closest("tr").find(".middle").find("select").val('0');
            $(this).closest("tr").find(".last").find("select").val('0');
        }
        else {
            $(this).closest("tr").find(".OPRfirst").find("input").attr('checked', false);
            $(this).closest("tr").find(".OPRmiddle2").find("select").val('0');
            $(this).closest("tr").find(".OPRmiddle3").find("select").val('0');
            $(this).closest("tr").find(".first").find("select").val('0');
            $(this).closest("tr").find(".middle").find("select").val('0');
            $(this).closest("tr").find(".last").find("select").val('0');
        }
        PopulateLefNav();
    });

    $(".OrderProcessRow td.OPRmiddle3 select").change(function (e) {
        if ($(this).closest("tr").hasClass("OrderProcessRowGreen")) {
            if ($(this).closest("td").hasClass("first")) {
                if ($("option:selected", this).val() === "") {
                    $(this).closest("tr").removeClass("OrderProcessRowGreen");
                    $(this).closest("tr").find(".middle").find("select").val('0');
                    $(this).closest("tr").find(".last").find("select").val('0');
                }
            }
        }
        else {
            if ($("option:selected", this).val() !== "") {
                $(this).closest("tr").addClass("OrderProcessRowGreen");
                if ($(this).closest("td").hasClass("middle") || $(this).closest("td").hasClass("last")) {
                    $(this).closest("td.OPRmiddle3").siblings(".first").find("select").val($("option:selected", this).val());
                }
            }
        }
        PopulateLefNav();
    });

    $(".OrderProcessRow td.OPRmiddle2 select").change(function (e) {
        if ($(this).closest("tr").hasClass("OrderProcessRowGreen")) {
            if ($("option:selected", this).val() === "") {
                $(this).closest("tr").find(".OPRfirst").find("input").attr('checked', false);
                $(this).closest("tr").removeClass("OrderProcessRowGreen");
            }
        }
        else {
            if ($("option:selected", this).val() !== "") {
                $(this).closest("tr").find(".OPRfirst").find("input").attr('checked', true);
                $(this).closest("tr").addClass("OrderProcessRowGreen");
            }
        }
        PopulateLefNav();
    });

    $("input:text").on("keydown", function (e) {
        var key = (e.keyCode ? e.keyCode : e.which);
        var tgt = (e.target ? e.target : e.srcElement);
        if (key === $.ui.keyCode.BACKSPACE) {
            if (e.target.disabled || e.target.readOnly) {
                return false;
            }
        }
    });

    $("input:text").keypress(function (e) {
        if (e.which === $.ui.keyCode.ENTER) {
            var defaultButtonId = $(this).attr("defaultbutton");
            if (defaultButtonId !== undefined) {
                var inputType = $('input[id*=' + defaultButtonId + ']').attr('id');
                if (inputType !== undefined && inputType !== "") {
                    $('input[id*=' + defaultButtonId + ']').click();
                }
                else {
                    $('a[id*=' + defaultButtonId + ']').click();
                }
            }
            return false;
        }
    });

    $('input[id$=specialOffersApplybutton]').on('click', function (e) {
        return false;

        //var promostr = $("input[id*=specialOfferspromocode]").val();
        //if ((promostr !== undefined) && (promostr !== "")) {
        //			PleaseWait();
        //			var urlMethod = '/Services/AjaxHelper.asmx/PromoCodeToArray';
        //			var jsonData = $.validator.format("{promostr:'{0}'}", promostr);
        //			SendAjax(urlMethod, jsonData, PromoCodeToArrayCallBack, NOT_ASYNCHRONOUS);
        //		}
    });

    /*
    $("input[id*=specialOffersApplybutton]").click(function (e) {
    var promostr = $("input[id*=specialOfferspromocode]").val();
    if ((promostr !== undefined) && (promostr != "")) {
    PleaseWait();
    var urlMethod = '/Services/AjaxHelper.asmx/PromoCodeToArray';
    var jsonData = $.validator.format("{promostr:'{0}'}", promostr);
    SendAjax(urlMethod, jsonData, PromoCodeToArrayCallBack, NOT_ASYNCHRONOUS);
    }
    });
    */

    $(".validation-icon-img").live('focusin', function (e) {
        if ($(this).closest("div").next().find("input:first").length > 0) {
            $(this).closest("div").next().find("input:first").focus();
        }
        else {
            if ($(this).closest("div").parent().next().find("input:first").length > 0) {
                $(this).closest("div").parent().next().find("input:first").focus();
            }
            else {
                $(this).closest("div").parent().parent().find("textarea:first").focus();
            }
        }
    });
});

function PopulateLefNav() {
	return false;

	var SENDER = 'PopulateLefNav';
	////	$("ul[id*=OfferList]").empty();

	var display = $('div[id$=VisualWebSiteOptomizerSwitch_SpecialOffersTable]').css('display');
	if (display === 'none') {
		return false;
	}

	var lineitemscleared = '<li><div><div>No Items In Cart</div></div></li>';
	var lineitemtemplate = '<li><div class="cartitem"><div>{0}</div><label runat="server">{1}</label></div></li>';
	var lineitems = '';

	var $offerlist = $('ul[id$=OfferList]').hide();

	var TotalAmt = 0;
	var TotalQty = 0;

	ResetSpecialOffersCache(SENDER, NOT_ASYNCHRONOUS);

	var $table = $('table[id*=OrderProcessTable] tr.OrderProcessRowGreen');

	$table.each(function (i, item) {
		var desc, amt, qty, tmpamt, tmpdesc, $this, selectamt, soid;
		$this = $(this);

		qty = 0;

		desc = $this
			.find('td.OPRmiddle1').
			find('span:first')
			.text();

		amt = $this
			.find('td.OPRlast')
			.find('span:last')
			.text();

		selectamt = $this
			.find('td.OPRmiddle2')
			.find('select')
			.val();

		soid = $this
			.find('td.OPRmiddle1')
			.find('input:first')
			.val();

		if (!$.isBlank(selectamt)) {
			tmpamt = (parseFloat(amt.replace("$", "").replace(",", ""))) * selectamt;
			amt = "$" + tmpamt.toFixed(2);
			TotalAmt = TotalAmt + tmpamt;
			desc = desc + " (Qty: " + selectamt + ")";
			qty = selectamt;
			TotalQty = TotalQty + parseFloat(qty);
		}
		else {
			TotalAmt = TotalAmt + parseFloat(amt.replace("$", "").replace(",", ""));
			desc = desc + " (Qty: 1)";
			qty = 1;
			TotalQty = TotalQty + parseFloat(qty);
		}

		lineitems += lineitemtemplate.format([desc, amt]);

		AddToSpecialOfferCache(soid, qty, amt.replace("$", "").replace(",", "") / qty, SENDER, NOT_ASYNCHRONOUS);
	});

	//	if (TotalQty == 0) {
	//		$('ul[id*=OfferList]').append("<li><div><div>No Items In Cart</div></div></li>");
	//		$('.OrderProcessSubmit')
	//			.addClass('disableClass')
	//			.removeClass('actionbutton-link');
	//	}
	//	else {
	//		$(".OrderProcessSubmit")
	//			.removeClass("disableClass")
	//			.addClass("actionbutton-link");
	//	}

	if (TotalQty === 0) {
		$offerlist
			.empty()
			.append(lineitemscleared);
	}
	else {
		$offerlist
			.empty()
			.append(lineitems)
			.show();
	}

	ActivateScheduleYourServiceButton();

	//ResetCartAmount(SENDER, false);

	$("label[id$=OfferTotal]").html("$" + TotalAmt.toFixed(2));
	$("label[id$=OfferTotalQty]").html(TotalQty.toString());

	// $offerlist.show();

	$(window).trigger("scroll");
}

function FancyBoxSubmitForm(e) {
	prnt = $("#" + e).closest('div.customerform');

	SetAllRequiredIconColor(prnt, ICONCOLORBLUE);

	var placeholdertext = prnt.find("input[id*=zipnumber]").prev().text();
	var fieldtext = prnt.find("input[id*=zipnumber]").val();
	prnt.find("input[id*=zipnumber]").removeClass("field-validation-error-border field-validation-error-highlight field-validation-error-red-font field-validation-error").next('.validation-icon-img').remove();

	var zipchk;
	var zipnum = "";
	var city = "";

	if (fieldtext !== undefined && fieldtext !== "") {
		zipnum = fieldtext;
	}
	else if (placeholdertext !== "Zip") {
		zipnum = placeholdertext;
	}
	else {
		prnt.find("input[id*=zipnumber]").removeClass("disableClass");
		if (prnt.closest('div.groupcontainer').attr("id") === "CompleteOrder") {
			var b = prnt.find("input[id*=zipnumber]").validateInput({ 'showOKImg': true, 'method': 'required', 'validationName': 'Zip Code', 'width': 25, 'offSetTop': -33, 'offSet': -4 });
			if (!(b)) { SetRequiredIconColor(prnt.find("input[id*=zipnumber]").parent().prev().find(".icon-map-marker"), ICONCOLORORANGE); }
			else { prnt.find("input[id*=zipnumber]").removeClass("field-validation-error-red-font"); }
		}
		else {
			SetRequiredIconColor(prnt.find("input[id*=zipnumber]").parent().prev().find(".icon-map-marker"), ICONCOLORORANGE);
		}
	}

	fieldtext = (prnt.find("input[id*=city]").val() !== "") ? prnt.find("input[id*=city]").val() : prnt.find("select[id*=ddlCities]").children("option").filter(":selected").text();

	if (prnt.find("input[id*=firstname]").val() !== "" &&
		prnt.find("input[id*=lastname]").val() !== "" &&
		prnt.find("input[id*=address1]").val() !== "" &&
		prnt.find("input[id*=state]").val() !== "" &&
		fieldtext !== "" &&
		zipnum !== "" &&
		prnt.find("input[id*=homephone]").val() !== "" &&
		prnt.find("input[id=email]").val() !== "" &&
		prnt.find("input[id=confirmemail]").val() !== "") {
		//Reset error text message
		prnt.find("div[id*=customerrequiredtext]").html("");

		//User local variables to pass into ajax call
		fname = RemoveQuotes(prnt.find("input[id*=firstname]").val());
		lname = RemoveQuotes(prnt.find("input[id*=lastname]").val());
		add1 = RemoveQuotes(prnt.find("input[id*=address1]").val());
		add2 = prnt.find("input[id*=address2]").val();
		city = RemoveQuotes(fieldtext.fulltrim);
		state = prnt.find("input[id*=state]").val();
		zip = zipnum;
		hphone = prnt.find("input[id*=homephone]").val().replace(/[^\d;.]/g, '');
		hext = prnt.find("input[id*=homeextnumber]").val();
		cphone = prnt.find("input[id*=cellphone]").val().replace(/[^\d;.]/g, '');
		cext = prnt.find("input[id*=cellextnumber]").val();
		email = prnt.find("input[id*=email]").val();
		confemail = prnt.find("input[id*=confirmemail]").val();
		comments = RemoveQuotes(prnt.find("textarea[id*=comments]").val());

		var intRegex = /[0-9] -()+]+$/;

		if (email !== confemail) {
			prnt.find("input[id*=confirmemail]").parent().prev().find(".icon-envelope").css("color", "#D14E00");
			prnt.find("input[id*=confirmemail]").focus();
			prnt.find("div[id*=customerrequiredtext]").html("Email confirmation incorrect.  Please try again...");
			CancelWait();
		}
		else if (hphone.length !== PHONENUMBERLENGTH10) {
			prnt.find("input[id*=homephone]").parent().prev().find(".icon-phone").css("color", "#D14E00");
			prnt.find("input[id*=homephone]").focus();
			prnt.find("div[id*=customerrequiredtext]").html("Home phone number must be " + PHONENUMBERLENGTH10 + " digits.  Please try again...");
			CancelWait();
		}
		else if (cphone.length !== PHONENUMBERLENGTH10 && cphone !== "") {
			prnt.find("input[id*=cellphone]").parent().prev().find(".icon-phone").css("color", "#D14E00");
			prnt.find("input[id*=cellphone]").focus();
			prnt.find("div[id*=customerrequiredtext]").html("Cell phone number must be " + PHONENUMBERLENGTH10 + " digits.  Please try again...");
			CancelWait();
		}
		else {
			var d = new Date();
			var month = d.getMonth() + 1;
			var day = d.getDate();
			var fromCustOrderscreen = false;

			var dt = (month < 10 ? '0' : '') + month + '/' +
							(day < 10 ? '0' : '') + day + '/' + d.getFullYear();

			if ($('.apptdate input[type=hidden]').val() !== undefined && $('.apptdate input[type=hidden]').val() !== "") {
				dt = $('.apptdate input[type=hidden]').val();
				fromCustOrderscreen = true;
			}

			var urlMethod = '/Services/AjaxHelper.asmx/SaveCustomerInfo';
			var jsonData = $.validator.format("{fname:'{0}', lname:'{1}', add1:'{2}', add2:'{3}', city:'{4}', state:'{5}', zip:'{6}', hphone:'{7}', hext:'{8}', cphone:'{9}', cext:'{10}', email:'{11}', confemail:'{12}', comments:'{13}', dt: '{14}', fromCustOrderscreen: '{15}' }",
													fname, lname, add1, add2, city, state, zip, hphone, hext, cphone, cext, email, confemail, comments, dt, fromCustOrderscreen);
			SendAjax(urlMethod, jsonData, SaveCustomerInfoCallback);
		}
	}
	else {
		SetIconsRed(prnt);
		prnt.find("div[id*=customerrequiredtext]").html("The required fields are not all populated.  Please complete the form and resubmit.");
		CancelWait();
	}
}

function SetAllRequiredIconColor(prnt, color) {
	SetRequiredIconColor(prnt.find("input[id*=firstname]").parent().prev().find(".icon-user"), color);
	SetRequiredIconColor(prnt.find("input[id*=lastname]").parent().prev().find(".icon-user"), color);
	SetRequiredIconColor(prnt.find("input[id*=address1]").parent().prev().find(".icon-home"), color);
	SetRequiredIconColor(prnt.find("input[id*=city]").parent().prev().find(".icon-map-marker"), color);
	SetRequiredIconColor(prnt.find("input[id*=state]").parent().prev().find(".icon-map-marker"), color);
	SetRequiredIconColor(prnt.find("input[id*=zip]").parent().prev().find(".icon-map-marker"), color);
	SetRequiredIconColor(prnt.find("input[id*=homephone]").parent().prev().find(".icon-phone"), color);
	SetRequiredIconColor(prnt.find("input[id=email]").parent().prev().find(".icon-envelope"), color);
	SetRequiredIconColor(prnt.find("input[id=confirmemail]").parent().prev().find(".icon-envelope"), color);

	return false;
}

function SetRequiredIconColor(prnt, color) {
	prnt.css("color", color);
}

function SetIconsRed(prnt) {
	var b = true;

	if (prnt.closest('div.groupcontainer').attr("id") === "CompleteOrder") {
		b = prnt.find("input[id*=firstname]").validateInput({ 'showOKImg': true, 'method': 'required', 'validationName': 'First Name', 'offSetTop': -33, 'width': 25, 'offSet': -4 });
		if (!(b)) { SetRequiredIconColor(prnt.find("input[id*=firstname]").parent().prev().find(".icon-user"), ICONCOLORORANGE); }

		b = prnt.find("input[id*=lastname]").validateInput({ 'showOKImg': true, 'method': 'required', 'validationName': 'Last Name', 'offSetTop': -33, 'width': 25, 'offSet': -4 });
		if (!(b)) { SetRequiredIconColor(prnt.find("input[id*=lastname]").parent().prev().find(".icon-user"), ICONCOLORORANGE); }

		b = prnt.find("input[id*=address1]").validateInput({ 'showOKImg': true, 'method': 'required', 'validationName': 'Address Line 1', 'width': 25, 'offSetTop': -33, 'offSet': -4 });
		if (!(b)) { SetRequiredIconColor(prnt.find("input[id*=address1]").parent().prev().find(".icon-home"), ICONCOLORORANGE); }

		//b = prnt.find("input[id*=city]").validateInput({ 'showOKImg': true, 'method': 'required', 'validationName': 'City', 'offSetTop': -33, 'width': 30 });
		//if (!(b)) { SetRequiredIconColor(prnt.find("input[id*=city]").parent().prev().find(".icon-map-marker"), ICONCOLORORANGE); }

		//b = prnt.find("input[id*=state]").validateInput({ 'showOKImg': true, 'method': 'required', 'validationName': 'State', 'offSetTop': -3, 'width': 30, 'offSet': -81 });
		//if (!(b)) { SetRequiredIconColor(prnt.find("input[id*=state]").parent().prev().find(".icon-map-marker"), ICONCOLORORANGE); }

		var newValue = prnt.find("input[id*=homephone]").val();
		b = prnt.find("input[id*=homeextnumber]").validateInput({ 'showOKImg': true, 'method': 'required', 'validationName': 'Home Phone', 'offSetTop': -33, 'width': 25, 'overrideValue': newValue, 'offSet': -4 });
		if (!(b)) {
			SetRequiredIconColor(prnt.find("input[id*=homephone]").parent().prev().find(".icon-phone"), ICONCOLORORANGE);
			prnt.find("input[id*=homeextnumber]").removeClass("field-validation-error-red-font");
			prnt.find("input[id*=homephone]").addClass("field-validation-error-red-font");
		} else { prnt.find("input[id*=homephone]").removeClass("field-validation-error-red-font"); }

		b = prnt.find("input[id=email]").validateInput({ 'showOKImg': true, 'method': 'required', 'validationName': 'Email', 'offSetTop': -33, 'width': 25, 'offSet': -4 });
		if (!(b)) { SetRequiredIconColor(prnt.find("input[id=email]").parent().prev().find(".icon-envelope"), ICONCOLORORANGE); }

		b = prnt.find("input[id*=confirmemail]").validateInput({ 'showOKImg': true, 'method': 'required', 'validationName': 'Confirm Email', 'offSetTop': -33, 'width': 25, 'offSet': -4 });
		if (!(b)) { SetRequiredIconColor(prnt.find("input[id*=confirmemail]").parent().prev().find(".icon-envelope"), ICONCOLORORANGE); }
	}
	else {
		if (prnt.find("input[id*=firstname]").val() === "") { SetRequiredIconColor(prnt.find("input[id*=firstname]").parent().prev().find(".icon-user"), ICONCOLORORANGE); }
		if (prnt.find("input[id*=lastname]").val() === "") { SetRequiredIconColor(prnt.find("input[id*=lastname]").parent().prev().find(".icon-user"), ICONCOLORORANGE); }
		if (prnt.find("input[id*=address1]").val() === "") { SetRequiredIconColor(prnt.find("input[id*=address1]").parent().prev().find(".icon-home"), ICONCOLORORANGE); }
		if (prnt.find("input[id*=city]").val() === "") { SetRequiredIconColor(prnt.find("input[id*=city]").parent().prev().find(".icon-map-marker"), ICONCOLORORANGE); }
		if (prnt.find("input[id*=state]").val() === "") { SetRequiredIconColor(prnt.find("input[id*=state]").parent().prev().find(".icon-map-marker"), ICONCOLORORANGE); }
		if (prnt.find("input[id*=homephone]").val() === "") { SetRequiredIconColor(prnt.find("input[id*=homephone]").parent().prev().find(".icon-phone"), ICONCOLORORANGE); }
		if (prnt.find("input[id=email]").val() === "") { SetRequiredIconColor(prnt.find("input[id=email]").parent().prev().find(".icon-envelope"), ICONCOLORORANGE); }
		if (prnt.find("input[id=confirmemail]").val() === "") { SetRequiredIconColor(prnt.find("input[id=confirmemail]").parent().prev().find(".icon-envelope"), ICONCOLORORANGE); }
	}

	return true;
}

//function ResetZipCodeCallback(data) {
//}