import "magnific-popup";
import { config } from "../config";

var modals = {

	close: (e) => {

		if(!e)
			return false;

		e.preventDefault();

		config.log('close modal');

		$.magnificPopup.close();	

	},

	open: (e, modal) => {

		e = e || false;

		if(e) e.preventDefault();

		$.magnificPopup.close();

		modal = modal || (e != false ? ($(e.currentTarget).attr('href') ? $(e.currentTarget).attr('href') : $(e.currentTarget).data('modal')) : e);
		if(!modal)
			return false;

		if(e && $(e.currentTarget).attr('data-youtube')){
			$(modal + ' iframe').attr('src', 'https://www.youtube.com/embed/'+$(e.currentTarget).data('youtube')+'?autoplay=1&showinfo=0&rel=0&controls=0')
		}

		if(e && $(e.currentTarget).attr('data-input')){
			$(modal + ' input[name="form"]').val($(e.currentTarget).data('input'))
		}

		$.magnificPopup.open({
			tClose: 'Закрыть',
			removalDelay: 300,
			fixedContentPos: true,
			fixedBgPos: true,
			closeMarkup: '<div class="modals__close close js-close-modal"><svg class="icon icon-close close" viewBox="0 0 20 20"><use xlink:href="./app/icons/sprite.svg#close"></use></svg></div>',
			mainClass: 'mfp-fade',
			items: {
				src: modal,
				type: 'inline'
			},
			callbacks: {
				beforeOpen: (e) => {
					config.header.css('width', `calc(100% - ${config.scrollbarWidth()}px)`)
				},

				beforeClose: () => {
					setTimeout(function () {
						config.header.css('width', '')
					}, 300)
				}
			}
		}, 0);

	},

	init: (e) => {

		
		$(document).on('click', '.js-close-modal', modals.close);

		$(document).on('click', '.js-modal', modals.open);

	}

};


export { modals };