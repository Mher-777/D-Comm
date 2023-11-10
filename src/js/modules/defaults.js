import {config} from "../config";
var defaults = {

	events: () => {
		config.body.css('paddingTop', config.header.outerHeight());

		let resizeTimer;
		config.addListenerMulti(window, 'resize load', function () {
			// document.body.classList.add("resize-animation-stopper");
			const headerHeight = config.header.outerHeight();

			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				// document.body.classList.remove("resize-animation-stopper");
				config.body.css('paddingTop', headerHeight)
			}, 500);
		})
	},

	init: () => {

		defaults.events();

	}
}

export { defaults }