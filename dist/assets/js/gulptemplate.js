/**
* global.js
* contains all global methods
* File Created: December 1, 2012
*/
var EMPTYGUID, MOREOFFERS, STORAGE_KEY, LOCALPAGE, LEFTNAV, GOBUTTON, ZIPCODENOTSERVICED, ZIPCODEVALID, MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO, IS_ASYNCHRONOUS, NOT_ASYNCHRONOUS, NOT_APPLICABLE;
var offerreturncount, selectedzipcode, offerlist, _fullpath;

EMPTYGUID = '00000000-0000-0000-0000-000000000000';
MOREOFFERS = '/MoreOffers.aspx';
STORAGE_KEY = 'SpecialOfferFromLocalPage';
LOCALPAGE = 'LOCALPAGE';
LEFTNAV = 'LEFTNAV';
GOBUTTON = 'GOBUTTON';
ZIPCODENOTSERVICED = false;
ZIPCODEVALID = true;
MEDIA_TYPE_IMAGE = 'IMAGE';
MEDIA_TYPE_VIDEO = 'VIDEO';
IS_ASYNCHRONOUS = true;
NOT_ASYNCHRONOUS = false;
NOT_APPLICABLE = 'N/A';

offerreturncount = 0;
selectedzipcode = '';
offerlist = '';
_fullpath = '';

function PleaseWait(e, currentstyle) {
	//styles
	//crosshair     plus sign
	//help          pointer and question mark
	//move          plus sign with arrow tips
	//pointer
	//wait          round circle hourglass
	//progress      pointer and hourglass
	//default       hand with index finger pointing

	document.body.style.cursor = "wait";

	var newstyle = (currentstyle === '' || currentstyle === undefined) ? 'block' : 'none';
	document.getElementById("mainOverlay").style.display = newstyle;
	$(".current div").css("opacity", ".70").css("filter", "alpha(opacity=50)");
	$(".previous div").css("opacity", ".70").css("filter", "alpha(opacity=50)");
	$("ul li[id*=liContent]").css("opacity", ".50");

	return true;
}

function CancelWait(e) {
	//styles
	//crosshair     plus sign
	//help          pointer and question mark
	//move          plus sign with arrow tips
	//pointer
	//wait          round circle hourglass
	//progress      pointer and hourglass
	//default       hand with index finger pointing

	if (document.body.style.cursor == "wait") {
		document.body.style.cursor = "default";
		document.getElementById("mainOverlay").style.display = "none";
		$(".current div").css("opacity", "1").css("filter", "alpha(opacity=100)");
		$(".previous div").css("opacity", "").css("filter", "");
		$("ul li[id*=liContent]").css("opacity", "1");
	}

	return true;
}

function FullTrim(inText) {
	return $.trim(inText);
}

function RemoveQuotes(inText) {
	var outText = '';
	if (!$.isBlank(inText)) {
		outText = inText.replace(/(\'|\")/g, '');
	}

	//	if (inText !== undefined) { outText = inText.replace(/(\'|\")/g, ''); }
	return outText;
}

type = function (obj) {
	var myClass, name, _i, _len, _ref, classToType;
	if (obj === void 0 || obj === null) {
		return String(obj);
	}
	classToType = {};
	_ref = "Boolean Number String Function Array Date RegExp".split(" ");
	for (_i = 0, _len = _ref.length; _i < _len; _i++) {
		name = _ref[_i];
		classToType["[object " + name + "]"] = name.toLowerCase();
	}
	myClass = Object.prototype.toString.call(obj);
	if (myClass in classToType) {
		return classToType[myClass];
	}
	return "object";
};

$(document).ready(function (ready) {
	//Carpet, Upholstery, Air Duct & Indoor Air Quality links
	$(".CCLink").click(function (e) { PleaseWait(); window.location.href = "/CarpetCleaning.aspx"; });
	$(".UCLink").click(function (e) { PleaseWait(); window.location.href = "/UpholsteryCleaning.aspx"; });
	$(".ADCLink").click(function (e) { PleaseWait(); window.location.href = "/AirDuctCleaning.aspx"; });
	$(".IAQLink").click(function (e) { PleaseWait(); window.location.href = "/IndoorAirQuality.aspx"; });
	$(".DVCLink").click(function (e) { PleaseWait(); window.location.href = "/DryerVentCleaning.aspx"; });
	$(".TGCLink").click(function (e) { PleaseWait(); window.location.href = "/TileGroutCleaning.aspx"; });
	$(".WRLink").click(function (e) { PleaseWait(); window.location.href = "/WaterRemoval.aspx"; });
	$(".WFCLink").click(function (e) { PleaseWait(); window.location.href = "/WoodFloorCleaning.aspx"; });
	$(".BANLink").click(function (e) { PleaseWait(); windows.location.href = "/BlogAndNews.aspx"; });
	//$(".OACFLink").click(function (e) { window.open("http://www.ownasearsfranchise.com"); });

	//Facebook and YouTube
	//    $(".Social-facebook-icon").click(function (e) { window.open("http://www.facebook.com/searsservices"); });
	//    $(".Social-youtube-icon").click(function (e) { window.open("http://www.youtube.com/searsservices"); });

	var BlogType;
	$(".ArticleLink").click(function (e) {
		//if (($(this).hasClass("mygdgdolink")) || ($(this).hasClass("gagdslink")) || ($(this).hasClass("caoablink")) || ($(this).hasClass("sfeelink")) ||
		//    ($(this).hasClass("wilink")) || ($(this).hasClass("toulink")) || ($(this).hasClass("flink")))
		if (($(this).hasClass("quickHolidayLink")) || ($(this).hasClass("interimAndDeepDiffLink")) || ($(this).hasClass("cleanerLongerGuarLink")) || ($(this).hasClass("DingyTileAndGroutLink")) ||
		($(this).hasClass("airDuctSurpriseLink")) || ($(this).hasClass("approvalProgramLink")) || ($(this).hasClass("springCleaningTipsLink")) || ($(this).hasClass("SatisfactionGuaranteeLink")) ||
		($(this).hasClass("wilink")) || ($(this).hasClass("toulink")) || ($(this).hasClass("flink")) || ($(this).hasClass("pplink"))) {
			BlogType = $(this);

			$("div[id*=BlogBlock]").trigger('click');
		}
		else if ($(this).hasClass("visitBlogLink")) { window.location.href = "http://searsclean.com/BlogsAndNews.aspx"; }
		//        else if ($(this).hasClass("pplink")) {
		//            GoToPrivacyPolicy();
		//        }
		//        else if ($(this).hasClass("cprlink")) {
		//            GoToPrivacyRightsEmail();
		//        }
		//        else if ($(this).hasClass("lilink")) {
		//            GoToSearsLicenseDownload();
		//        }
		else if ($(this).hasClass("sslink")) {
			window.open("http://SearsSurveys.com");
		}
		//        else if (!($(this).hasClass("localpage"))) {
		//            window.alert("You clicked the link.");
		//        }
	});

	// get blogs and output to html
	//    $.get(
	//       "blogs.xml",
	//       function (xml) {
	//           $(xml).find("BLOG").each(function () {
	//               var site = $(this).find("SITE").text();
	//               if (site === "clean") {
	//                   var text = $(this).find("HTMLDATA").text();
	//                   $("#BlogCollection").append(text);
	//               }
	//           });
	//       },
	//       "xml"
	//    );

	$(".ArticleLinkNew").on('click', function (e) {
		var id = $(this).data('blogid');
		$("#" + id).trigger('click');
	});

	$(".blog-div").fancybox({
		maxWidth: 800,
		maxHeight: 600,
		fitToView: false,
		width: '70%',
		height: '70%',
		autoSize: false,
		closeClick: false,
		openEffect: 'none',
		closeEffect: 'none'
	});

	$("#BlogBlock").fancybox({
		'width': 820,
		'height': 600,
		'autoSize': false,
		//        'callBackOnShow': function(e) {
		//            var ht = $(this).attr("content").height();
		//            $(this).attr("content").parent().height((ht + 30));
		//        },
		'beforeLoad': function (e) {
			var BlockText = $("div[id*=BlockText]");

			if (BlogType.hasClass("sfeelink")) {
				BlockText.html("This is where the strive for energy blog text goes.");
			}
			if (BlogType.hasClass("wilink")) {
				BlockText.html("<div class='articleheader' style='font-weight:bold; color:#003E7E;font-size:1.1em;'>WARRANTIES & GUARANTEE</div>" +
				"<br /><div><span class='articleheader' style='color:#003E7E;font-weight:bold;'>GARAGE DOOR WARRANTY</span></br></br>Sears offers some of the strongest warranty packages in the industry.  Up to a lifetime on the door sections on all the " +
				"Sears Carriage House Collection and Sears' three-layer Traditional Steel Collection garage doors.  Sears warranties on labor and hardware as good as, or better than, other garage door brands.</div>" +
				"<div></br><span class='articleheader' style='color:#003E7E;font-weight:bold;'>GARAGE DOOR REPAIR/SERVICE WARRANTY</span></br></br>Sears offers many different services which require different parts based on the service or repair provided.  Sears will uphold " +
				"warranties on parts and labor as outlined on the original service invoice.  We offer the manufacturer's warranty on all parts.  Warranties on labor are based on the coverage period as outlined on the service invoice.  " +
				"If a customer's merchandise fails to operate for reason related to the original complaint or repair service, Sears will perform any labor related to the original complaint or repair service free of charge.</div>" +
				"<div></br><span class='articleheader' style='color:#003E7E;font-weight:bold;'>GARAGE DOOR OPENERS WARRANTY</span></br></br>Warranties will vary for Craftsman Garage Door Openers depending on the model number.  The diagram below outlines the warranties available for each garage " +
				"door opener and its components.</div></br><div><img src='/images/Warranty/GDO-Web-Warranty.jpg' alt='WarrantyImage'></img></div></br>" +
				"<div><span class='articleheader' style='color:#003E7E;font-weight:bold;'>SATSIFACTION GUARANTEE</span></br></br>You can count on Sears Garage Doors for our  no hassle Satisfaction Guarantee on all of our Entry Door and Garage Door products and services.  " +
				"Our trained, professional technicians will ask you to inspect their work immediately following the service.  We value our customers and appreciate any opportunity to be able to service you and insure you are " +
				"completely satisfied with the service you received.  If you are not completedly satisfied, contact us within 30 days from the date of service and we will make our best attempt to resolve your issues.  Sears must be " +
				"permitted to inspect and remedy your concerns.  Sears guarantee would be null and void if subsequent service has occurred.</div>");
			}
			if (BlogType.hasClass("pplink")) {
				BlockText.html("<div><b>Effective 8/14/2009</b></div>" +
				"<br /><div>This web site is owned and operated by a Sears Holdings Corporation entity (“Sears Holdings”). At Sears Holdings, we want to ensure that you understand what information we gather about you, " +
				"how we use it, and the safeguards we have in place in order to protect it. If you have additional questions or would like further information on this topic, please feel free to write to our Webmaster at " +
				"<a class='linkaslink' target='_blank' onclick='GoToCustomerService()' href='http://webmaster@customerservice.sears.com'>webmaster@customerservice.sears.com</a>. This Privacy Policy applies to information collected through this web site. " +
				"Please note that our subsidiary Lands’ End will continue to maintain its own privacy policy. You may view Lands’ End’s privacy policy by clicking here: <a class='linkaslink' href='http://www.landsend.com/customerservice/services_policies/PS_privacy.html' onclick='GoToLandsEnd()'>http://www.landsend.com/customerservice/services_policies/PS_privacy.html</a>. </div>" +
				"<br />" +
				"<div>Sears Holdings may update this policy from time to time. Please check our policy periodically for changes. Your use of this web site, and any disputes arising from it, is subject to this Privacy Policy as well " +
				"as our Terms of Service and all of its dispute resolution provisions including arbitration, limitation on damages and choice of law.</div>" +
				"<br />" +
				"<div>This Web site is a general audience site and does not knowingly collect personally identifiable information from children under 18 years of age. </div>" +
				"<br /><br />" +
				"<div><b>What Type of Information Do We Collect?</b></div>" +
				"<br />" +
				"<div>We may collect personally identifiable information (“PII” - for example, your full name, email address, mailing address, telephone number, or credit card number) from you when you voluntarily submit the information " +
				"to us when you purchase items from us. We need this information in order to process and fulfill your order and to notify you of your order status, in order to register you as a user of this site or to provide you with services. " +
				"We may also collect PII from you if you choose to subscribe to our email program, or participate in sweepstakes, contests, and surveys, or in connection with content or suggestions you post on this site.</div>" +
				"<br />" +
				"<div>We also collect non-personally identifiable information (“Non-PII” - for example, interests, hobbies, lifestyle choices, groups with whom you are affiliated) from you when you choose to provide or post non-PII information " +
				"on this web site.</div>" +
				"<br />" +
				"<div>Non-PII may also be collected from you by means of Cookies and Pixel Tags. Cookies are small bits of information that this web site places on your computer. We and our 3rd party service providers use cookies and Pixel Tags " +
				"to identify your IP address, browser type, domain name, and specific web pages through which you click. This data is collected automatically and utilized to help us look for trends to improve our web site and your interactive " +
				"experience. The cookies allow us to recognize you when you return to the Web site and to provide you with a customized experience that we feel will be of value to you. The cookies that are configured by this web site do not contain " +
				"any personally identifying information, such as your name, or sensitive information, such as your credit card number. Additional information regarding browser cookies and how to disable them is described below.</div>" +
				"<br />" +
				"<div>We may also collect additional information about you from third parties including demographic information (such as number of household members, age, and gender) and purchase preference information. We use this information " +
				"to customize your experience on our web site and on other Sears Holdings family of business web sites and to provide you with the most relevant products, services and offers.</div>" +
				"<br />" +
				"<div><b>What Information Do We Share and with Whom?</b></div>" +
				"<br />" +
				"<div>We do not rent or sell your information to outside marketers. We may share your information (as described above) with members of the Sears Holdings family of businesses to provide you with products or services that " +
				"you have requested or to provide you with promotional offers that we believe will be of interest to you. The Sears Holdings family of businesses includes all Sears Holdings affiliates, as well as other selected businesses " +
				"with which Sears Holdings or its affiliates have a relationship and which have agreed to adhere to our strict standards for providing quality products and services, responding to your needs, and protecting customer information.</div>" +
				"<br />" +
				"<div>In certain circumstances, we may share your information with service providers that need access to your information to provide operational or other support services. To ensure the confidentiality and security of your " +
				"information, service providers must agree to safeguard your information in strict compliance with this policy.</div>" +
				"<br />" +
				"<div>We also may provide information to regulatory authorities and law enforcement officials in accordance with applicable law or when we otherwise believe in good faith that the law requires it. There may be " +
				"instances when we may access or disclose your information in order to protect or defend the legal rights or property of Sears Holdings and its affiliated companies or their employees and agents, to protect the safety " +
				"and security of users and members, and to protect against fraud.</div>" +
				"<br />" +
				"<div>Sears Holdings may sell, transfer or otherwise share some or all of its assets in connection with a merger, reorganization or sale of assets, or in the event of bankruptcy. In such an event, personal information may " +
				"be one of the assets transferred.</div>" +
				"<br />" +
				"<div><b>Can I Disable Cookies?</b></div>" +
				"<br />" +
				"<div>Most web browsers allow you to exercise control over cookie files on your computer by erasing them, blocking them, or notifying you when such a file is stored. Please take a look at your particular browser for " +
				"instructions on this function. If you do elect to disable cookies, please note that you may not be able to take full advantage of a personalized experience on this Web site and on other Sears Holdings family of business web sites.</div>" +
				"<br />" +
				"<div><b>How Do We Handle Personally Identifiable Information Collected on Children?</b></div>" +
				"<br />" +
				"<div>Please click here to read our Children’s Online Privacy Policy for information on our general policy regarding the collection of personally identifiable information on children under 13 years of age. " +
				"This privacy policy addresses our general policy regarding the following:" +
				"<ul><li>Collection of children's personal information</li>" +
				"<li>Use of children's personal information</li>" +
				"<li>The method of obtaining parental consent</li>" +
				"<li>The method of obtaining access to the child's information</li></ul>" +
				"Each Sears Holding’s family of sites that may be directed to children under 13 will contain a specific version of our Children’s Online Privacy Policy that will address specifically each of the points listed above for that site.</div>" +
				"<br />" +
				"<div><b>What About Links to Other Web sites?</b></div>" +
				"<div>This web site may contain links to other web sites outside the Sears Holdings family of web sites. Sears Holdings is not responsible for the privacy practices of other non-affiliated web sites. You should read " +
				"the privacy statements of each and every web site that collects personally identifiable information.</div>" +
				"<br />" +
				"<div><b>What About Online Advertisements?</b></div>" +
				"<br />" +
				"<div>We partner with third-party service providers known as Ad Networks to serve ads on our behalf across the Internet. Using Cookies and Pixel Tags (also known as Web Beacons), Ad Networks collect anonymous " +
				"information about your visits to our web site and other web sites in order to deliver advertisements that may be of particular interest to you. This process does not involve the collection of any personally identifiable " +
				"information (PII). The Ad Networks do not know your name, phone number, address, email address or any personally identifying information. If you do not wish to receive relevant ads based on this technology, you can opt-out " +
				"by visiting the Network Advertising Initiative’s (NAI) opt-out page <a onclick='GoToNetworkAdvertising()' class='linkaslink' href='http://www.networkadvertising.org/choices/#completed'>here</a>.</div>" +
				"<br />" +
				"<div>This web site may also carry advertisements from other companies. Sears Holdings and its affiliates are not responsible for the privacy practices of these other companies. Once you click on an advertisement, " +
				"you should check the applicable privacy policy of the third party or advertiser site to determine, among other things, how they will handle any PII they collect from you. These third party advertisements may also contain " +
				"cookies or web beacons. We do not control these third party cookies or web beacons and you should check the applicable privacy policy of the third party or advertiser site to see whether and how it uses cookies or web beacons.</div>" +
				"<br />" +
				"<div>We do not share any personally identifiable information about you with the advertising networks. To find out more about how the networks manage the privacy of information in conjunction with delivering ads online, " +
				"please go to: <a class='linkaslink' href='http://www.doubleclick.com/us/corporate/privacy/' onclick='GoToCorporatePrivacy()'>http://www.doubleclick.com/us/corporate/privacy/</a> or <a class='linkaslink' href='http://www.atlassolutions.com/privacy2.aspx#atlas_website' onclick='GoToSolutionsPrivacy()'>http://www.atlassolutions.com/privacy2.aspx#atlas_website<a>" +
				" In addition, the Network Advertising Initiative offers useful information about Internet advertising " +
				"companies; also known as ad networks, including information about how to opt-out of their information collections. See <a class='linkaslink' href='http://www.networkadvertising.org/participating/' onclick='GoToParticipating()'>http://www.networkadvertising.org/participating/</a> for the list of NAI members " +
				"and <a class='linkaslink' href='http://www.networkadvertising.org/managing/opt_out.asp' onclick='GoToManaging()'>http://www.networkadvertising.org/managing/opt_out.asp</a> for the opt-out page.</div>" +
				"<br />" +
				"<div><b>Is My Information Secure?</b></div>" +
				"<div>We maintain reasonable and appropriate physical, electronic and procedural safeguards to protect your information. Your information is located on a secured server behind a firewall. When you enter PII, we " +
				"encrypt that information using secure socket layer technology (“SSL”). While we do work very hard to protect your privacy, no method of security is 100% effective and we cannot be responsible for the actions of those who " +
				"may gain unauthorized access to your personal information. Sears Holdings makes no warranties, express, implied or otherwise as to the ultimate effectiveness of these reasonable and appropriate safeguards.</div>" +
				"<br />" +
				"<div><b>How Can I Access My Information?</b></div>" +
				"<br />" +
				"<div>You can personalize your experience on the Sears Holdings family of web sites by becoming a registered Member. By registering, you will be able to tell us what products and services interest you, and whether " +
				"you wish to receive e-mail about special sales, promotions and other events. Once registered, you can review and maintain your account information at anytime by clicking on the 'My Profile' link at the top of each web site page. " +
				"Your account information is secure and is accessible by using a password that you select. To become registered user, or to modify your current preferences, click here.</div>" +
				"<br />" +
				"<div><b>Can I “Opt-Out” of Receiving Promotional E-mails?</b></div>" +
				"<br />" +
				"<div>From time to time, we may send you e-mails with promotional offers if you opt-in to receiving such emails. If you would no longer like to receive e-mailed special event information, sales notifications or other " +
				"promotional messages from this web site, you can unsubscribe from this site’s e-mail marketing list by following the unsubscribe link located at the bottom of each promotional e-mail. Your e-mail address will be removed " +
				"from this site’s email marketing list within 10 days.</div>" +
				"<br />" +
				"<div><b>Will I Receive Notice of Changes to the Privacy Policy?</b></div>" +
				"<br />" +
				"<div>As mentioned above, from time to time we may modify this Privacy Policy to reflect industry initiatives or changes in the law, changes in our collection or use practices, or changes in our web site’s features or " +
				"technology, and such modifications shall be effective upon posting on this web site. Your continued use of this web site after we post a revised Privacy Policy signifies your acceptance of the revised Privacy Policy. It is " +
				"therefore important that you review this Privacy Policy regularly to ensure you are updated as to any changes.</div>");
			}
			//            if (BlogType.hasClass("lilink")) {
			//                BlockText.html("<div><span class='articleheader'>LICENSE INFORMATION</span></div><br />" +
			//                "<div>License information is currently available for viewing on <a onclick='GoToSearsCom()' href='http://www.sears.com'>sears.com</a>.<br /><br />" +
			//                "<a onclick='GoToSearsLicenseDownload()' href='http://www.sears.com/shc/s/nb_10153_12605_NB_License%20Information'>To view the licensing information, click here.</a><br /><br />" +
			//                "Thank you, and enjoy searsgaragedoors.com</div>");
			//                var abc = "def";
			//            }
			//            if (BlogType.hasClass("cprlink")) {
			//                BlockText.html("<div><span class='articleheader'>YOUR CALIFORNIA PRIVACY RIGHTS</span><div><br />" +
			//                "<div>If you are a California resident and Sears customer you have the right to request information from Sears regarding the manner in which Sears shares certain categories of your personal information with third parties, " +
			//                "for the third parties' direct marketing purposes.  California law provides that you have the right to submit a request to Sears at its designated address and receive the following information:<ul>" +
			//                "<li>The categories of information Sears disclosed to third parties for the third parties' direct marketing purposes during the preceding calendar year</li>" +
			//                "<li>The names and addresses of third parties that received such information</li>" +
			//                "<li>If the nature of a third party's business cannot be reasonably determined from the third party's name, examples of the products or services marketed</li></ul>" +
			//                "You are entitled to receive a copy of this information in a standardized format and the information will not be specific to you individually.  Sears' designated email address for such requests is " +
			//                "<a onclick='GoToPrivacyRightsEmail()' href='https://www.sears.com/sr/framework/home.jsp?BV_SessionID=@@@@0386388634.1169815875@@@@&BV_EngineID=ccecaddjmigefglcefecemldffidfmg.0&targetPage=%2fmisc%2fsears%2fwebform%2fca_webfdbk.jsp&vertical=SEARS'>" +
			//                "CAPrivacyRights@Custgomerservice.sears.com</a></div>");
			//                var abc = "def";
			//            }
			if (BlogType.hasClass("toulink")) {
				BlockText.html("<div class='articleheader' style='font-weight:bold; color:black;'>Terms of Use</div>" +
				"<br /><div><span class='articleheader'>TERMS AND CONDITIONS</span></div><br />" +
				"<div>The use of the searsclean.com website(this 'Website') and the sale of products and serviced offered on this Website are governed by the terms and conditions set forth below and all other disclaimers, " +
				"guidelines, policies and terms and conditions of sale appearing on this Website.  Your use of this Website in any manner, whether browsing, activating an account with us or making a purchase, constitutes your " +
				"acknowledgement that you have read the Terms and Conditions and that you agree to follow and be bound by them.  Sears reserves the right to modify or change the Terms and Conditions at any time without prior notice to you. " +
				"Therefore, we recommend that you please read them carefully each time you use this Website.<br /><br />Please note that the guidelines, policies and other terms and conditions of use and sale at the retail stores of " +
				"Sears, Roebuck and Co. ('Sears') and other Sears-affiliated or co-branded websites may vary.</div><br />" +
				"<div><span class='articleheader'>Usage Restrictions</span><div><br />" +
				"<div>You may access and view the Content (as defined below) appearing onthe Website for personal, non-commercial use only.  You may download and/or copy certain portions of the Content for personal, non-commercial use " +
				"only, provided that you (a) retain all copyright, trademark or other proprietary notices contained on the  Content, (b) do not modify or alter the Content in any way and (c) do not make the Content available to any third " +
				"party.  Sears reserves complete title and full intellectual property rights in any Content that you download from this Website.<br /><br />You agree to use this Website only for lawful purposes.  The following activities " +
				"are strictly prohibited: (i) misrepresenting the identity of a user; (ii) tampering with this Website; and (iii) conducting fraudulent activities.</div><br /><br />" +
				"<div><span class='articleheader'>Privacy Policy</span></div><br />" +
				"<div>Sears use of personal information that you may submit to Sears through this Website is governed by the Sears Customer Information Privacy Policy.  Please see " +
				"<a onclick='GoToPrivacyPolicy()' href='https://www.sears.com/csprivacy/nb-100000000022508'>Privacy Policy</a></div>");
			}
			if (BlogType.hasClass("flink")) {
				BlockText.html("<b><div style='text-align:center;'><span class='articleheader text-center'>12 MONTHS, NO INTEREST</span></div>" +
				"<div style='text-align:center;'>On most Sears Carpet & Air Duct Cleaning Solutions products and services over $150 with your Sears card</div></b><br />" +
				"<div>No interest for 12 months when you are using a qualifying Sears card and if paid in full within 12 months and account is kept in good standing. Valid for most Sears Carpet & Air Duct Cleaning products and services over $150." +
				"Offer not valid in all market areas. Offer expires 12/31/2013.<br /><br />" +
				"<b><u>IMPORTANT SPECIAL FINANCING/DEFERRED INTEREST DETAILS (when offered):</u><br/>Interest will be charged to your account from the purchase date if the purchase balance is not paid in full within the promotional period or if you make a late payment.  Minimum payments required.</b><br><br>" +
				"With credit approval, for qualifying purchases made on a Sears card (Sears Commercial One® accounts excluded)  Sears Home Improvement Account(sm) valid on installed sales only.  Offer is only valid for consumer accounts " +
				"in good standing; is subject to change without notice; see store for details.  May not be combined with any other promotional offer.  <br /><br />" +
				"Sears cards: As of 12/4/2013, APR for purchases: Variable 7.24%-27.24% or non-variable 14.00%-29.99%.  Minimum interest charge: up to $2.  See card agreement for details, including the APRs and fees applicable to you.<br /><br />" +
				"Sears Cards are issued by Citibank, N.A.</div>");
			}
			if (BlogType.hasClass("SatisfactionGuaranteeLink")) {
				BlockText.html("<div style='font-weight:bold; color:black;'>Satisfaction Guaranteed</div>" +
				"<p>You can count on Sears for Satisfaction Guaranteed on all of our cleaning services:</p><ul>" +
				"<li><p>Carpet</p></li><li><p>Upholstery</p></li><li><p>Tile & Grout</p></li><li><p>Air Duct</p></li><li><p>Clothes Dryer Vent</p></li><li><p>Hardwood Floor</p></li></ul>" +
				"<p>If you are not completely satisfied, contact us within 30 days from the date of service and we will make our best attempt to resolve " +
				"your issues.  Sears must be permitted to inspect and remedy your concerns.  This guarantee is null and void if subsequent cleaning has occurred.</p>");
			}
		}
	});
});
function GoToEpaGov(e) {
	window.open('http://www.epa.gov');
}
function GoToCustomerService(e) {
	window.location.href = 'mailto:webmaster@customerservice.sears.com';
}
function GoToLandsEnd(e) {
	window.open('http://www.landsend.com/customerservice/services_policies/PS_privacy.html');
}
function GoToNadca(e) {
	window.open('http://www.nadca.com');
}
function GoToCorporatePrivacy(e) {
	window.open('http://www.doubleclick.com/us/corporate/privacy/');
}
function GoToManaging(e) {
	window.open('http://www.networkadvertising.org/managing/opt_out.asp');
}
function GoToParticipating(e) {
	window.open('http://www.networkadvertising.org/participating/');
}
function GoToNetworkAdvertising(e) {
	window.open('http://www.networkadvertising.org/choices/#completed');
}
function GoToAirDuctCleaning(e) {
	window.location = './AirDuctCleaning.aspx';
}
function GoToSolutionsPrivacy(e) {
	window.open('http://www.atlassolutions.com/privacy2.aspx#atlas_website');
}
function GoToCarpetRug(e) {
	window.open('http://www.carpet-rug.org');
}

function GoToSearsGarageDesigner(e) {
	//$(this).prop('target', '_blank');
	//window.location.href = 'http://www.searsgaragedoordesigner.com?iframe';
	window.open('http://www.searsgaragedoordesigner.com?iframe');
}
function GoToSearsGarageDoorDownload(e) {
	//window.location.href = 'http://www.searsgaragedoors.com/downloads/sears-cost-vs-value.pdf';
	window.open('http://www.searsgaragedoors.com/downloads/sears-cost-vs-value.pdf');
}

function GoToSearsGarageWarrantyDownload(e) {
	window.open('http://www.searsgaragedoors.com/downloads/SearsConsolidatedResidentialWarranty.pdf');
}

function GoToAdobeReaderDownload(e) {
	window.open('http://www.adobe.com/products/acrobat/readstep2.html');
}

function GoToSearsCom(e) {
	window.open('http://www.sears.com');
}

function GoToSearsLicenseDownload(e) {
	window.open('http://www.sears.com/shc/s/nb_10153_12605_NB_License%20Information');
}

function GoToPrivacyRightsEmail(e) {
	//window.open('https://www.sears.com/sr/framework/home.jsp?BV_SessionID=@@@@0386388634.1169815875@@@@&BV_EngineID=ccecaddjmigefglcefecemldffidfmg.0&targetPage=%2fmisc%2fsears%2fwebform%2fca_webfdbk.jsp&vertical=SEARS');
	window.open('http://www.searshomeservices.com/shs/info/california-privacy-policy');
}

function GoToPrivacyPolicy(e) {
	//window.open('https://www.sears.com/csprivacy/nb-100000000022508');
	window.open('http://www.searsclean.com/PrivacyPolicy.aspx');
}
//function AddToSpecialOffersCacheCallBack(data, sender) {
//	if (sender !== undefined && sender.toUpperCase() === LOCALPAGESELECT) {
//		if (data.d != true) { window.location.href = "/MoreOffers.aspx"; } // zip code selected: go to more offers

//		$('input[id$=specialOfferszipnumber]').val('');
//	}
//	else {
//		window.location.href = "/Locator.aspx";
//	}
//}

//function AddToSpecialOfferCache(soid, qty, asynctype, sender) {
//	var urlMethod = '/Services/AjaxHelper.asmx/AddToSpecialOffersCache';
//	var jsonData = $.validator.format("{soid:'{0}', qty:'{1}'}", soid, qty);
//	SendAjax(urlMethod, jsonData, AddToSpecialOffersCacheCallBack, NOT_ASYNCHRONOUS, 'AddToSpecialOfferCache');
//}

Locator = (function () {
	function Locator(sender, soid, qty, amt, asynctype) {
		if (sender === null) { sender = LOCALPAGE; }
		if (soid === null) { soid = EMPTYGUID; }
		if (qty === null) { qty = 1; }
		if (amt === null) { amt = 0; }
		if (asynctype === null) { asynctype = true; }
		if (type(sender) === 'object') { return sender; } else {
			this.sender = sender;
			this.soid = soid;
			this.qty = qty;
			this.amt = amt;
			this.asynctype = asynctype;
			this.upsender = sender.toUpperCase();
		}
	}
	Locator.prototype.Set = function (sender, asynctype) {
		this.sender = sender;
		this.upsender = sender.toUpperCase();
		this.asynctype = asynctype;

		return asynctype;
	};
	Locator.prototype.AsyncType = function (asynctype) {
		this.asynctype = asynctype;
		return asynctype;
	};
	Locator.prototype.Equals = function (s) {
		if (s.toUpperCase() === this.upsender) { return true; }
	};
	Locator.save = function (sender, soid, qty, amt) {
		this.sender = sender;
		this.soid = soid;
		this.qty = qty;
		this.amt = amt;
	};
	return Locator;
})();

; (function ($) {
	/**
	* Sample usage:
	* var str = "She {1} {0}{2} by the {0}{3}. {-1}^_^{-2}";
	* str = str.format(["sea", "sells", "shells", "shore"]);
	* alert(str);
	*/
	if (!String.prototype.format) {
		String.prototype.format = function (args) {
			var str = this;
			return str.replace(String.prototype.format.regex, function (item) {
				var intVal = parseInt(item.substring(1, item.length - 1));
				var replace;
				if (intVal >= 0) {
					replace = args[intVal];
				} else if (intVal === -1) {
					replace = "{";
				} else if (intVal === -2) {
					replace = "}";
				} else {
					replace = "";
				}
				return replace;
			});
		};
		String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");
	}

	jQuery.fn.toggleAttr = function (a, b) {
		var c = (b === undefined);
		return this.each(function () {
			if ((c && !$(this).is("[" + a + "]")) || (!c && b)) $(this).attr(a, a);
			else $(this).removeAttr(a);
		});
	};

	jQuery.fn.toggleText = function (value1, value2) {
		return this.each(function () {
			var $this = $(this),
			text = $this.text();

			if (text.indexOf(value1) > -1)
				$this.text(text.replace(value1, value2));
			else
				$this.text(text.replace(value2, value1));
		});
	};

	jQuery.fn.toggleVal = function (value1, value2) {
		return this.each(function () {
			var $this = $(this),
			text = $this.val();

			if (text.indexOf(value1) > -1)
				$this.val(text.replace(value1, value2));
			else
				$this.val(text.replace(value2, value1));
		});
	};

	/**
	* Usage:
	* $.isBlank(" ") //true
	* $.isBlank("") //true
	* $.isBlank("\n") //true
	* $.isBlank("a") //false
	* $.isBlank(null) //true
	* $.isBlank(undefined) //true
	* $.isBlank(false) //true
	* $.isBlank([]) //true
	*/
	jQuery.isBlank_2 = function (obj) {
		if (!obj || $.trim(obj) === "") return true;
		if (obj.length && obj.length > 0) return false;
		for (var prop in obj) if (obj[prop]) return false;
		return true;
	};

	$.isBlank = function (object) {
		return (
			($.isEmptyObject(object)) ||
			($.isPlainObject(object) && $.isEmptyObject(object)) ||
			($.isArray(object) && object.length === 0) ||
			(typeof (object) === "string" && $.trim(object) === "") ||
			(!object)			 
		);
	};

	if (!String.prototype.trim) {
		String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ''); };
	}

	if (!String.prototype.ltrim) {
		String.prototype.ltrim = function () { return this.replace(/^\s+/, ''); };
	}

	if (!String.prototype.rtrim) {
		String.prototype.rtrim = function () { return this.replace(/\s+$/, ''); };
	}

	if (!String.prototype.fulltrim) {
		String.prototype.fulltrim = function () { return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '').replace(/\s+/g, ' '); };
	}
})(jQuery);
﻿//var TotalAmt = 0,
//	TotalQty = 0;
var OFFER_SELECTED = 'offer-selected',
	INPUT_SELECTED = 'offer-selected-input';

var HEADER_TYPE_ADDON = 'ADDON',
	HEADER_TYPE_PROMOCODE = 'PROMOCODE',
	HEADER_TYPE_DISCOUNT = 'DISCOUNT',
	HEADER_TYPE_SERVICE = 'SERVCE';

var DISCOUNTTYPEREFID_PERCENTAGE = '20B762D1-184A-4952-9095-B05D43D91B73',
	DISCOUNTTYPEREFID_DOLLAR = '3176010E-5037-4B6D-BC8A-13059A92BFC2';

var OFFER_SELECTED_CLASS_CONTAINER = 'offer-selected',
	OFFER_SELECTED_CLASS_INPUT = 'offer-input-selected',
	OFFER_SELECTED_TEXT = 'OFFER SELECTED',
	OFFER_RELEASED_TEXT = 'SELECT THIS OFFER',
	MOUSE_OVER = 'mouseover',
	TOGGLE_EVENT = 'offer-selected mouseover',
emptyguid = '00000000-0000-0000-0000-000000000000',
emptystring = '',
	CLICK = 1,
	CHANGE = 2,
	OPTIONS_EVENT = 3;

function GetSelectedOffers(e) {
	return $('.Jofferselect.offer-selected, .Jofferselect .offer-selected');
}

function FormatOfferAmount(price) {
	var amt = 0;
	amt = (parseFloat(price.replace("$", "").replace(',', '')));

	if ((amt === "") || !(/\d/.test(amt))) { amt = '$0.00'; }
	if (/\d/.test(amt) && /[a-zA-Z]/.test(amt)) { amt = amt.substr(amt.indexOf('$')); }
	if (/\d/.test(amt) && /[()]/.test(amt)) { amt = '-' + amt.replace('(', '').replace(')', ''); }

	return amt;
}

function UpdateOffersDisplayOnLoad(e) {
	var $this, amt, qty, soidid, $selecteditems;

	$selecteditems = GetSelectedOffers(); //  $('.offer-selected .Joffer')

	$selecteditems.each(function (e) {
		$this = $(this);

		$this
			.find('input.button-link')
				.toggleClass(OFFER_SELECTED_CLASS_INPUT)
				.toggleVal(OFFER_SELECTED_TEXT, OFFER_RELEASED_TEXT)
				.next()
					.toggle();
	});
}

function ActivateScheduleYourServiceButton(e) {
	var cnt, qtycount;

	cnt = $('.cartitem').length;

	if (cnt === 0) {
		$('.OrderProcessSubmit')
			.addClass('disableClass')
			.removeClass('actionbutton-link');
	}
	else {
		$('.OrderProcessSubmit')
			.removeClass('disableClass')
			.addClass('actionbutton-link');
	}
}

function GetOfferListCaption(sender) {
	var $this, thisservicename;
	$this = sender;

	return $this.closest('.offercontainer').data('servicename');
}

function AddToCartSummaryCache(soid, qty, amt, desc, addontype, iutmtst, strefid, sender, asynctype) { }

function UpdatePromoCodeCart(e) {
	var $PromoCodeOffersUCContainer, thismethod = 'UpdatePromoCodeCart';

	$PromoCodeOffersUCContainer =
			$('.Jofferselect.offer-selected')
			.closest('div[id$=PromoCodeOffersUCContainer]')
			.find('.offer-selected');

	if ($PromoCodeOffersUCContainer.length !== 0) {
		$PromoCodeOffersUCContainer.each(function (i, item) {
			var $this = $(this), soid, qty, isselected;

			isselected = true;
			soid = $this.data('specialofferid');
			qty = $this.find('.qtyvalue').val();
			qty = $.isBlank(qty) ? '1' : qty;

			AddToSpecialOfferCache(soid, qty, eachcost, thismethod, NOT_ASYNCHRONOUS);
			UpdateSpecialOffersPromoCache(soid, qty, isselected, thismethod, NOT_ASYNCHRONOUS);
		});
	}
}

function UpdateCssClasses(sender) {
	var $this;
	$this = sender;
	$this
		.toggleClass(OFFER_SELECTED)
		.toggleClass(MOUSE_OVER)
		.find('input.button-link')
			.toggleClass(OFFER_SELECTED_CLASS_INPUT)
			.toggleVal(OFFER_SELECTED_TEXT, OFFER_RELEASED_TEXT)
			.next()
				.toggle();

	return $this.hasClass(OFFER_SELECTED);
}

/**
* GetFullHeader()
* Created: 2/5/2014
*/
function GetFullHeader($this, id, IsPromoCodeOffer) {
	var $tsn, fullhdr;

	if (IsPromoCodeOffer) {
		switch (id) {
			case 'EE27F73A-EB85-46B4-A2DE-7322B29F52F6':
				$tsn = $('#CarpetOffersHeader h2');
				break;

			case 'B555AD85-B60E-4068-B5D2-69AB997F0254':
				$tsn = $('#DuctOffersHeader h2');
				break;

			case '4D9C1700-BD7A-43E7-92CA-C22BDAA70BAD':
				$tsn = $('#UpholsteryOffersHeader h2');
				break;

			case '8190B5CA-69C1-4BFC-B86C-70383B66BD62':
				$tsn = $('#FloorOffersHeader h2');
				break;

			case '558860A6-846D-49D0-9E77-18983A449FAD':
				$tsn = $('#TileOffersHeader h2');
				break;

			case 'F55C5FA2-79F0-4F47-8AF3-BE5D824F781D':
				$tsn = $('#WaterOffersHeader h2');
				break;

			case '89757DE6-199C-40DE-9F3E-BD6607DED14F':
				$tsn = $('#WindowsOffersHeader h2');
				break;

			default:
				$tsn = $this.closest('.uccontainer').prev('.productcontainer').find('h2');
				break;
		}
	}
	else {
		$tsn = $this.closest('.uccontainer').prev('.productcontainer').find('h2');
	}
	fullhdr = $.trim($tsn.text()).replace('Offers', '');

	return fullhdr;
}

/**
* UpdateShoppingCart()
* Created: 2/5/2014
*/
function UpdateShoppingCart(SubtotalRegularPreCalculated, SubtotalDollarDiscountPreCalculated, sender) {
	var thismethod = 'UpdateCart', $selecteditems, $offerlist, $discountlist, addDiscountHeader = true, lineitemsDiscount = '', lineitemsRegular = '', prevcategory,
	SFTDiscountOfferSectionHdr, SFTRegularOfferSectionHdr, SFTPromoCodeOfferSectionHdr, SFTDiscountQty, SFTLineItemRegular, SFTLineItemDiscount,
	desc, price, qty, $qty, $desc, $price, tmpprice, tmpqty, tmpdesc, subtotalRegular = 0, subqtyRegular = 0, subtotalDiscount = 0, IsOptionHdrNeeded = true, discAfterDollar = 0, $addons, tmpcategory;

	SFTDiscountOfferSectionHdr = '<li><div class="seperator"></div></li><li><div class="cartitemcaption">Carpet Discounts</div></li>';
	SFTPromoCodeOfferSectionHdr = '{0}<br /><span class="CartPromoHeader">Promotional Offer</span>';
	SFTRegularOfferSectionHdr = '<li><div class="seperator"></div></li><li><div class="cartitemcaption">{0}</div></li>';
	SFTDiscountQty = ' (Qty:{0})';
	SFTLineItemRegular = '<li><div class="cartitem"><div>{0}</div><label runat="server">${1}</label></div></li>';
	SFTLineItemDiscount = '<li><div class="cartitem"><div>{0}</div><label runat="server">(${1})</label></div></li>';

	$offerlist = $('ul[id$=OfferList]'),
	$discountlist = $('ul[id$=DiscountList]');
	$selecteditems = GetSelectedOffers();
	$addons = $('table[id$=OptionsOffer]');

	$selecteditems.each(function (i, item) {
		var $this = $(this);
		var fullhdr, tmpHdr, serviceHdr, thiscategory,
		IsPromoCodeOffer = false, IsPromoCodeSelected = false, IsAddonOption = false, IsDiscountOffer = false, IsDiscountPercentOffer = false, IsDiscountDollarOffer = false,
		iutmtstid = emptyguid, specialofferid = emptyguid, servicetyperefid = emptyguid, discounttyperefid = emptyguid, promocoderefid = emptyguid, addontype;
		var priceeach = 0, discountedprice = 0;

		// GET ALL PARTS & PIECES ////////////////////////////////////////////////////////////////////
		iutmtstid = $this.data('iutmtstid').toUpperCase();
		IsAddonOption = ($this.hasClass('option')) ? true : false;
		

		if (IsAddonOption) {
			thiscategory = $this.closest('table').data('category').toUpperCase().replace('-ADDON', '');
		}
		else {
			$qty = $this.find('.qtyvalue');
			$price = $this.find('.price');
			$desc = $this.find('.caption');
			specialofferid = $this.data('specialofferid').toUpperCase();
			servicetyperefid = $this.data('servicetyperefid').toUpperCase();
			discounttyperefid = $this.data('discounttyperefid').toUpperCase();
			promocoderefid = $this.data('promocoderefid').toUpperCase();
			thiscategory = $this.closest('.offercontainer').data('category').toUpperCase();
		}

		IsPromoCodeOffer = (promocoderefid === emptyguid) ? false : true;
		IsPromoCodeSelected = (promocoderefid === emptyguid) ? false : true;
		IsDiscountPercentOffer = (discounttyperefid === DISCOUNTTYPEREFID_PERCENTAGE) ? true : false;
		IsDiscountDollarOffer = (discounttyperefid === DISCOUNTTYPEREFID_DOLLAR) ? true : false;
		IsDiscountOffer = (IsDiscountPercentOffer || IsDiscountDollarOffer) ? true : false;

		// CONSTRUCT SECTION HEADER  ////////////////////////////////////////////////////////////////////
		fullhdr = GetFullHeader($this, servicetyperefid, IsPromoCodeOffer);

		if (IsDiscountOffer && addDiscountHeader) {
			addDiscountHeader = false;
			serviceHdr = SFTDiscountOfferSectionHdr;
			lineitemsDiscount += serviceHdr;
			prevcategory = thiscategory;
		}
		else {
			if (thiscategory !== prevcategory && !IsAddonOption) {
				tmpHdr = (IsPromoCodeOffer) ? SFTPromoCodeOfferSectionHdr.format([fullhdr]) : fullhdr;
				serviceHdr = SFTRegularOfferSectionHdr.format([tmpHdr]);
				lineitemsRegular += serviceHdr;
				prevcategory = thiscategory;
				IsOptionHdrNeeded = false;
			}
			else {
				if (thiscategory !== prevcategory && IsOptionHdrNeeded) {
					serviceHdr = SFTRegularOfferSectionHdr.format([fullhdr]);
					lineitemsRegular += serviceHdr;
					prevcategory = thiscategory;
					IsOptionHdrNeeded = false;
				};
			}
		}

		// GET AMOUNTS, QUANTITIES, etc. ////////////////////////////////////////////////////////////////////
		if (IsAddonOption) {
			tmpdesc = $.trim($this.data('desc'));
			tmpprice = $this.data('amount');
			tmpqty = $this.val();
		}
		else {
			tmpdesc = $.trim($.trim($desc.text()));
			tmpprice = $.trim($price.text().replace('$', ''));
			tmpqty = $qty.val();
		}

		// Fix-up values
		qty = parseInt($.isBlank(tmpqty) ? 1 : tmpqty);
		priceeach = parseFloat(tmpprice);
		price = (priceeach * qty);

		tmpdesc += (IsDiscountOffer) ? '' : SFTDiscountQty.format([qty]);
		desc = (qty === 1) ? tmpdesc.replace('(s)', '') : tmpdesc;

		if (IsDiscountOffer) {
			if (IsDiscountDollarOffer) {
				discountedprice = price;
			}
			else {
				discAfterDollar = SubtotalRegularPreCalculated - SubtotalDollarDiscountPreCalculated;
				discountedprice = (discAfterDollar * (price / 100));
			}

			lineitemsDiscount += SFTLineItemDiscount.format([desc, discountedprice.toFixed(2).toString()]);
			subtotalDiscount += discountedprice;
		}
		else {
			lineitemsRegular += SFTLineItemRegular.format([desc, price.toFixed(2).toString()]);
			subtotalRegular += price;
			subqtyRegular += qty;
		}

		if (IsAddonOption) {
			AddToCreateYourOwnPackageCache_V2(iutmtstid, qty, priceeach, desc, addontype, NOT_APPLICABLE, NOT_ASYNCHRONOUS);
		}
		else {
			AddToSpecialOffersCache_V2(specialofferid, qty, priceeach, thismethod, NOT_ASYNCHRONOUS, IsPromoCodeSelected);
		}
	});

	$offerlist.empty().append(lineitemsRegular);
	$discountlist.empty().append(lineitemsDiscount);
	$('label[id$=OfferTotalQty]').html(subqtyRegular.toString());

	return subtotalDiscount;
}

/**
* CalculateAmountForDollarDiscount()
* Created: 2/17/2014
*/
function CalculateAmountForDollarDiscount(sender) {
	var $selecteditems, subtotal = 0;

	$selecteditems = GetSelectedOffers();

	$selecteditems.each(function (i, item) {
		var $this = $(this), discounttyperefid = emptyguid, IsDiscountDollarOffer, IsAddonOption, iutmtstid, tmpprice, tmpqty;

		iutmtstid = $this.data('iutmtstid').toUpperCase();
		IsAddonOption = ($this.hasClass('option')) ? true : false;


		if (!IsAddonOption) {
			$qty = $this.find('.qtyvalue');
			$price = $this.find('.price');
			discounttyperefid = $this.data('discounttyperefid').toUpperCase();
		}

		IsDiscountDollarOffer = (discounttyperefid === DISCOUNTTYPEREFID_DOLLAR) ? true : false;

		if (IsDiscountDollarOffer) {
			tmpprice = $.trim($price.text().replace('$', ''));
			tmpqty = $qty.val();

			// Fix-up values
			qty = parseInt($.isBlank(tmpqty) ? 1 : tmpqty);
			priceeach = parseFloat(tmpprice);
			price = (priceeach * qty);

			subtotal += price;
		} // IsDiscountDollarOffer
	});

	return subtotal;
}

/**
* CalculateSubTotalCost()
* Created: 2/5/2014
*/
function CalculateSubTotalCost(sender) {
	var $selecteditems, subtotal = 0;

	$selecteditems = GetSelectedOffers();
	$selecteditems.each(function (i, item) {
		var $this = $(this), iutmtstid = emptyguid, discounttyperefid = emptyguid, promocoderefid = emptyguid, priceeach = 0, price, qty, $qty, $price, tmpprice, tmpqty,
		IsDiscountOffer, IsAddonOption, IsPromoCodeOffer;

		// GET ALL PARTS & PIECES ////////////////////////////////////////////////////////////////////
		iutmtstid = $this.data('iutmtstid').toUpperCase();
		IsAddonOption = ($this.hasClass('option')) ? true : false;
		
		if (!IsAddonOption) {
			$qty = $this.find('.qtyvalue');
			$price = $this.find('.price');
			discounttyperefid = $this.data('discounttyperefid').toUpperCase();
		}
		IsDiscountOffer = (discounttyperefid !== emptyguid) ? true : false;

		if (!IsDiscountOffer) {
			// GET AMOUNTS, QUANTITIES, etc. ////////////////////////////////////////////////////////////////////
			if (IsAddonOption) {
				tmpprice = $this.data('amount');
				tmpqty = $this.val();
			}
			else {
				tmpprice = parseFloat($.trim($price.text().replace('$', '')));
				tmpqty = $qty.val();
			}

			// Fix-up values
			qty = $.isBlank(tmpqty) ? 1 : tmpqty;
			priceeach = tmpprice;
			price = (priceeach * qty);
			subtotal += price;
		}
	});
	return subtotal;
}

/**
* UpdateCart()
* Created: 2/5/2014
*/
function UpdateCart(sender) {
	var subtotalRegular = 0, subtotalDiscount = 0, subtotaldollardiscount = 0, grandtotal = 0, $offertotal, $cartcontainer, diff = 0, thismethod = 'UpdateCart';

	$offertotal = $('label[id$=OfferTotal]');
	$cartcontainer = $('ul[id$=OfferList]');

	$cartcontainer.hide();

	ResetSpecialOffersCache_V2(thismethod, NOT_ASYNCHRONOUS);

	subtotalRegular = CalculateSubTotalCost();
	subtotaldollardiscount = CalculateAmountForDollarDiscount();

	subtotalDiscount = UpdateShoppingCart(subtotalRegular, subtotaldollardiscount);
	diff = (subtotalRegular - subtotalDiscount);
	grandtotal = (subtotalRegular - subtotalDiscount);

	ActivateScheduleYourServiceButton();
	ResetCartAmount(thismethod, false);

	if (grandtotal < 0) {
		$offertotal.html('($' + grandtotal.toFixed(2).toString().replace('-', '') + ')');
	}
	else {
		$offertotal.html('$' + grandtotal.toFixed(2));
	}
	$cartcontainer.show();

	$(window).trigger('scroll');
}

function UpdateOnOfferClick(sender, eventtype) {
	var $this, qtycount, qty, IsSelected, HasCurrentQtyCount, HasQtyObject, HasPreviousQtyCount;
	$this = sender;

	// Quantity handler
	$ddlQty = $this.find('.qtyvalue');
	HasQtyObject = ($ddlQty.length > 0);
	qty = $ddlQty.val();
	HasCurrentQtyCount = !$.isBlank(qty);
	HasPreviousQtyCount = !$.isBlank($this.data('qtycount'));

	if (eventtype === CHANGE && HasCurrentQtyCount && HasPreviousQtyCount) {
		$this.attr('data-qtycount', qty);
		//		UpdateCart();
	}

	// Selected handler
	IsSelected = UpdateCssClasses($this);

	if (eventtype === CLICK && !IsSelected) {
		$this.removeAttr('data-qtycount');
		if (HasQtyObject) { $ddlQty[0].selectedIndex = 0; }
	}
	else {
		if (IsSelected) {
			if (HasQtyObject && HasCurrentQtyCount) {
				$this.attr('data-qtycount', qty);
			}
			else {
				if (HasQtyObject) { $ddlQty[0].selectedIndex = 1; }
				qty = 1;  //$ddlQty.val();
				$this.attr('data-qtycount', qty);
			}
		}
		else {
			if (HasCurrentQtyCount) {
				UpdateCssClasses($this);
				qty = (HasCurrentQtyCount) ? qty : 1;
				$this.attr('data-qtycount', qty);
				if (HasQtyObject) {
					//$ddlQty[0].value = qty;
					$ddlQty.val(qty);
				}
			}
			else {
				$this.removeAttr('data-qtycount');
				if (HasQtyObject) { $ddlQty[0].selectedIndex = 0; }
			}
		}
	}
	UpdateCart();
}

/**
* TogglePanels(openidx)
* Param: openidx is the product container to be opened
* Method used to open the product panel in the TogglePannels collection.
* Method Created: October 8, 2013
*/
function TogglePanels(openidx) {
	var $panels;

	$panels = $('#togglepanels .nopromo.productcontainer');

	$panels.each(function (i, item) {
		var panel, $this, cnt;

		if (i !== 0) {
			cnt = $(item)
			.next()
				.find('.offer-selected')
				.length;

			if (cnt !== 0) {
				$(item)
					.toggleClass('expanded')
					.toggleClass('collapsed')
					.find('.instruct')
						.removeClass('hide')
					.end()
					.next()
						.removeClass('hide');
			}
		}
	});

	$('#togglepanels .promo.productcontainer')
		.toggleClass('expanded')
		.toggleClass('collapsed')
		.find('.instruct')
			.removeClass('hide')
		.end()
		.next()
			.removeClass('hide');

	$('#togglepanels .nopromo.productcontainer:first')
		.toggleClass('expanded')
		.toggleClass('collapsed')
		.find('.instruct')
			.removeClass('hide')
		.end()
		.next()
			.removeClass('hide');
}

$(document).ready(function (ready) {
	$('#togglepanels .productcontainer')
		.on('click', function (e) {
			$(this)
				.toggleClass('expanded')
				.toggleClass('collapsed')
				.find('.instruct')
					.toggleClass('hide')
				.end()
				.next()
					.toggleClass('hide');
		})
		.next('uccontainer')
			.addClass('hide');

	$('.Joffers .Jofferselect')
		.on('click',
			function (e) {
				var $this, $parent, thisevent = CLICK;
				$parent = $(this);

				UpdateOnOfferClick($parent, thisevent);
			}
		)
		.hover(
			function (e) {
				var $this = $(this);
				if (!$this.hasClass(OFFER_SELECTED)) { $this.addClass(MOUSE_OVER); }
				return false;
			},
			function (e) {
				$(this).removeClass(MOUSE_OVER);
				return false;
			}
		)
		.find('.qtyvalue')
			.on('click',
				function (e) {
					return false;
				}
			)
			.on('change',
				function (e) {
					var $this, $parent, thisevent = CHANGE;
					$this = $(this);
					$parent = $this.closest('.Jofferselect');

					UpdateOnOfferClick($parent, thisevent);
					return false;
				}
			);

	$('.Joptions')
		.find('.qtyvalue')
			.on('change',
				function (e) {
					var $this, $parent, qtycount, thismethod = OPTIONS_EVENT;
					$this = $(this);

					qtycount = $this.val();

					if ($.isBlank(qtycount)) {
						$this.removeAttr('data-qtycount');
						$this.removeClass(OFFER_SELECTED);
					} else {
						$this.attr('data-qtycount', $this.val());
						$this.addClass(OFFER_SELECTED);
					}

					UpdateCart();
				}
			);

	TogglePanels();

	//	$('div[id$=DisplayOrderContent]')
	//		.next('div')
	//			.toggleClass('hide panel-open');
});
﻿/**
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
﻿var PROBLEMWITHORDERSAVE = "1";
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
﻿/* Ajax Objects */

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