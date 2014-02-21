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