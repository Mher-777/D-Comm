import AOS from 'aos';

var animation = {
    settings: {
        easing: 'ease-in-sine',
        duration: '500',
        once: true
    },

    build: (selector) => {
        AOS.init(animation.settings);
    },

    run: (selector) => {
        animation.build(selector);
    },

    init: () => {
        animation.run();
    },
};

export { animation };