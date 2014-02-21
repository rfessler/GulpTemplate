(function() {
  var AddToSpecialOfferCache, AddToSpecialOffersCacheCallBack, CheckIfZipSelected, CheckIfZipSelectedCallBack, EMPTYGUID, FetchSpecialOffers, FetchSpecialOffersCallback, GOBUTTON, LEFTNAV, LOCALPAGE, MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO, MOREOFFERS, OfferInformation, ResetLocalOffersGroupContainer, ResetLocalOffersGroupContainerCallBack, ResetSpecialOffersCache, ResetSpecialOffersCacheCallBack, STORAGE_KEY, StringifyOfferInfo, ZIPCODENOTSERVICED, ZIPCODEVALID, addChainedAttributeAccessor, offerlist, offerreturncount, root, selectedzipcode, type, validateZipCode, validateZipCodeCallback, zipcodeIsServiced, zipcodeNotServiced,
    __slice = [].slice,
    _this = this;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  EMPTYGUID = '00000000-0000-0000-0000-000000000000';

  MOREOFFERS = '/MoreOffers.aspx';

  STORAGE_KEY = 'SpecialOfferFromLocalPage';

  LOCALPAGE = 'LOCALPAGE';

  LEFTNAV = 'LEFTNAV';

  GOBUTTON = 'GOBUTTON';

  ZIPCODENOTSERVICED = false;

  ZIPCODEVALID = true;

  offerreturncount = 0;

  selectedzipcode = '';

  offerlist = '';

  MEDIA_TYPE_IMAGE = 'IMAGE';

  MEDIA_TYPE_VIDEO = 'VIDEO';

  root.IS_ASYNCHRONOUS = true;

  root.NOT_ASYNCHRONOUS = false;

  root.NOT_APPLICABLE = 'N/A';

  root.fullpath = '';

  type = function(obj) {
    var classToType, myClass, name, _i, _len, _ref;

    if (obj === void 0 || obj === null) {
      return String(obj);
    }
    classToType = new Object;
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

  addChainedAttributeAccessor = function(obj, propertyAttr, attr) {
    return obj[attr] = function() {
      var newValues;

      newValues = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (newValues.length === 0) {
        return obj[propertyAttr][attr];
      } else {
        obj[propertyAttr][attr] = newValues[0];
        return obj;
      }
    };
  };

  OfferInformation = (function() {
    function OfferInformation(sender, soid, qty, asynctype) {
      if (sender == null) {
        sender = LOCALPAGE;
      }
      if (soid == null) {
        soid = EMPTYGUID;
      }
      if (qty == null) {
        qty = 1;
      }
      if (asynctype == null) {
        asynctype = true;
      }
      if (type(sender) === 'object') {
        return sender;
      } else {
        this.sender = sender;
        this.soid = soid;
        this.qty = qty;
        this.asynctype = asynctype;
        this.upsender = sender.toUpperCase();
      }
    }

    OfferInformation.prototype.Set = function(sender, asynctype) {
      this.sender = sender;
      this.upsender = sender.toUpperCase();
      return this.asynctype = asynctype;
    };

    OfferInformation.prototype.AsyncType = function(asynctype) {
      return this.asynctype = asynctype;
    };

    OfferInformation.prototype.Equals = function(s) {
      if (s.toUpperCase() === this.upsender) {
        return true;
      }
    };

    OfferInformation.save = function(sender, soid, qty) {
      this.sender = sender;
      this.soid = soid;
      this.qty = qty;
    };

    return OfferInformation;

  })();

  StringifyOfferInfo = function(offerinfo) {
    return JSON.stringify(offerinfo);
  };

  ResetLocalOffersGroupContainerCallBack = function(data, sender) {
    var nationalofferscontainer, offerscontainer, placeholder;

    offerscontainer = $('div[id$=displayflagOffersContainer]');
    nationalofferscontainer = $('div[id$=displayflagNationalOffersContainer]');
    offerlist = $('.ulspecialOffersItems');
    placeholder = $('.placeholder');
    placeholder.find('.span2').val('');
    placeholder.find('span').css('visibility', '');
    selectedzipcode = '';
    return offerscontainer.addClass('hideoffers');
  };

  ResetLocalOffersGroupContainer = function(s) {
    var jsonData, sender, urlMethod;

    sender = new Offer('ResetLocalOffersGroupContainer');
    urlMethod = '/Services/AjaxHelper.asmx/ResetLocalOffersGroupContainer';
    jsonData = $.validator.format('{sender:"{0}"}', 'ResetLocalOffersGroupContainer');
    return SendAjax(urlMethod, jsonData, ResetLocalOffersGroupContainerCallBack);
  };

  ResetSpecialOffersCacheCallBack = function(e) {};

  ResetSpecialOffersCache = function(sender, asynctype) {
    var info, jsonData, urlMethod;

    info = new OfferInformation(sender);
    info.AsyncType = asynctype;
    urlMethod = '/Services/AjaxHelper.asmx/ResetSpecialOffersCache';
    jsonData = $.validator.format("{sender:'{0}'}", sender);
    return SendAjax(urlMethod, jsonData, ResetSpecialOffersCacheCallBack, info.sender, info.asynctype);
  };

  AddToSpecialOffersCacheCallBack = function(data, info) {
    var s;

    s = '';
    if (type(info) === 'string') {
      s = info.toUpperCase();
    } else {
      s = info.upsender;
    }
    if (!data.d) {
      return window.location.href = "/Locator.aspx";
    } else if (s === 'LOCALPAGE') {
      return window.location.href = "/MoreOffers.aspx";
    }
  };

  AddToSpecialOfferCache = function(soid, qty, sender, asynctype) {
    var info, jsonData, urlMethod;

    info = new OfferInformation(sender, soid, qty, asynctype);
    urlMethod = '/Services/AjaxHelper.asmx/AddToSpecialOffersCache';
    jsonData = $.validator.format("{soid:'{0}', qty:'{1}'}", soid, qty);
    return SendAjax(urlMethod, jsonData, AddToSpecialOffersCacheCallBack, info, asynctype);
  };

  FetchSpecialOffersCallback = function(data) {
    var d, i, lilist, nationalofferscontainer, offer, offerscontainer, _i, _len;

    offerscontainer = $("div[id$=displayflagOffersContainer]");
    nationalofferscontainer = $("div[id$=displayflagNationalOffersContainer]");
    offerlist = $(".ulspecialOffersItems");
    offer = "";
    lilist = "";
    for (i = _i = 0, _len = data.length; _i < _len; i = ++_i) {
      d = data[i];
      offer = "<li class='offer offercontainer'>" + "<div class='offercontainersingle' data-specialofferitemid='" + val.SpecialOfferItemID + "'>" + "<div class='contentcaption'>" + val.SpecialOfferName + "</div>" + "<br />" + "<span class='contenttext'>" + val.ExtendedDetail + "</span>" + "<input id='RedeemSpecialOffer2' class='button-link fixedleft' type='button' name='redeemspecialoffer2' value='Redeem This Offer' />" + "</div>" + "</li>";
      lilist += offer;
    }
    if (lilist !== "") {
      offerlist.children("li").remove();
      offerlist.append(lilist);
      return offerscontainer.removeClass("hideoffers");
    }
  };

  FetchSpecialOffers = function(count) {
    var jsonData, returncount, urlMethod;

    returncount = 0;
    if (count !== undefined) {
      return returncount = count;
    } else {
      returncount = (offerreturncount === undefined ? 1 : offerreturncount);
      urlMethod = "/Services/AjaxHelper.asmx/FetchSpecialOffers_V3";
      jsonData = $.validator.format("{count:{0}, includepromocodes:{1}}", returncount, false);
      return SendAjax(urlMethod, jsonData, FetchSpecialOffersCallback);
    }
  };

  /*
  	global methods
  */


  root.AddToSpecialOfferCache = function(soid, qty, sender, asynctype) {
    return AddToSpecialOfferCache(soid, qty, sender, asynctype);
  };

  root.ResetSpecialOffersCache = function(sender, asynctype) {
    return ResetSpecialOffersCache(sender, asynctype);
  };

  root.ResetLocalOffersGroupContainer = function(s) {
    return ResetLocalOffersGroupContainer(s);
  };

  root.CheckIfZipSelected = function(sender, soid, qty) {
    return CheckIfZipSelected(sender, soid, qty);
  };

  root.validateZipCode = function(sender, zipcode) {
    return validateZipCode(sender, zipcode);
  };

  CheckIfZipSelectedCallBack = function(data, info) {
    var IsZipSelected;

    IsZipSelected = data.d;
    PleaseWait();
    if (!IsZipSelected) {
      return window.location.href = "/Locator.aspx";
    } else {
      if (info.upsender === 'LOCALPAGE') {
        return AddToSpecialOfferCache(info.soid, info.qty, info, IS_ASYNCHRONOUS);
      } else {
        return window.location.href = fullpath;
      }
    }
  };

  CheckIfZipSelected = function(sender, soid, qty) {
    var OfferInfo, jsonData, urlMethod;

    OfferInfo = new OfferInformation(sender, soid, qty);
    urlMethod = '/Services/AjaxHelper.asmx/CheckIfZipSelected';
    jsonData = $.validator.format("{sender:'{0}'}", sender);
    return SendAjax(urlMethod, jsonData, CheckIfZipSelectedCallBack, OfferInfo);
  };

  zipcodeNotServiced = function(info) {
    var nationalofferscontainer, offerscontainer, txt;

    offerscontainer = $('div[id$=displayflagOffersContainer]');
    nationalofferscontainer = $('div[id$=displayflagNationalOffersContainer]');
    txt = "Zip Code " + selectedzipcode.toString() + "</br> not serviced in your area";
    offerscontainer.addClass('hideoffers');
    $("div[id$=localOffersBlockZipNotValid]").html(txt);
    return $("div[id$=localOffersBlock]").trigger('click');
  };

  zipcodeIsServiced = function(info) {
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

  validateZipCodeCallback = function(data, info) {
    var returnValue;

    returnValue = data.d;
    $(".OrderProcessRowGreen").removeClass("OrderProcessRowGreen");
    switch (returnValue) {
      case ZIPCODENOTSERVICED:
        return zipcodeNotServiced(info);
      case ZIPCODEVALID:
        return zipcodeIsServiced(info);
    }
  };

  validateZipCode = function(sender, zipcode) {
    var OfferInfo, asynctype, jsonData, urlMethod;

    OfferInfo = new OfferInformation(sender);
    OfferInfo.AsyncType = IS_ASYNCHRONOUS;
    if (OfferInfo.Equals('LOCALPAGE')) {
      selectedzipcode = zipcode;
      return asynctype = NOT_ASYNCHRONOUS;
    } else {
      selectedzipcode = $('input[id$=specialOfferszipnumber]').val();
      jsonData = $.validator.format("{zipnumber:'{0}'}", selectedzipcode);
      urlMethod = '/Services/AjaxHelper.asmx/ValidateZipCode';
      return SendAjax(urlMethod, jsonData, validateZipCodeCallback, OfferInfo, IS_ASYNCHRONOUS);
    }
  };

  $(document).on('click', '#LocalOffersGallery .subcontainer', function(e) {
    var DisplayOverlay, contentcaptionvalue, contenttextvalue, imagesrcvalue, mediaimagewidth, mediatype, soid, tocontentcaption, tocontenttext, tocontenttextwrapper, tomediaimage;

    soid = $(this).data('specialofferitemid');
    CheckIfZipSelected('LOCALPAGE', soid, 1);
    DisplayOverlay = function(elem, fancybox) {};
    tocontentcaption = fancybox.find(".contentcaption");
    tomediaimage = fancybox.find(".mediaimage");
    tocontenttext = fancybox.find(".contenttext");
    tocontenttextwrapper = fancybox.find(".contenttextwrapper");
    contentcaptionvalue = elem.find(".contentcaption").text();
    imagesrcvalue = elem.find("img").attr("src");
    contenttextvalue = elem.find(".contenttext").text();
    mediatype = elem.data("mediatype");
    tocontentcaption.text(contentcaptionvalue);
    tomediaimage.attr("src", imagesrcvalue);
    if (mediatype.toUpperCase() === MEDIA_TYPE_VIDEO) {
      return false;
    }
    return fancybox.fancybox({
      autoResize: true,
      scrolling: "no",
      beforeShow: function(e) {}
    }, tocontenttext.text(contenttextvalue), mediaimagewidth = tomediaimage.width() + 10, tocontenttextwrapper.css({
      width: mediaimagewidth
    })).trigger("click");
  });

  $(document).on("click", "#MediaGallery .subcontainer", function(e) {
    var fancybox;

    fancybox = $("#DisplayOverlay").addClass("mediastyle");
    return DisplayOverlay($(this), fancybox);
  });

  $(document).on("click", "#ArticleGallery .ArticleLink", function(e) {
    var fancybox;

    if ($(this).hasClass("localpage")) {
      fancybox = $("#DisplayOverlay").addClass("articlestyle");
      return DisplayOverlay($(this), fancybox);
    }
  });

  $(document).on("click", "#xxx_LocalOffersGallery .subcontainer", function(e) {
    var soid;

    soid = $(this).data("specialofferitemid");
    return CheckIfZipSelected("#LocalOffersGallery_CLICK", soid, 1);
  });

  $(document).on('click', '.navigationLinksContent > .navlink, .topBannerContainer .navlink', function(e) {
    var SENDER, _page, _pagetype, _path, _thisobj;

    SENDER = 'shoppingcart_click';
    _thisobj = $(this);
    if (!_thisobj.hasClass('currentpage')) {
      _pagetype = _thisobj.data('pagetype');
      if (_pagetype === 'externalpath') {
        window.open(_thisobj.data('externalpath'));
      } else {

      }
      _page = '../' + _thisobj.parent().data('product');
      _path = (_thisobj.data('path') === '' ? '/' : '/' + _thisobj.data('path') + '.aspx');
      root.fullpath = (_pagetype === 'overview' ? _path : _page + _path);
      if (_path === MOREOFFERS) {
        return CheckIfZipSelected(SENDER);
      } else {
        PleaseWait();
        return window.location.href = fullpath;
      }
    }
  });

}).call(this);
