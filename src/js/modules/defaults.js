import {config} from "../config";
var defaults = {

	events: () => {
		config.body.css('paddingTop', config.header.outerHeight());

		let resizeTimer;
		window.addEventListener("resize", () => {
			document.body.classList.add("resize-animation-stopper");
			const headerHeight = config.header.outerHeight();

			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(() => {
				document.body.classList.remove("resize-animation-stopper");
				config.body.css('paddingTop', headerHeight)
			}, 200);
		});
	},

	init: () => {

		defaults.events();

	}
}

export { defaults }