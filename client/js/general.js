/* Code not related to a certain template */

(function (g) {

	"use strict";

	var $ = g.jQuery;

	var ui = ui || {};

	ui.buttonToggler = function () {
		$(document).on('click', '.js-buttonToggler', function (e) {
			$(this).toggleClass('active');
		});
	};

	ui.buttonToggler();
})(this);
