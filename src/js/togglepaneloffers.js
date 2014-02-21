//var TotalAmt = 0,
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