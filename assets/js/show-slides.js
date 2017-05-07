var $ = require('jquery');
var fullpage = require('fullpage.js');

var showSlides = function() {
	var $picture1 = $('.picture-first'),
		$picture2 = $('.picture-second'),
		$picture3 = $('.picture-third');
	$('#fullpage').fullpage({
		navigation: true,
		navigationPosition: 'right',
		navigationTooltips: ['Revolucija', 'Grand Prix', 'Jaguar'],
		showActiveTooltip: false,
		verticalCentered: true,
		fixedElements: '.picture',
		onLeave: function(index, nextIndex, direction){
			if (nextIndex === 2) {
	   			$picture1.hide();
	   			$picture2.show();
	   			$picture3.hide();
	   		} else if (nextIndex === 3) {
	   			$picture1.hide();
	   			$picture2.hide();
	   			$picture3.show();
	   		} else {
	   			$picture1.show();
	   			$picture2.hide();
	   			$picture3.hide();
	   		}
		}
	});
};

module.exports = showSlides;