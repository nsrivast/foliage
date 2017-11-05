window.onload = function() {
	
	function pad(num, size) { return ('0000000' + num).substr(-size); }
	
	var monthLabels = { '10': 'Oct', '11': 'Nov' }
	var currYear = null;
	var currMonth = null;

	var mainDiv = $(document.getElementById("buttons"));
	var yearDiv = $('<div/>');
	var monthDiv = $('<div/>');
	
	for (var i = 0; i < allDates.length; i++) {
			console.log(allDates[i][0] + "-" + allDates[i][1] + "-" + allDates[i][2]);
	    var date = allDates[i];
			var year = date[0],
					month = pad(date[1], 2),
					day = pad(date[2], 2);
					
			if (month != currMonth) {
				if (currMonth) {
					yearDiv.append(monthDiv);							
				}
				monthLabel = $('<div/>').attr({ 'class': 'monthDiv'}).append(
					$('<span/>').attr({ 'class': 'monthLabel'}).html(year + " " + monthLabels[month])
				);
				monthDiv = $('<div/>').attr({ 'class': 'monthContainer'}).append(monthLabel);
				currMonth = month;
			}

			if (year != currYear) {
				if (currYear) {
					mainDiv.append(yearDiv);							
				}
				yearLabel = $('<span/>').attr({ 'class': 'yearLabel'}).html(year);
				yearDiv = $('<div/>').attr({ 'class': 'yearContainer'});
				currYear = year;
			}
								
			var btn = $('<input/>').attr({
				type: 'button',
				value: day,
				id: 'btn_' + year + "_" + month + "_" + day,
				class: 'dateButton'
			});
			btn.data('year', year);
			btn.data('month', month);
			btn.data('day', day);
			
			monthDiv.append(btn);
	}
	yearDiv.append(monthDiv);							
	mainDiv.append(yearDiv);							
	
	changeImage = function(imgID, src) {
    $("#" + imgID).fadeOut(200, function() {
      $("#" + imgID).attr("src", src);
    }).fadeIn(200);
    return false;
	}

	changeImages = function(desc) {
		changeImage("mw", "imgs/midwest_us_" + desc + "_lc.gif");
		changeImage("se", "imgs/southeast_us_" + desc + "_lc.gif");
		changeImage("ne", "imgs/northeast_us_" + desc + "_lc.gif");
	}
	$(".dateButton").bind('click', function() {
		var btn = $(this);
		var year = btn.data('year'),
				month = btn.data('month'),
				day = btn.data('day');
		var desc = month + "_" + day + "_" + year;

		$(".dateButton").removeClass("dateButtonActive");		
		$(this).addClass("dateButtonActive");
		
		changeImages(desc);						
	});
	
	changeImages("11_02_2017");
	$("#btn_2017_11_02").addClass("dateButtonActive");
};
