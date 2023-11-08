import { config } from "../config";

var menu = {
    OldScrollPosition: 0,

    scrollState: () => {
        const $header = $('.header');

        if ($(window).width() > 580) {
            $header.removeAttr('style')
            return false
        }

        const ScrollDown = menu.OldScrollPosition < window.scrollY;

        menu.OldScrollPosition = window.scrollY;

        const HEADER_TOP_HEIGHT = $header.outerHeight();

        if (window.scrollY > HEADER_TOP_HEIGHT) {

            const style = {
                'margin-top': `${-HEADER_TOP_HEIGHT}px`,
            };

            if (!ScrollDown) {
                style['margin-top'] = 0;
            }
            setTimeout(function () {
                $header.css(style)
            }, 100)

        } else {

            if (!ScrollDown) {
                setTimeout(function () {
                    $header.css({
                        'margin-top': 0,
                    })
                }, 100)
            } else {
                setTimeout(function () {
                    $header.removeAttr('style')
                }, 100)
            }
        }
    },

    init: () => {
        config.addListenerMulti(window, 'scroll load', function () {
            menu.scrollState()
        })

    }
}

export { menu };