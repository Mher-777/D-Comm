import { config } from "../config";

var menu = {
    item: ".js-item",
    dropdown: ".js-dropdown",
    hamburger: '.js-hamburger',
    resizeTimer: '',
    nav: '.header__nav',

    menuOpen: () => {
        if ($(window).width() > 992) {
            $(menu.hamburger).removeClass('is-active')
            $(menu.nav).removeClass('is-open')
            $(config.html).removeClass('js-lock')
        }

        $(menu.hamburger).on('click', function (e) {
            clearTimeout(menu.resizeTimer);
            menu.resizeTimer = setTimeout(() => {
                e.preventDefault()
                const $this = $(this)

                $this.toggleClass('is-active')
                $(config.html).toggleClass('js-lock')
                $(menu.nav).toggleClass('is-open')
            }, 25);

        })
    },

    dropDown: () => {
        if ($(window).width() > 992) return false
        $('.js-dropdown').on('click', function (e) {
            const $this = $(this)

            if ($(window).width() <= 992) {
                e.preventDefault()
                clearTimeout(menu.resizeTimer);
                menu.resizeTimer = setTimeout(() => {
                    if (!$this.hasClass('is-active')) {
                        $('.menu .dropdown').slideUp()
                        $('.js-dropdown').removeClass('is-active')
                    }

                    if ($(e.target).hasClass('menu__link')) {
                        $this.find('.dropdown').slideToggle()
                        $this.toggleClass('is-active')
                    }
                }, 25);

            }

        })
    },

    OldScrollPosition: 0,

    scrollState: () => {
        const $header = $('.header');

        // if ($(window).width() > 580) {
        //     $header.removeAttr('style')
        //     return false
        // }

        const ScrollDown = menu.OldScrollPosition < window.scrollY;

        menu.OldScrollPosition = window.scrollY;

        const HEADER_TOP_HEIGHT = $header.outerHeight();

        if (window.scrollY > HEADER_TOP_HEIGHT) {

            const style = {
                'margin-top': `${-HEADER_TOP_HEIGHT - 20}px`,
            };

            if (!ScrollDown) {
                style['margin-top'] = 0;
            }
            setTimeout(function () {
                $header.addClass('is-sticky')
                $header.css(style)
            }, 100)

        } else {

            if (!ScrollDown) {
                setTimeout(function () {
                    $header.css({
                        'margin-top': 0,
                    })

                    $header.removeClass('is-sticky')
                }, 100)
            } else {
                setTimeout(function () {
                    $header.removeAttr('style')
                    $header.removeClass('is-sticky')
                }, 100)
            }
        }
    },

    init: () => {
        config.addListenerMulti(window, 'scroll load', function () {
            menu.scrollState()
        })

        config.addListenerMulti(window, 'resize load', function () {
            menu.dropDown()
            menu.menuOpen()
        })

    }
}

export { menu };