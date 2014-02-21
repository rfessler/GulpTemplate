var debug = false;
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var availableDates = [];
var unavailableDates = []; // yyyy/MM/dd
var unavailableDays = [];
var availableDays = [];
var currentselecteddate;
var enabled = [true, 'date-enabled bgHover', 'Book Now'];
var disabled = [false, 'date-disabled bgHover', 'Booked Out'];
var appointmentDate;

function unavailable(date) {
	ymd = $.datepicker.formatDate('yy/mm/dd', new Date(date));
	day = new Date(ymd).getDay();
	var result = ($.inArray(ymd, unavailableDates) < 0 && $.inArray(days[day], unavailableDays) < 0) ? [true, 'date-enabled bgHover', 'Book Now'] : [false, 'date-disabled bgHover', 'Booked Out'];
	return result;
}

function available(date) {
	ymd = $.datepicker.formatDate('yy/mm/dd', new Date(date));
	day = new Date(ymd).getDay();
	var result = ($.inArray(ymd, availableDates) >= 0 && $.inArray(days[day], availableDays) < 0) ? [true, 'date-enabled bgHover', 'Book Now'] : [false, 'date-disabled bgHover', 'Booked Out'];
	return result;
}

function appointmentSelectedSuccessCallback(data) {
	$('#appointmentdate').val(currentselecteddate);

	OrderScheduleInnerStatusBox(0, 'S', currentselecteddate);

	//    var $result = $('<div id="appointmentdateset"  ></div>');

	//    $('#orderSummarydiv').next().remove();
	//    $('#orderSummarydiv').after($result);
	//    $('#appointmentdateset').empty().text(currentselecteddate + ' ' + data.d);
}

function appointmentDateSelected(dateStr, inst) {
	var ad = $.datepicker.formatDate('mm/dd/yy', new Date(dateStr));
	currentselecteddate = ad;

	//var urlMethod = '/Services/AjaxHelper.asmx/SaveAppointment';
	//var jsonData = $.validator.format("{appointmentDate:'{0}'}", ad);

	//SendAjax(urlMethod, jsonData, appointmentSelectedSuccessCallback);

	//$('#appointmentdate').val(currentselecteddate);
	$('.apptdate input[type=hidden]').val(currentselecteddate);
}

$(document).ready(function () {
	var settings = {
		numberOfMonths: [1, 2],
		autoSize: true,
		minDate: 0,
		maxDate: '+2M',
		beforeShowDay: available
	}

	$.datepicker.setDefaults(settings);

	$('div[id*=datepicker]').datepicker({ onSelect: appointmentDateSelected });

	$('#validcheck').blur(function (event) {
		var b = $(this).validateInput({ 'showOKImg': true, 'method': 'number' });
	});

	var ad = $.datepicker.formatDate('mm/dd/yy', new Date(appointmentDate));
	$('div[id*=datepicker]').datepicker('setDate', ad);
	//$('#appointmentdate').val(ad);
});