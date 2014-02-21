var ALLOFFERS = 0;
var HASPROMOS = 1;
var NOPROMOS = 2;

function ReedeemThisOffer(e) {
	PleaseWait();
	window.location.href = "/MoreOffers.aspx";
}

$(document).ready(function (e) {
	/*******************************************************************************/
	/*	EVENTS
	/*******************************************************************************/

	$(document).on('click', '.offer', function (e) {
		var $toggleClasses = $('.hiddenContent, .seemoreOffers');
		var $hiddenContent = $('.hiddenContent');
		var $specialoffers = $('.specialOffers');
		var $hiddenOffers = $('.hiddenOffers');
		var seperator = "<div class='seperator'></div>";

		if ($hiddenContent.hasClass('hide')) {
			$(seperator).appendTo('.offer');
			$toggleClasses.toggleClass('hide');
		}
		else {
			var _this = $(this);
			var $newactiveoffer = _this;
			var $existingdisplayedoffer = $('.displayedOffers .offer:first');

			if ($newactiveoffer[0] != $existingdisplayedoffer[0]) {
				// handle new displayed offer
				$existingdisplayedoffer.remove();
				$('.displayedOffers').append($newactiveoffer);
				$('.hiddenOffers').append($existingdisplayedoffer);
			}
			$('.specialOffers .seperator').remove();
			$toggleClasses.toggleClass('hide');
		}
	});
});