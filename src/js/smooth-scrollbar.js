import Scrollbar from 'smooth-scrollbar';



document.addEventListener('DOMContentLoaded', () => {
    Scrollbar.initAll();

    window.addEventListener('resize', function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;

        if (deviceWidth < 992) {
            Scrollbar.initAll();
        }
        else {
            Scrollbar.destroyAll();
        }
    });
}, false);